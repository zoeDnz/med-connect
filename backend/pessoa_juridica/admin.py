from django.contrib import admin
from django.contrib.auth.hashers import make_password
from pessoa_juridica.models import PessoaJuridica

class PessoaJuridicaAdmin(admin.ModelAdmin):
    list_display =('cd_pessoaj','nm_pessoaj','email_pj','resp_tec','nr_cnpj','razao_social','status',)
    search_fields = ('nm_pessoaj',)
    list_filter = ('status',)

    def cnpj_formatado(self, obj):
        cnpj = obj.nr_cnpj
        if len(cnpj) == 14:
            return f"{cnpj[:2]}.{cnpj[2:5]}.{cnpj[5:8]}/{cnpj[8:12]}-{cnpj[12:]}"
        return cnpj
    cnpj_formatado.short_description = "CNPJ"

    def save_model(self, request, obj, form, change):
        obj.nr_cnpj = obj.nr_cnpj.replace(".", "").replace("/", "").replace("-", "")
        if not change or 'senha_pj' in form.changed_data:
            obj.senha_pj = make_password(obj.senha_pj)
        super().save_model(request, obj, form, change)
        
admin.site.register(PessoaJuridica, PessoaJuridicaAdmin) #criptografia de senha no menu admin
