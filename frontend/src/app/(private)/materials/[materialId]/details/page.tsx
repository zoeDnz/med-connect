"use client"

import { useParams, useSearchParams } from "next/navigation"

export default function MaterialDetails() {
  const { materialId } = useParams()
  const searchParams = useSearchParams()

  const supplierId = searchParams.get("id_pf")

  return (
    <div>
      <h1>Detalhes do material</h1>

      <p>Material ID: {materialId}</p>
      <p>Fornecedor ID: {supplierId}</p>
    </div>
  )
}