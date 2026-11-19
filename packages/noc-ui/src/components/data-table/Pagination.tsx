import { ChevronLeft, ChevronRight } from "lucide-react";
import { cx } from "../../utils/cx";
import { formatNumber } from "../../utils/format";

export interface PaginationProps {
  /** Zero-based index of the current page. */
  pageIndex: number;
  pageCount: number;
  onPageChange: (pageIndex: number) => void;
  /** With `rowCount`, renders "Showing 11–20 of 42". */
  pageSize?: number;
  rowCount?: number;
  className?: string;
}

const pageItems = (current: number, count: number): Array<number | "gap"> => {
  if (count <= 7) return Array.from({ length: count }, (_, index) => index);
  const pages = new Set([0, count - 1, current - 1, current, current + 1]);
  const sorted = [...pages].filter((page) => page >= 0 && page < count).sort((a, b) => a - b);
  return sorted.flatMap((page, index) => {
    const previous = sorted[index - 1];
    return previous !== undefined && page - previous > 1 ? (["gap", page] as const) : [page];
  });
};

/** Page navigation. `DataTable` renders it automatically; use it directly only for custom lists. */
export function Pagination({
  pageIndex,
  pageCount,
  onPageChange,
  pageSize,
  rowCount,
  className,
}: PaginationProps) {
  const from = pageSize && rowCount ? pageIndex * pageSize + 1 : undefined;
  const to = pageSize && rowCount ? Math.min((pageIndex + 1) * pageSize, rowCount) : undefined;

  return (
    <nav aria-label="Pagination" className={cx("noc-pagination", className)}>
      <p className="noc-pagination__summary">
        {from !== undefined && to !== undefined && rowCount !== undefined
          ? `Showing ${formatNumber(from)}–${formatNumber(to)} of ${formatNumber(rowCount)}`
          : `Page ${pageIndex + 1} of ${Math.max(pageCount, 1)}`}
      </p>
      {pageCount > 1 && (
        <div className="noc-pagination__pages">
          <button
            type="button"
            className="noc-pagination__button"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          {pageItems(pageIndex, pageCount).map((item, index) =>
            item === "gap" ? (
              <span key={`gap-${index}`} className="noc-pagination__gap" aria-hidden="true">
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                className="noc-pagination__button"
                aria-current={item === pageIndex ? "page" : undefined}
                aria-label={`Page ${item + 1}`}
                onClick={() => onPageChange(item)}
              >
                {item + 1}
              </button>
            ),
          )}
          <button
            type="button"
            className="noc-pagination__button"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex >= pageCount - 1}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </nav>
  );
}
