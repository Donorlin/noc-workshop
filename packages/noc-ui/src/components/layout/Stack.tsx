import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import { cx } from "../../utils/cx";
import { type Space, spaceVar } from "../../utils/types";

type Align = "start" | "center" | "end" | "stretch";
type Justify = "start" | "center" | "end" | "between";

const alignMap: Record<Align, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
};
const justifyMap: Record<Justify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
};

export interface StackProps extends ComponentPropsWithoutRef<"div"> {
  /** Vertical gap between children, index into the spacing scale. @default 4 (16px) */
  gap?: Space;
  align?: Align;
}

/** Vertical layout. Use it instead of margins between siblings. */
export function Stack({ gap = 4, align = "stretch", className, style, ...props }: StackProps) {
  return (
    <div
      className={cx("noc-stack", className)}
      style={{ "--noc-gap": spaceVar(gap), alignItems: alignMap[align], ...style } as CSSProperties}
      {...props}
    />
  );
}

export interface InlineProps extends ComponentPropsWithoutRef<"div"> {
  /** Horizontal gap between children. @default 3 (12px) */
  gap?: Space;
  align?: Align;
  justify?: Justify;
  /** Wrap children onto new lines when they don't fit. @default true */
  wrap?: boolean;
}

/** Horizontal layout for buttons, tags, meta information and toolbars. */
export function Inline({
  gap = 3,
  align = "center",
  justify = "start",
  wrap = true,
  className,
  style,
  ...props
}: InlineProps) {
  return (
    <div
      className={cx("noc-inline", className)}
      style={
        {
          "--noc-gap": spaceVar(gap),
          alignItems: alignMap[align],
          justifyContent: justifyMap[justify],
          flexWrap: wrap ? "wrap" : "nowrap",
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}

export interface GridProps extends ComponentPropsWithoutRef<"div"> {
  /** Fixed number of equal columns. Ignored when `minColumnWidth` is set. @default 2 */
  columns?: 1 | 2 | 3 | 4;
  /** Responsive grid: as many columns as fit, each at least this wide (e.g. `240`). */
  minColumnWidth?: number;
  /** Gap between cells. @default 4 (16px) */
  gap?: Space;
}

/** Two-dimensional layout for form fields, cards and description lists. Collapses to one column on small screens. */
export function Grid({ columns = 2, minColumnWidth, gap = 4, className, style, ...props }: GridProps) {
  const template = minColumnWidth
    ? `repeat(auto-fill, minmax(min(${minColumnWidth}px, 100%), 1fr))`
    : `repeat(${columns}, minmax(0, 1fr))`;
  return (
    <div
      className={cx("noc-grid", !minColumnWidth && "noc-grid--fixed", className)}
      style={{ "--noc-gap": spaceVar(gap), "--noc-grid-template": template, ...style } as CSSProperties}
      {...props}
    />
  );
}
