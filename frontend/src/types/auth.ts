export interface AuthProps {
  cnpj: string
  token: string
}

export interface TokenRefreshRequest {
  refresh: string
}

export interface TokenRefreshResponse {
  access: string
}

export interface TokenVerifyRequest {
  token: string
}
