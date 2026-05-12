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

export default function MaterialsAndBrands() {
  const [isPending, startTransition] = useTransition()
  // => Guardando as informações que vem do Backend para renderizar na tela
  const [materialsBrands, setMaterialsBrands] = useState<any>()

  async function servicesGetMaterialsAndBrands() {
    // => Fazendo a requisição para o Backend
    const response = await fetch("http://localhost:8000/mat_med", {
      headers: {
        // => Gerando exemplo aleatório de Token
        Authorization: `Bearer ${Math.random().toString(36).substring(2)}`
      }
    })
    // => Transformando os dados do Backend em formato JSON
    const data = await response.json()
    setMaterialsBrands(data)
  }

  // => Função que executa sempre que a página é carregada
  useEffect(() => {
    startTransition(async () => {
      await servicesGetMaterialsAndBrands()
    })
  }, [])

  return (
    <div className="w-full grid grid-cols-4 gap-8 py-14 px-12">
      {materialsBrands && materialsBrands.length > 0 && materialsBrands.map((item: any) => {
        return (
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{item.ds_mat}</CardTitle>
              <CardDescription>Id da Marca: {item.ds_marca}</CardDescription>
              <CardAction>Tipo: {item.ds_tipo}</CardAction>
            </CardHeader>
            <CardContent>
              <p>Id da pessoa Jurídica:{item.ds_pessoaj}</p>
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