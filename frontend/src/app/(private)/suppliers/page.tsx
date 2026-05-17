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
import { Button } from "@/components/ui/button"
import { Fornecedor } from "@/types"
import servicesGetFornecedores from "@/server/(GET)-fornecedores"
export default function Fornecedores() {
  // => Variável de estado para armazenar os fornecedores
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>()

  // => A primeira função chamada quando a tela é carregada
  useEffect(() => {
    // => Função que pega os dados do backend
    servicesGetFornecedores().then((response) => {
      // => Caso de erro, a gente não seta valores e para o processsamento
      if ("isError" in response) { return }
      // => Seta os valores do backend dentro da variável de estado
      setFornecedores(response)
    })
  }, [])

  return (
    <div className="w-full grid grid-cols-4 gap-8 py-14 px-12">
      {fornecedores && !("isError" in fornecedores) && fornecedores.length > 0 && fornecedores.map((fornecedor: Fornecedor, index: number) => {
        return (
          <Card
            key={fornecedor.cd_fornecedor}
            className="flex flex-col justify-between rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Fornecedor #{fornecedor.cd_fornecedor}
                  </p>

                  <CardTitle className="text-xl font-bold">
                    {fornecedor.ds_fornecedor}
                  </CardTitle>
                </div>
              </div>

              <CardDescription className="text-sm">
                Empresa fornecedora de materiais médicos
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="flex flex-col gap-1">
                <p className="text-sm">
                  <span className="font-semibold">CNPJ:</span>{" "}
                    {fornecedor.cnpj_fornc}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">Código:</span>{" "}
                    {fornecedor.cd_fornecedor}
                </p>

              </div>

            </CardContent>

            <CardFooter>
              <Button
                type="button"
                className="w-full"
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