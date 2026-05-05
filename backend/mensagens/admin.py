from django.contrib import admin

from mensagens.models import Mensagens

class MensagensAdmin(admin.ModelAdmin):
    list_display =('cd_msg','dt_registro','ds_msg',)
    search_fields = ('cd_msg',)

admin.site.register(Mensagens, MensagensAdmin)

#Para a mensagem espera que seja buscado pelo codigo, exemplo: medconnect/hospitalx/m2345
