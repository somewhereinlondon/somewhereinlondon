"use client"

import { useEffect, useRef } from "react"

interface Props {
  onComplete: () => void
}

export default function MatrixTransition({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    let opacity = 1

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#39ff14"
      ctx.font = `${fontSize}px 'Courier New', monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 40)

    const fadeTimeout = setTimeout(() => {
      const fadeInterval = setInterval(() => {
        opacity -= 0.02
        canvas.style.opacity = String(Math.max(opacity, 0))
        if (opacity <= 0) {
          clearInterval(fadeInterval)
          onComplete()
        }
      }, 30)
    }, 7000)

    return () => {
      clearInterval(interval)
      clearTimeout(fadeTimeout)
    }
  }, [onComplete])

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        backgroundColor: "#000",
        width: "100vw",
        height: "100vh",
      }}
    />
  )
}