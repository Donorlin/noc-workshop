import { z } from "zod";
import { Room, SessionType, type SearchSessionsParams } from "@/api/programme/generated/model";

export const PAGE_SIZE = 10;

export const filterSchema = z.object({
  title: z
    .string()
    .trim()
    .refine((value) => value === "" || value.length >= 2, "Enter at least 2 characters"),
  type: z.enum(SessionType).optional(),
  room: z.enum(Room).optional(),
  onlyWithFreeSpots: z.boolean(),
});

export type Filters = z.output<typeof filterSchema>;

export const defaultFilters: Filters = {
  title: "",
  type: undefined,
  room: undefined,
  onlyWithFreeSpots: false,
};

export const sameFilters = (a: Filters, b: Filters) =>
  a.title === b.title &&
  a.type === b.type &&
  a.room === b.room &&
  a.onlyWithFreeSpots === b.onlyWithFreeSpots;

/** Reads filters and the zero-based page from the URL. Invalid values fall back to the defaults. */
export function parseListParams(params: URLSearchParams): { filters: Filters; pageIndex: number } {
  const parsed = filterSchema.safeParse({ title: params.get("title") ?? "", onlyWithFreeSpots: false });
  const type = filterSchema.shape.type.safeParse(params.get("type") ?? undefined).data;
  const room = filterSchema.shape.room.safeParse(params.get("room") ?? undefined).data;
  const page = Number(params.get("page"));
  return {
    filters: {
      title: parsed.success ? parsed.data.title : "",
      type,
      room,
      onlyWithFreeSpots: params.get("free") === "true",
    },
    pageIndex: Number.isInteger(page) && page > 1 ? page - 1 : 0,
  };
}

/** Writes filters and the zero-based page to URL params (1-based `page`); default values are omitted. */
export function toListParams(filters: Filters, pageIndex = 0): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.title) params.set("title", filters.title);
  if (filters.type) params.set("type", filters.type);
  if (filters.room) params.set("room", filters.room);
  if (filters.onlyWithFreeSpots) params.set("free", "true");
  if (pageIndex > 0) params.set("page", String(pageIndex + 1));
  return params;
}

/** `searchSessions` parameters; parameters with default values are not sent. */
export const toSearchRequest = (filters: Filters, pageIndex: number): SearchSessionsParams => ({
  ...(filters.title && { title: filters.title }),
  ...(filters.type && { type: filters.type }),
  ...(filters.room && { room: filters.room }),
  ...(filters.onlyWithFreeSpots && { onlyWithFreeSpots: true }),
  ...(pageIndex > 0 && { page: pageIndex }),
});
