from django.db import models

class Plano(models.Model):
    cd_plano= models.IntegerField(primary_key=True, blank=False, null= False)
    ds_plano = models.CharField(blank=False, null= False)
    val_plano = models.FloatField(blank=False, null= False)
  
    def __str__(self):
        return str(self.ds_plano)
    