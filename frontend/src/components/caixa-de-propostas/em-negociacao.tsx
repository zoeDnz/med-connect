"use client"

import React, { useEffect, useState, useMemo } from "react"
import { Package, Calendar, Inbox, Loader2 } from "lucide-react"
import servicesGetMeusAnuncios from "@/server/(GET)-meus-anuncios"
import servicesGetMeusMaaterials from "@/server/(GET)-meus-materiais"
import servicesUpdateAnuncio from "@/server/(PUT)-anuncio"
import { Anuncio, MatMed } from "@/types"
import { CheckCircle2, Mail, Building2 } from "lucide-react"

export function NegociacaoTab() {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([])
  const [materiais, setMateriais] = useState<MatMed[]>([])
  const [loading, setLoading] = useState(true)
  const [empresaContato, setEmpresaContato] = useState<any>(null)
  const [modoContato, setModoContato] = useState(false)
  const [anuncioAceito, setAnuncioAceito] = useState<number | null>(null) // ← novo

  useEffect(() => {
    async function load() {
      const [anunciosResult, materiaisResult] = await Promise.all([
        servicesGetMeusAnuncios(),
        servicesGetMeusMaaterials(),
      ])

      const listaAnuncios = Array.isArray(anunciosResult)
        ? anunciosResult
        : (anunciosResult as any)?.data || []

      const listaMateriais = Array.isArray(materiaisResult)
        ? materiaisResult
        : (materiaisResult as any)?.data || []

      setAnuncios(listaAnuncios)
      setMateriais(listaMateriais)
      setLoading(false)
    }

    load()
  }, [])

  const materiaisMap = useMemo(() => {
    return new Map(materiais.map((m) => [m.cd_mat, m.ds_mat]))
  }, [materiais])

  const itensFiltrados = useMemo(() => {
    return anuncios.filter((a) => a.ie_status === "N")
  }, [anuncios])

  async function aceitarProposta(anuncio: Anuncio) {
    const result = await servicesUpdateAnuncio(anuncio.nr_anuncio, {
      ie_status: "F",
    })

    if ((result as any)?.isError) return

    const dados = (result as any)?.data ?? result
    const contato = dados?.contato ?? null

    const normalizedContato = contato
      ? {
          nome: contato.nome ?? "—",
          email: contato.email ?? "—",
        }
      : null

    // Salva contato da compradora no localStorage da vendedora
    if (normalizedContato) {
      const chave = "contatos_negociacao"
      const existentes = JSON.parse(localStorage.getItem(chave) || "[]")
      const jaExiste = existentes.some((c: any) => c.nr_anuncio === anuncio.nr_anuncio)
      if (!jaExiste) {
        existentes.push({
          nr_anuncio: anuncio.nr_anuncio,
          cd_mat: anuncio.cd_mat,
          data: new Date().toLocaleDateString("pt-BR"),
          ...normalizedContato,
        })
        localStorage.setItem(chave, JSON.stringify(existentes))
      }
    }

    // Guarda o nr do anúncio aceito, abre o modal ANTES de remover da lista
    setAnuncioAceito(anuncio.nr_anuncio)
    setEmpresaContato(normalizedContato)
    setModoContato(true)
    // ← setAnuncios foi movido para o fechamento do modal
  }

  async function recusarProposta(anuncio: Anuncio) {
    const result = await servicesUpdateAnuncio(anuncio.nr_anuncio, {
      ie_status: "A",
    })

    if (!(result as any)?.isError) {
      setAnuncios((prev) =>
        prev.map((a) =>
          a.nr_anuncio === anuncio.nr_anuncio ? { ...a, ie_status: "A" } : a
        )
      )
    }
  }

  function fecharModal() {
    // Atualiza a lista só depois que o modal fecha
    setAnuncios((prev) =>
      prev.map((a) =>
        a.nr_anuncio === anuncioAceito ? { ...a, ie_status: "F" } : a
      )
    )
    setModoContato(false)
    setEmpresaContato(null)
    setAnuncioAceito(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
      </div>
    )
  }

  if (itensFiltrados.length === 0) {
    return (
      <div className="bg-white border border-dashed border-zinc-300 p-12 rounded-2xl flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
          <Inbox className="w-8 h-8 text-zinc-400" />
        </div>
        <h3 className="font-bold text-lg text-zinc-800 mb-1">
          Nenhum registro encontrado
        </h3>
        <p className="text-zinc-500 text-sm max-w-sm">
          Ainda não existem negociações pendentes no seu histórico.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {itensFiltrados.map((anuncio) => {
        const nomeMaterial =
          materiaisMap.get(anuncio.cd_mat) ?? "Material não identificado"

        const valorExibido = anuncio.val_proposta || anuncio.val_base

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
                <span className="text-[11px] font-bold uppercase tracking-widest text-sky-700 block mb-1">
                  Anúncio #{anuncio.nr_anuncio}
                </span>

                <h3 className="font-bold text-lg text-zinc-800 leading-tight">
                  {nomeMaterial}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 mt-2">
                  <span className="flex items-center gap-1.5 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-100">
                    <span className="font-semibold text-zinc-700">Qtd:</span>{" "}
                    {anuncio.qtd_mat}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-zinc-400" />{" "}
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

              <span className="px-3 py-1.5 text-xs font-bold rounded-full border tracking-wide shadow-sm bg-amber-50 text-amber-700 border-amber-200">
                EM NEGOCIAÇÃO
              </span>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => aceitarProposta(anuncio)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition"
                >
                  Aceitar
                </button>

                <button
                  onClick={() => recusarProposta(anuncio)}
                  className="px-4 py-2 bg-zinc-500 text-white rounded-lg font-semibold hover:bg-zinc-600 transition"
                >
                  Recusar
                </button>
              </div>
            </div>
          </div>
        )
      })}

      {/* MODAL DA VENDEDORA — exibe contato da compradora após aceitar */}
      {modoContato && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-[420px] overflow-hidden shadow-xl">

            <div className="bg-emerald-50 border-b border-emerald-100 px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-800">Proposta aceita com sucesso</p>
                <p className="text-xs text-emerald-600">Contato da empresa compradora liberado</p>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-zinc-100">
                <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-semibold text-sm shrink-0">
                  {empresaContato?.nome
                    ?.split(" ")
                    .slice(0, 2)
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase() ?? "—"}
                </div>
                <div>
                  <p className="font-semibold text-zinc-800 text-base leading-tight">
                    {empresaContato?.nome ?? "—"}
                  </p>
                  <span className="text-[11px] font-semibold bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md tracking-wide">
                    COMPRADORA
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { icon: <Mail className="w-4 h-4" />, label: "E-mail", value: empresaContato?.email },
                ].map(({ icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 bg-zinc-50 rounded-lg px-3 py-2.5"
                  >
                    <span className="text-zinc-400 shrink-0">{icon}</span>
                    <div>
                      <p className="text-[11px] text-zinc-400">{label}</p>
                      <p className="text-sm font-medium text-zinc-800">{value ?? "—"}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  className="flex-1 px-4 py-2.5 rounded-lg border border-zinc-200 text-sm font-medium text-zinc-500 hover:bg-zinc-50 transition"
                  onClick={fecharModal}
                >
                  Fechar
                </button>
                <button
                  className="flex-[2] px-4 py-2.5 rounded-lg bg-sky-50 border border-sky-100 text-sm font-medium text-sky-700 hover:bg-sky-100 transition flex items-center justify-center gap-2"
                  onClick={() => window.open(`mailto:${empresaContato?.email}`, "_blank")}
                >
                  <Mail className="w-4 h-4" />
                  Enviar e-mail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}