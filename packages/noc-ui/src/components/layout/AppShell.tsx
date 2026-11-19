import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../../utils/cx";

export interface AppShellProps {
  /** Application name next to the NoC mark, e.g. `Organizer`. */
  appName: string;
  /** Replaces the default `AppShellBrand`, e.g. with `<Link to="/"><AppShellBrand appName="…" /></Link>`. */
  brand?: ReactNode;
  /** `AppShellNav` with the main navigation links. */
  navigation?: ReactNode;
  /** Right side of the header: user menu, primary call to action. */
  actions?: ReactNode;
  children: ReactNode;
}

/** NoC mark: three rounded bars in the brand colours. */
export function NocMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <rect x="4" y="6" width="9" height="28" rx="4.5" fill="var(--noc-color-mint)" />
      <rect x="15.5" y="6" width="9" height="28" rx="4.5" fill="var(--noc-color-pink)" />
      <rect x="27" y="6" width="9" height="28" rx="4.5" fill="var(--noc-color-yellow)" />
    </svg>
  );
}

/**
 * Application frame: dark header with the NoC mark, app name, navigation and actions, and the main content
 * area. Render it once, in the root layout route.
 */
export function AppShell({ appName, brand, navigation, actions, children }: AppShellProps) {
  return (
    <div className="noc-app-shell">
      <header className="noc-app-shell__header">
        <div className="noc-app-shell__header-inner">
          <div className="noc-app-shell__brand">{brand ?? <AppShellBrand appName={appName} />}</div>
          {navigation}
          {actions && <div className="noc-app-shell__actions">{actions}</div>}
        </div>
      </header>
      <main className="noc-app-shell__main" id="main">
        {children}
      </main>
    </div>
  );
}

/**
 * The default brand: NoC mark, "Night of Chances" and the application name. Use it inside `brand` to make
 * it a link, e.g. `brand={<Link to="/"><AppShellBrand appName="Organizer" /></Link>}`.
 */
export function AppShellBrand({ appName }: { appName: string }) {
  return (
    <span className="noc-app-shell__brand-default">
      <NocMark />
      <span className="noc-app-shell__brand-text">
        Night of Chances
        <span className="noc-app-shell__app-name">{appName}</span>
      </span>
    </span>
  );
}

/**
 * Main navigation. Children are plain links (e.g. React Router `NavLink`); the link with
 * `aria-current="page"` is highlighted automatically.
 */
export function AppShellNav({ className, ...props }: ComponentPropsWithoutRef<"nav">) {
  return <nav aria-label="Main" className={cx("noc-app-shell__nav", className)} {...props} />;
}
