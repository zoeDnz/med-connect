"use client"
import React, { JSX, useEffect, useState } from "react"
import { PanelLeftOpen, PanelRightOpen, ShieldPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Logo from "@/components/layout/logo"

const ANIMATION_DURATION = 200

export default function SideBar(): JSX.Element {
  const [open, setOpen] = useState<boolean>(true)
  const [contentVisible, setContentVisible] = useState<boolean>(true)

  const handleToggle = (value: boolean) => {
    if (value) {
      setOpen(true)
      setTimeout(() => setContentVisible(true), ANIMATION_DURATION)
    } else {
      setContentVisible(false)
      setOpen(false)
    }
  }
  return (
    <div className={cn(
      open && "w-3/5",
      !open && "w-1/12",
      "flex flex-col h-screen gap-32 p-10",
      "bg-cyan-800 dark:bg-cyan-950 text-white rounded-r-4xl",
      "transition-all duration-300 ease-in-out"
    )}>
      <div className="w-full flex items-start justify-start">
        {open && (
          <Button
            variant="ghost"
            className="py-1.5 px-1.5"
            onClick={() => handleToggle(false)}
          >
            <PanelRightOpen className="size-6" />
          </Button>
        )}
        {!open && (
          <Button
            variant="ghost"
            className="py-1.5 px-1.5"
            onClick={() => handleToggle(true)}
          >
            <PanelLeftOpen className="size-6" />
          </Button>
        )}
      </div>
      {contentVisible && (
        <div className="w-2/3 h-full flex flex-col items-start justify-between">
          <div className="flex flex-col items-start justify-start gap-5">
            <ShieldPlus size={50} />
            <Logo isDark />
            <p className="">
              Bem-vindo ao MedConnect, a plataforma que conecta pacientes e médicos de forma rápida e eficiente. Agende consultas, acesse seu histórico médico e receba lembretes personalizados. Sua saúde, nossa prioridade!
            </p>
          </div>
          <div className="font-semibold text-sm text-white">
            Direitos autorais © 2024 MedConnect. Todos os direitos reservados.
          </div>
        </div>
      )}
    </div>
  )
}