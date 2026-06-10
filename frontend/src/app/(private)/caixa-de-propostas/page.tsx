"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Handshake, History } from "lucide-react"
import { NegociacaoTab } from "@/components/caixa-de-propostas/em-negociacao"
import { PropostasTab } from "@/components/caixa-de-propostas/minhas-propostas"

const TABS = [
  { id: "negociacao", label: "Recebidas / Em Negociação", icon: Handshake },
  { id: "compras", label: "Minhas Propostas Enviadas", icon: History },
]

export default function CaixaDePropostasPage() {
  const searchParams = useSearchParams()

  // inicializa a aba ativa pelo query param ?tab=, padrão "negociacao"
  const [activeTab, setActiveTab] = useState<string>(
    searchParams.get("tab") ?? "negociacao"
  )

  // se o usuário navegar de volta com um ?tab diferente, sincroniza
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) setActiveTab(tab)
  }, [searchParams])

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 md:px-0 font-sans">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-sky-800">
          Caixa de Propostas
        </h1>
        <p className="text-zinc-700 mt-2">
          Acompanhe os pedidos recebidos em seus anúncios e as propostas enviadas para terceiros.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-8 border-b border-zinc-200 pb-5">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`hover:cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 border outline-none focus:ring-2 focus:ring-sky-500/20 ${
                isActive
                  ? "bg-sky-700 text-white border-sky-700 shadow-md shadow-sky-900/10"
                  : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-800"
              }`}
            >
              <Icon size={16} className={isActive ? "text-sky-100" : "text-zinc-400"} />
              {label}
            </button>
          )
        })}
      </div>

      <div className="mt-6">
        {activeTab === "negociacao" && <NegociacaoTab />}
        {activeTab === "compras" && <PropostasTab />}
      </div>

    </div>
  )
}