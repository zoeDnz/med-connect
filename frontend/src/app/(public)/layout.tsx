"use client"

import React, { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation" // <-- Importado o hook
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
  // Pegamos o caminho atual da URL
  const pathname = usePathname()
  
  // Verificamos se estamos na rota /auth
  const isAuthPage = pathname === "/auth"

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-cyan-500/20 dark:bg-black dark:text-zinc-100 scroll-smooth">
      
      {/* NAVBAR PÚBLICA */}
      <nav className="w-full h-16 flex items-center justify-between bg-sky-950 shadow-md shadow-zinc-950/5 px-6 md:px-10 z-50 sticky top-0 dark:bg-zinc-950">

        {/* LOGO */}
        <div className="flex items-center">
          <Link href="/" className="font-extrabold text-xl text-white tracking-wider hover:opacity-95 transition-opacity">
            MedConnect
          </Link>
        </div>

        {/* MENU PRINCIPAL (Âncoras da Landing Page) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center text-sm font-semibold text-zinc-300">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-2">

              {/* SOBRE NÓS */}
              <NavigationMenuItem>
                <Link href="/#sobre"  passHref>
                  <NavigationMenuLink className="flex items-center gap-1.5 py-2 pr-3 pl-2 rounded-full bg-transparent text-zinc-300 hover:text-white hover:bg-white/10 transition-colors font-semibold text-sm group/sobre select-none data-active:bg-white/10">
                    <Info size={16} className="text-zinc-400 group-hover/sobre:text-white transition-colors" />
                    Sobre Nós
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* COMO FUNCIONA */}
              <NavigationMenuItem>
                <Link href="/#como-funciona" passHref>
                  <NavigationMenuLink className="flex items-center gap-1.5 py-2 pr-3 pl-2 rounded-full bg-transparent text-zinc-300 hover:text-white hover:bg-white/10 transition-colors font-semibold text-sm group/como select-none data-active:bg-white/10">
                    <HelpCircle size={16} className="text-zinc-400 group-hover/como:text-white transition-colors" />
                    Como Funciona
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* PLANOS */}
              <NavigationMenuItem>
                <Link href="/#planos"  passHref>
                  <NavigationMenuLink className="flex items-center gap-1.5 py-2 pr-3 pl-2 rounded-full bg-transparent text-zinc-300 hover:text-white hover:bg-white/10 transition-colors font-semibold text-sm group/planos select-none data-active:bg-white/10">
                    <CreditCard size={16} className="text-zinc-400 group-hover/planos:text-white transition-colors" />
                    Planos
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* AÇÕES DIREITA (Botões de Login/Cadastro) */}
        <div className="flex items-center gap-4 relative">
          
          <ModeToggle />

          {/* O if de fato (Renderização condicional): Só mostra os botões se NÃO for a página /auth */}
          {!isAuthPage && (
            <div className="hidden md:flex items-center gap-3 ml-2">
              <Link 
                href="/auth" 
                className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/10"
              >
                Entrar
              </Link>
              <Link 
                href="/auth" 
                className="flex items-center justify-center bg-sky-800 hover:bg-sky-900 text-white font-bold text-sm tracking-wide px-4 py-2.5 rounded-full transition-all active:scale-[0.98] shadow-inner"
              >
                Cadastre-se
              </Link>
            </div>
          )}

        </div>
      </nav>

      {/* CONTEÚDO DA PÁGINA (Landing Page ou Tela de Login) */}
      <main className="w-full flex-1 flex flex-col items-center">
        {children}
      </main>

    </div>
  )
}