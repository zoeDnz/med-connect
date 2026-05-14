"use client"
import React, { JSX, useTransition } from "react"
import {
  Field,
  FieldError,
  FieldLabel,
  FieldGroup,
} from "@/components/ui/field"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authSchema } from "../schema"
import { formatCNPJ } from "@/lib/format/format-document"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from "next/navigation"
import servicesAuth from "@/server/(POST)-auth"

export default function Form(): JSX.Element {
  const router = useRouter()
  // => Hook - React: É uma função interna do framework
  const [isSubmit, startSubmit] = useTransition()

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      cnpj: "",
      password: ""
    },
  })

  const onSubmit = (): void => {
    startSubmit(async () => {
      const response = await servicesAuth(form.getValues())
      // => Verificação em caso de erro
      if ("isError" in response) { return }
      // => Armazenando o token no localStorage
      localStorage.setItem("token", response.token)
      localStorage.setItem("cnpj", response.cnpj)
      router.push("/materials-and-brands")
    })
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-5">
      <div className="max-w-150 flex flex-col items-center justify-center gap-5">
        <h1 className="text-cyan-800 text-3xl font-semibold dark:text-white">
          Log In
        </h1>
        <p className="w-2/3 text-center text-sm text-gray-500 dark:text-gray-300">
          Para começar, por favor, faça login com suas credenciais ou crie uma nova conta. Estamos aqui para facilitar sua jornada de saúde!
        </p>
        <form
          id="form-rhf-demo"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 h-auto flex flex-col gap-5"
        >
          <FieldGroup>
            <Controller
              name="cnpj"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-cnpj">
                    CNPJ <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    maxLength={14}
                    disabled={isSubmit}
                    // => Formatando pra mostrar ao usuário enquanto ele digita
                    value={formatCNPJ(field.value)}
                    onChange={(event) => {
                      // => Removendo a formatação para enviar o valor limpo para o RHF
                      const rawValue = event.target.value.replace(/\D/g, "")
                      field.onChange(rawValue)
                    }}
                    id="form-rhf-demo-cnpj"
                    aria-invalid={fieldState.invalid}
                    placeholder="00.000.000/0000-00"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-password">
                    Senha <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    type="password"
                    maxLength={20}
                    disabled={isSubmit}
                    // => Formatando pra mostrar ao usuário enquanto ele digita
                    {...field}
                    id="form-rhf-demo-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Digite sua senha"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <Button
          type="submit"
          className="w-2/3 mt-5"
          form="form-rhf-demo"
          disabled={isSubmit}
        >
          {!isSubmit && (
            <span className="flex items-center">
              Entrar <ArrowRight className="ml-2" />
            </span>
          )}
          {isSubmit && (
            <span className="flex items-center">
              Entrando... <Spinner className="ml-2" />
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}