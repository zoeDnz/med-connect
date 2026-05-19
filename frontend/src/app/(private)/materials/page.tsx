"use client"
import React, { useEffect, useState } from "react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MatMed } from "@/types"
import servicesGetMaterials from "@/server/(GET)-materials-and-brands"

export default function Materials() {
  const router = useRouter()
  // => Variável de estado para armazenar os materiais médicos
  const [materials, setMaterials] = useState<MatMed[]>()

  // => A primeira função chamada quando a tela é carregada
  useEffect(() => {
    // => Função que pega os dados do backend
    servicesGetMaterials().then((response) => {
      // => Caso de erro, a gente não seta valores e para o processsamento
      if ("isError" in response) { return }
      // => Seta os valores do backend dentro da variável de estado
      setMaterials(response)
    })
  }, [])

  return (
    <div className="w-full grid grid-cols-4 gap-8 py-14 px-12">
      {materials && !("isError" in materials) && materials.length > 0 && materials.map((material: MatMed, index: number) => {
        return (
          <Card
            key={index}
            className="flex flex-col justify-between"
          >
            <CardHeader>
              <CardTitle>{material.ds_mat}</CardTitle>
              <CardDescription>Id da Marca: {material.ds_marca}</CardDescription>
              <CardAction>Tipo: {material.ds_tipo}</CardAction>
            </CardHeader>
            <CardContent>
              <p>Id da pessoa Jurídica:{material.ds_pessoaj}</p>
            </CardContent>
            <CardFooter>
              <Button
                type="button"
                variant="default"
                onClick={() => {
                  router.push(`/materials/${material.cd_mat}/details?id_pf=${material}`)
                }}
              >
                Ver detalhes
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}