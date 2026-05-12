"use client"

import { z } from "zod"

function isValidCNPJ(cnpj: string): boolean {
  const digits = cnpj.replace(/\D/g, "")
  if (digits.length !== 14) return false
  if (/^(\d)\1+$/.test(digits)) return false

  const calc = (slice: string, weights: number[]) => {
    const sum = slice.split("").reduce((acc, d, i) => acc + Number(d) * weights[i], 0)
    const rem = sum % 11
    return rem < 2 ? 0 : 11 - rem
  }

  const first = calc(digits.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  if (first !== Number(digits[12])) return false

  const second = calc(digits.slice(0, 13), [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  return second === Number(digits[13])
}

export const authSchema = z.object({
  cnpj: z.string()
    .min(1, "CNPJ é um campo obrigatório")
    .refine(isValidCNPJ, "O CNPJ é inválido"),
  password: z.string()
    .min(6, "A senha deve conter pelo menos 6 caractéres")
})