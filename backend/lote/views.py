from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from lote.models import Lote
from lote.serializers import LoteSerializer

class LoteCreateListView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset =  Lote.objects.all()
    serializer_class = LoteSerializer