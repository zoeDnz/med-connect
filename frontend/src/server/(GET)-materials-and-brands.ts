"use client"

import { MatMed } from "@/types"

export default async function servicesGetMaterials() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mat_med`, {
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
      message: "Não foi possível obter os materiais"
    }
    return error
  }

  const data: MatMed[] = await response.json()
  return data
}