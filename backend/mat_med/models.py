from django.db import models
from marcas.models import Marcas
from tipo_matmed.models import TipoMatMed
from pessoa_juridica.models import PessoaJuridica

class MatMed(models.Model):
    cd_mat     = models.AutoField(primary_key=True)
    ds_mat     = models.CharField(blank=False, null=False)
    ds_marca   = models.ForeignKey(Marcas,         on_delete=models.RESTRICT, related_name='materiais')
    ds_tipo    = models.ForeignKey(TipoMatMed,     on_delete=models.RESTRICT, related_name='materiais')
    ds_pessoaj = models.ForeignKey(PessoaJuridica, on_delete=models.RESTRICT, related_name='materiais')

    cd_tiss = models.CharField(
        max_length=2,
        blank=True,
        null=True,
        verbose_name='Código TISS',
        help_text='Padrão de comunicação, número que representa a tabela de origem (ex: 19 = Brasíndice, 20 = TUSS)'
    )
    cd_tuss = models.CharField(
        max_length=10,
        blank=True,
        null=True,
        verbose_name='Código TUSS',
        help_text='"CPF" do material/medicamento no sistema de saúde suplementar (ANS) — 8 dígitos (ex: 70908788)'
    )
    cd_simpro = models.CharField(
        max_length=10,
        blank=True,
        null=True,
        verbose_name='Código Simpro',
        help_text='Referência de preço de materiais hospitalares (compras, faturamento, auditoria) — ex: 1197898'
    )
    cd_brasindice = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        verbose_name='Código Brasíndice',
        help_text='Referência de preço de medicamentos, define PF (Preço de Fábrica) e PMC (Preço Máximo ao Consumidor) — ex: 41723412ERRU'
    ) 

    def __str__(self):
        return str(self.ds_mat)