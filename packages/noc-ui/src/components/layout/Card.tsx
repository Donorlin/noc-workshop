import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../../utils/cx";
import type { Tone } from "../../utils/types";
import { Heading } from "../typography/Typography";

export interface CardProps extends ComponentPropsWithoutRef<"div"> {
  /** Coloured top border, the NoC programme-card accent. */
  accent?: Exclude<Tone, "neutral"> | "night";
  /** Inner padding. @default "md" */
  padding?: "none" | "sm" | "md" | "lg";
  /** Muted background for secondary, non-interactive content. */
  muted?: boolean;
}

/** White surface with a border. Base for sections, panels and list items. */
export function Card({ accent, padding = "md", muted, className, ...props }: CardProps) {
  return (
    <div
      className={cx(
        "noc-card",
        `noc-card--padding-${padding}`,
        accent && `noc-card--accent-${accent}`,
        muted && "noc-card--muted",
        className,
      )}
      {...props}
    />
  );
}

export interface SectionProps extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Section heading, rendered as `h2`. */
  title: ReactNode;
  description?: ReactNode;
  /** Buttons aligned to the right of the heading. */
  actions?: ReactNode;
  accent?: CardProps["accent"];
}

/**
 * A titled card. Detail screens are a stack of Sections, each with one heading and one card, typically
 * containing a `DescriptionList`.
 */
export function Section({
  title,
  description,
  actions,
  accent,
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section className={cx("noc-section", className)} {...props}>
      <Card accent={accent} padding="lg">
        <div className="noc-section__header">
          <div className="noc-section__titles">
            <Heading level={2} size="md">
              {title}
            </Heading>
            {description && <p className="noc-section__description">{description}</p>}
          </div>
          {actions && <div className="noc-section__actions">{actions}</div>}
        </div>
        {children}
      </Card>
    </section>
  );
}
