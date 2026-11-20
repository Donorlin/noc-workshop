import { Collapsible } from "radix-ui";
import { ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { type CSSProperties, type ReactNode, useState } from "react";
import { cx } from "../../utils/cx";
import { Button } from "../actions/Button";

export interface FilterPanelProps {
  /** Filter fields (`FormTextField`, `FormSelect`, `FormSwitch`, …). Laid out in a responsive grid. */
  children: ReactNode;
  /** @default "Filters" */
  title?: ReactNode;
  /** Number of grid columns on wide screens. @default 3 */
  columns?: 2 | 3 | 4;
  /** Shows a "Reset" button; typically `() => form.reset(defaultFilters)`. */
  onReset?: () => void;
  /** Lets the user hide the fields with a "Hide filters" / "Show filters" toggle. @default true */
  collapsible?: boolean;
  /** Controlled open state; use with `onOpenChange` to keep it across screens. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** @default true */
  defaultOpen?: boolean;
  className?: string;
}

/**
 * Card holding the filters of a list screen. Combine with `Form` + `useLiveFilters` for filters that apply
 * while typing, without a search button.
 */
export function FilterPanel({
  children,
  title = "Filters",
  columns = 3,
  onReset,
  collapsible = true,
  open,
  onOpenChange,
  defaultOpen = true,
  className,
}: FilterPanelProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setOpen} className={cx("noc-filter-panel", className)}>
      <div className="noc-filter-panel__header">
        <h2 className="noc-filter-panel__title">{title}</h2>
        <div className="noc-filter-panel__actions">
          {onReset && isOpen && (
            <Button variant="ghost" size="sm" iconStart={<RotateCcw size={14} />} onClick={onReset}>
              Reset
            </Button>
          )}
          {collapsible && (
            <Collapsible.Trigger asChild>
              <Button
                variant="ghost"
                size="sm"
                iconEnd={isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              >
                {isOpen ? "Hide filters" : "Show filters"}
              </Button>
            </Collapsible.Trigger>
          )}
        </div>
      </div>
      <Collapsible.Content>
        <div
          className="noc-filter-panel__fields"
          style={{ "--noc-filter-columns": columns } as CSSProperties}
        >
          {children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
