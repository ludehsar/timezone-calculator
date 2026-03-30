export type TimezoneEntry = {
  value: string
  label: string
  searchAliases: string
}

export type TimezoneGroup = {
  region: string
  timezones: TimezoneEntry[]
}

const TIMEZONE_ALIASES: Record<string, string[]> = {
  "America/New_York": ["EST", "Eastern", "United States", "USA"],
  "America/Chicago": ["CST", "Central", "United States", "USA"],
  "America/Denver": ["MST", "Mountain", "United States", "USA"],
  "America/Los_Angeles": ["PST", "Pacific", "United States", "USA"],
  "America/Anchorage": ["AKST", "Alaska", "United States", "USA"],
  "Pacific/Honolulu": ["HST", "Hawaii", "United States", "USA"],
  "America/Phoenix": ["MST", "Arizona", "United States", "USA"],
  "Asia/Dhaka": ["BST", "Bangladesh"],
  "Asia/Calcutta": ["IST", "India"],
  "Asia/Tokyo": ["JST", "Japan"],
  "Asia/Shanghai": ["CST", "China"],
  "Asia/Hong_Kong": ["HKT", "China"],
  "Asia/Seoul": ["KST", "South Korea", "Korea"],
  "Asia/Singapore": ["SGT", "Singapore"],
  "Asia/Dubai": ["GST", "UAE", "United Arab Emirates"],
  "Asia/Karachi": ["PKT", "Pakistan"],
  "Asia/Colombo": ["IST", "Sri Lanka"],
  "Asia/Katmandu": ["NPT", "Nepal"],
  "Asia/Bangkok": ["ICT", "Thailand"],
  "Asia/Jakarta": ["WIB", "Indonesia"],
  "Asia/Kuala_Lumpur": ["MYT", "Malaysia"],
  "Asia/Manila": ["PHT", "Philippines"],
  "Asia/Taipei": ["CST", "Taiwan"],
  "Asia/Saigon": ["ICT", "Vietnam"],
  "Asia/Riyadh": ["AST", "Saudi Arabia"],
  "Asia/Tehran": ["IRST", "Iran"],
  "Asia/Jerusalem": ["IST", "Israel"],
  "Asia/Baghdad": ["AST", "Iraq"],
  "Asia/Kabul": ["AFT", "Afghanistan"],
  "Asia/Tbilisi": ["GET", "Georgia"],
  "Asia/Yerevan": ["AMT", "Armenia"],
  "Asia/Baku": ["AZT", "Azerbaijan"],
  "Europe/London": ["GMT", "BST", "United Kingdom", "UK", "England", "Scotland", "Wales", "Great Britain"],
  "Europe/Paris": ["CET", "CEST", "France"],
  "Europe/Berlin": ["CET", "CEST", "Germany"],
  "Europe/Madrid": ["CET", "CEST", "Spain"],
  "Europe/Rome": ["CET", "CEST", "Italy"],
  "Europe/Amsterdam": ["CET", "CEST", "Netherlands"],
  "Europe/Brussels": ["CET", "CEST", "Belgium"],
  "Europe/Zurich": ["CET", "CEST", "Switzerland"],
  "Europe/Vienna": ["CET", "CEST", "Austria"],
  "Europe/Stockholm": ["CET", "CEST", "Sweden"],
  "Europe/Oslo": ["CET", "CEST", "Norway"],
  "Europe/Copenhagen": ["CET", "CEST", "Denmark"],
  "Europe/Helsinki": ["EET", "EEST", "Finland"],
  "Europe/Warsaw": ["CET", "CEST", "Poland"],
  "Europe/Prague": ["CET", "CEST", "Czech Republic", "Czechia"],
  "Europe/Budapest": ["CET", "CEST", "Hungary"],
  "Europe/Bucharest": ["EET", "EEST", "Romania"],
  "Europe/Athens": ["EET", "EEST", "Greece"],
  "Europe/Istanbul": ["TRT", "Turkey", "Türkiye"],
  "Europe/Moscow": ["MSK", "Russia"],
  "Europe/Kiev": ["EET", "EEST", "Ukraine"],
  "Europe/Lisbon": ["WET", "WEST", "Portugal"],
  "Europe/Dublin": ["GMT", "IST", "Ireland"],
  "Europe/Belgrade": ["CET", "CEST", "Serbia"],
  "Europe/Sofia": ["EET", "EEST", "Bulgaria"],
  "Europe/Riga": ["EET", "EEST", "Latvia"],
  "Europe/Tallinn": ["EET", "EEST", "Estonia"],
  "Europe/Vilnius": ["EET", "EEST", "Lithuania"],
  "Europe/Minsk": ["MSK", "Belarus"],
  "Australia/Sydney": ["AEST", "AEDT", "Australia"],
  "Australia/Melbourne": ["AEST", "AEDT", "Australia"],
  "Australia/Brisbane": ["AEST", "Australia", "Queensland"],
  "Australia/Perth": ["AWST", "Australia", "Western Australia"],
  "Australia/Adelaide": ["ACST", "ACDT", "Australia", "South Australia"],
  "Australia/Darwin": ["ACST", "Australia", "Northern Territory"],
  "Australia/Hobart": ["AEST", "AEDT", "Australia", "Tasmania"],
  "Pacific/Auckland": ["NZST", "NZDT", "New Zealand"],
  "Pacific/Fiji": ["FJT", "Fiji"],
  "Pacific/Guam": ["ChST", "Guam"],
  "America/Toronto": ["EST", "EDT", "Canada"],
  "America/Vancouver": ["PST", "PDT", "Canada"],
  "America/Edmonton": ["MST", "MDT", "Canada", "Alberta"],
  "America/Winnipeg": ["CST", "CDT", "Canada", "Manitoba"],
  "America/Halifax": ["AST", "ADT", "Canada", "Nova Scotia"],
  "America/St_Johns": ["NST", "NDT", "Canada", "Newfoundland"],
  "America/Sao_Paulo": ["BRT", "Brazil"],
  "America/Argentina/Buenos_Aires": ["ART", "Argentina"],
  "America/Mexico_City": ["CST", "Mexico"],
  "America/Bogota": ["COT", "Colombia"],
  "America/Lima": ["PET", "Peru"],
  "America/Santiago": ["CLT", "Chile"],
  "America/Caracas": ["VET", "Venezuela"],
  "America/Havana": ["CST", "Cuba"],
  "America/Jamaica": ["EST", "Jamaica"],
  "America/Panama": ["EST", "Panama"],
  "America/Costa_Rica": ["CST", "Costa Rica"],
  "Africa/Cairo": ["EET", "Egypt"],
  "Africa/Lagos": ["WAT", "Nigeria"],
  "Africa/Johannesburg": ["SAST", "South Africa"],
  "Africa/Nairobi": ["EAT", "Kenya"],
  "Africa/Casablanca": ["WET", "WEST", "Morocco"],
  "Africa/Accra": ["GMT", "Ghana"],
  "Africa/Addis_Ababa": ["EAT", "Ethiopia"],
  "Africa/Dar_es_Salaam": ["EAT", "Tanzania"],
  "Africa/Kampala": ["EAT", "Uganda"],
  "Africa/Khartoum": ["CAT", "Sudan"],
  "Africa/Algiers": ["CET", "Algeria"],
  "Africa/Tunis": ["CET", "Tunisia"],
  "Africa/Tripoli": ["EET", "Libya"],
}

export function getSearchAliases(iana: string): string {
  return (TIMEZONE_ALIASES[iana] ?? []).join(" ")
}

export function getTimezoneList(): TimezoneGroup[] {
  const allTimezones = Intl.supportedValuesOf("timeZone")
  const grouped = new Map<string, TimezoneEntry[]>()

  for (const tz of allTimezones) {
    const slashIndex = tz.indexOf("/")
    if (slashIndex === -1) continue
    const region = tz.slice(0, slashIndex)
    const city = tz.slice(slashIndex + 1).replaceAll("_", " ")
    if (!grouped.has(region)) grouped.set(region, [])
    grouped.get(region)!.push({
      value: tz,
      label: city,
      searchAliases: getSearchAliases(tz),
    })
  }

  return Array.from(grouped.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([region, timezones]) => ({
      region,
      timezones: timezones.sort((a, b) => a.label.localeCompare(b.label)),
    }))
}

export function formatTimeInTimezone(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date)
}

export function formatDateInTimezone(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export function getUtcOffset(timezone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "shortOffset",
  }).formatToParts(new Date())
  return parts.find((p) => p.type === "timeZoneName")?.value ?? ""
}

export function formatTimezoneName(iana: string): {
  city: string
  region: string
} {
  const slashIndex = iana.indexOf("/")
  if (slashIndex === -1) return { city: iana, region: "" }
  const region = iana.slice(0, slashIndex)
  const city = iana
    .slice(iana.lastIndexOf("/") + 1)
    .replaceAll("_", " ")
  return { city, region }
}

export function getTimePartsInTimezone(
  date: Date,
  timezone: string
): { hours: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date)

  const hours = Number(parts.find((p) => p.type === "hour")?.value ?? 0)
  const minutes = Number(parts.find((p) => p.type === "minute")?.value ?? 0)
  return { hours: hours === 24 ? 0 : hours, minutes }
}

export function createDateInTimezone(
  hours: number,
  minutes: number,
  timezone: string
): Date {
  const now = new Date()
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).formatToParts(now)

  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0)

  const currentInTz = new Date(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour") === 24 ? 0 : get("hour"),
    get("minute"),
    get("second")
  )

  const targetInTz = new Date(
    get("year"),
    get("month") - 1,
    get("day"),
    hours,
    minutes,
    0
  )

  const diffMs = targetInTz.getTime() - currentInTz.getTime()
  return new Date(now.getTime() + diffMs)
}
