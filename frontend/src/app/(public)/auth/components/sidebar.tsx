"use client"
import React, { JSX, useState } from "react"
import { PanelLeftOpen, PanelRightOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function SideBar(): JSX.Element {
  const [open, setOpen] = useState<boolean>(true)
  return (
    <div className={cn(
      open && "w-2/5",
      !open && "w-1/8",
      "h-screen flex p-10",
      "bg-cyan-800 text-white rounded-r-4xl",
      "transition-all duration-300 ease-in-out"
    )}>
      <div className="w-full flex items-start justify-start">
        {open && (
          <Button
            variant="ghost"
            className="py-1.5 px-1.5"
            onClick={() => setOpen(false)}
          >
            <PanelRightOpen className="size-6" />
          </Button>
        )}
        {!open && (
          <Button
            variant="ghost"
            className="py-1.5 px-1.5"
            onClick={() => setOpen(true)}
          >
            <PanelLeftOpen className="size-6" />
          </Button>
        )}
      </div>
    </div>
  )
}