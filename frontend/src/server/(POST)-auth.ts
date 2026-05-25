"use client"

interface ServicesAuthProps {
  cnpj: string
  password: string
}

export default async function servicesAuth({
  cnpj,
  password
}: ServicesAuthProps) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL

  if (!baseURL) {
    throw new Error("NEXT_PUBLIC_API_URL não está definida")
  }

  const cleanCNPJ = cnpj.replace(/\D/g, "")

  const response = await fetch(
    `${baseURL}/authentication/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cnpj: cleanCNPJ,
        password
      })
    }
  )

  const data = await response.json()

  if (!response.ok) {
    return {
      isError: true,
      status: response.status,
      message: data?.error || "Não foi possível autenticar"
    }
  }

  return data
}