from django.urls import path
from . import views

urlpatterns = [
    path("anuncio/meus-anuncios/", views.meus_anuncios, name="meus-anuncios"),
    path('anuncio/', views.AnuncioCreateListView.as_view(), name='anuncio-create-list'),
    path('anuncio/<int:nr_anuncio>/', views.AnuncioRetrieveUpdateDestroy.as_view(), name='anuncio-detail-view'),
    
]