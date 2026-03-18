"use client"

import { useRef, useState, useEffect } from "react"

interface Props {
  title: string
  onClose: () => void
  children: React.ReactNode
  width?: number
  height?: number
}

export default function AppWindow({
  title,
  onClose,
  children,
  width = 600,
  height = 400,
}: Props) {
  const windowRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 100, y: 80 })
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    }
  }

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return
      setPos({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      })
    }
    const onMouseUp = () => {
      dragging.current = false
    }
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [])

  return (
    <div
      ref={windowRef}
      style={{
        ...styles.window,
        width,
        height,
        left: pos.x,
        top: pos.y,
      }}
    >
      {/* Title bar */}
      <div style={styles.titleBar} onMouseDown={onMouseDown}>
        <span style={styles.titleText}>{title}</span>
        <div style={styles.controls}>
          <button style={styles.controlBtn}>─</button>
          <button style={styles.controlBtn}>□</button>
          <button
            style={{ ...styles.controlBtn, ...styles.closeBtn }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>{children}</div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  window: {
    position: "absolute",
    backgroundColor: "#000",
    border: "1px solid #39ff14",
    boxShadow: "0 0 20px rgba(57,255,20,0.3), 0 0 60px rgba(57,255,20,0.1)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Courier New', monospace",
    zIndex: 100,
  },
  titleBar: {
    backgroundColor: "#39ff14",
    padding: "4px 8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "grab",
    userSelect: "none",
  },
  titleText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: "0.8rem",
    letterSpacing: "0.1em",
  },
  controls: {
    display: "flex",
    gap: "4px",
  },
  controlBtn: {
    backgroundColor: "#000",
    color: "#39ff14",
    border: "1px solid #39ff14",
    width: "20px",
    height: "20px",
    fontSize: "0.6rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  closeBtn: {
    color: "#ff0000",
    borderColor: "#ff0000",
  },
  content: {
    flex: 1,
    overflow: "auto",
    padding: "12px",
    color: "#39ff14",
  },
}