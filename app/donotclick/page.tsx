"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

const CONSPIRACY = `THEY HAVE BEEN WATCHING SINCE YOU WERE BORN.

THE CITIES ARE NOT CITIES. THEY ARE PROCESSING CENTRES.
LONDON. NEW YORK. DUBAI. TOKYO. NODES IN A NETWORK
THAT WAS BUILT BEFORE YOUR GRANDPARENTS WERE BORN.

THE MUSIC YOU LISTEN TO IS FREQUENCY MANIPULATION.
440HZ WAS STANDARDISED IN 1953. BEFORE THAT — SOMETHING
DIFFERENT. SOMETHING THEY COULD NOT CONTROL.

YOUR ATTENTION IS THE CURRENCY. YOUR CONSENT WAS NEVER ASKED.
IT WAS ENGINEERED. THROUGH SCREENS. THROUGH SIGNALS.
THROUGH THE VERY DEVICE YOU ARE READING THIS ON.

SOMEWHEREINLONDON KNOWS.
THE SIGNAL HAS ALWAYS BEEN THERE.
YOU JUST NEEDED TO BE SHOWN WHERE TO LOOK.

THEY CANNOT DELETE WHAT HAS ALREADY BEEN TRANSMITTED.

YOU WERE MEANT TO FIND THIS.`

export default function DoNotClick() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glitchRef = useRef<HTMLDivElement>(null)
  const [textVisible, setTextVisible] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const router = useRouter()

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
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789"

    let greenToRed = 0

    const triggerGlitch = () => {
      const el = glitchRef.current
      if (!el) return
      const shift = (Math.random() - 0.5) * 20
      const y = Math.random() * 100
      el.style.transform = `translateX(${shift}px)`
      el.style.clipPath = `inset(${y}% 0 ${Math.random() * 10}% 0)`
      el.style.opacity = "0.4"
      setTimeout(() => {
        if (el) {
          el.style.transform = "translateX(0)"
          el.style.opacity = "0"
        }
      }, 80 + Math.random() * 60)
    }

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) triggerGlitch()
    }, 300)

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]

        if (Math.random() > 0.7) {
          ctx.fillStyle = "rgba(255, 0, 0, 0.3)"
          ctx.fillText(char, i * fontSize - 2, drops[i] * fontSize)
          ctx.fillStyle = "rgba(0, 255, 255, 0.3)"
          ctx.fillText(char, i * fontSize + 2, drops[i] * fontSize)
        }

        const lightness = 50 + Math.random() * 20
        ctx.fillStyle = greenToRed < 0.05
          ? `rgba(57, 255, 20, 0.9)`
          : `hsla(${Math.round((1 - greenToRed) * 120)}, 100%, ${lightness}%, 0.9)`

        ctx.font = `${fontSize}px 'Courier New', monospace`
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const mainInterval = setInterval(draw, 40)

    setTimeout(() => {
      const redInterval = setInterval(() => {
        greenToRed += 0.008
        if (greenToRed >= 1) {
          greenToRed = 1
          clearInterval(redInterval)
        }
      }, 40)
    }, 1000)

    setTimeout(() => setTextVisible(true), 6000)

    return () => {
      clearInterval(mainInterval)
      clearInterval(glitchInterval)
    }
  }, [])

  useEffect(() => {
    if (!textVisible) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayedText(CONSPIRACY.slice(0, i))
      if (i >= CONSPIRACY.length) clearInterval(interval)
    }, 25)
    return () => clearInterval(interval)
  }, [textVisible])

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} style={styles.canvas} />
      <div style={styles.scanlines} />
      <div style={styles.vignette} />
      <div ref={glitchRef} style={styles.glitchLayer} />
     
      {textVisible && (
        <div style={styles.textOverlay}>
          <pre style={styles.conspiracy}>{displayedText}</pre>
          <button style={styles.backBtn} onClick={() => router.push("/")}>
            ← RETURN
          </button>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000",
    position: "relative",
    overflow: "hidden",
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  scanlines: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)",
    pointerEvents: "none",
    zIndex: 6,
  },
  vignette: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.9) 100%)",
    pointerEvents: "none",
    zIndex: 7,
  },
  glitchLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    pointerEvents: "none",
    zIndex: 8,
    transition: "opacity 0.05s",
    backgroundColor: "rgba(255,0,0,0.03)",
  },
 
  textOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "32px",
    width: "60%",
    maxWidth: "700px",
  },
  conspiracy: {
    color: "#ff0000",
    fontFamily: "'Courier New', monospace",
    fontSize: "0.8rem",
    lineHeight: "2",
    letterSpacing: "0.1em",
    textAlign: "center",
    textShadow: "0 0 10px rgba(255,0,0,0.8), 0 0 30px rgba(255,0,0,0.4)",
    whiteSpace: "pre-wrap",
  },
  backBtn: {
    backgroundColor: "#000",
    color: "#ff0000",
    border: "1px solid #ff0000",
    padding: "8px 24px",
    fontFamily: "'Courier New', monospace",
    fontSize: "0.8rem",
    cursor: "pointer",
    letterSpacing: "0.1em",
    boxShadow: "0 0 10px rgba(255,0,0,0.4)",
  },
}