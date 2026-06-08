"use client"

import { useState } from "react"
import { Package, Layers } from "lucide-react"

import FormInsumo from "@/components/cadastro/FormInsumo"
import FormLote from "@/components/cadastro/FormLote"
import FormFabricante from "@/components/cadastro/FormFabricante"

export default function CadastroPage() {
  const [activeTab, setActiveTab] = useState<"insumo" | "lote" | "fabricante">("insumo")

  return (
    <div className="max-w-4xl mx-auto py-8">

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Cadastro de Insumos, Lotes e Fabricantes
        </h1>

        <p className="text-zinc-500 text-sm mt-1">
          Cadastre novos insumos ou fabricantes e registre a entrada de novos lotes.
        </p>
      </div>

      <div className="flex items-center gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl w-fit mb-6">
        <button
          onClick={() => setActiveTab("insumo")}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "insumo"
              ? "bg-white dark:bg-zinc-700 text-sky-950 dark:text-white shadow-sm"
              : "text-zinc-500"
          }`}
        >
          <Package size={16} />
          Insumo
        </button>

        <button
          onClick={() => setActiveTab("lote")}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "lote"
              ? "bg-white dark:bg-zinc-700 text-sky-950 dark:text-white shadow-sm"
              : "text-zinc-500"
          }`}
        >
          <Layers size={16} />
          Lote
        </button>

        
        <button
          onClick={() => setActiveTab("fabricante")}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "fabricante"
              ? "bg-white dark:bg-zinc-700 text-sky-950 dark:text-white shadow-sm"
              : "text-zinc-500"
          }`}
        >
          <Layers size={16} />
          Fabricante
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-sm">
        {activeTab === "insumo" ? (
          <FormInsumo />
        ) : activeTab === "lote" ? (
          <FormLote />
        ) : (
          <FormFabricante />
        )}
      </div>

    </div>
  )
}