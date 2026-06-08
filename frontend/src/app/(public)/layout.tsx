"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Info, HelpCircle, CreditCard } from "lucide-react"

const NAV_LINKS = [
  { name: "Sobre Nós", href: "/#sobre", icon: Info },
  { name: "Como Funciona", href: "/#como-funciona", icon: HelpCircle },
  { name: "Planos", href: "/#planos", icon: CreditCard },
]

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === "/auth"

  return (
    <div className="w-full min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100 scroll-smooth">
      {/* NAVBAR */}
      <nav className="w-full h-16 flex items-center justify-between bg-sky-950 px-6 md:px-10 sticky top-0 z-50 border-b border-white/10">
        
        {/* LOGO */}
        <Link href="/" className="font-extrabold text-xl text-white tracking-wider">
           MedConnect
        </Link>

        {/* MENU RÁPIDO */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <link.icon size={16} />
              {link.name}
            </Link>
          ))}
        </div>

        {/* AÇÕES */}
        {!isAuthPage && (
          <div className="flex gap-3">
             <Link href="/auth" className="text-sm font-semibold text-zinc-300 hover:text-white px-3 py-2.5 rounded-full hover:bg-white/10">Entrar</Link>
             <Link href="/auth" className="bg-sky-800 hover:bg-sky-900 text-white font-bold text-sm px-4 py-2.5 rounded-full transition-all">Cadastre-se</Link>
          </div>
        )}
      </nav>

      <main>{children}</main>
    </div>
  )
}