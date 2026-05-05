from rest_framework import serializers
from mensagens.models import Mensagens

class MensagensSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mensagens
        fields = '__all__'