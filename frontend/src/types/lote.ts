export type UnidadeMed = 'CX' | 'UN' | 'FR'

export interface Lote {
  nr_lote: number
  /** ISO 8601 datetime string */
  dt_fabricacao: string
  /** Date string (YYYY-MM-DD) */
  dt_validade: string
  qtd_lote: number
  unidade_med: UnidadeMed
  /** FK → Fornecedor.cd_fornecedor */
  fornecedor: number
  /** FK → MatMed.cd_mat */
  cd_material: number
  /** FK → PessoaJuridica.cd_pessoaj */
  cd_pessoaj: number
}
