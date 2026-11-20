import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import { EMPTY_VALUE, isEmptyValue } from "../../utils/format";

export interface DescriptionListItem {
  label: ReactNode;
  /** `null`, `undefined`, `""` and `[]` are rendered as `–`. */
  value: ReactNode;
  /** Let a long value (e.g. a description) span the full row. */
  fullWidth?: boolean;
}

export interface DescriptionListProps {
  items: DescriptionListItem[];
  /** @default 2 */
  columns?: 1 | 2 | 3;
  className?: string;
}

/**
 * Read-only label/value pairs, the building block of detail screens. Empty values are rendered as the
 * library-wide placeholder `–`; never render empty strings or invent `N/A`.
 */
export function DescriptionList({ items, columns = 2, className }: DescriptionListProps) {
  return (
    <dl className={cx("noc-description-list", `noc-description-list--columns-${columns}`, className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cx("noc-description-list__item", item.fullWidth && "noc-description-list__item--full")}
        >
          <dt>{item.label}</dt>
          <dd>{isEmptyValue(item.value) ? EMPTY_VALUE : item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
