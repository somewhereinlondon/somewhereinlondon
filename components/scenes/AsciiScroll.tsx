"use client"

import { useEffect, useRef, useState } from "react"

interface Props {
  onComplete: () => void
}

export default function AsciiScroll({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ascii, setAscii] = useState<string>("")

  useEffect(() => {
    fetch("/ascii.txt")
      .then((res) => res.text())
      .then((text) => setAscii(text))
  }, [])

  useEffect(() => {
    if (!ascii || !containerRef.current) return

    const el = containerRef.current
    el.style.transform = "translateX(100vw)"
    el.style.transition = "none"

    const start = setTimeout(() => {
      el.style.transition = "transform 18s linear"
      el.style.transform = "translateX(-250%)"
    }, 100)

    const end = setTimeout(() => {
        onComplete()
      }, 10200)

    return () => {
      clearTimeout(start)
      clearTimeout(end)
    }
  }, [ascii, onComplete])

  return (
    <div style={styles.container}>
      <div ref={containerRef} style={styles.textWrapper}>
        <pre style={styles.pre}>{ascii}</pre>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
  textWrapper: {
    whiteSpace: "nowrap",
    willChange: "transform",
  },
  pre: {
    color: "#39ff14",
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: "0.5625rem",
    fontWeight: "bold",
    lineHeight: "1.2",
    letterSpacing: "0.05em",
    textShadow: "0 0 8px rgba(57,255,20,0.7)",
    margin: 0,
    padding: 0,
  },
}