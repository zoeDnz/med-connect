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
