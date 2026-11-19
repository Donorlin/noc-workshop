const LOCALE = "en-GB";

const toDate = (value: string | Date) => (value instanceof Date ? value : new Date(value));

/** `2026-11-25` / ISO date-time → `25 Nov 2026`. */
export const formatDate = (value: string | Date): string =>
  new Intl.DateTimeFormat(LOCALE, { day: "numeric", month: "short", year: "numeric" }).format(toDate(value));

/** ISO date-time → `18:00` (24-hour clock, the event's local time). */
export const formatTime = (value: string | Date): string =>
  new Intl.DateTimeFormat(LOCALE, { hour: "2-digit", minute: "2-digit", hour12: false }).format(
    toDate(value),
  );

/** Two ISO date-times → `18:00 – 19:00`. */
export const formatTimeRange = (start: string | Date, end: string | Date): string =>
  `${formatTime(start)} – ${formatTime(end)}`;

/** `12` → `12`, `1234` → `1,234`. */
export const formatNumber = (value: number): string => new Intl.NumberFormat(LOCALE).format(value);

/**
 * The library-wide placeholder for a missing value. Use it (or components that apply it, such as
 * `DescriptionList`) instead of inventing `N/A`, `—`, or empty cells.
 */
export const EMPTY_VALUE = "–";

/** Returns `EMPTY_VALUE` for `null`, `undefined`, empty strings and empty arrays. */
export const isEmptyValue = (value: unknown): boolean =>
  value === null ||
  value === undefined ||
  (typeof value === "string" && value.trim() === "") ||
  (Array.isArray(value) && value.length === 0);
