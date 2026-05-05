from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from fornecedor.models import Fornecedor
from fornecedor.serializers import FornecedorSerializer

class FornecedorCreateListView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset =  Fornecedor.objects.all()
    serializer_class = FornecedorSerializer