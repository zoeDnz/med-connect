"use client"

import React, { useState } from "react"
import { 
  CheckCircle2, 
  Handshake, 
  History, 
  Package, 
  Calendar, 
  Inbox
} from "lucide-react"

// 1. Tipagem TypeScript (Reflete seu Model do Django/PostgreSQL)
interface HistoricoItem {
  id: string
  titulo: string
  quantidade: number
  data: string
  valor: number
  statusId: 'propostas-aceitas' | 'anuncios-finalizados' | 'historico-ativos'
  statusLabel: string
}

// 2. Constante de Abas (Evita repetição e facilita manutenção)
const TABS = [
  { 
    id: 'propostas-aceitas', 
    label: 'Propostas Aceitas', 
    icon: Handshake 
  },
  { 
    id: 'anuncios-finalizados', 
    label: 'Anúncios Finalizados', 
    icon: CheckCircle2 
  },
  { 
    id: 'historico-ativos', 
    label: 'Histórico de Anúncios', 
    icon: History 
  },
]

// 3. Mock de Dados (Estrutura pronta para o Fetch do seu Backend)
const MOCK_DATA: HistoricoItem[] = [
  {
    id: "1",
    titulo: "Monitor Multiparamétrico",
    quantidade: 5,
    data: "20/05/2026",
    valor: 12500.00,
    statusId: 'propostas-aceitas',
    statusLabel: "PROPOSTA ACEITA"
  },
  {
    id: "2",
    titulo: "Lote Máscaras N95",
    quantidade: 1000,
    data: "15/05/2026",
    valor: 3200.00,
    statusId: 'anuncios-finalizados',
    statusLabel: "FINALIZADO"
  },
  {
    id: "3",
    titulo: "Equipamento Ultrassom",
    quantidade: 1,
    data: "10/04/2026",
    valor: 45000.00,
    statusId: 'historico-ativos',
    statusLabel: "INATIVO"
  }
]

export default function HistoricoPage() {
  const [activeTab, setActiveTab] = useState<string>('propostas-aceitas')

  // Filtra os itens com base na aba atualmente selecionada
  const itensFiltrados = MOCK_DATA.filter(item => item.statusId === activeTab)

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 md:px-0 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-zinc-800 tracking-tight">
          Histórico de Operações
        </h1>
        <p className="text-zinc-500 mt-2">
          Acompanhe suas negociações, propostas aceitas e anúncios finalizados.
        </p>
      </div>

      {/* Navegação por Abas (Tabs) */}
      <div className="flex flex-wrap items-center gap-3 mb-8 border-b border-zinc-200 pb-5">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id
          
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 border outline-none focus:ring-2 focus:ring-sky-500/20 ${
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

      {/* Lista de Histórico */}
      <div className="space-y-4">
        {itensFiltrados.length === 0 ? (
          // Empty State (Caso não haja dados na aba selecionada)
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
          // Renderização Dinâmica dos Cards
          itensFiltrados.map((item) => (
            <div 
              key={item.id} 
              className="bg-white border border-zinc-200/80 p-5 md:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="hidden md:flex w-12 h-12 rounded-full bg-sky-50 items-center justify-center shrink-0 border border-sky-100">
                  <Package className="w-6 h-6 text-sky-700" />
                </div>
                
                <div>
                  <h3 className="font-bold text-lg text-zinc-800 leading-tight">
                    {item.titulo}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 mt-2">
                    <span className="flex items-center gap-1.5 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-100">
                      <span className="font-semibold text-zinc-700">Qtd:</span> 
                      {item.quantidade}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-zinc-400" />
                      {item.data}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-zinc-100 pt-4 md:pt-0 mt-2 md:mt-0">
                <span className="text-emerald-600 font-extrabold text-xl">
                  {item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                
                {/* Badge Dinâmica baseada no Status */}
                <span className={`px-3 py-1.5 text-xs font-bold rounded-full border tracking-wide shadow-sm
                  ${item.statusId === 'propostas-aceitas' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                  ${item.statusId === 'anuncios-finalizados' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                  ${item.statusId === 'historico-ativos' ? 'bg-zinc-100 text-zinc-600 border-zinc-200' : ''}
                `}>
                  {item.statusLabel}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}