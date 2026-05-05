from django.contrib import admin
from fornecedor.models import Fornecedor

class FornecedorAdmin(admin.ModelAdmin):
    list_display =('cd_fornecedor','ds_fornecedor','cnpj_fornc',)
    search_fields = ('ds_fornecedor',)

admin.site.register(Fornecedor, FornecedorAdmin)

#Para o fornecedor espera que ele seja buscado pela descrição, exemplo: Unimed,Santa Filomena
