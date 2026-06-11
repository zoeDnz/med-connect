"use client"

import React, { useEffect, useState } from "react"
import {
  AlertCircle,
  Calendar,
  Hash,
  Layers,
} from "lucide-react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select"

import InputField from "./InputField"

import {
  CreateLoteForm,
  Fabricante,
  MatMed,
} from "@/types"

import servicesGetFabricantes from "@/server/(GET)-fabricantes"
import servicesGetMatMed from "@/server/(GET)-mat-med"
import servicesCreateLote from "@/server/(POST)-lote"

export default function FormLote() {
  const [fabricantes, setFabricantes] = useState<Fabricante[]>([])
  const [materiais, setMateriais] = useState<MatMed[]>([])

  const [loteForm, setLoteForm] = useState<CreateLoteForm>({
    ds_lote: "",
    dt_fabricacao: "",
    dt_validade: "",
    qtd_lote: 0,
    unidade_med: "UN",
    fabricante: 0,
    cd_material: 0,
    cd_pessoaj: 0,
  })

  useEffect(() => {
    async function initialize() {
      const [responseFabricantes, responseMateriais] =
        await Promise.all([
          servicesGetFabricantes(),
          servicesGetMatMed(),
        ])

      if (
        responseFabricantes &&
        !("isError" in responseFabricantes)
      ) {
        setFabricantes(responseFabricantes)
      }

      if (
        responseMateriais &&
        !("isError" in responseMateriais)
      ) {
        setMateriais(responseMateriais)
      }
    }

    initialize()

    const userId =
      Number(localStorage.getItem("userId") || 0)

    setLoteForm((prev) => ({
      ...prev,
      cd_pessoaj: userId,
    }))
  }, [])


  async function handleSubmitLote(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    const dataFabricacao = new Date(loteForm.dt_fabricacao)

    if (dataFabricacao > new Date()) {
      alert("A data de fabricação não pode ser futura.")
      return
    }

    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    const dataValidade = new Date(loteForm.dt_validade)

    if (dataValidade < hoje) {
      alert("Não é permitido cadastrar lotes vencidos.")
      return
    }

    if (
      loteForm.dt_validade &&
      loteForm.dt_fabricacao &&
      loteForm.dt_validade <= loteForm.dt_fabricacao.split("T")[0]
    ) {
      alert(
        "A data de validade deve ser posterior à data de fabricação."
      )
      return
    }

    const response = await servicesCreateLote(loteForm)

    if ("isError" in response) {
      console.error(response.message)
      return
    }

    setLoteForm((prev) => ({
      ...prev,
      ds_lote: "",
      dt_fabricacao: "",
      dt_validade: "",
      qtd_lote: 0,
    }))
  }

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmitLote}
    >
      <h2 className="text-lg font-bold flex items-center gap-2 text-sky-800">
        <Layers className="text-sky-800" />
        Cadastrar Lote
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Insumo Vinculado
          </label>

          <Select
            value={String(loteForm.cd_material || "")}
            onValueChange={(value) =>
              setLoteForm((prev) => ({
                ...prev,
                cd_material: Number(value),
              }))
            }
            disabled={materiais.length === 0}
          >
            <SelectTrigger className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm">
              {loteForm.cd_material
                ? materiais.find(
                    (material) =>
                      material.cd_mat === loteForm.cd_material
                  )?.ds_mat
                : "Selecione o insumo"}
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Insumos</SelectLabel>

                {materiais.map((material) => (
                  <SelectItem
                    key={material.cd_mat}
                    value={String(material.cd_mat)}
                  >
                    {material.ds_mat}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <InputField
          label="Lote"
          icon={Hash}
          placeholder="Ex: ABC123456"
          value={loteForm.ds_lote}
          onChange={(event) =>
            setLoteForm((prev) => ({
              ...prev,
              ds_lote: event.target.value,
            }))
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <InputField
        label="Data de Fabricação"
        icon={Calendar}
        type="datetime-local"
        max={
          new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, 16)
        }
        value={loteForm.dt_fabricacao}
        onChange={(event) =>
          setLoteForm((prev) => ({
            ...prev,
            dt_fabricacao: event.target.value,
          }))
        }
      />

        <InputField
          label="Data de Validade"
          icon={Calendar}
          type="date"
          value={loteForm.dt_validade}
          onChange={(event) =>
            setLoteForm((prev) => ({
              ...prev,
              dt_validade: event.target.value,
            }))
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Fabricante
          </label>

          <Select
            value={String(loteForm.fabricante || "")}
            onValueChange={(value) =>
              setLoteForm((prev) => ({
                ...prev,
                fabricante: Number(value),
              }))
            }
            disabled={fabricantes.length === 0}
          >
            <SelectTrigger className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm">
              {loteForm.fabricante
                ? fabricantes.find(
                    (fabricante) =>
                      fabricante.cd_fabricante === loteForm.fabricante
                  )?.ds_fabricante
                : "Selecione o fabricante"}
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fabricantes</SelectLabel>

                {fabricantes.map((item) => (
                  <SelectItem
                    key={item.cd_fabricante}
                    value={String(item.cd_fabricante)}
                  >
                    {item.ds_fabricante}
                  </SelectItem>
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
          onChange={(event) =>
            setLoteForm((prev) => ({
              ...prev,
              qtd_lote: Number(event.target.value),
            }))
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Unidade de Medida"
          icon={AlertCircle}
          value={loteForm.unidade_med}
          onChange={(event) =>
            setLoteForm((prev) => ({
              ...prev,
              unidade_med: event.target.value,
            }))
          }
        />

      </div>

      <button className="w-full bg-sky-950 hover:bg-sky-900 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer">
        Registrar Lote
      </button>
    </form>
  )
}