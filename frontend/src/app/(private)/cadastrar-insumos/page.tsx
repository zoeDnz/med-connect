"use client"

import React, { useEffect, useState } from "react"
import { Package, Layers, AlertCircle, Calendar, Tag, Building2, Hash } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CreateLoteForm,
  CreateMatMedForm,
  Fabricante,
  MatMed,
  Marca,
  TipoMatMed,
} from "@/types"
import servicesGetCategorias from "@/server/(GET)-categorias"
import servicesGetMarcas from "@/server/(GET)-marcas"
import servicesGetFabricantes from "@/server/(GET)-fabricantes"
import servicesGetMatMed from "@/server/(GET)-mat-med"
import servicesCreateMatMed from "@/server/(POST)-mat-med"
import servicesCreateLote from "@/server/(POST)-lote"

// Mover o componente para fora resolve o problema de renderização
const InputField = ({
  label,
  icon: Icon,
  ...props
}: {
  label: string
  icon: React.ElementType
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-zinc-700 ">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-2.5 text-zinc-400">
        <Icon size={16} />
      </div>
      <input
        {...props}
        className="w-full pl-9 pr-4 py-2 bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-sm"
      />
    </div>
  </div>
)

export default function CadastroPage() {
  const [activeTab, setActiveTab] = useState<"insumo" | "lote">("insumo")

  const [categories, setCategories] = useState<TipoMatMed[]>([])
  const [brands, setBrands] = useState<Marca[]>([])
  const [fabricantes, setFabricantes] = useState<Fabricante[]>([])
  const [materiais, setMateriais] = useState<MatMed[]>([])

  const [insumoForm, setInsumoForm] = useState<CreateMatMedForm>({
    ds_mat: "",
    ds_marca: 0,
    ds_tipo: "MT01",
    ds_pessoaj: Number(localStorage.getItem("userId") || 0),
  })

  const [loteForm, setLoteForm] = useState<CreateLoteForm>({
    dt_fabricacao: "",
    dt_validade: "",
    qtd_lote: 0,
    unidade_med: "UN",
    fabricante: 0,
    cd_material: 0,
    cd_pessoaj: Number(localStorage.getItem("userId") || 0),
  })

  async function initialize() {
    const [responseCategory, responseBrand, responseFabricantes, responseMateriais] = await Promise.all([
      servicesGetCategorias(),
      servicesGetMarcas(),
      servicesGetFabricantes(),
      servicesGetMatMed(),
    ])

    if (!responseCategory || "isError" in responseCategory) {
      setCategories([])
    } else {
      setCategories(responseCategory)
    }

    if (!responseBrand || "isError" in responseBrand) {
      setBrands([])
    } else {
      setBrands(responseBrand)
    }

    if (!responseFabricantes || "isError" in responseFabricantes) {
      setFabricantes([])
    } else {
      setFabricantes(responseFabricantes)
    }

    if (!responseMateriais || "isError" in responseMateriais) {
      setMateriais([])
    } else {
      setMateriais(responseMateriais)
    }
  }

  useEffect(() => {
    initialize()
  }, [])

  async function handleSubmitInsumo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const response = await servicesCreateMatMed(insumoForm)
    if ("isError" in response) {
      console.error(response.message)
      return
    }
    setInsumoForm((prev) => ({ ...prev, ds_mat: "" }))
    const updatedMateriais = await servicesGetMatMed()
    if (!updatedMateriais || "isError" in updatedMateriais) return
    setMateriais(updatedMateriais)
  }

  async function handleSubmitLote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const response = await servicesCreateLote(loteForm)
    if ("isError" in response) {
      console.error(response.message)
      return
    }
    setLoteForm((prev) => ({
      ...prev,
      dt_fabricacao: "",
      dt_validade: "",
      qtd_lote: 0,
    }))
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-sky-800 ">Cadastro de Insumos e Lotes</h1>
        <p className="text-zinc-500 text-sm mt-1">Cadastre novos insumos ou registre entradas de novos lotes.</p>
      </div>

      <div className="flex items-center gap-2 p-1 bg-zinc-100  rounded-xl w-fit mb-6">
        <button
          onClick={() => setActiveTab("insumo")}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "insumo" ? "bg-zinc-50  text-sky-950 d shadow-sm" : "text-zinc-500"} hover:cursor-pointer`}
        >
          <Package size={16} /> Insumo
        </button>
        <button
          onClick={() => setActiveTab("lote")}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "lote" ? "bg-zinc-50  text-sky-950 shadow-sm" : "text-zinc-500"} hover:cursor-pointer`}
        >
          <Layers size={16} /> Lote
        </button>
      </div>

      <div className="bg-zinc-50 border border-zinc-200  rounded-2xl p-6 md:p-8 shadow-sm">
        {activeTab === "insumo" ? (
          <form className="space-y-6" onSubmit={handleSubmitInsumo}>
            <h2 className="text-lg font-bold flex items-center gap-2 text-sky-800 "><Package className="text-sky-800" /> Cadastrar Insumo</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Nome do Insumo"
                icon={Tag}
                placeholder="Ex: Seringa 5ml"
                value={insumoForm.ds_mat}
                onChange={(event) => setInsumoForm((prev) => ({ ...prev, ds_mat: event.target.value }))}
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-zinc-700">Categoria</label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 text-zinc-400">
                    <Layers size={16} />
                  </div>
                  <Select
                    value={insumoForm.ds_tipo}
                    onValueChange={(value) => setInsumoForm((prev) => ({ ...prev, ds_tipo: value as CreateMatMedForm["ds_tipo"] }))}
                    disabled={categories.length === 0}
                  >
                    <SelectTrigger className="w-full pl-9 pr-4 py-4.5 bg-zinc-50  border border-zinc-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-sm">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categorias disponíveis</SelectLabel>
                        {categories.map((cat) => (
                          <SelectItem key={cat.cd_tipo} value={cat.ds_tipo}>{cat.ds_tipo}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-zinc-700 ">Marca</label>
                <Select
                  value={insumoForm.ds_marca ? String(insumoForm.ds_marca) : undefined}
                  onValueChange={(value) => setInsumoForm((prev) => ({ ...prev, ds_marca: Number(value) }))}
                  disabled={brands.length === 0}
                >
                  <SelectTrigger className="w-full bg-zinc-50 border border-zinc-200  rounded-lg text-sm">
                    <SelectValue placeholder="Selecione a marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Marcas</SelectLabel>
                      {brands.map((marca) => (
                        <SelectItem key={marca.cd_marca} value={String(marca.cd_marca)}>{marca.ds_marca}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <InputField
                label="Codigo da Pessoa Juridica"
                icon={Hash}
                type="number"
                value={insumoForm.ds_pessoaj || ""}
                onChange={(event) => setInsumoForm((prev) => ({ ...prev, ds_pessoaj: Number(event.target.value) }))}
              />
            </div>

            <button className="w-full bg-sky-950 hover:bg-sky-900 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors hover:cursor-pointer">
              Salvar Insumo
            </button>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmitLote}>
            <h2 className="text-lg font-bold flex items-center gap-2 text-sky-800 "><Layers className="text-sky-800" /> Cadastrar Lote</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-zinc-700 ">Insumo Vinculado</label>
                <Select
                  value={loteForm.cd_material ? String(loteForm.cd_material) : undefined}
                  onValueChange={(value) => setLoteForm((prev) => ({ ...prev, cd_material: Number(value) }))}
                  disabled={materiais.length === 0}
                >
                  <SelectTrigger className="w-full bg-zinc-50  border border-zinc-200  rounded-lg text-sm">
                    <SelectValue placeholder="Selecione o insumo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Insumos</SelectLabel>
                      {materiais.map((material) => (
                        <SelectItem key={material.cd_mat} value={String(material.ds_mat)}>{material.ds_mat}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <InputField
                label="Numero do Lote"
                icon={Hash}
                type="number"
                placeholder="Ex: 1001"
                value={loteForm.nr_lote || ""}
                onChange={(event) => setLoteForm((prev) => ({ ...prev, nr_lote: Number(event.target.value) }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Data de Fabricacao"
                icon={Calendar}
                type="datetime-local"
                value={loteForm.dt_fabricacao}
                onChange={(event) => setLoteForm((prev) => ({ ...prev, dt_fabricacao: event.target.value }))}
              />
              <InputField
                label="Data de Validade"
                icon={Calendar}
                type="date"
                value={loteForm.dt_validade}
                onChange={(event) => setLoteForm((prev) => ({ ...prev, dt_validade: event.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-zinc-700 ">Fabricante</label>
                <Select
                  value={loteForm.fabricante ? String(loteForm.fabricante) : undefined}
                  onValueChange={(value) => setLoteForm((prev) => ({ ...prev, fabricante: Number(value) }))}
                  disabled={fabricantes.length === 0}
                >
                  <SelectTrigger className="w-full bg-zinc-50 border border-zinc-200 rounded-lg text-sm">
                    <SelectValue placeholder="Selecione o fabricante" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fabricantes</SelectLabel>
                      {fabricantes.map((item) => (
                        <SelectItem key={item.cd_fabricante} value={String(item.ds_fabricante)}>{item.ds_fabricante}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <InputField
                label="Quantidade Inicial"
                icon={Hash}
                type="number"
                value={loteForm.qtd_lote || ""}
                onChange={(event) => setLoteForm((prev) => ({ ...prev, qtd_lote: Number(event.target.value) }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Unidade de Medida"
                icon={AlertCircle}
                value={loteForm.unidade_med}
                onChange={(event) => setLoteForm((prev) => ({ ...prev, unidade_med: event.target.value }))}
              />
              <InputField
                label="Codigo da Pessoa Juridica"
                icon={Building2}
                type="number"
                value={loteForm.cd_pessoaj || ""}
                onChange={(event) => setLoteForm((prev) => ({ ...prev, cd_pessoaj: Number(event.target.value) }))}
              />
            </div>

            <button className="w-full bg-sky-950 hover:bg-sky-900 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors hover:cursor-pointer">
              Registrar Lote
            </button>
          </form>
        )}
      </div>
    </div>
  )
}