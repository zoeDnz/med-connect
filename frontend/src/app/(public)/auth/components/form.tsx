"use client"
import React, { JSX } from "react"

export default function Form(): JSX.Element {

  return (
    <form className="w-full h-screen flex flex-col items-center justify-center gap-5">
      <div className="max-w-150 flex flex-col items-start justify-center gap-5">
        <h1 className="text-cyan-800 text-3xl font-semibold dark:text-white">
          Log In
        </h1>
        <p className="w-2/3 text-start text-sm text-gray-500 dark:text-gray-300">
          Para começar, por favor, faça login com suas credenciais ou crie uma nova conta. Estamos aqui para facilitar sua jornada de saúde!
        </p>
      </div>
    </form>
  )
}