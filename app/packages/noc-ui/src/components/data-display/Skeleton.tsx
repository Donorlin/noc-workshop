import type { CSSProperties } from "react";
import { cx } from "../../utils/cx";

export interface SkeletonProps {
  /** CSS width, e.g. `120` or `"60%"`. @default "100%" */
  width?: number | string;
  /** CSS height. @default 16 */
  height?: number | string;
  /** @default "sm" */
  radius?: "sm" | "md" | "pill";
  className?: string;
}

/** Animated placeholder shaped like the content that is loading. */
export function Skeleton({ width = "100%", height = 16, radius = "sm", className }: SkeletonProps) {
  return (
    <span
      className={cx("noc-skeleton", `noc-skeleton--${radius}`, className)}
      style={{ width, height } as CSSProperties}
      aria-hidden="true"
    />
  );
}

export interface SectionSkeletonProps {
  /** Number of label/value rows to imitate. @default 4 */
  rows?: number;
  /** @default 2 */
  columns?: 1 | 2 | 3;
}

/** Loading placeholder for a `Section` containing a `DescriptionList`. */
export function SectionSkeleton({ rows = 4, columns = 2 }: SectionSkeletonProps) {
  return (
    <div className="noc-card noc-card--padding-lg noc-section-skeleton" aria-busy="true" aria-label="Loading">
      <Skeleton width={180} height={22} />
      <div className={cx("noc-description-list", `noc-description-list--columns-${columns}`)}>
        {Array.from({ length: rows }, (_, index) => (
          <div key={index} className="noc-description-list__item">
            <Skeleton width={90} height={12} />
            <Skeleton width="70%" height={18} />
          </div>
        ))}
      </div>
    </div>
  );
}
