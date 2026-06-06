"use client"

import React, { useEffect, useState } from "react"
import servicesGetMeusAnuncios from "@/server/(GET)-meus-anuncios"
import servicesUpdateAnuncio from "@/server/(PUT)-anuncio"
import { Anuncio } from "@/types"

export default function PropostasPage() {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([])
  const [loading, setLoading] = useState(true)

  async function carregarPropostas() {
    setLoading(true)

    const result = await servicesGetMeusAnuncios()

    if (Array.isArray(result)) {
      setAnuncios(
        result.filter(
          (anuncio) => anuncio.ie_status === "N"
        )
      )
    }

    setLoading(false)
  }

  useEffect(() => {
    carregarPropostas()
  }, [])

  async function aceitarProposta(anuncio: Anuncio) {
    const result = await servicesUpdateAnuncio(
      anuncio.nr_anuncio,
      {
        ie_status: "F",
      }
    )

    if (!(result as any)?.isError) {
      carregarPropostas()
    }
  }

  async function recusarProposta(anuncio: Anuncio) {
    const result = await servicesUpdateAnuncio(
      anuncio.nr_anuncio,
      {
        ie_status: "A",
      }
    )

    if (!(result as any)?.isError) {
      carregarPropostas()
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-zinc-900 mb-8">
        Caixa de Propostas
      </h1>

      {loading ? (
        <p className="text-zinc-500">
          Carregando propostas...
        </p>
      ) : anuncios.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-10 text-center">
          <p className="text-zinc-500">
            Nenhuma proposta pendente.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {anuncios.map((anuncio) => (
            <div
              key={anuncio.nr_anuncio}
              className="bg-white border border-zinc-200 p-6 rounded-2xl flex items-center justify-between shadow-sm border-l-4 border-l-blue-600"
            >
              <div>
                <h3 className="font-bold text-lg text-zinc-900">
                  Anúncio #{anuncio.nr_anuncio}
                </h3>

                <p className="text-sm text-zinc-500 mb-3">
                  Comprador #{anuncio.cd_pessoa_compradora} |
                  {" "}Qtd: {anuncio.qtd_mat}
                </p>

                <p className="text-sm text-zinc-400 line-through">
                  {Number(anuncio.val_base).toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}
                </p>

                <p className="text-green-600 font-bold text-lg">
                  Oferta:{" "}
                  {Number(anuncio.val_proposta).toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() =>
                    aceitarProposta(anuncio)
                  }
                  className="px-6 py-2.5 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
                >
                  Aceitar Proposta
                </button>

                <button
                  onClick={() =>
                    recusarProposta(anuncio)
                  }
                  className="px-6 py-2.5 border border-zinc-300 text-zinc-600 font-bold rounded-lg hover:bg-zinc-50 transition-colors"
                >
                  Recusar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}