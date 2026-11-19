import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import type { Tone } from "../../utils/types";

export interface TagProps {
  children: ReactNode;
  /**
   * Colour tone. Map each value of a domain enum to one tone and keep that mapping in one place in the
   * application (e.g. session type → tone).
   * @default "neutral"
   */
  tone?: Tone;
  /** Small icon before the label (16px lucide-react icon). */
  icon?: ReactNode;
  className?: string;
}

/** Compact label for a category or status, e.g. session type `Workshop`. */
export function Tag({ children, tone = "neutral", icon, className }: TagProps) {
  return (
    <span className={cx("noc-tag", `noc-tag--${tone}`, className)}>
      {icon && (
        <span className="noc-tag__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}

export interface BadgeProps {
  children: ReactNode;
  className?: string;
}

/** Small dark counter, e.g. the number of saved items next to a label. */
export function Badge({ children, className }: BadgeProps) {
  return <span className={cx("noc-badge", className)}>{children}</span>;
}
