"use client"
import React from "react"
import { useParams, useRouter } from "next/navigation"

export default function MaterialDetails() {
  const params = useParams()
  const router = useRouter()

  const materialId = params?.materialId

  // (Conectar com a API para buscar os detalhes do material usando o materialId)
  const material = {
    cd_mat: materialId,
    ds_mat: "Material exemplo",
    ds_marca: "Marca exemplo",
    ds_tipo: "Tipo exemplo",
    ds_pessoaj: "Fornecedor exemplo",
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Detalhes do Material
      </h1>

      <div className="bg-gray-100 p-4 rounded-md space-y-2">
        <p>
          <strong>ID:</strong> {material.cd_mat ?? "Carregando..."}
        </p>

        <p>
          <strong>Material:</strong>{" "}
          {material.ds_mat ?? "Carregando..."}
        </p>

        <p>
          <strong>Marca:</strong>{" "}
          {material.ds_marca ?? "Carregando..."}
        </p>

        <p>
          <strong>Tipo:</strong>{" "}
          {material.ds_tipo ?? "Carregando..."}
        </p>

        <p>
          <strong>Fornecedor:</strong>{" "}
          {material.ds_pessoaj ?? "Carregando..."}
        </p>
        <p>
          <strong>Descrição:</strong>{" "}
        </p>
      </div>
      <button
          onClick={() => router.back()}
        >
          Voltar
        </button>
    </div>
  )
}