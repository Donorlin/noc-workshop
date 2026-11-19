import { Slot } from "radix-ui";
import { type ComponentPropsWithoutRef, type ReactNode, forwardRef } from "react";
import { cx } from "../../utils/cx";
import { Tooltip } from "../data-display/Tooltip";

export type ButtonVariant = "primary" | "dark" | "secondary" | "ghost" | "danger";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  /**
   * - `primary` – mint, the single main action of a screen
   * - `dark` – night, strong secondary action
   * - `secondary` – outlined, any other action
   * - `ghost` – text-only, low emphasis (e.g. "Hide filters", "Reset")
   * - `danger` – destructive action
   * @default "secondary"
   */
  variant?: ButtonVariant;
  /** @default "md" */
  size?: "sm" | "md";
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  /** Shows a spinner, disables the button and sets `aria-busy`. */
  loading?: boolean;
  /**
   * Disables the button and explains why in a tooltip, e.g. `"Coming soon"`. Prefer this over a bare
   * `disabled` whenever the user could wonder why an action is unavailable.
   */
  disabledReason?: ReactNode;
  /** Render the single child (e.g. a router `Link`) with button styles. */
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "secondary",
    size = "md",
    iconStart,
    iconEnd,
    loading,
    disabled,
    disabledReason,
    asChild,
    className,
    children,
    type = "button",
    ...props
  },
  ref,
) {
  const isDisabled = Boolean(disabled || loading || disabledReason);
  const classes = cx("noc-button", `noc-button--${variant}`, `noc-button--${size}`, className);

  if (asChild) {
    return (
      <Slot.Root ref={ref} className={classes} {...props}>
        {children}
      </Slot.Root>
    );
  }

  const button = (
    <button
      ref={ref}
      type={type}
      className={classes}
      // aria-disabled keeps the button focusable so the tooltip with the reason stays reachable by keyboard
      disabled={disabledReason ? undefined : isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      data-disabled={isDisabled || undefined}
      {...props}
      onClick={isDisabled ? (event) => event.preventDefault() : props.onClick}
    >
      {loading ? <span className="noc-button__spinner" aria-hidden="true" /> : iconStart}
      {children}
      {iconEnd}
    </button>
  );

  return disabledReason ? <Tooltip content={disabledReason}>{button}</Tooltip> : button;
});

export interface TextLinkProps extends ComponentPropsWithoutRef<"a"> {
  iconEnd?: ReactNode;
  /** Render the single child (e.g. a router `Link`) with text-link styles. */
  asChild?: boolean;
}

/** Bold inline link with an optional trailing icon, e.g. "See full programme →". */
export function TextLink({ iconEnd, asChild, className, children, ...props }: TextLinkProps) {
  if (asChild) {
    return (
      <Slot.Root className={cx("noc-text-link", className)} {...props}>
        {children}
      </Slot.Root>
    );
  }
  return (
    <a className={cx("noc-text-link", className)} {...props}>
      {children}
      {iconEnd}
    </a>
  );
}
