import React, { JSX } from "react"
import SideBar from "./components/sidebar"
import Form from "./components/form"
import { ModeToggle } from "@/components/ui/toggle-theme"

export default function Auth(): JSX.Element {

  return (
    <div className="w-screen h-screen flex relative">
      <SideBar />
      <Form />
      <div className="absolute top-5 right-5">
        <ModeToggle />
      </div>
    </div>
  )
}