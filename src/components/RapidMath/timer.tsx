"use client"

import { useEffect, useState } from "react"

interface TimerProps {
  isActive: boolean
  onTimeUpdate?: (seconds: number) => void
}

export function Timer({ isActive, onTimeUpdate }: TimerProps) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const newSeconds = prev + 1
        onTimeUpdate?.(newSeconds)
        return newSeconds
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, onTimeUpdate])

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return <div className="text-2xl font-bold text-primary">⏱️ {formatTime(seconds)}</div>
}
