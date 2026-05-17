"use client"

import { Fornecedor } from "../types"

declare const process: {
  env: {
    NEXT_PUBLIC_API_URL?: string
  }
}

export default async function servicesGetFornecedores() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fornecedor`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token") || ""
    },
  })

  if (!response.ok) {
    const error = {
      isError: true,
      status: response.status,
      message: "Não foi possível ver mais informações sobre este fornecedor!"
    }
    return error
  }

  const data: Fornecedor[] = await response.json()
  return data
}