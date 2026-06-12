from rest_framework import serializers
from anuncio.models import Anuncio

class AnuncioSerializer(serializers.ModelSerializer):
    material_nome = serializers.CharField(
        source="cd_mat.ds_mat",
        read_only=True
    )
    contato_vendedor = serializers.SerializerMethodField()

    def get_contato_vendedor(self, obj):
        if obj.ie_status != "F":
            return None
        try:
            pessoa = obj.cd_pessoa_anunciante
            print(f"[DEBUG] contato_vendedor: {pessoa.nm_pessoaj} / {pessoa.email_pj}")
            return {
                "nome": pessoa.nm_pessoaj,
                "email": pessoa.email_pj,
            }
        except Exception as e:
            print(f"[DEBUG] erro contato_vendedor: {e}")
            return None

    class Meta:
        model = Anuncio
        fields = "__all__"
        read_only_fields = ["data_anuncio"]