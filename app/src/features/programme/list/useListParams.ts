import { useSearchParams } from "react-router";
import { type Filters, parseListParams, toListParams } from "./filters";

/** Filters and page of the programme list, kept in the URL so they survive the detail, back and reload. */
export function useListParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, pageIndex } = parseListParams(searchParams);

  return {
    filters,
    pageIndex,
    /** New filters always start on the first page. */
    setFilters: (next: Filters) => setSearchParams(toListParams(next), { replace: true }),
    setPageIndex: (next: number) => setSearchParams(toListParams(filters, next)),
  };
}
