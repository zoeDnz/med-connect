"use client"
import { Edit, Mail, MapPin, Phone, Package, ExternalLink } from "lucide-react"

export default function PerfilPage() {
  const anuncios = [1, 2, 3]; // Simulação de dados

  return (
    <div className="max-w-5xl mx-auto py-8">
      {/* Header do Perfil */}
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm mb-8">
        <div className="flex items-start justify-between">
          <div className="flex gap-6">
            <div className="w-24 h-24 bg-sky-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center font-bold text-2xl text-sky-950 dark:text-sky-400">US</div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">UBS Exemplo</h1>
              <span className="inline-block px-2 py-0.5 mt-1 bg-green-50 text-green-700 text-xs font-semibold rounded-md border border-green-200">Empresa Verificada</span>
              <div className="mt-4 space-y-1 text-sm text-zinc-500">
                <p className="flex items-center gap-2"><MapPin size={14} /> Av. Faria Lima, 3000 - SP</p>
                <p className="flex items-center gap-2"><Mail size={14} /> comercial@techcorp.com</p>
                <p className="flex items-center gap-2"><Phone size={14} /> (11) 4002-8922</p>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-sky-950 transition-colors">
            <Edit size={16} /> Editar
          </button>
        </div>
      </div>

      {/* Lista de Anúncios */}
      <h2 className="text-xl font-bold text-zinc-900 mb-6">Gerenciar Meus Anúncios</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {anuncios.map((i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">Medicamento</span>
            <h3 className="font-bold text-zinc-900 mt-1">Lote de Medicamentos #{1000 + i}</h3>
            <p className="text-sm text-zinc-500 mt-2">Quantidade: 39</p>
            <p className="text-xl font-bold text-zinc-950 mt-1">R$ 1.423,51</p>
            <button className="w-full mt-4 py-2 text-sm font-semibold border border-zinc-200 rounded-lg hover:bg-zinc-50 flex items-center justify-center gap-2">
              <ExternalLink size={14} /> Abrir
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}