"use client"

import { useState, useEffect } from "react"
import AppWindow from "@/components/desktop/AppWindow"
import ArtworkWindow from "@/components/desktop/ArtworkWindow"
import MusicWindow from "@/components/desktop/MusicWindow"
import WebWindow from "@/components/desktop/WebWindow"
import AboutWindow from "@/components/desktop/AboutWindow"
import { useRouter } from "next/navigation"

const FOLDERS = [
  { id: "artwork", label: "Artwork", icon: "🎨", x: 40, y: 40 },
  { id: "music", label: "Music", icon: "🎵", x: 40, y: 160 },
  { id: "web", label: "Web Portfolio", icon: "🌐", x: 40, y: 280 },
  { id: "about", label: "About Me", icon: "👤", x: 40, y: 400 },
  { id: "donotclick", label: "DO NOT CLICK", icon: "⚠️", x: 40, y: 520 },
]

export default function Desktop() {
  const [time, setTime] = useState("")
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })
      )
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const openWindow = (id: string) => {
    if (!openWindows.includes(id)) {
      setOpenWindows((prev) => [...prev, id])
    }
  }

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id))
  }

  return (
    <div style={styles.desktop}>

      {FOLDERS.map((folder) => (
        <div
          key={folder.id}
          style={{ ...styles.folder, left: folder.x, top: folder.y }}
          onDoubleClick={() => openWindow(folder.id)}
onTouchEnd={() => openWindow(folder.id)}
        >
          <div style={styles.folderIcon}>{folder.icon}</div>
          <div style={styles.folderLabel}>{folder.label}</div>
        </div>
      ))}

      {openWindows.includes("artwork") && (
        <AppWindow title="ARTWORK" onClose={() => closeWindow("artwork")} width={720} height={520}>
          <ArtworkWindow />
        </AppWindow>
      )}

      {openWindows.includes("music") && (
        <AppWindow title="MUSIC" onClose={() => closeWindow("music")} width={500} height={550}>
          <MusicWindow />
        </AppWindow>
      )}

      {openWindows.includes("web") && (
        <AppWindow title="WEB PORTFOLIO" onClose={() => closeWindow("web")} width={550} height={450}>
          <WebWindow />
        </AppWindow>
      )}

      {openWindows.includes("about") && (
        <AppWindow title="ABOUT ME" onClose={() => closeWindow("about")} width={520} height={580}>
          <AboutWindow />
        </AppWindow>
      )}

      {openWindows.includes("donotclick") && (
        <AppWindow title="⚠️ DO NOT CLICK" onClose={() => closeWindow("donotclick")} width={400} height={200}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "16px" }}>
            <p style={{ color: "#ff0000", fontFamily: "'Courier New', monospace", textAlign: "center", lineHeight: "1.8" }}>
              YOU WERE WARNED.<br />THERE IS NO GOING BACK.
            </p>
            <button
              onClick={() => router.push("/donotclick")}
              style={{ backgroundColor: "#000", color: "#ff0000", border: "1px solid #ff0000", padding: "8px 24px", fontFamily: "'Courier New', monospace", cursor: "pointer", letterSpacing: "0.1em" }}
            >
              ENTER →
            </button>
          </div>
        </AppWindow>
      )}

      <div style={styles.taskbar}>
        <button style={styles.startBtn}>⊞ START</button>
        <div style={styles.clock}>{time}</div>
      </div>

    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  desktop: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Courier New', monospace",
  },
  folder: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    width: "80px",
    padding: "8px",
    borderRadius: "4px",
  },
  folderIcon: {
    fontSize: "2.5rem",
    filter: "drop-shadow(0 0 6px rgba(57,255,20,0.8))",
  },
  folderLabel: {
    color: "#39ff14",
    fontSize: "0.65rem",
    textAlign: "center",
    textShadow: "0 0 6px rgba(57,255,20,0.8)",
    letterSpacing: "0.05em",
    wordBreak: "break-word",
  },
  taskbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "44px",
    backgroundColor: "#111",
    borderTop: "1px solid #39ff14",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 12px",
  },
  startBtn: {
    backgroundColor: "#000",
    border: "1px solid #39ff14",
    color: "#39ff14",
    padding: "4px 16px",
    fontFamily: "'Courier New', monospace",
    fontWeight: "bold",
    fontSize: "0.85rem",
    cursor: "pointer",
    letterSpacing: "0.1em",
    textShadow: "0 0 6px rgba(57,255,20,0.8)",
    boxShadow: "0 0 8px rgba(57,255,20,0.3)",
  },
  clock: {
    fontSize: "0.8rem",
    color: "#39ff14",
    border: "1px solid #39ff14",
    padding: "2px 10px",
    letterSpacing: "0.1em",
    textShadow: "0 0 6px rgba(57,255,20,0.8)",
  },
}