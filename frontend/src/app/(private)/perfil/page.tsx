"use client"

import servicesGetMinhaPessoaJuridica from "@/server/getMinhaPessoaJuridica"
import { PessoaJuridica } from "@/types"
import React, { useEffect, useState } from "react"
import {
  Edit,
  Mail,
  MapPin,
  Phone,
  Package,
  ExternalLink,
  Inbox,
} from "lucide-react"

export default function PerfilPage() {
  const anuncios = [1, 2, 3]

  const [empresa, setEmpresa] =
    useState<PessoaJuridica | null>(null)

  const [abaAtiva, setAbaAtiva] = useState<
    "anuncios" | "materiais"
  >("anuncios")

  useEffect(() => {
    async function carregarPerfil() {
      const result =
        await servicesGetMinhaPessoaJuridica()

      if (
        result &&
        typeof result === "object" &&
        !("isError" in result)
      ) {
        setEmpresa(result)
      }
    }

    carregarPerfil()
  }, [])

  return (
    <div className="max-w-5xl mx-auto py-8">

      {/* Header do Perfil */}
      <div>
        <div className="w-24 h-24 bg-sky-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center font-bold text-2xl text-sky-950    dark:text-sky-400">
          {empresa?.nm_pessoaj?.substring(0, 2).toUpperCase() ?? "PJ"}
        </div>

        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {empresa?.razao_social ?? "Carregando..."}
        </h1>

        <span className="inline-block px-2 py-0.5 mt-1 bg-green-50 text-green-700 text-xs font-semibold rounded-md border border-green-200">
          Empresa Verificada
        </span>

        <div className="mt-4 space-y-1 text-sm text-zinc-500">
          <p className="flex items-center gap-2">
            <Mail size={14} />
            {empresa?.email_pj}
          </p>

          <p className="flex items-center gap-2">
            <Phone size={14} />
            Responsável: {empresa?.resp_tec}
          </p>

          <p className="flex items-center gap-2">
            <MapPin size={14} />
            CNPJ: {empresa?.nr_cnpj}
          </p>
        </div>
      </div>

      {/* Navegação entre abas */}
      <div className="flex gap-2 mb-8 border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => setAbaAtiva("anuncios")}
          className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 ${
            abaAtiva === "anuncios"
              ? "border-sky-600 text-sky-600"
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Package size={16} className="inline mr-2" />
          Meus Anúncios
        </button>

        <button
          onClick={() => setAbaAtiva("materiais")}
          className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 ${
            abaAtiva === "materiais"
              ? "border-sky-600 text-sky-600"
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Inbox size={16} className="inline mr-2" />
          Materiais Cadastrados
        </button>
      </div>

      {/* Aba Meus Anúncios */}
      {abaAtiva === "anuncios" && (
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
      )}

      {/* Aba Materiais */}
      {abaAtiva === "materiais" && (
        <>
          <h2 className="text-xl font-bold text-zinc-900 mb-6">
            Materiais Cadastrados
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow"
              >
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                  Material
                </span>

                <h3 className="font-bold text-zinc-900 mt-1">
                  Caixa Térmica #{i}
                </h3>

                <p className="text-sm text-zinc-500 mt-2">
                  Disponível para negociação
                </p>

                <button className="w-full mt-4 py-2 text-sm font-semibold border border-zinc-200 rounded-lg hover:bg-zinc-50">
                  Visualizar
                </button>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  )
}