  "use client"

  import React, { useState } from "react"
  import { Package, Layers, Save, AlertCircle, Calendar, Tag, Building2, Hash } from "lucide-react"

  export default function CadastroPage() {
    const [activeTab, setActiveTab] = useState<'insumo' | 'lote'>('insumo')

    // Componente de Input Padronizado para reuso
    const InputField = ({ label, icon: Icon, ...props }: any) => (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{label}</label>
        <div className="relative">
          <div className="absolute left-3 top-2.5 text-zinc-400">
            <Icon size={16} />
          </div>
          <input 
            {...props}
            className="w-full pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-sm"
          />
        </div>
      </div>
    )

    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Cadastro de Insumos e Lotes</h1>
          <p className="text-zinc-500 text-sm mt-1">Cadastre novos insumos ou registre entradas de novos lotes.</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl w-fit mb-6">
          <button
            onClick={() => setActiveTab('insumo')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'insumo' ? "bg-white dark:bg-zinc-700 text-sky-950 dark:text-white shadow-sm" : "text-zinc-500"} hover: cursor-pointer`}
          >
            <Package size={16} /> Insumo
          </button>
          <button
            onClick={() => setActiveTab('lote')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'lote' ? "bg-white dark:bg-zinc-700 text-sky-950 dark:text-white shadow-sm" : "text-zinc-500"} hover: cursor-pointer`}
          >
            <Layers size={16} /> Lote
          </button>
        </div>

        {/* Formulários */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-sm">
          
          {activeTab === 'insumo' ? (
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <h2 className="text-lg font-bold flex items-center gap-2 text-zinc-800 dark:text-zinc-100"><Package className="text-cyan-600" /> Cadastrar Insumo</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Nome do Insumo" icon={Tag} placeholder="Ex: Seringa 5ml" />
                <InputField label="Categoria" icon={Layers} placeholder="Ex: Equipamento Médico" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Descrição Detalhada</label>
                <textarea className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none h-24 text-sm" placeholder="Descreva as especificações do insumo..." />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <InputField label="Unidade de Medida" icon={AlertCircle} placeholder="Ex: Unidade / CX" />
                <InputField label="Estoque Mínimo" icon={Hash} type="number" placeholder="0" />
              </div>

              <button className="w-full bg-sky-950 hover:bg-sky-900 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors hover: cursor-pointer">
              Salvar Insumo
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <h2 className="text-lg font-bold flex items-center gap-2 text-zinc-800 dark:text-zinc-100"><Layers className="text-cyan-600" /> Cadastrar Lote</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Insumo Vinculado" icon={Package} placeholder="Selecione o insumo..." />
                <InputField label="Número do Lote" icon={Hash} placeholder="Ex: LOT-2026-001" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Data de Fabricação" icon={Calendar} type="date" />
                <InputField label="Data de Validade" icon={Calendar} type="date" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Fornecedor" icon={Building2} placeholder="Nome do fornecedor" />
                <InputField label="Quantidade Inicial" icon={Hash} type="number" placeholder="0" />
              </div>

              <button className="w-full bg-sky-950 hover:bg-sky-900 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors hover: cursor-pointer">
                Registrar Lote
              </button>
            </form>
          )}
        </div>
      </div>
    )
  }