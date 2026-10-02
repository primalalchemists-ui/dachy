const TIME_ZONE = "Europe/Warsaw";

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: TIME_ZONE,
});

const dateTimeFormatter = new Intl.DateTimeFormat("pl-PL", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TIME_ZONE,
});

/** 02.10.2026 */
export function formatDate(iso: string) {
  return dateFormatter.format(new Date(iso));
}

/** 02.10.2026, 14:30 */
export function formatDateTime(iso: string) {
  return dateTimeFormatter.format(new Date(iso));
}

/** +48500000000 → +48 500 000 000 */
export function formatPhone(phone: string) {
  const match = /^\+48(\d{3})(\d{3})(\d{3})$/.exec(phone);
  return match ? `+48 ${match[1]} ${match[2]} ${match[3]}` : phone;
}

const partsFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: TIME_ZONE,
});

function warsawParts(date: Date) {
  const parts = Object.fromEntries(partsFormatter.formatToParts(date).map((part) => [part.type, part.value]));
  return { year: parts.year, month: parts.month, day: parts.day, hour: parts.hour, minute: parts.minute };
}

function warsawOffsetMs(timestamp: number) {
  const { year, month, day, hour, minute } = warsawParts(new Date(timestamp));
  return Date.UTC(+year, +month - 1, +day, +hour, +minute) - timestamp;
}

/** ISO timestamp → value for <input type="datetime-local">, in Warsaw time. */
export function toDateTimeInputValue(iso: string | null) {
  if (!iso) return "";
  const { year, month, day, hour, minute } = warsawParts(new Date(iso));
  return `${year}-${month}-${day}T${hour}:${minute}`;
}

/** <input type="datetime-local"> value (Warsaw time) → ISO timestamp. */
export function fromDateTimeInputValue(value: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::\d{2})?$/.exec(value);
  if (!match) return null;

  const [, year, month, day, hour, minute] = match;
  const wallClockAsUtc = Date.UTC(+year, +month - 1, +day, +hour, +minute);
  if (Number.isNaN(wallClockAsUtc)) return null;

  const firstGuess = wallClockAsUtc - warsawOffsetMs(wallClockAsUtc);
  return new Date(wallClockAsUtc - warsawOffsetMs(firstGuess)).toISOString();
}
