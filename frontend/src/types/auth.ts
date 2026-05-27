export interface AuthProps {
  cnpj: string
  token: string
}

export interface AuthLoginRequest {
  cnpj: string
  password: string
}

export interface AuthLoginResponse {
  id: number
  cnpj: string
  access: string
  refresh: string
}

export interface TokenObtainPairRequest {
  username: string
  password: string
}

export interface TokenObtainPairResponse {
  access: string
  refresh: string
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

export interface TokenVerifyResponse {
  detail?: string
  code?: string
}
