"use client"

import { useRef, useState, useEffect } from "react"
import { useAudioReactive } from "@/components/AudioContext"

const TRACKS = [
  "5 mintues.wav",
  "All my fault .wav",
  "Always Something.wav",
  "Down For U.wav",
  "Finally Free.wav",
  "Hiatus.wav",
  "Just Say Yes.wav",
  "Love Alone.wav",
  "Mechanical Groove.wav",
  "Possibilties.wav",
  "Pressure(House).wav",
  "The lucky ones.wav",
  "Who decides these things.wav",
]

export default function MusicWindow() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const animRef = useRef<number>(0)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const { setBassLevel, analyserRef, audioCtxRef } = useAudioReactive()

  const playTrack = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause()
      cancelAnimationFrame(animRef.current)
    }

    const audio = new Audio(`/music/${TRACKS[index]}`)
    audio.crossOrigin = "anonymous"
    audioRef.current = audio
    setCurrentTrack(index)
    setProgress(0)

    // Set up Web Audio API
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }

    const audioCtx = audioCtxRef.current

    // Create analyser
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 256
    analyserRef.current = analyser

    // Connect source → analyser → output
    if (sourceRef.current) {
      sourceRef.current.disconnect()
    }
    const source = audioCtx.createMediaElementSource(audio)
    sourceRef.current = source
    source.connect(analyser)
    analyser.connect(audioCtx.destination)

    audio.play()
    setPlaying(true)

    const dataArray = new Uint8Array(analyser.frequencyBinCount)

    const tick = () => {
      if (!analyserRef.current) return

      // Update progress
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }

      // Read bass frequencies (first 8 bins = roughly 0-200hz)
      analyserRef.current.getByteFrequencyData(dataArray)
      const bassSum = dataArray.slice(0, 8).reduce((a, b) => a + b, 0)
      const bassAvg = bassSum / 8 / 255 // normalise 0-1
      setBassLevel(bassAvg)

      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)

    audio.onended = () => {
      setPlaying(false)
      setProgress(0)
      setBassLevel(0)
      cancelAnimationFrame(animRef.current)
    }
  }

  const togglePlay = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      audioCtxRef.current?.suspend()
      setPlaying(false)
    } else {
      audioRef.current.play()
      audioCtxRef.current?.resume()
      setPlaying(true)
    }
  }

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      cancelAnimationFrame(animRef.current)
      setBassLevel(0)
    }
  }, [])

  return (
    <div style={styles.container}>
      <div style={styles.trackList}>
        {TRACKS.map((track, i) => (
          <div
            key={i}
            style={{
              ...styles.trackItem,
              backgroundColor: currentTrack === i ? "rgba(57,255,20,0.15)" : "transparent",
              borderLeft: currentTrack === i ? "3px solid #39ff14" : "3px solid transparent",
            }}
            onClick={() => playTrack(i)}
          >
            <span style={styles.trackNum}>{String(i + 1).padStart(2, "0")}</span>
            <span style={styles.trackName}>
              {playing && currentTrack === i ? "▶ " : ""}
              {track.replace(".wav", "")}
            </span>
          </div>
        ))}
      </div>

      <div style={styles.playerBar}>
        <div style={styles.nowPlaying}>
          {currentTrack !== null
            ? TRACKS[currentTrack].replace(".wav", "")
            : "SELECT A TRACK"}
        </div>

        <div style={styles.controls}>
          <button style={styles.btn} onClick={() => currentTrack !== null && playTrack(Math.max(0, currentTrack - 1))}>◀◀</button>
          <button style={styles.btn} onClick={togglePlay}>
            {playing ? "⏸" : "▶"}
          </button>
          <button style={styles.btn} onClick={() => currentTrack !== null && playTrack(Math.min(TRACKS.length - 1, currentTrack + 1))}>▶▶</button>
        </div>

        <div style={styles.progressOuter}>
          <div style={{ ...styles.progressInner, width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    gap: "8px",
  },
  trackList: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  trackItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 12px",
    cursor: "pointer",
    transition: "background 0.15s",
    borderRadius: "2px",
  },
  trackNum: {
    color: "#1a7a0a",
    fontSize: "0.7rem",
    minWidth: "20px",
    fontFamily: "'Courier New', monospace",
  },
  trackName: {
    color: "#39ff14",
    fontSize: "0.8rem",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.05em",
  },
  playerBar: {
    borderTop: "1px solid #39ff14",
    padding: "10px 0 4px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  nowPlaying: {
    color: "#39ff14",
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    textShadow: "0 0 8px rgba(57,255,20,0.8)",
    textAlign: "center",
    fontFamily: "'Courier New', monospace",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
  },
  btn: {
    backgroundColor: "#000",
    color: "#39ff14",
    border: "1px solid #39ff14",
    padding: "4px 14px",
    fontFamily: "'Courier New', monospace",
    fontSize: "0.8rem",
    cursor: "pointer",
    boxShadow: "0 0 6px rgba(57,255,20,0.3)",
  },
  progressOuter: {
    width: "100%",
    height: "6px",
    backgroundColor: "#111",
    border: "1px solid #39ff14",
  },
  progressInner: {
    height: "100%",
    backgroundColor: "#39ff14",
    boxShadow: "0 0 8px rgba(57,255,20,0.8)",
    transition: "width 0.1s linear",
  },
}