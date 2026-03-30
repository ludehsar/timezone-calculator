"use client"

import { useState, useMemo } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { MagnifyingGlass } from "@phosphor-icons/react"
import { getTimezoneList } from "@/lib/timezones"

export function TimezoneSearch({
  selectedTimezones,
  onSelect,
}: {
  selectedTimezones: string[]
  onSelect: (timezone: string) => void
}) {
  const [open, setOpen] = useState(false)
  const groups = useMemo(() => getTimezoneList(), [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 font-normal text-muted-foreground"
        >
          <MagnifyingGlass className="size-4" />
          Search timezones...
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search timezones..." />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.region} heading={group.region}>
                {group.timezones.map((tz) => {
                  const isSelected = selectedTimezones.includes(tz.value)
                  return (
                    <CommandItem
                      key={tz.value}
                      value={`${tz.label} ${tz.value} ${tz.searchAliases}`}
                      data-checked={isSelected}
                      disabled={isSelected}
                      onSelect={() => {
                        onSelect(tz.value)
                        setOpen(false)
                      }}
                    >
                      <span>{tz.label}</span>
                      {tz.searchAliases && (
                        <span className="ml-auto text-xs text-muted-foreground">
                          {tz.searchAliases.split(" ").slice(0, 2).join(", ")}
                        </span>
                      )}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
