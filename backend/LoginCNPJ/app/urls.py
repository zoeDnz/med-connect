from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views
from fornecedor.views import FornecedorCreateListView
from lote.views import LoteCreateListView
from marcas.views import MarcasCreateListView
from mat_med.views import MatMedCreateListView
from mat_med.views import MatMedRetrieveUpateDestroyView
from mensagens.views import MensagensCreateListView
from negociacao.views import NegocicaoCreateListView
from pessoa_juridica.views import PessoaJuridicaCreateListView
from plano.views import PlanoCreateListView
from tipo_matmed.views import TipoMatMedCreateListView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('admin/', admin.site.urls),
 
    path('fornecedor/', FornecedorCreateListView.as_view(), name='fornecedor-create-list'),
    path('lote/', LoteCreateListView.as_view(), name='lote-create-list'),
    path('marcas/', MarcasCreateListView.as_view(), name='marcas-create-list'),
    path('mat_med/', MatMedCreateListView.as_view(), name='mat_med-create-list'),
    path('mat_med/<int:pk>', MatMedRetrieveUpateDestroyView.as_view(), name='mat_med-detail-list'),
    path('mensagens/', MensagensCreateListView.as_view(), name='mensagens-create-list'),
    path('negociacao/', NegocicaoCreateListView.as_view(), name='negociacao-create-list'),
    path('pessoa_juridica/', PessoaJuridicaCreateListView.as_view(), name='pessoa_juridica-create-list'),
    path('plano/', PlanoCreateListView.as_view(), name='plano-create-list'),
    path('tipo_matmed/', TipoMatMedCreateListView.as_view(), name='tipo_matmed-create-list'),  
    
    path('authentication/token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    
    path('authentication/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),

    path('authentication/token/verify/', TokenVerifyView.as_view(), name='token-verify'),
    
]

