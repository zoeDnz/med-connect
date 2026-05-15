"use client"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/toggle-theme"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { ReactNode, useEffect } from "react"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()

  useEffect(() => {
    // => Validando se o usuário está autenticado
    const isAuthenticated: boolean = localStorage.getItem("token") ? true : false
    // => Caso o usuário não esteja autenticado, redireciona para a página de login
    if (!isAuthenticated) {
      router.push("/auth")
    }
  }, [])

  return (
    <div className="w-full h-auto flex flex-col gap-2.5 items-center">
      <nav className="w-screen h-16 flex items-center justify-between bg-cyan-950 dark:bg-black shadow shadow-zinc-800 px-10">
        <h1 className="font-semibold text-lg text-white">
          MedConnect
        </h1>
        <div className="w-auto flex items-center gap-2">
          <ModeToggle />
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem("token")
              localStorage.removeItem("cnpj")
              router.push("/auth")
            }}
          >
            <LogOut size={20} /> Sair 
          </Button>
        </div>
      </nav>
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}