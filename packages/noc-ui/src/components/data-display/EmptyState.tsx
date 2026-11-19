import type { ReactNode } from "react";
import { SearchX } from "lucide-react";
import { cx } from "../../utils/cx";

export interface EmptyStateProps {
  title: ReactNode;
  description?: ReactNode;
  /** Defaults to a "no results" icon. */
  icon?: ReactNode;
  /** Optional call to action, e.g. a "Reset filters" button. */
  action?: ReactNode;
  className?: string;
}

/** Shown instead of content when there is nothing to display, e.g. a search without results. */
export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div className={cx("noc-empty-state", className)} role="status">
      <span className="noc-empty-state__icon" aria-hidden="true">
        {icon ?? <SearchX size={28} />}
      </span>
      <p className="noc-empty-state__title">{title}</p>
      {description && <p className="noc-empty-state__description">{description}</p>}
      {action}
    </div>
  );
}
