"use client"

import FormMarca from "@/components/cadastro/FormMarca"

export default function CadastroMarcaPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Cabeçalho da Página */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Cadastro de Marcas
        </h1>

        <p className="text-zinc-500 text-sm mt-1">
          Cadastre novas marcas para vinculação com os insumos hospitalares da plataforma.
        </p>
      </div>

      {/* Container do Formulário */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-sm">
        <FormMarca />
      </div>
    </div>
  )
}