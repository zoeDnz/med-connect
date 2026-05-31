"use client"

import { ExternalLink } from "lucide-react"

export default function MeusAnuncios() {
  const anuncios = [1, 2, 3]

  return (
    <>
      <h2 className="text-xl font-bold text-zinc-900 mb-6">
        Gerenciar Meus Anúncios
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {anuncios.map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow"
          >
            <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">
              Medicamento
            </span>

            <h3 className="font-bold text-zinc-900 mt-1">
              Lote de Medicamentos #{1000 + i}
            </h3>

            <p className="text-sm text-zinc-500 mt-2">
              Quantidade: 39
            </p>

            <p className="text-xl font-bold text-zinc-950 mt-1">
              R$ 1.423,51
            </p>

            <button className="w-full mt-4 py-2 text-sm font-semibold border border-zinc-200 rounded-lg hover:bg-zinc-50 flex items-center justify-center gap-2">
              <ExternalLink size={14} />
              Abrir
            </button>
          </div>
        ))}
      </div>
    </>
  )
}