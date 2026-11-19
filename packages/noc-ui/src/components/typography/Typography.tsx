import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cx } from "../../utils/cx";

export interface HeadingProps extends ComponentPropsWithoutRef<"h2"> {
  /** Semantic level, renders `h1`–`h4`. Visual size follows the level unless `size` is set. */
  level?: 1 | 2 | 3 | 4;
  size?: "sm" | "md" | "lg" | "xl";
  /** Render the heading (or a part of it) in the brand mint colour. */
  accent?: boolean;
}

const levelSize = { 1: "xl", 2: "lg", 3: "md", 4: "sm" } as const;

export function Heading({ level = 2, size, accent, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as ElementType;
  return (
    <Tag
      className={cx(
        "noc-heading",
        `noc-heading--${size ?? levelSize[level]}`,
        accent && "noc-heading--accent",
        className,
      )}
      {...props}
    />
  );
}

export interface TextProps extends ComponentPropsWithoutRef<"p"> {
  size?: "xs" | "sm" | "md" | "lg";
  tone?: "default" | "muted" | "danger";
  weight?: "regular" | "medium" | "bold";
  /** Render as another element, e.g. `span` inside inline content. */
  as?: "p" | "span" | "div";
}

export function Text({
  size = "md",
  tone = "default",
  weight = "regular",
  as: Tag = "p",
  className,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cx("noc-text", `noc-text--${size}`, `noc-text--${tone}`, `noc-text--${weight}`, className)}
      {...props}
    />
  );
}

export interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/** Small uppercase label above a title, e.g. `PROGRAMME / 2026`. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return <p className={cx("noc-eyebrow", className)}>{children}</p>;
}
