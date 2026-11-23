import { Tooltip as RadixTooltip } from "radix-ui";
import type { ReactNode } from "react";

export interface TooltipProps {
  /** Tooltip text. Keep it short; it is not shown on touch devices. */
  content: ReactNode;
  /** A single focusable element (Button, link). */
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

/** Short hint on hover and focus. Requires `NocProvider` at the root of the application. */
export function Tooltip({ content, children, side = "top" }: TooltipProps) {
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content className="noc-tooltip" side={side} sideOffset={6}>
          {content}
          <RadixTooltip.Arrow className="noc-tooltip__arrow" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}
