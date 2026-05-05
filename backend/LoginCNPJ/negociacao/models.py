from django.db import models
from pessoa_juridica.models import PessoaJuridica
from mat_med.models import MatMed


class Negociacao(models.Model):
    nr_negociacao= models.IntegerField(primary_key=True, blank=False, null= False)
    obs_negocia = models.CharField(blank=False, null= False)  
    qtd_matmed = models.IntegerField(blank=False, null= False)
        
    cd_mat = models.ForeignKey(MatMed, on_delete=models.RESTRICT, related_name='negociacoes')
    cd_negociador = models.ForeignKey(PessoaJuridica, on_delete=models.RESTRICT, related_name='negociacoes_as_negociador')
    cd_negociante = models.ForeignKey(PessoaJuridica, on_delete=models.RESTRICT, related_name='negociacoes_as_negociante')

    def __str__(self):
        return str(self.nr_negociacao)
    