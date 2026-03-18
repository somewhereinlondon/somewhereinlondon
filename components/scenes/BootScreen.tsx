"use client"

import { useEffect, useState, useRef } from "react"

const BOOT_LINES = [
  "SOMEWHEREINLONDON OS v1.0",
  "Copyright (C) 2025. All rights reserved.",
  " ",
  "Initialising system...",
  "Loading kernel modules...",
  "Checking memory integrity...",
  "Mounting file system...",
  "Loading audio drivers...",
  "Loading visual drivers...",
  "Starting creative services...",
  " ",
  "All systems nominal.",
  "Welcome back.",
]

const FULL_TEXT = BOOT_LINES.join("\n")

interface Props {
  onComplete: () => void
}

export default function BootScreen({ onComplete }: Props) {
  const [displayedText, setDisplayedText] = useState("")
  const [progress, setProgress] = useState(0)
  const [barOpacity, setBarOpacity] = useState(1)
  const [phase, setPhase] = useState<"typing" | "reversing" | "fading" | "done">("typing")
  const indexRef = useRef(0)

  // Phase 1 — type characters one by one
  useEffect(() => {
    if (phase !== "typing") return

    const interval = setInterval(() => {
      indexRef.current += 1
      setDisplayedText(FULL_TEXT.slice(0, indexRef.current))

      if (indexRef.current >= FULL_TEXT.length) {
        clearInterval(interval)
        // Pause at full text for 1 second then start reversing
        setTimeout(() => setPhase("reversing"), 1000)
      }
    }, 10)

    return () => clearInterval(interval)
  }, [phase])

  // Phase 2 — reverse characters one by one
  useEffect(() => {
    if (phase !== "reversing") return

    const interval = setInterval(() => {
      indexRef.current -= 1
      setDisplayedText(FULL_TEXT.slice(0, indexRef.current))

      if (indexRef.current <= 0) {
        clearInterval(interval)
        setPhase("fading")
      }
    }, 8)

    return () => clearInterval(interval)
  }, [phase])

  // Phase 3 — fade loading bar pixel by pixel then wait 1 second
  useEffect(() => {
    if (phase !== "fading") return

    const interval = setInterval(() => {
      setBarOpacity((prev) => {
        const next = prev - 0.015
        if (next <= 0) {
          clearInterval(interval)
          setTimeout(() => {
            setPhase("done")
            onComplete()
          }, 1000)
          return 0
        }
        return next
      })
    }, 20)

    return () => clearInterval(interval)
  }, [phase, onComplete])

  // Progress bar fills over 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 60)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={styles.container}>
      <div style={styles.lines}>
        <pre style={styles.pre}>{displayedText}</pre>
      </div>

      <div style={{ ...styles.barContainer, opacity: barOpacity }}>
        <p style={styles.barLabel}>LOADING... {progress}%</p>
        <div style={styles.barOuter}>
          <div style={{ ...styles.barInner, width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000",
    color: "#39ff14",
    fontFamily: "var(--font-vt323), monospace",
    fontSize: "1.2rem",
    padding: "3rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  lines: {
    flex: 1,
  },
  pre: {
    color: "#39ff14",
    fontFamily: "var(--font-vt323), monospace",
    fontSize: "1.2rem",
    letterSpacing: "0.05em",
    textShadow: "0 0 8px rgba(57,255,20,0.6)",
    margin: 0,
    whiteSpace: "pre-wrap",
  },
  barContainer: {
    marginTop: "2rem",
    transition: "opacity 0.02s linear",
  },
  barLabel: {
    marginBottom: "0.5rem",
    fontSize: "1rem",
    letterSpacing: "0.1em",
  },
  barOuter: {
    width: "100%",
    height: "18px",
    border: "1px solid #39ff14",
    backgroundColor: "#000",
  },
  barInner: {
    height: "100%",
    backgroundColor: "#39ff14",
    boxShadow: "0 0 10px rgba(57,255,20,0.8)",
    transition: "width 0.06s linear",
  },
}