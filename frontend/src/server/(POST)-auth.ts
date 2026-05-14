"use client"
import { AuthProps } from "@/types"

interface ServicesAuthProps {
  cnpj: string
  password: string
}

export default async function servicesAuth({ cnpj, password }: ServicesAuthProps) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authentication/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ cnpj, password })
  })

  if (!response.ok) {
    const error = {
      isError: true,
      status: response.status,
      message: "Não foi possível autenticar"
    }
    return error  
  }

  const data: AuthProps = await response.json()
  return data
}