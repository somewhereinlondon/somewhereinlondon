"use client"

import { useState } from "react"

const SITES = [
    { title: "SoundCloud", url: "https://soundcloud.com/fxdedmusic", desc: "Music & productions" },
    { title: "Instagram", url: "https://www.instagram.com/somewhereinlondonnn", desc: "Visual work & updates" },
    { title: "TikTok", url: "https://www.tiktok.com/@somewhereinlondonn", desc: "Short form content" },
    { title: "LinkedIn", url: "https://www.linkedin.com/in/robel-hailemichael-7a02b9394", desc: "Professional profile" },
  ]

export default function WebWindow() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div style={styles.container}>
      <p style={styles.header}>// SELECTED WORKS</p>
      <div style={styles.list}>
        {SITES.map((site, i) => (
          <a key={i} href={site.url} target="_blank" rel="noopener noreferrer" style={{ ...styles.item, backgroundColor: hovered === i ? "rgba(57,255,20,0.1)" : "transparent", borderLeft: hovered === i ? "3px solid #39ff14" : "3px solid #1a7a0a" }} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <div style={styles.itemTop}>
              <span style={styles.arrow}>{hovered === i ? "▶" : "─"}</span>
              <span style={styles.title}>{site.title}</span>
            </div>
            <span style={styles.desc}>{site.desc}</span>
            <span style={styles.url}>{site.url}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    gap: "12px",
  },
  header: {
    color: "#1a7a0a",
    fontSize: "0.75rem",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.1em",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    overflowY: "auto",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    padding: "10px 14px",
    textDecoration: "none",
    transition: "all 0.15s",
    cursor: "pointer",
  },
  itemTop: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  arrow: {
    color: "#39ff14",
    fontSize: "0.7rem",
    width: "12px",
  },
  title: {
    color: "#39ff14",
    fontSize: "0.9rem",
    fontFamily: "'Courier New', monospace",
    fontWeight: "bold",
    letterSpacing: "0.05em",
    textShadow: "0 0 6px rgba(57,255,20,0.6)",
  },
  desc: {
    color: "#1a7a0a",
    fontSize: "0.7rem",
    fontFamily: "'Courier New', monospace",
    paddingLeft: "20px",
  },
  url: {
    color: "#39ff14",
    fontSize: "0.65rem",
    fontFamily: "'Courier New', monospace",
    paddingLeft: "20px",
    opacity: 0.5,
  },
}