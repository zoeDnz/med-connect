"use client"

import { useState } from "react"
import { Tag, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import InputField from "./InputField" 
import servicesCreateMarca from "@/server/(POST)-marcas"

export default function FormMarca() {
  const router = useRouter()
  const [dsMarca, setDsMarca] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    
    if (!dsMarca.trim()) {
      setError("O nome da marca não pode estar vazio.")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    const response = await servicesCreateMarca({ 
      ds_marca: dsMarca 
    })

    setLoading(false)


    if (response && "isError" in response) {
      if ("status" in response && response.status === 401) {
        setError("Sessão expirada. Por favor, faça login novamente.")
      } else {
        setError("Erro ao cadastrar a marca. Tente novamente mais tarde.")
      }
      return
    }


    setSuccess(true)
    setDsMarca("")
    
    setTimeout(() => {
      router.refresh()
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* alertas feedback pro usuario*/}
      {error && (
        <div className="flex items-center gap-2 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-zinc-800 dark:text-red-400 border border-red-200 dark:border-red-900">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-zinc-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Marca cadastrada com sucesso!</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <InputField
          label="Nome da Marca"
          icon={Tag}
          placeholder="Ex: Descarpack, Riohex, BD..."
          value={dsMarca}
          onChange={(event) => setDsMarca(event.target.value)}
          disabled={loading}
          required
        />
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => router.back()}
          className="hover:cursor-pointer px-5 py-2.5 rounded-lg text-sm font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all disabled:opacity-50"
          disabled={loading}
        >
          Voltar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="hover:cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-sky-800 text-zinc-50 hover:bg-sky-700 active:scale-95 shadow-sm transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Cadastrando...
            </>
          ) : (
            "Cadastrar Marca"
          )}
        </button>
      </div>
    </form>
  )
}