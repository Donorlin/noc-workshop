import type { ReactNode } from "react";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { cx } from "../../utils/cx";

export type AlertTone = "info" | "success" | "warning" | "error";

export interface AlertProps {
  /** @default "info" */
  tone?: AlertTone;
  title?: ReactNode;
  children?: ReactNode;
  /** Optional action aligned right, e.g. a "Try again" button. */
  action?: ReactNode;
  className?: string;
}

const icons = { info: Info, success: CircleCheck, warning: TriangleAlert, error: CircleAlert };

/**
 * Inline message inside the page. Use `error` for a failed request that blocks the content, `warning` for
 * partially loaded content (e.g. one of two requests failed), `info` for neutral notes.
 */
export function Alert({ tone = "info", title, children, action, className }: AlertProps) {
  const Icon = icons[tone];
  return (
    <div
      className={cx("noc-alert", `noc-alert--${tone}`, className)}
      role={tone === "error" ? "alert" : "status"}
    >
      <Icon className="noc-alert__icon" size={20} aria-hidden="true" />
      <div className="noc-alert__body">
        {title && <p className="noc-alert__title">{title}</p>}
        {children && <div className="noc-alert__content">{children}</div>}
      </div>
      {action && <div className="noc-alert__action">{action}</div>}
    </div>
  );
}
