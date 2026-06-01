"use client"

import { Anuncio } from "@/types"
import { buildUrl, getAuthHeaders, handleResponse, ServiceResult } from "@/server/middleware"

export default async function servicesGetMeusAnuncios() {
  const response = await fetch(
    buildUrl("/api/medconnect/anuncio/meus-anuncios/"),
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  )

  return handleResponse(response, "Erro")
}
