export interface Anuncio {
  nr_anuncio: number
  nr_lote: number | null
  cd_mat: number
  qtd_mat: number
  val_unitario: string
  cd_pessoa_anunciante: number
  ds_obs: string
  data_anuncio: string
  ie_status: 'A' | 'I' | 'F'
}

export interface CreateAnuncioForm {
  nr_lote: number | null
  cd_mat: number
  qtd_mat: number
  val_unitario: string
  cd_pessoa_anunciante: number
  ds_obs?: string
  ie_status?: 'A' | 'I' | 'F'
}

export type UpdateAnuncioForm = Partial<CreateAnuncioForm>