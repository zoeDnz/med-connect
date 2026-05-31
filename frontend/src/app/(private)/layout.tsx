"use client"

import React, { ReactNode, useEffect, useState } from "react"
import servicesGetMinhaPessoaJuridica from "@/server/(GET)-minha-pessoa-juridica"
import { PessoaJuridica } from "@/types"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { 
  LogOut, 
  Store, 
  FileText, 
  SquarePlus,
  History,
  ChevronDown 
} from "lucide-react"

import { ModeToggle } from "@/components/ui/toggle-theme"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// 1. Array de links para manter o código limpo (DRY)
const NAV_LINKS = [
  { name: "Vitrine", href: "/vitrine", icon: Store },
  { name: "Cadastro", href: "/cadastrar-insumos", icon: FileText },
  { name: "Publicar Anúncio", href: "/anunciar", icon: SquarePlus },
  { name: "Histórico", href: "/historico", icon: History },
]

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()
  const pathname = usePathname() // Hook para pegar a rota atual

  const [empresa, setEmpresa] =
  useState<PessoaJuridica | null>(null)

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("token")

    if (!isAuthenticated) {
      router.push("/auth")
      return
    }

    async function carregarEmpresa() {
      const result =
        await servicesGetMinhaPessoaJuridica()

      if (
        result &&
        typeof result === "object" &&
        !("isError" in result)
      ) {
        setEmpresa(result)
      }
    }

  carregarEmpresa()
}, [router])

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-cyan-500/20 dark:bg-black dark:text-zinc-100">
      
      {/* NAVBAR */}
      <nav className="w-full h-16 flex items-center justify-between bg-sky-950 shadow-md shadow-zinc-950/5 px-6 md:px-10 z-50 sticky top-0 dark:bg-zinc-950">

        {/* LOGO */}
        <div className="flex items-center">
          <Link href="/vitrine" className="font-extrabold text-xl text-white tracking-wider hover:opacity-95 transition-opacity">
            MedConnect
          </Link>
        </div>

        {/* MENU PRINCIPAL (Refatorado para corrigir o bug) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 py-2 px-3 rounded-full transition-all duration-200 font-semibold text-sm select-none group
                  ${isActive 
                    ? "bg-white/10 text-white shadow-inner shadow-white/5" // Estilo ativo
                    : "text-zinc-400 hover:text-white hover:bg-white/10"   // Estilo inativo/hover
                  }
                `}
              >
                <Icon 
                  size={16} 
                  className={`transition-colors duration-200 ${isActive ? "text-white" : "text-zinc-400 group-hover:text-white"}`} 
                />
                {link.name}
              </Link>
            )
          })}
        </div>

        {/* AÇÕES DIREITA */}
        <div className="flex items-center gap-4 relative">
       

        {/* USER MENU */}
          <DropdownMenu>
            {/* Passamos as classes diretamente para o Trigger, eliminando a prop asChild e o botão interno */}
            <DropdownMenuTrigger className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 focus:outline-none pl-1.5 pr-4 py-1.5 rounded-full transition-all text-white border border-transparent hover:border-white/10 active:scale-[0.98] cursor-pointer outline-none ring-0">
              <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-inner">
                {empresa?.nm_pessoaj?.substring(0, 2).toUpperCase() ?? "PJ"}
              </div>
              <span className="text-sm font-semibold tracking-wide">
                {empresa?.nm_pessoaj ?? "Perfil"}
              </span>
              <ChevronDown size={14} className="text-zinc-300 transition-transform duration-300" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-52 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-xl shadow-xl border border-zinc-200/80 dark:border-zinc-800 py-1.5 z-50">
              <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
                <p className="text-sm font-bold truncate">Minha Conta</p>
                <p className="text-xs text-zinc-400 font-medium truncate mt-0.5">Configurações do Perfil</p>
              </div>
              
              <DropdownMenuGroup>
                <DropdownMenuItem className="px-4 py-2.5 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer focus:bg-zinc-50 dark:focus:bg-zinc-800">
                  <Link href="/perfil" className="w-full">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-2.5 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer focus:bg-zinc-50 dark:focus:bg-zinc-800">
                  Configurações
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="border-t border-zinc-100 dark:border-zinc-800 my-1" />

              <DropdownMenuItem
                className="flex items-center gap-2 px-4 py-2.5 mt-1.5 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-left transition-colors cursor-pointer focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30"
                onClick={() => {
                  localStorage.removeItem("token")
                  localStorage.removeItem("cnpj")
                  router.push("/auth")
                }}
              >
                <LogOut size={16} />
                Sair do Sistema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* CONTEÚDO DA PÁGINA */}
      <main className="w-full flex-1 p-4 md:p-8 max-w-7xl">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-sky-950 text-zinc-300 py-10 px-6 md:px-10 dark:bg-zinc-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <h2 className="font-extrabold text-xl text-white tracking-wider">MedConnect</h2>
            <p className="text-zinc-400">
              Conectando quem possui excedentes hospitalares a quem precisa deles, facilitando negociações e transformando recursos ociosos em soluções para toda a rede de saúde.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-white mb-1">Navegação</h3>
            <Link href="/#sobre" className="hover:text-white transition-colors">Sobre Nós</Link>
            <Link href="/#como-funciona" className="hover:text-white transition-colors">Como Funciona</Link>
            <Link href="/#planos" className="hover:text-white transition-colors">Planos</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-white mb-1">Legal</h3>
            <Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
            <Link href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} MedConnect. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}