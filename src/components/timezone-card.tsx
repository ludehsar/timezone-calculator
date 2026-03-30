"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "@phosphor-icons/react"
import {
  formatTimeInTimezone,
  formatDateInTimezone,
  formatTimezoneName,
  getUtcOffset,
  getTimePartsInTimezone,
} from "@/lib/timezones"
import clsx from "clsx"

function toTimeInputValue(hours: number, minutes: number): string {
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}

export function TimezoneCard({
  timezone,
  displayDate,
  isReference,
  onSetTime,
  onRemove,
}: {
  timezone: string
  displayDate: Date
  isReference: boolean
  onSetTime: (timezone: string, hours: number, minutes: number) => void
  onRemove: (timezone: string) => void
}) {
  const { city, region } = formatTimezoneName(timezone)
  const offset = getUtcOffset(timezone)
  const time = formatTimeInTimezone(displayDate, timezone)
  const date = formatDateInTimezone(displayDate, timezone)
  const { hours, minutes } = getTimePartsInTimezone(displayDate, timezone)

  return (
    <Card
      size="sm"
      className={clsx(isReference ? "ring-2 ring-primary" : "", "m-1")}
    >
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading font-medium">{city}</span>
            <span className="text-xs text-muted-foreground">{region}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
              {offset}
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => onRemove(timezone)}
            >
              <X className="size-3.5" />
            </Button>
          </div>
        </div>
        <div>
          <div className="font-mono text-3xl font-light tracking-tight">{time}</div>
          <div className="text-xs text-muted-foreground">{date}</div>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground">Set time</label>
          <input
            type="time"
            value={toTimeInputValue(hours, minutes)}
            onChange={(e) => {
              const [h, m] = e.target.value.split(":").map(Number)
              if (!isNaN(h) && !isNaN(m)) onSetTime(timezone, h, m)
            }}
            className="rounded-md border border-input bg-transparent px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </CardContent>
    </Card>
  )
}
