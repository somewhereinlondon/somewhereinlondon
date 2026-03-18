"use client"

import { useState } from "react"
import BootScreen from "@/components/scenes/BootScreen"
import AsciiScroll from "@/components/scenes/AsciiScroll"
import MatrixTransition from "@/components/scenes/MatrixTransition"
import Desktop from "@/components/scenes/Desktop"

type Scene = "boot" | "ascii" | "matrix" | "desktop"

export default function Home() {
  const [scene, setScene] = useState<Scene>("boot")

  return (
    <main>
      {scene === "boot" && (
        <BootScreen onComplete={() => setScene("ascii")} />
      )}
      {scene === "ascii" && (
        <AsciiScroll onComplete={() => setScene("matrix")} />
      )}
      {scene === "matrix" && (
        <MatrixTransition onComplete={() => setScene("desktop")} />
      )}
      {scene === "desktop" && (
        <Desktop />
      )}
    </main>
  )
}