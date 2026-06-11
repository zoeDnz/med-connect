from django.utils import timezone
from rest_framework import serializers
from lote.models import Lote


class LoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lote
        fields = '__all__'
        read_only_fields = ['nr_lote']

    def validate(self, attrs):
        dt_fabricacao = attrs.get('dt_fabricacao')
        dt_validade = attrs.get('dt_validade')

        # Fabricação não pode ser futura
        if dt_fabricacao and dt_fabricacao > timezone.now():
            raise serializers.ValidationError({
                'dt_fabricacao':
                'A data de fabricação não pode ser futura.'
            })

        # Não permitir cadastro de lote vencido
        if dt_validade and dt_validade < timezone.localdate():
            raise serializers.ValidationError({
                'dt_validade':
                'Não é permitido cadastrar lotes vencidos.'
            })

        # Validade deve ser posterior à fabricação
        if (
            dt_fabricacao and
            dt_validade and
            dt_validade <= dt_fabricacao.date()
        ):
            raise serializers.ValidationError({
                'dt_validade':
                'A data de validade deve ser posterior à data de fabricação.'
            })

        return attrs