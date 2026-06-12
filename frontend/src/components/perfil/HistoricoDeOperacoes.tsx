"use client"

import React, { useEffect, useState, useMemo } from "react"
import {
  CheckCircle2,
  Megaphone,
  History,
  Package,
  Calendar,
  Inbox,
  Loader2,
} from "lucide-react"
import servicesGetMeusAnuncios from "@/server/(GET)-meus-anuncios"
import { Anuncio } from "@/types"
import servicesGetMinhasCompras from "@/server/(GET)-minhas-compras"

// Abas baseadas nos STATUS_CHOICES do model Django
const TABS = [
  {
    id: "ativos",
    label: "Anúncios ativos",
    icon: Megaphone,
    filter: (anuncio: Anuncio, cdPessoa: string | null) =>
      anuncio.ie_status === "A",
  },
  {
    id: "finalizados",
    label: "Anúncios Finalizados",
    icon: CheckCircle2,
    filter: (anuncio: Anuncio, cdPessoa: string | null) =>
      anuncio.ie_status === "F",
  },
  {
    id: "compras",
    label: "Minhas Negociações",
    icon: History,
    filter: () => true,
  },
  {
    id: "contatos",
    label: "Contatos Salvos",
    icon: History,
    filter: () => true,
  },
]



// Helpers de badge
function getStatusBadge(ie_status: 'A' | 'N' | 'F' | 'I') {
  switch (ie_status) {
    case "A":
      return { label: "ATIVO", className: "bg-sky-50 text-sky-700 border-sky-200" }
    case "F":
      return { label: "FINALIZADO", className: "bg-emerald-50 text-emerald-700 border-emerald-200" }
    case "N":
      return { label: "NEGOCIANDO", className: "bg-amber-50 text-amber-700 border-amber-200" }
    case "I":
      return { label: "INATIVO", className: "bg-zinc-100 text-zinc-600 border-zinc-200" }
    default:
      return { label: "DESCONHECIDO", className: "bg-zinc-100 text-zinc-600 border-zinc-200" }
  }
}

function ContatosSalvos() {
  const [contatos, setContatos] = useState<any[]>([])

  useEffect(() => {
    const salvos = JSON.parse(localStorage.getItem("contatos_negociacao") || "[]")
    setContatos(salvos)
  }, [])

  function remover(nr_anuncio: number) {
    const atualizados = contatos.filter((c) => c.nr_anuncio !== nr_anuncio)
    setContatos(atualizados)
    localStorage.setItem("contatos_negociacao", JSON.stringify(atualizados))
  }

  if (contatos.length === 0) return null

  return (
    <div className="mt-8">
      <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-3">
        Contatos liberados
      </h2>
      <div className="flex flex-col gap-3">
        {contatos.map((c) => (
          <div key={c.nr_anuncio} className="bg-white border border-zinc-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold text-sm shrink-0">
                {c.nome?.split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-zinc-800 text-sm">{c.nome}</p>
                <p className="text-xs text-zinc-400">Anúncio #{c.nr_anuncio} · {c.data}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 text-xs items-center">
              <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 bg-sky-50 text-sky-700 border border-sky-100 px-3 py-1.5 rounded-lg font-medium hover:bg-sky-100 transition">
                ✉ {c.email}
              </a>
              <button
                onClick={() => remover(c.nr_anuncio)}
                className="flex items-center gap-1.5 bg-red-50 text-red-500 border border-red-100 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 transition"
              >
                × Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HistoricoPage() {
  const [activeTab, setActiveTab] = useState<string>("ativos")
  const [anuncios, setAnuncios] = useState<Anuncio[]>([])
  const [compras, setCompras] = useState<Anuncio[]>([])
  const [search, setSearch] = useState<string>("")
  const [loading, setLoading] = useState(true)

  // Recupera o ID como string para a aba de compras
  const cdPessoa = useMemo(() => {
    if (typeof window === "undefined") return null
    return localStorage.getItem("cd_pessoa")
  }, [])

  useEffect(() => {
    async function load() {
      const [anunciosResult, comprasResult] = await Promise.all([
        servicesGetMeusAnuncios(),
        servicesGetMinhasCompras(),
      ])

      console.log("ANUNCIOS RESULT:", anunciosResult)
      console.log("COMPRAS RESULT:", comprasResult)
      console.log("É ARRAY?", Array.isArray(comprasResult))

      const listaAnuncios = Array.isArray(anunciosResult)
        ? anunciosResult
        : (anunciosResult as any)?.data

      const listaCompras = Array.isArray(comprasResult)
        ? comprasResult
        : (comprasResult as any)?.data

      if (Array.isArray(listaAnuncios))
        setAnuncios(listaAnuncios)

      if (Array.isArray(listaCompras)) {
        setCompras(listaCompras)

        // Verifica compras finalizadas e salva contato da vendedora
        const chave = "contatos_negociacao"
        const existentes: any[] = JSON.parse(localStorage.getItem(chave) || "[]")

        listaCompras
          .filter((c: Anuncio) => c.ie_status === "F")
          .forEach((c: Anuncio) => {
            const jaExiste = existentes.some((e) => e.nr_anuncio === c.nr_anuncio)
            if (!jaExiste && c.contato_vendedor) {
              existentes.push({
                nr_anuncio: c.nr_anuncio,
                cd_mat: c.cd_mat,
                data: new Date().toLocaleDateString("pt-BR"),
                nome: c.contato_vendedor.nome,
                email: c.contato_vendedor.email,
              })
            }
          })

        localStorage.setItem(chave, JSON.stringify(existentes))
      }
      
      setLoading(false)
    }

    load()
  }, [])

  // Filtra os itens a exibir com base na aba ativa e no cdPessoa para a aba de compras
  const itensFiltrados = useMemo(() => {
    if (activeTab === "compras") return compras
    if (activeTab === "contatos") return []   // ← aba não usa essa lista

    const tab = TABS.find((t) => t.id === activeTab)
    if (!tab) return []
    return anuncios.filter((a) => tab.filter(a, cdPessoa))
  }, [anuncios, compras, activeTab, cdPessoa])

  return (
    <div className="min-h-screen bg-slate-50 w-full selection:bg-cyan-500/20">
      {/* Navegação por Abas */}
      <div className="flex flex-wrap items-center gap-3 mb-8 border-b border-zinc-200 pb-5">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id

          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`hover:cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 border outline-none focus:ring-2 focus:ring-sky-500/20 ${
                isActive
                  ? "bg-sky-800 text-zinc-50 border-sky-700 shadow-md shadow-sky-900/10"
                  : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-800"
              }`}
            >
              <Icon size={16} className={isActive ? "text-sky-100" : "text-zinc-400"} />
              {label}
            </button>
          )
        })}
      </div>

      {/* Lista */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
          </div>
        ) : itensFiltrados.length === 0 && activeTab !== "contatos" ? (
          <div className="bg-white border border-dashed border-zinc-300 p-12 rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
              <Inbox className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="font-bold text-lg text-zinc-800 mb-1">Nenhum registro encontrado</h3>
            <p className="text-zinc-500 text-sm max-w-sm">
              Ainda não existem itens correspondentes a esta categoria no seu histórico.
            </p>
          </div>
        ) : (
          itensFiltrados.map((anuncio) => {
            const nomeMaterial =
              anuncio.material_nome ?? "Material não identificado"

            const badge = getStatusBadge(anuncio.ie_status)

            const valorExibido =
              anuncio.ie_status === "F" && anuncio.val_aceito
                ? anuncio.val_aceito
                : anuncio.ie_status === "N" && anuncio.val_proposta
                ? anuncio.val_proposta
                : anuncio.val_base

            console.log("ABA ATUAL:", activeTab)
            console.log("STATE COMPRAS:", compras)
            console.log("ITENS FILTRADOS:", itensFiltrados)

            return (
              <div
                key={anuncio.nr_anuncio}
                className="bg-white border border-zinc-200/80 p-5 md:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-sky-50 items-center justify-center shrink-0 border border-sky-100">
                    <Package className="w-6 h-6 text-sky-700" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-sky-700">
                        Anúncio #{anuncio.nr_anuncio}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-zinc-800 leading-tight">
                      {nomeMaterial}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 mt-2">
                      <span className="flex items-center gap-1.5 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-100">
                        <span className="font-semibold text-zinc-700">Qtd:</span>
                        {anuncio.qtd_mat}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-zinc-400" />
                        {anuncio.data_anuncio ?? "—"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-zinc-100 pt-4 md:pt-0 mt-2 md:mt-0">
                  <span className="text-emerald-600 font-extrabold text-xl">
                    {Number(valorExibido).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>

                  <span
                    className={`px-3 py-1.5 text-xs font-bold rounded-full border tracking-wide shadow-sm ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>
      {activeTab === "contatos" && <ContatosSalvos />}
    </div>
  )
}