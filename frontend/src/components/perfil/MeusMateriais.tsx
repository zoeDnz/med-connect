"use client"

import { useEffect, useState } from "react"
import servicesGetMeusMateriais from "@/server/(GET)-meus-materiais"
import { MatMed } from "@/types"

export default function MeusMateriais() {
  const [materiais, setMateriais] =
    useState<MatMed[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    async function carregarMateriais() {
      const result =
        await servicesGetMeusMateriais()

      if (
        result &&
        typeof result === "object" &&
        !("isError" in result)
      ) {
        setMateriais(result)
      }

      setLoading(false)
    }

    carregarMateriais()
  }, [])

  if (loading) {
    return (
      <p className="text-zinc-500">
        Carregando materiais...
      </p>
    )
  }

  return (
    <>
      <h2 className="text-xl font-bold text-zinc-900 mb-6">
        Materiais Cadastrados
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {materiais.map((material) => (
          <div
            key={material.cd_mat}
            className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow"
          >
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
              Material
            </span>

            <h3 className="font-bold text-zinc-900 mt-1">
              {material.ds_mat}
            </h3>

            <p className="text-sm text-zinc-500 mt-2">
              Código: {material.cd_mat}
            </p>

            <button className="w-full mt-4 py-2 text-sm font-semibold border border-zinc-200 rounded-lg hover:bg-zinc-50">
              Visualizar
            </button>
          </div>
        ))}
      </div>
    </>
  )
}