from rest_framework import serializers
from anuncio.models import Anuncio

class AnuncioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anuncio
        fields = '__all__'
        read_only_fields = ['data_anuncio']