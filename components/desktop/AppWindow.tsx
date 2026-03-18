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
  const [pos, setPos] = useState({ x: 20, y: 40 })
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    }
  }

  // Touch drag
  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    dragging.current = true
    offset.current = {
      x: touch.clientX - pos.x,
      y: touch.clientY - pos.y,
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

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return
      const touch = e.touches[0]
      setPos({
        x: touch.clientX - offset.current.x,
        y: touch.clientY - offset.current.y,
      })
    }

    const onTouchEnd = () => {
      dragging.current = false
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    window.addEventListener("touchmove", onTouchMove)
    window.addEventListener("touchend", onTouchEnd)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  // Make windows fit mobile screen
  const maxWidth = typeof window !== "undefined" ? window.innerWidth - 20 : width
  const maxHeight = typeof window !== "undefined" ? window.innerHeight - 60 : height
  const actualWidth = Math.min(width, maxWidth)
  const actualHeight = Math.min(height, maxHeight)

  return (
    <div
      ref={windowRef}
      style={{
        ...styles.window,
        width: actualWidth,
        height: actualHeight,
        left: pos.x,
        top: pos.y,
      }}
    >
      <div
        style={styles.titleBar}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <span style={styles.titleText}>{title}</span>
        <div style={styles.controls}>
          <button style={styles.controlBtn}>─</button>
          <button style={styles.controlBtn}>□</button>
          <button
            style={{ ...styles.controlBtn, ...styles.closeBtn }}
            onClick={onClose}
            onTouchEnd={onClose}
          >
            ✕
          </button>
        </div>
      </div>
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
    touchAction: "none",
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
    width: "24px",
    height: "24px",
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