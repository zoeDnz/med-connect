export interface Lote {
  nr_lote: number
  /** ISO 8601 datetime string */
  dt_fabricacao: string
  /** Date string (YYYY-MM-DD) */
  dt_validade: string
  qtd_lote: number
  unidade_med: string
  /** FK → Fabricante.cd_fabricante */
  fabricante: number
  /** FK → MatMed.cd_mat */
  cd_material: number
  /** FK → PessoaJuridica.cd_pessoaj */
  cd_pessoaj: number
}

export interface CreateLoteForm {
  nr_lote: number
  dt_fabricacao: string
  dt_validade: string
  qtd_lote: number
  unidade_med: string
  fabricante: number
  cd_material: number
  cd_pessoaj: number
}

export type UpdateLoteForm = Partial<CreateLoteForm>
