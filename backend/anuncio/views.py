from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from anuncio.models import Anuncio
from anuncio.serializers import AnuncioSerializer


# View que retorna somente os anúncios onde o usuário é o anunciante
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def meus_anuncios(request):
    anuncios = Anuncio.objects.filter(
        cd_pessoa_anunciante=request.user
    )

    serializer = AnuncioSerializer(anuncios, many=True)
    return Response(serializer.data)


# View que retorna somente os anúncios onde o usuário é o comprador e o status é 'F' (finalizado)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def minhas_compras(request):
    anuncios = Anuncio.objects.filter(
        cd_pessoa_compradora=request.user,
        ie_status='F'
    )

    serializer = AnuncioSerializer(anuncios, many=True)
    return Response(serializer.data)


# View que retorna somente os anúncios onde o usuário é o comprador (negociações ativas)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def minhas_propostas(request):
    anuncios = Anuncio.objects.filter(
        cd_pessoa_compradora=request.user
    ).exclude(
        ie_status='F'
    ).order_by('-data_anuncio')

    serializer = AnuncioSerializer(anuncios, many=True)
    return Response(serializer.data)


class AnuncioCreateListView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = AnuncioSerializer

    def get_queryset(self):
        status = self.request.query_params.get('status', 'A')
        queryset = Anuncio.objects.filter(ie_status=status)

        ds_mat = self.request.query_params.get('ds_mat')
        if ds_mat:
            queryset = queryset.filter(
                cd_mat__ds_mat__icontains=ds_mat
            )

        hospital = self.request.query_params.get('hospital')
        if hospital:
            queryset = queryset.filter(
                cd_pessoa_anunciante__nm_pessoaj__icontains=hospital
            )

        tipo = self.request.query_params.get('tipo')
        if tipo:
            queryset = queryset.filter(
                cd_mat__ds_tipo__ds_tipo__icontains=tipo
            )

        return queryset


class AnuncioRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Anuncio.objects.all()
    serializer_class = AnuncioSerializer
    lookup_field = 'nr_anuncio'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        status_anterior = instance.ie_status

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        anuncio = serializer.save()

        contato = None

        # A → F automático
        if (
            status_anterior == 'A'
            and anuncio.val_proposta
            and anuncio.val_proposta == anuncio.val_base
        ):
            anuncio.ie_status = 'F'
            anuncio.val_aceito = anuncio.val_base
            anuncio.save()

        # A → N
        elif (
            status_anterior == 'A'
            and anuncio.val_proposta
            and anuncio.val_proposta != anuncio.val_base
        ):
            anuncio.ie_status = 'N'
            anuncio.save()

        # N → F (aceitar proposta)
        elif (
            status_anterior == 'N'
            and anuncio.ie_status == 'F'
        ):
            anuncio.val_aceito = anuncio.val_proposta
            anuncio.save()

            contato = {
                "email": anuncio.cd_pessoa_compradora.email_pj, 
                "nome": anuncio.cd_pessoa_compradora.nm_pessoaj,
            }

        # N → A (recusar)
        elif (
            status_anterior == 'N'
            and anuncio.ie_status == 'A'
        ):
            anuncio.val_proposta = None
            anuncio.val_aceito = None
            anuncio.cd_pessoa_compradora = None
            anuncio.save()

        return Response({
            "nr_anuncio": anuncio.nr_anuncio,
            "ie_status": anuncio.ie_status,
            "val_base": anuncio.val_base,
            "val_proposta": anuncio.val_proposta,
            "val_aceito": anuncio.val_aceito,
            "contato": contato
        })