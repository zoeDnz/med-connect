"use client"

import React, { ReactNode, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/toggle-theme"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("token")

    if (!isAuthenticated) {
      router.push("/auth")
    }
  }, [router])

  return (
    <div className="relative flex h-auto w-full flex-col items-center">
      
      {/* NAVBAR */}
      <nav className="fixed flex h-16 w-full items-center justify-between bg-cyan-950 px-10 shadow dark:bg-black">

        {/* LOGO */}
        <h1 className="text-lg font-semibold text-white">
          MedConnect
        </h1>

        {/* MENU PRINCIPAL */}
        <NavigationMenu>
          <NavigationMenuList>

            {/* VITRINE */}
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Link href="/vitrine" className="text-white hover:text-black">
                  Vitrine
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* CADASTRO */}
            <NavigationMenuItem>
              <NavigationMenuTrigger  className="text-white hover:text-black">
                Cadastro
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="w-48 p-2 space-y-1">

                  <li>
                    <NavigationMenuLink>
                      <Link
                        href="/cadastro/material"
                        className="block rounded p-2 hover:bg-accent"
                      >
                        Insumo
                      </Link>
                    </NavigationMenuLink>
                  </li>

                  <li>
                    <NavigationMenuLink >
                      <Link
                        href="/cadastro/lote"
                        className="block rounded p-2 hover:bg-accent"
                      >
                        Lote
                      </Link>
                    </NavigationMenuLink>
                  </li>

                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* PUBLICAR ANÚNCIO */}
            <NavigationMenuItem>
              <NavigationMenuLink  className={navigationMenuTriggerStyle()}>
               <Link href="/publicar" className="text-white hover:text-black">
                  Publicar Anúncio
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* AÇÕES DIREITA */}
        <div className="flex items-center gap-2">

          <ModeToggle />

          {/* USER */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                <User size={20} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuGroup>
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configurações</DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  localStorage.removeItem("token")
                  localStorage.removeItem("cnpj")
                  router.push("/auth")
                }}
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* LOGOUT BOTÃO (opcional) */}
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem("token")
              localStorage.removeItem("cnpj")
              router.push("/auth")
            }}
          >
            <LogOut size={20} />
            Sair
          </Button>

        </div>
      </nav>

      {/* CONTEÚDO */}
      <div className="mt-16 w-full">
        {children}
      </div>

    </div>
  )
}