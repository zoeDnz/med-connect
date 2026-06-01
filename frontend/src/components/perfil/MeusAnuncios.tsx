"use client"

import React, { useEffect, useState, useMemo } from "react"
import servicesGetMeusAnuncios from "@/server/(GET)-meus-anuncios"
import { Anuncio } from "@/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ExternalLink, PackageX } from "lucide-react"
import { useRouter } from "next/navigation"

export default function MeusAnuncios() {
  const router = useRouter()

  const [anuncios, setAnuncios] = useState<Anuncio[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const result = await servicesGetMeusAnuncios()

      console.log("RESULT ANUNCIOS:", result)

      if (Array.isArray(result)) {
        setAnuncios(result)
      }

      setLoading(false)
    }

    load()
  }, [])

  const filteredAnuncios = useMemo(() => {
    return anuncios.filter((a) =>
      a.nr_anuncio?.toString().includes(search.toLowerCase())
    )
  }, [anuncios, search])

  if (loading) {
    return <p className="text-zinc-500">Carregando anúncios...</p>
  }

  return (
    <div className="min-h-screen bg-slate-50 w-full">

      {/* Cabeçalho e Pesquisa */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60 transition-all duration-300">

          {/* Input de Busca com Micro-interação */}
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-cyan-900 transition-colors duration-300" />
              <Input
                placeholder="Buscar anúncio por id..." // ideia: permitir busca por descrição também, mas isso exigiria mudar o backend para retornar a descrição do material junto com o anúncio
                className="pl-11 h-12 bg-slate-50 border-slate-200 focus-visible:ring-2 focus-visible:ring-cyan-500/30 focus-visible:border-cyan-900 text-slate-800 placeholder:text-slate-400 rounded-xl shadow-inner transition-all duration-300"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredAnuncios.length > 0 ? (
          filteredAnuncios.map((anuncio) => (
            <div
              key={anuncio.nr_anuncio}
              className="bg-white p-6 rounded-xl border shadow-sm"
            >
              <span className="text-xs font-bold text-sky-600">
                ANÚNCIO
              </span>

              <h3 className="font-bold mt-2">
                #{anuncio.nr_anuncio}
              </h3>

              <p className="text-sm text-zinc-500 mt-2">
                Quantidade: {anuncio.qtd_mat}
              </p>

              <p className="text-lg font-bold mt-2">
                R$ {(anuncio as any).val_base}
              </p>

              <button
                onClick={() =>
                  router.push(`/anuncio/${anuncio.nr_anuncio}`)
                }
                className="w-full mt-4 py-2 border rounded-lg flex items-center justify-center gap-2"
              >
                <ExternalLink size={14} />
                Abrir
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <PackageX className="mx-auto mb-4 text-slate-400" />
            <p className="text-slate-500">
              Nenhum anúncio encontrado
            </p>
          </div>
        )}
      </div>
    </div>
  )
}