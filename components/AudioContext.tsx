"use client"

import { createContext, useContext, useState, useRef } from "react"

interface AudioContextType {
  bassLevel: number
  setBassLevel: (level: number) => void
  analyserRef: React.MutableRefObject<AnalyserNode | null>
  audioCtxRef: React.MutableRefObject<AudioContext | null>
}

const AudioReactiveContext = createContext<AudioContextType>({
  bassLevel: 0,
  setBassLevel: () => {},
  analyserRef: { current: null },
  audioCtxRef: { current: null },
})

export function AudioReactiveProvider({ children }: { children: React.ReactNode }) {
  const [bassLevel, setBassLevel] = useState(0)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  return (
    <AudioReactiveContext.Provider value={{ bassLevel, setBassLevel, analyserRef, audioCtxRef }}>
      {children}
    </AudioReactiveContext.Provider>
  )
}

export function useAudioReactive() {
  return useContext(AudioReactiveContext)
}