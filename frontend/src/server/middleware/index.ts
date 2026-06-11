"use client"

export interface ServiceError {
  isError: true
  status: number
  message: string
}

export type ServiceResult<T> = T | ServiceError

const API_BASE = process.env.NEXT_PUBLIC_API_URL

export function buildUrl(path: string): string {
  if (!API_BASE) throw new Error("NEXT_PUBLIC_API_URL não está definida")
  return `${API_BASE}${path}`
}

export function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("access_token") // ← muda de "token" para "access_token"
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }
}

export function getJsonHeaders(): HeadersInit {
  return { "Content-Type": "application/json" }
}

// ← NOVO: renova o token silenciosamente
async function tryRefreshToken(): Promise<string | null> {
  const refresh = localStorage.getItem("refresh_token")
  if (!refresh) return null

  const res = await fetch(buildUrl("/authentication/token/refresh/"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  })

  if (!res.ok) {
    // Refresh inválido → limpa tudo e manda pro login
    localStorage.clear()
    window.location.href = "/login"
    return null
  }

  const { access } = await res.json()
  localStorage.setItem("access_token", access)
  return access
}

async function extractMessage(response: Response, fallback: string): Promise<string> {
  try {
    const data = await response.json() as {
      error?: string; detail?: string; message?: string; erro?: string
    }
    return data.error || data.detail || data.message || data.erro || fallback
  } catch {
    return fallback
  }
}

export async function handleResponse<T>(
  response: Response,
  fallbackMessage: string,
  retryFn?: () => Promise<Response>  // ← NOVO: permite repetir a request
): Promise<ServiceResult<T>> {

  // ← NOVO: se expirou, tenta renovar e repetir
  if (response.status === 401 && retryFn) {
    const newToken = await tryRefreshToken()
    if (newToken) {
      const retryResponse = await retryFn()
      return handleResponse<T>(retryResponse, fallbackMessage) // sem retryFn = não entra em loop
    }
  }

  if (!response.ok) {
    return {
      isError: true,
      status: response.status,
      message: await extractMessage(response, fallbackMessage),
    }
  }

  if (response.status === 204) return {} as T

  return await response.json() as T
}