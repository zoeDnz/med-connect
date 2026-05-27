import type { TipoMatMedCodigo } from './tipo_matmed'

export interface MatMed {
  cd_mat: number
  ds_mat: string
  /** FK → Marca.cd_marca */
  ds_marca: number
  /** FK → TipoMatMed.cd_tipo */
  ds_tipo: TipoMatMedCodigo
  /** FK → PessoaJuridica.cd_pessoaj */
  ds_pessoaj: number
}

export interface CreateMatMedForm {
  ds_mat: string
  ds_marca: number
  ds_tipo: TipoMatMedCodigo
  ds_pessoaj: number
}

export type UpdateMatMedForm = Partial<CreateMatMedForm>
