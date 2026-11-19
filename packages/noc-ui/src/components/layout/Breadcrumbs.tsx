import { Slot } from "radix-ui";
import { Children, type ReactNode } from "react";
import { cx } from "../../utils/cx";

export interface BreadcrumbsProps {
  /** `BreadcrumbItem` elements, from the root to the current page. */
  children: ReactNode;
  className?: string;
}

/** Hierarchical navigation above the page title. The last item is the current page. */
export function Breadcrumbs({ children, className }: BreadcrumbsProps) {
  const items = Children.toArray(children);
  return (
    <nav aria-label="Breadcrumb" className={cx("noc-breadcrumbs", className)}>
      <ol>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            {index < items.length - 1 && (
              <span className="noc-breadcrumbs__separator" aria-hidden="true">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export interface BreadcrumbItemProps {
  children: ReactNode;
  /** Merge styles into the single child, e.g. a router `Link`. */
  asChild?: boolean;
  /** Marks the current page (rendered as text, `aria-current="page"`). */
  current?: boolean;
}

export function BreadcrumbItem({ children, asChild, current }: BreadcrumbItemProps) {
  if (current) {
    return (
      <span className="noc-breadcrumbs__item noc-breadcrumbs__item--current" aria-current="page">
        {children}
      </span>
    );
  }
  const Comp = asChild ? Slot.Root : "span";
  return <Comp className="noc-breadcrumbs__item">{children}</Comp>;
}
