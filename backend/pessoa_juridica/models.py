from django.db import models
from plano.models import Plano
from fornecedor.models import Fornecedor

class PessoaJuridica(models.Model):
    cd_pessoaj = models.IntegerField(primary_key=True, blank=False, null= False)
    nm_pessoaj = models.CharField(blank=False, null= False)
    email_pj = models.CharField(blank=False, null= False)
    senha_pj = models.CharField(blank=False, null= False)
    resp_tec = models.CharField(blank=False, null= False)
    nr_cnpj = models.CharField(max_length=18, blank=False, null=False, unique=True)
    razao_social = models.CharField(blank=False, null= False)

    ds_plano = models.ForeignKey(Plano, on_delete=models.RESTRICT, related_name='pessoas_jur')
    
    def __str__(self):
        return str(self.nm_pessoaj)