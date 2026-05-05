from django.db import models
from fornecedor.models import Fornecedor
from mat_med.models import MatMed
from pessoa_juridica.models import PessoaJuridica

class Lote(models.Model):
    nr_lote = models.IntegerField(primary_key=True) 
    dt_fabricacao = models.DateTimeField()
    dt_validade = models.DateField()
    qtd_lote = models.IntegerField()
    unidade_med = models.CharField(max_length=20)
    
    fornecedor = models.ForeignKey(Fornecedor, on_delete=models.RESTRICT, related_name='lotes')
    cd_material = models.ForeignKey(MatMed, on_delete=models.RESTRICT, related_name='lotes')
    cd_pessoaj = models.ForeignKey(PessoaJuridica, on_delete=models.RESTRICT, related_name='pessoas_jur')
    
    def __str__(self):
        return str (self.nr_lote)
    