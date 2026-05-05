from django.contrib import admin
from plano.models import Plano

class PlanoAdmin(admin.ModelAdmin):
    list_display =('cd_plano','ds_plano','val_plano',)
    search_fields = ('ds_plano',)

admin.site.register(Plano, PlanoAdmin)

#Para o plano espera-se que seja buscado pela descrição, exemplo: Basico, Plus