from django.db import models

class Fornecedor(models.Model):
    cd_fornecedor = models.IntegerField(primary_key=True, blank=False, null= False)
    ds_fornecedor = models.CharField(max_length= 255, blank=False, null= False)
    cnpj_fornc = models.CharField(max_length=18, blank=False, null=False, unique=True)

    def __str__(self):
        return str(self.ds_fornecedor)
    