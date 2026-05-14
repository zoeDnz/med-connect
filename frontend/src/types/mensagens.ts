export interface Mensagem {
  cd_msg: number
  /** ISO 8601 datetime string */
  dt_registro: string
  ds_msg: string
  /** FK → PessoaJuridica.cd_pessoaj */
  cd_remetente: number
  /** FK → PessoaJuridica.cd_pessoaj */
  cd_destinatario: number
  /** FK → Negociacao.nr_negociacao */
  cd_negociacao: number
}
