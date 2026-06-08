"use client"

import FormLote from "@/components/cadastro/FormLote"

export default function CadastroLotePage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Cadastro de Lotes
        </h1>

        <p className="text-zinc-500 text-sm mt-1">
          Registre entradas de novos lotes.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-sm">
        <FormLote />
      </div>
    </div>
  )
}