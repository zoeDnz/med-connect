from django.db import models

class Marcas(models.Model):
    cd_marca = models.IntegerField(primary_key=True, blank=False, null= False)
    ds_marca = models.CharField(blank=False, null= False)

    def __str__(self):
        return str(self.ds_marca)
    
    