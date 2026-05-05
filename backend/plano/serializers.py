from rest_framework import serializers
from plano.models import Plano

class PlanoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plano
        fields = '__all__'