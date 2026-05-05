from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from plano.models import Plano
from plano.serializers import PlanoSerializer

class PlanoCreateListView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset =  Plano.objects.all()
    serializer_class = PlanoSerializer