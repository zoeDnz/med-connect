"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  HeartHandshake, 
  PackagePlus, 
  Search, 
  CheckCircle2 
} from "lucide-react"

// 1. DADOS EXTRAÍDOS (Facilita a manutenção e limpa o JSX)
const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    title: "Anuncie seus Insumos",
    description: "Cadastre os materiais ou medicamentos que estão parados no seu estoque. Defina quantidades e especificações.",
    Icon: PackagePlus,
  },
  {
    id: 2,
    title: "Encontre a Demanda",
    description: "Nossa vitrine inteligente conecta seus produtos a clínicas e profissionais que estão buscando exatamente o que você tem.",
    Icon: Search,
  },
  {
    id: 3,
    title: "Feche Negócio",
    description: "Negocie diretamente pela plataforma. Seguro, rápido e com total transparência para ambas as partes envolvidas.",
    Icon: HeartHandshake,
  }
]

const PLAN_FEATURES = [
  "Acesso completo ao catálogo",
  "Publicação ilimitada de insumos",
  "Painel de gerenciamento de lotes",
  "Sem comissões por negócio",
  "Suporte prioritário"
]

export default function MedConnectLanding() {
  return (
    <main className="w-full bg-slate-50 font-sans selection:bg-cyan-500/20">
      
      {/* SEÇÃO 1: Hero */}
      <section id="sobre" className="scroll-mt-28 pt-8 pb-20 lg:pt-16 lg:pb-32 px-6 lg:px-8 w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-black text-slate-800 tracking-tight leading-[1.1]">
            A plataforma B2B definitiva para suas <span className="text-transparent bg-clip-text bg-sky-700">negociações médicas.</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Nascemos com um propósito claro: evitar o desperdício na saúde. O MedConnect é a ponte que conecta clínicas e profissionais que possuem insumos e materiais parados àqueles que realmente precisam, de forma rápida, segura e inteligente.
          </p>
        </div>

        {/* Elemento Visual Hero */}
        <div className="flex-1 w-full max-w-md lg:max-w-none relative">
          <div className="aspect-square rounded-3xl bg-linear-to-br from-sky-800 to-sky-900 p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center items-center">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/5 blur-2xl rounded-full" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black/20 blur-2xl rounded-full" />
            <p className="relative z-10 text-white text-lg font-semibold border-2 border-dashed border-white/30 p-8 rounded-xl">
              Sua Imagem Hero Aqui
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: Como Funciona */}
      <section id="como-funciona" className="scroll-mt-24 py-24 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight mb-4">
              Como funciona o MedConnect?
            </h2>
            <p className="text-lg text-slate-500">
              Simplificamos o processo para que você possa focar no que importa: salvar vidas e otimizar recursos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-linear-to-r from-slate-100 via-slate-200 to-slate-100" />
            
            {/* Renderização Dinâmica dos Passos */}
            {HOW_IT_WORKS_STEPS.map(({ id, title, description, Icon }) => (
              <div key={id} className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center mb-6 relative z-10 group-hover:-translate-y-2 transition-all duration-300">
                  <Icon className="w-10 h-10 text-sky-600" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-sky-700 text-white font-bold rounded-full flex items-center justify-center shadow-md border-2 border-white">
                    {id}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: Planos */}
      <section id="planos" className="scroll-mt-24 py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight mb-4">
            Um preço único, acesso completo.
          </h2>
          <p className="text-lg text-slate-500">
            Sem taxas escondidas. Assine e tenha liberdade total para gerenciar e conectar seus estoques.
          </p>
        </div>

        <div className="flex justify-center w-full">
          <Card className="w-full max-w-5xl overflow-hidden border-slate-200/60 shadow-2xl shadow-sky-950/10 grid grid-cols-1 md:grid-cols-5 p-0">
            <div className="bg-sky-900 p-10 md:col-span-2 flex flex-col justify-center items-center text-center relative overflow-hidden">
              <h3 className="text-xl font-bold text-slate-200 mb-2 z-10">Plano Profissional</h3>
              <div className="flex items-start justify-center gap-1 z-10">
                <span className="text-2xl font-bold text-slate-100 mt-2">R$</span>
                <span className="text-6xl font-black text-slate-100 tracking-tighter">15,99</span>
              </div>
              <span className="text-slate-300 font-medium mt-1 z-10">por mês  (R$191,98 anualmente)</span>
            </div>

            <CardContent className="p-10 md:col-span-3 flex flex-col justify-center bg-white border-none m-0">
              <h4 className="text-lg font-bold text-slate-800 mb-6">Tudo o que está incluído:</h4>
              <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-4 mb-8">
                {/* Renderização Dinâmica dos Benefícios */}
                {PLAN_FEATURES.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sky-700 shrink-0" />
                    <span className="text-slate-600 text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
                <Link href="/auth" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto h-12 px-8 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl text-md transition-all shadow-md">
                    Criar conta e Assinar
                  </Button>
                </Link>
                <p className="text-xs text-slate-400 text-center sm:text-left">
                  Cancele quando quiser.<br/>Pagamento seguro.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-sky-950 text-zinc-300 py-10 px-6 md:px-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <h2 className="font-extrabold text-xl text-white tracking-wider">MedConnect</h2>
            <p className="text-zinc-400">Conectando pacientes e especialistas com tecnologia e segurança.</p>
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
    </main>
  )
}