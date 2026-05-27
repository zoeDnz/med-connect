"use client"

import React, { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Info,
  HelpCircle,
  CreditCard
} from "lucide-react"

import { ModeToggle } from "@/components/ui/toggle-theme"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

interface PublicLayoutProps {
  children: ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const pathname = usePathname()
  const isAuthPage = pathname === "/auth"

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-cyan-500/20 dark:bg-black dark:text-zinc-100 scroll-smooth">

      {/* NAVBAR */}
      <nav className="w-full h-16 flex items-center justify-between bg-sky-950 shadow-md px-6 md:px-10 z-50 sticky top-0 dark:bg-zinc-950">

        {/* LOGO */}
        <div className="flex items-center">
          <Link
            href="/"
            className="font-extrabold text-xl text-white tracking-wider hover:opacity-95 transition-opacity"
          >
            MedConnect
          </Link>
        </div>

        {/* MENU */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center text-sm font-semibold text-zinc-300">

          <NavigationMenu>
            <NavigationMenuList className="flex gap-2">

              {/* SOBRE */}
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <Link
                    href="/#sobre"
                    className="flex items-center gap-1.5 py-2 pr-3 pl-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors font-semibold text-sm"
                  >
                    <Info size={16} className="text-zinc-400" />
                    Sobre Nós
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* COMO FUNCIONA */}
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <Link
                    href="/#como-funciona"
                    className="flex items-center gap-1.5 py-2 pr-3 pl-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors font-semibold text-sm"
                  >
                    <HelpCircle size={16} className="text-zinc-400" />
                    Como Funciona
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* PLANOS */}
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <Link
                    href="/#planos"
                    className="flex items-center gap-1.5 py-2 pr-3 pl-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors font-semibold text-sm"
                  >
                    <CreditCard size={16} className="text-zinc-400" />
                    Planos
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

        </div>

        {/* AÇÕES */}
        <div className="flex items-center gap-4">

          <ModeToggle />

          {!isAuthPage && (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/auth"
                className="text-sm font-semibold text-zinc-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/10"
              >
                Entrar
              </Link>

              <Link
                href="/auth"
                className="bg-sky-800 hover:bg-sky-900 text-white font-bold text-sm px-4 py-2.5 rounded-full transition-all"
              >
                Cadastre-se
              </Link>
            </div>
          )}

        </div>
      </nav>

      {/* CONTEÚDO */}
      <main className="w-full flex-1 flex flex-col items-center">
        {children}
      </main>

    </div>
  )
}