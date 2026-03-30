"use client"

import { useState, useEffect } from "react"
import { TimezoneSearch } from "@/components/timezone-search"
import { TimezoneCard } from "@/components/timezone-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ArrowCounterClockwise } from "@phosphor-icons/react"
import { useClock } from "@/hooks/use-clock"
import { createDateInTimezone } from "@/lib/timezones"

type ReferenceTime = {
  timezone: string
  date: Date
} | null

export function TimezoneCalculator() {
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([])
  const [referenceTime, setReferenceTime] = useState<ReferenceTime>(null)
  const currentTick = useClock(referenceTime === null)

  const displayDate = referenceTime?.date ?? currentTick

  const handleAdd = (timezone: string) => {
    setSelectedTimezones((prev) => [...prev, timezone])
  }

  const handleRemove = (timezone: string) => {
    setSelectedTimezones((prev) => prev.filter((tz) => tz !== timezone))
    if (referenceTime?.timezone === timezone) {
      setReferenceTime(null)
    }
  }

  const handleSetTime = (timezone: string, hours: number, minutes: number) => {
    setReferenceTime({
      timezone,
      date: createDateInTimezone(hours, minutes, timezone),
    })
  }

  const handleReset = () => {
    setReferenceTime(null)
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <TimezoneSearch
        selectedTimezones={selectedTimezones}
        onSelect={handleAdd}
      />

      {selectedTimezones.length > 0 && (
        <ScrollArea className="max-h-[70vh]">
          <div className="flex flex-col gap-3">
            {selectedTimezones.map((tz) => (
              <TimezoneCard
                key={tz}
                timezone={tz}
                displayDate={displayDate}
                isReference={referenceTime?.timezone === tz}
                onSetTime={handleSetTime}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </ScrollArea>
      )}

      {referenceTime && (
        <Button
          variant="outline"
          size="sm"
          className="self-center gap-2"
          onClick={handleReset}
        >
          <ArrowCounterClockwise className="size-4" />
          Reset to live time
        </Button>
      )}

      {selectedTimezones.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Search and select timezones to get started
        </p>
      )}
    </div>
  )
}
