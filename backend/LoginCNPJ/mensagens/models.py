from django.db import models
from pessoa_juridica.models import PessoaJuridica
from negociacao.models import Negociacao

class Mensagens(models.Model):
    cd_msg = models.AutoField(primary_key=True)
    dt_registro = models.DateTimeField(auto_now_add=True)
    ds_msg = models.CharField(blank=False, null= False)
    
    cd_remetente = models.ForeignKey(PessoaJuridica, on_delete=models.RESTRICT, related_name='mensagens_enviadas')
    cd_destinatario = models.ForeignKey(PessoaJuridica, on_delete=models.RESTRICT, related_name='mensagens_recebidas')
    
    cd_negociacao= models.ForeignKey(Negociacao, on_delete=models.RESTRICT, related_name='mensagens')    
    
    def __str__(self):
        return f"Msg {self.cd_msg} - De: {self.cd_remetente}"

#PONTOS QUE EDITEI:
#    cd_msg = models.IntegerField(primary_key=True, blank=False, null= False)
#    dt_registro = models.DateTimeField(blank=False, null= False)
#    ds_msg = models.CharField(blank=False, null= False)
#LINHA 16:return str(self.cd_msg)