"use client"

import { useState, useEffect } from "react"

export function useClock(enabled: boolean): Date {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    if (!enabled) return
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [enabled])

  return now
}
