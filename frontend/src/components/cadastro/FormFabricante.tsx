"use client"

import React, { useEffect, useState } from "react"
import {
  AlertCircle,
  Calendar,
  Building2,
  Hash,
  Layers,
} from "lucide-react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import InputField from "./InputField"

import {
  CreateLoteForm,
  Fabricante,
  MatMed,
} from "@/types"

import servicesGetFabricantes from "@/server/(GET)-fabricantes"
import servicesGetMatMed from "@/server/(GET)-mat-med"
import servicesCreateLote from "@/server/(POST)-lote"

export default function FormLote() {
  const [fabricantes, setFabricantes] = useState<Fabricante[]>([])
  const [materiais, setMateriais] = useState<MatMed[]>([])
}