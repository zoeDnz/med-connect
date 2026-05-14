"use client"
import React, { useEffect, useState, useTransition } from "react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MatMed } from "@/types"
import servicesGetMaterialsAndBrands from "@/server/(GET)-materials-and-brands"

export default function MaterialsAndBrands() {
  const [materials, setMaterials] = useState<MatMed[]>()

  // => A primeira função chamada quando a tela é carregada
  useEffect(() => {
    servicesGetMaterialsAndBrands().then((response) => {
      if ("isError" in response) { return }
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