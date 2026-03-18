"use client"

import { useState, useEffect } from "react"
import BootScreen from "@/components/scenes/BootScreen"
import AsciiScroll from "@/components/scenes/AsciiScroll"
import MatrixTransition from "@/components/scenes/MatrixTransition"
import Desktop from "@/components/scenes/Desktop"
import { AudioReactiveProvider } from "@/components/AudioContext"

type Scene = "boot" | "ascii" | "matrix" | "desktop"

export default function Home() {
  const [scene, setScene] = useState<Scene>("boot")

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "1") setScene("boot")
      if (e.key === "2") setScene("ascii")
      if (e.key === "3") setScene("matrix")
      if (e.key === "4") setScene("desktop")
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

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
        <AudioReactiveProvider>
          <Desktop />
        </AudioReactiveProvider>
      )}
    </main>
  )
}