from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from mensagens.models import Mensagens
from mensagens.serializers import MensagensSerializer

class MensagensCreateListView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset =  Mensagens.objects.all()
    serializer_class = MensagensSerializer
    filterset_fields = ['cd_msg', 'cd_negociacao'] # Permite buscar pelo código