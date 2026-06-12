"use client"

import { useEffect, useState } from "react"
import { Package, Tag, Hash, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import InputField from "./InputField"

import {
  CreateMatMedForm,
  Marca,
  TipoMatMed,
} from "@/types"

import servicesGetCategorias from "@/server/(GET)-categorias"
import servicesGetMarcas from "@/server/(GET)-marcas"
import servicesCreateMatMed from "@/server/(POST)-mat-med"

export default function FormInsumo() {
  const router = useRouter()
  const [categories, setCategories] = useState<TipoMatMed[]>([])
  const [brands, setBrands] = useState<Marca[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [insumoForm, setInsumoForm] = useState<CreateMatMedForm>({
    ds_mat: "",
    ds_marca: 0,
    ds_tipo: "" as any,
    ds_pessoaj: 0,

    cd_tiss: "",
    cd_tuss: "",
    cd_simpro: "",
    cd_brasindice: "",
  })

  useEffect(() => {
    async function initialize() {
      const [responseCategory, responseBrand] =
        await Promise.all([
          servicesGetCategorias(),
          servicesGetMarcas(),
        ])

      if (responseCategory && !("isError" in responseCategory)) {
        setCategories(responseCategory)
      }

      if (responseBrand && !("isError" in responseBrand)) {
        setBrands(responseBrand)
      }
    }

    initialize()

    const userId = Number(localStorage.getItem("userId") || 0)

    setInsumoForm((prev) => ({
      ...prev,
      ds_pessoaj: userId,
    }))
  }, [])

  
  const categoriaSelecionada = categories.find(
    (c) => String(c.cd_tipo) === String(insumoForm.ds_tipo)
  )

  const marcaSelecionada = brands.find(
    (b) => String(b.cd_marca) === String(insumoForm.ds_marca)
  )

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!insumoForm.ds_mat.trim()) {
      setError("O nome do insumo não pode estar vazio.")
      return
    }

    if (!insumoForm.ds_tipo || String(insumoForm.ds_tipo).trim() === "") {
      setError("Por favor, selecione uma categoria válida.")
      return
    }

    if (!insumoForm.ds_marca) {
      setError("Por favor, selecione uma marca válida.")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    const response = await servicesCreateMatMed(insumoForm)

    setLoading(false)

    if (response && "isError" in response && (response as any).isError !== false) {
      setError((response as any).message || "Erro ao cadastrar o insumo. Verifique os dados.")
      return
    }

    setSuccess(true)
    
    // Limpa o formulário mantendo o ID do usuário ativo
    const userId = Number(localStorage.getItem("userId") || 0)
    setInsumoForm({
      ds_mat: "",
      ds_marca: 0,
      ds_tipo: "" as any,
      ds_pessoaj: userId,
      cd_tiss: "",
      cd_tuss: "",
      cd_simpro: "",
      cd_brasindice: "",
    })

    setTimeout(() => {
      router.refresh()
    }, 2000)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold flex items-center gap-2 text-sky-800">
        <Package className="text-sky-800" />
        Cadastrar Insumo
      </h2>

      {/*  alertas feedback pro usuario */}
      {error && (
        <div className="flex items-center gap-2 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-zinc-800 dark:text-red-400 border border-red-200 dark:border-red-900">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-zinc-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Insumo cadastrado com sucesso!</span>
        </div>
      )}

      <InputField
        label="Nome do Insumo"
        icon={Tag}
        placeholder="Ex: Seringa 5ml"
        value={insumoForm.ds_mat}
        onChange={(event) =>
          setInsumoForm((prev) => ({
            ...prev,
            ds_mat: event.target.value,
          }))
        }
        disabled={loading}
        required
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Categoria
        </label>

        <Select
          value={insumoForm.ds_tipo ? String(insumoForm.ds_tipo) : ""}
          onValueChange={(value) =>
            setInsumoForm((prev) => ({
              ...prev,
              ds_tipo: value as any,
            }))
          }
          disabled={loading || categories.length === 0}
        >
          <SelectTrigger className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm">
            <SelectValue placeholder="Selecione uma categoria">
              {categoriaSelecionada ? categoriaSelecionada.ds_tipo : undefined}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {categories.map((categoria) => (
              <SelectItem
                key={categoria.cd_tipo}
                value={String(categoria.cd_tipo)}
              >
                {categoria.ds_tipo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Marca
          </label>

          <Select
            value={insumoForm.ds_marca ? String(insumoForm.ds_marca) : ""}
            onValueChange={(value) =>
              setInsumoForm((prev) => ({
                ...prev,
                ds_marca: Number(value),
              }))
            }
            disabled={loading || brands.length === 0}
          >
            <SelectTrigger className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm">
              <SelectValue placeholder="Selecione uma marca">
                {marcaSelecionada ? marcaSelecionada.ds_marca : undefined}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Marcas</SelectLabel>
                {brands.map((marca) => (
                  <SelectItem
                    key={marca.cd_marca}
                    value={String(marca.cd_marca)}
                  >
                    {marca.ds_marca}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Código TISS"
          icon={Hash}
          placeholder="Ex: 19"
          value={insumoForm.cd_tiss || ""}
          onChange={(event) =>
            setInsumoForm((prev) => ({
              ...prev,
              cd_tiss: event.target.value,
            }))
          }
          disabled={loading}
        />

        <InputField
          label="Código TUSS"
          icon={Hash}
          placeholder="Ex: 70908788"
          value={insumoForm.cd_tuss || ""}
          onChange={(event) =>
            setInsumoForm((prev) => ({
              ...prev,
              cd_tuss: event.target.value,
            }))
          }
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Código SIMPRO"
          icon={Hash}
          placeholder="Ex: 1197898"
          value={insumoForm.cd_simpro || ""}
          onChange={(event) =>
            setInsumoForm((prev) => ({
              ...prev,
              cd_simpro: event.target.value,
            }))
          }
          disabled={loading}
        />

        <InputField
          label="Código Brasíndice"
          icon={Hash}
          placeholder="Ex: 41723412ERRU"
          value={insumoForm.cd_brasindice || ""}
          onChange={(event) =>
            setInsumoForm((prev) => ({
              ...prev,
              cd_brasindice: event.target.value,
            }))
          }
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-sky-950 hover:bg-sky-900 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Salvando Insumo...
          </>
        ) : (
          "Salvar Insumo"
        )}
      </button>
    </form>
  )
}