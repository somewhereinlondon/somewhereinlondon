"use client"

import { useRef, useState } from "react"

const ITEMS = [
    { type: "image", src: "/Artwork/image1.jpg" },
    { type: "image", src: "/Artwork/image2.jpg" },
    { type: "image", src: "/Artwork/image3.jpg" },
    { type: "image", src: "/Artwork/image4.jpg" },
    { type: "video", src: "/Artwork/vid1.mp4" },
  ]
  
export default function ArtworkWindow() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [hovering, setHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = gridRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  const getFisheyeStyle = (index: number): React.CSSProperties => {
    if (!hovering) return {}

    const col = index % 3
    const row = Math.floor(index / 3)
    const itemX = (col + 0.5) / 3
    const itemY = (row + 0.5) / 2

    const dx = itemX - mouse.x
    const dy = itemY - mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const maxDist = 0.6
    const strength = Math.max(0, 1 - dist / maxDist)

    const scale = 1 + strength * 0.35
    const translateX = -dx * strength * 30
    const translateY = -dy * strength * 30

    return {
      transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
      zIndex: Math.round(strength * 10),
      filter: `drop-shadow(0 0 ${strength * 12}px rgba(57,255,20,0.9))`,
    }
  }

  return (
    <div
      ref={gridRef}
      style={styles.grid}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {ITEMS.map((item, i) => (
        <div key={i} style={{ ...styles.cell, ...getFisheyeStyle(i) }}>
          {item.type === "image" ? (
            <img
              src={item.src}
              alt={`artwork ${i + 1}`}
              style={styles.media}
            />
          ) : (
            <video
              src={item.src}
              style={styles.media}
              autoPlay
              muted
              loop
              playsInline
            />
          )}
        </div>
      ))}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    gap: "8px",
    width: "100%",
    height: "100%",
    padding: "4px",
    boxSizing: "border-box",
  },
  cell: {
    overflow: "hidden",
    border: "1px solid #39ff14",
    transition: "transform 0.15s ease, filter 0.15s ease",
    position: "relative",
    cursor: "pointer",
  },
  media: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
}