import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Heading, Eyebrow } from "../typography/Typography";

export interface PageProps {
  /** Page title, rendered as the single `h1` of the page. */
  title: ReactNode;
  /** Small uppercase label above the title, e.g. `ORGANIZER / PROGRAMME`. */
  eyebrow?: ReactNode;
  description?: ReactNode;
  /** `Breadcrumbs` rendered above the eyebrow. */
  breadcrumbs?: ReactNode;
  /** Primary page actions, aligned right of the title. */
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/**
 * Standard page frame: breadcrumbs, eyebrow, title, description, actions, then content.
 * Every routed screen renders exactly one `Page` inside `AppShell`.
 */
export function Page({ title, eyebrow, description, breadcrumbs, actions, children, className }: PageProps) {
  return (
    <div className={cx("noc-page", className)}>
      <header className="noc-page__header">
        {breadcrumbs}
        <div className="noc-page__title-row">
          <div className="noc-page__titles">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <Heading level={1}>{title}</Heading>
            {description && <p className="noc-page__description">{description}</p>}
          </div>
          {actions && <div className="noc-page__actions">{actions}</div>}
        </div>
      </header>
      <div className="noc-page__content">{children}</div>
    </div>
  );
}
