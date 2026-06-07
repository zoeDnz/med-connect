from rest_framework import generics
from anuncio.models import Anuncio
from anuncio.serializers import AnuncioSerializer

class AnuncioCreateListView(generics.ListCreateAPIView):
    serializer_class = AnuncioSerializer

    def get_queryset(self):
        status_param = self.request.query_params.get('status', 'A')
        queryset = Anuncio.objects.filter(ie_status=status_param)

        ds_mat = self.request.query_params.get('ds_mat', None)
        if ds_mat:
            queryset = queryset.filter(cd_mat__ds_mat__icontains=ds_mat)

        hospital = self.request.query_params.get('hospital', None)
        if hospital:
            queryset = queryset.filter(cd_pessoa_anunciante__nm_pessoaj__icontains=hospital)

        tipo = self.request.query_params.get('tipo', None)
        if tipo:
            queryset = queryset.filter(cd_mat__ds_tipo__ds_tipo__icontains=tipo)

        return queryset


class AnuncioRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Anuncio.objects.all()
    serializer_class = AnuncioSerializer
    lookup_field = 'nr_anuncio'

    def perform_update(self, serializer):
        status_anterior = self.get_object().ie_status
        anuncio = serializer.save()

        # A → F: proposta igual ao valor base, finaliza automaticamente
        if status_anterior == 'A' and anuncio.val_proposta and anuncio.val_proposta == anuncio.val_base:
            anuncio.ie_status = 'F'
            anuncio.val_aceito = anuncio.val_base
            anuncio.save()

        # A → N: proposta diferente do valor base, fica em andamento
        elif status_anterior == 'A' and anuncio.val_proposta and anuncio.val_proposta != anuncio.val_base:
            anuncio.ie_status = 'N'
            anuncio.save()

        # N → F: anunciante aceitou proposta diferente
        # Frontend manda: ie_status = 'F' + cd_pessoa_compradora
        elif status_anterior == 'N' and anuncio.ie_status == 'F':
            anuncio.val_aceito = anuncio.val_proposta
            anuncio.save()

        # N → A: anunciante recusou, limpa tudo e volta ativo
        # Frontend manda: ie_status = 'A'
        elif status_anterior == 'N' and anuncio.ie_status == 'A':
            anuncio.val_proposta = None
            anuncio.val_aceito = None
            anuncio.cd_pessoa_compradora = None
            anuncio.save()