from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from pessoa_juridica.models import PessoaJuridica


@api_view(['POST'])
def login(request):
    cnpj = request.data.get('cnpj')
    password = request.data.get('password')

    if not cnpj or not password:
        return Response(
            {"error": "CNPJ e senha são obrigatórios"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # remove máscara do CNPJ
    cnpj = cnpj.replace(".", "").replace("/", "").replace("-", "")

    # busca no banco
    user = PessoaJuridica.objects.filter(
        nr_cnpj=cnpj,
        senha_pj=password
    ).first()

    if not user:
        return Response(
            {"error": "Credenciais inválidas"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    # ❌ NÃO usar for_user (não existe User padrão no seu model)
    refresh = RefreshToken()

    # payload customizado
    refresh["cnpj"] = user.nr_cnpj
    refresh["id"] = user.cd_pessoaj
    refresh["name"] = user.nm_pessoaj

    return Response({
        "cnpj": user.nr_cnpj,
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    }, status=status.HTTP_200_OK)