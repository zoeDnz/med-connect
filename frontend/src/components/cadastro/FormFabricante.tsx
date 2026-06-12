"use client"

import { useState, type FormEvent } from "react"
import { Factory, Building2, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

import InputField from "./InputField"

import { CreateFabricanteForm } from "@/types"

import servicesCreateFabricante from "@/server/(POST)-fabricante"

export default function FormFabricante() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [fabricanteForm, setFabricanteForm] = useState<CreateFabricanteForm>({
    ds_fabricante: "",
    cnpj_fabri: "",
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!fabricanteForm.ds_fabricante.trim()) {
      setError("O nome do fabricante não pode estar vazio.")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    const response = await servicesCreateFabricante(fabricanteForm)

    setLoading(false)

    if (response && "isError" in response) {
      if ("status" in response && response.status === 401) {
        setError("Sessão expirada. Por favor, faça login novamente.")
      } else {
        setError("Erro ao cadastrar o fabricante. Tente novamente mais tarde.")
      }
      return
    }

    setSuccess(true)
    
    setFabricanteForm({
      ds_fabricante: "",
      cnpj_fabri: "",
    })

    setTimeout(() => {
      router.refresh()
    }, 2000)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold flex items-center gap-2 text-sky-800">
        <Factory className="text-sky-800" />
        Cadastrar Fabricante
      </h2>

      {/*  alertas feedback pro usuarioo */}
      {error && (
        <div className="flex items-center gap-2 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-zinc-800 dark:text-red-400 border border-red-200 dark:border-red-900">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-zinc-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Fabricante cadastrado com sucesso!</span>
        </div>
      )}

      <InputField
        label="Nome do Fabricante"
        icon={Factory}
        placeholder="Ex: Medtronic"
        value={fabricanteForm.ds_fabricante}
        onChange={(event) =>
          setFabricanteForm((prev) => ({
            ...prev,
            ds_fabricante: event.target.value,
          }))
        }
        disabled={loading}
        required
      />

      <InputField
        label="CNPJ"
        icon={Building2}
        placeholder="00.000.000/0001-00"
        value={fabricanteForm.cnpj_fabri}
        onChange={(event) =>
          setFabricanteForm((prev) => ({
            ...prev,
            cnpj_fabri: event.target.value,
          }))
        }
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-sky-950 hover:bg-sky-900 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Salvando Fabricante...
          </>
        ) : (
          "Salvar Fabricante"
        )}
      </button>
    </form>
  )
}