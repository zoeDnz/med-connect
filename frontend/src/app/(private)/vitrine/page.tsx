"use client"

import React, { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import servicesGetAnuncios from "@/server/(GET)-anuncios"
import servicesGetMaterials from "@/server/(GET)-materials-and-brands" 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronRight, PackageX, ShoppingCart } from "lucide-react"
import { Anuncio, MatMed } from "@/types"
import { useRouter } from "next/navigation"

export default function Anuncios() {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([])
  const [materiais, setMateriais] = useState<MatMed[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const [anunciosResult, materiaisResult] = await Promise.all([
        servicesGetAnuncios(0),
        servicesGetMaterials(),
      ])

      if (Array.isArray(anunciosResult)) setAnuncios(anunciosResult)
      if (Array.isArray(materiaisResult)) setMateriais(materiaisResult)

      setLoading(false)
    }

    load()
  }, [])

  // Mapa cd_mat → ds_mat para lookup O(1)
  const materiaisMap = useMemo(() => {
    return new Map(materiais.map((m) => [m.cd_mat, m.ds_mat]))
  }, [materiais])

  const filteredAnuncios = useMemo(() => {
    const term = search.toLowerCase()
    return anuncios.filter((a) => {
      const nome = materiaisMap.get(a.cd_mat)?.toLowerCase() ?? ""
      return (
        a.nr_anuncio?.toString().includes(term) ||
        nome.includes(term)
      )
    })
  }, [anuncios, materiaisMap, search])

  if (loading) {
    return <p className="text-zinc-500">Carregando anúncios...</p>
  }

  return (
    <div className="min-h-screen bg-slate-50 w-full selection:bg-cyan-500/20">
      <div className="w-full max-w-7xl mx-auto py-12 px-6 lg:px-8">

        {/* Cabeçalho e Pesquisa */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Catálogo</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Catálogo completo de anúncios de medicamentos e produtos hospitalares disponíveis para compra!
            </p>
          </div>
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-cyan-900 transition-colors duration-300" />
            <Input
              placeholder="Buscar anúncio por id ou nome do material..."
              className="pl-11 h-12 bg-slate-50 border-slate-200 focus-visible:ring-2 focus-visible:ring-cyan-500/30 focus-visible:border-cyan-900 text-slate-800 placeholder:text-slate-400 rounded-xl shadow-inner transition-all duration-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredAnuncios.length > 0 ? (
            filteredAnuncios.map((anuncio) => {
              const nomeMaterial = materiaisMap.get(anuncio.cd_mat) ?? "Material não identificado"

              return (
                <Card
                  key={anuncio.nr_anuncio}
                  className="group flex flex-col bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-cyan-500/4 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="h-1 w-full bg-cyan-700" />

                  <CardHeader className="p-4 pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-700">
                        Anúncio #{anuncio.nr_anuncio}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Disponível
                      </span>
                    </div>

                    {/* Nome do material em destaque */}
                    <CardTitle className="text-base font-bold text-slate-800 leading-snug line-clamp-2 min-h-[2.75rem] group-hover:text-cyan-700 transition-colors duration-300">
                      {nomeMaterial}
                    </CardTitle>
                  </CardHeader>

                  <div className="h-px bg-slate-100 mx-4" />

                  <CardContent className="p-4 pb-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                      Valor base
                    </p>
                    <p className="text-2xl font-black text-slate-800 tracking-tight">
                      R$ {(anuncio as any).val_base}
                    </p>
                  </CardContent>

                  <div className="h-px bg-slate-100 mx-4" />

                  <CardContent className="p-4 pt-3 flex gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Quantidade</p>
                      <p className="text-sm font-semibold text-slate-700 mt-0.5">{anuncio.qtd_mat} un.</p>
                    </div>
                    <div className="w-px bg-slate-100" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</p>
                      <p className="text-sm font-semibold text-slate-700 mt-0.5">
                        {anuncio.ie_status === "A" ? "Ativo" : anuncio.ie_status === "F" ? "Finalizado" : "Inativo"}
                      </p>
                    </div>
                  </CardContent>

                  <div className="h-px bg-slate-100 mx-4" />

                  <CardFooter className="p-4 mt-auto">
                    <Button
                      onClick={() => router.push(`/anuncio/${anuncio.nr_anuncio}`)}
                      className="w-full bg-cyan-700 hover:bg-cyan-900 text-white font-semibold rounded-xl h-11 transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-sm active:scale-[0.98]"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Ver oferta
                      <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              )
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-slate-200/60 shadow-sm">
              <div className="p-4 bg-slate-50 rounded-full mb-4">
                <PackageX className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Nenhum anúncio encontrado</h3>
              <p className="text-slate-500 max-w-sm mt-2 text-sm">
                Não conseguimos encontrar nenhum resultado para{" "}
                <span className="font-semibold text-slate-700">"{search}"</span>. Tente refinar sua busca.
              </p>
              {search && (
                <Button
                  variant="link"
                  onClick={() => setSearch("")}
                  className="mt-4 text-cyan-600 p-0 h-auto font-semibold"
                >
                  Limpar filtro de busca
                </Button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}