export interface Negociacao {
  nr_negociacao: number
  obs_negocia: string
  qtd_matmed: number
  /** FK → MatMed.cd_mat */
  cd_mat: number
  /** FK → PessoaJuridica.cd_pessoaj (quem oferta) */
  cd_negociador: number
  /** FK → PessoaJuridica.cd_pessoaj (quem solicita) */
  cd_negociante: number
}
