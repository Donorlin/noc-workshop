import {
  type ColumnDef,
  createPaginatedRowModel,
  createSortedRowModel,
  flexRender,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { type CSSProperties, type KeyboardEvent, type ReactNode, useMemo, useState } from "react";
import { cx } from "../../utils/cx";
import { EMPTY_VALUE, formatNumber, isEmptyValue } from "../../utils/format";
import { EmptyState } from "../data-display/EmptyState";
import { Skeleton } from "../data-display/Skeleton";
import { Pagination } from "./Pagination";

const features = tableFeatures({
  rowPaginationFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
});

type Features = typeof features;

export interface DataTableColumn<TRow extends object> {
  /** Unique column id, also used in `sorting`. */
  id: string;
  header: ReactNode;
  /**
   * Value of the cell: a property name or a function. Used for sorting and for the default rendering
   * (`null`/`undefined`/`""` render as `–`).
   */
  accessor?: keyof TRow | ((row: TRow) => unknown);
  /** Custom cell content, e.g. a `Tag` or formatted date. Receives the whole row. */
  cell?: (row: TRow) => ReactNode;
  /** Enables sorting by `accessor` (requires `accessor`). */
  sortable?: boolean;
  /** @default "start" */
  align?: "start" | "center" | "end";
  /** CSS width, e.g. `120` or `"30%"`. */
  width?: number | string;
}

/** Sorting state: the sorted column id and direction. Only single-column sorting is supported. */
export type DataTableSorting = Array<{ id: string; desc: boolean }>;

export interface DataTableProps<TRow extends object> {
  columns: DataTableColumn<TRow>[];
  data: TRow[];
  /** Stable row id, e.g. `(row) => row.id`. Required for correct row identity across pages. */
  getRowId: (row: TRow) => string;
  /** Makes rows clickable (mouse and Enter/Space) – typically opens the detail screen. */
  onRowClick?: (row: TRow) => void;
  /** Accessible label of a clickable row, e.g. `(row) => \`Open ${row.title}\``. */
  rowLabel?: (row: TRow) => string;

  /** Rows per page. @default 10 */
  pageSize?: number;
  /**
   * Current page (zero-based). Pass it together with `onPageChange` to control the page, e.g. to keep it
   * when the user returns from a detail screen. Uncontrolled when omitted.
   */
  pageIndex?: number;
  onPageChange?: (pageIndex: number) => void;
  /**
   * Total number of rows on the server. Setting it switches to server-side pagination: `data` is the current
   * page only and the table does not slice it.
   */
  rowCount?: number;

  /** Controlled sorting. Uncontrolled (client-side) when omitted. */
  sorting?: DataTableSorting;
  onSortingChange?: (sorting: DataTableSorting) => void;
  /** The server sorts `data`; the table only reports `onSortingChange`. */
  manualSorting?: boolean;

  /** Shows skeleton rows when there is no data yet, or dims the current rows while refreshing. */
  loading?: boolean;
  /** Content when there are no rows. @default `<EmptyState title="No results" />` */
  emptyState?: ReactNode;
  /** Renders "N results" above the table. @default true */
  showResultCount?: boolean;
  /** Custom result count label. @default (count) => `${count} results` */
  resultCountLabel?: (count: number) => ReactNode;
  /** Accessible table caption (visually hidden). */
  caption?: string;
  className?: string;
}

const defaultResultCountLabel = (count: number) =>
  `${formatNumber(count)} ${count === 1 ? "result" : "results"}`;

const renderValue = (value: unknown): ReactNode =>
  isEmptyValue(value) ? EMPTY_VALUE : Array.isArray(value) ? value.join(", ") : String(value);

/**
 * Paginated, sortable table for lists of records. Wraps TanStack Table with the NoC look, empty, loading and
 * result-count states, clickable rows and pagination. Default page size is 10.
 */
export function DataTable<TRow extends object>({
  columns,
  data,
  getRowId,
  onRowClick,
  rowLabel,
  pageSize = 10,
  pageIndex: controlledPageIndex,
  onPageChange,
  rowCount,
  sorting: controlledSorting,
  onSortingChange,
  manualSorting = false,
  loading = false,
  emptyState,
  showResultCount = true,
  resultCountLabel = defaultResultCountLabel,
  caption,
  className,
}: DataTableProps<TRow>) {
  const [internalPageIndex, setInternalPageIndex] = useState(0);
  const [internalSorting, setInternalSorting] = useState<DataTableSorting>([]);
  const sorting = controlledSorting ?? internalSorting;
  const manualPagination = rowCount !== undefined;
  const total = rowCount ?? data.length;
  const pageCount = Math.max(Math.ceil(total / pageSize), 1);
  // After the data shrinks (e.g. new filters) the requested page may no longer exist: show the last one.
  const pageIndex = Math.min(controlledPageIndex ?? internalPageIndex, pageCount - 1);

  const setPageIndex = (next: number) => {
    setInternalPageIndex(next);
    onPageChange?.(next);
  };

  const tableColumns = useMemo(
    () =>
      columns.map((column) => {
        const { accessor } = column;
        const accessorFn = accessor
          ? typeof accessor === "function"
            ? accessor
            : (row: TRow) => row[accessor]
          : undefined;
        return {
          id: column.id,
          ...(accessorFn ? { accessorFn } : {}),
          header: () => column.header,
          cell: ({ row, getValue }: { row: { original: TRow }; getValue: () => unknown }) =>
            column.cell ? column.cell(row.original) : renderValue(getValue()),
          enableSorting: Boolean(column.sortable && accessorFn),
          sortFn: "alphanumeric",
          sortUndefined: "last",
          meta: { align: column.align ?? "start", width: column.width },
        };
      }) as unknown as ColumnDef<Features, TRow, unknown>[],
    [columns],
  );

  const table = useTable({
    features,
    data,
    columns: tableColumns,
    getRowId: (row) => getRowId(row),
    state: { pagination: { pageIndex, pageSize }, sorting },
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater;
      setPageIndex(next.pageIndex);
    },
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      setInternalSorting(next);
      onSortingChange?.(next);
      if (pageIndex !== 0) setPageIndex(0);
    },
    manualPagination,
    rowCount,
    manualSorting,
    autoResetPageIndex: false,
    enableMultiSort: false,
  });

  const rows = table.getRowModel().rows;
  const headerGroups = table.getHeaderGroups();
  const showSkeleton = loading && data.length === 0;

  const handleRowKeyDown = (event: KeyboardEvent<HTMLTableRowElement>, row: TRow) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onRowClick?.(row);
    }
  };

  return (
    <div
      className={cx("noc-data-table", loading && !showSkeleton && "noc-data-table--refreshing", className)}
    >
      {showResultCount && !showSkeleton && (
        <p className="noc-data-table__count" aria-live="polite">
          {resultCountLabel(total)}
        </p>
      )}
      <div className="noc-data-table__scroll">
        <table aria-busy={loading || undefined}>
          {caption && <caption className="noc-visually-hidden">{caption}</caption>}
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta as { align: string; width?: number | string };
                  const sorted = header.column.getIsSorted();
                  const content = flexRender(header.column.columnDef.header, header.getContext());
                  return (
                    <th
                      key={header.id}
                      className={`noc-data-table__cell--${meta.align}`}
                      style={{ width: meta.width } as CSSProperties}
                      aria-sort={sorted ? (sorted === "asc" ? "ascending" : "descending") : undefined}
                    >
                      {header.column.getCanSort() ? (
                        <button
                          type="button"
                          className="noc-data-table__sort"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {content}
                          {sorted === "asc" ? (
                            <ArrowUp size={14} />
                          ) : sorted === "desc" ? (
                            <ArrowDown size={14} />
                          ) : (
                            <ArrowUpDown size={14} className="noc-data-table__sort-idle" />
                          )}
                        </button>
                      ) : (
                        content
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {showSkeleton ? (
              Array.from({ length: Math.min(pageSize, 5) }, (_, index) => (
                <tr key={`skeleton-${index}`}>
                  {columns.map((column) => (
                    <td key={column.id}>
                      <Skeleton height={14} width={`${50 + ((index * 17) % 40)}%`} />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="noc-data-table__empty">
                  {emptyState ?? <EmptyState title="No results" />}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className={cx(onRowClick && "noc-data-table__row--clickable")}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                  onKeyDown={onRowClick ? (event) => handleRowKeyDown(event, row.original) : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  aria-label={onRowClick && rowLabel ? rowLabel(row.original) : undefined}
                >
                  {row.getAllCells().map((cell) => {
                    const meta = cell.column.columnDef.meta as { align: string };
                    return (
                      <td key={cell.id} className={`noc-data-table__cell--${meta.align}`}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {!showSkeleton && total > 0 && (
        <Pagination
          pageIndex={pageIndex}
          pageCount={pageCount}
          pageSize={pageSize}
          rowCount={total}
          onPageChange={setPageIndex}
        />
      )}
    </div>
  );
}
