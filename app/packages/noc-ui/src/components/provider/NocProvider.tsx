import { Tooltip } from "radix-ui";
import type { ReactNode } from "react";

export interface NocProviderProps {
  children: ReactNode;
  /** Delay before tooltips open, in milliseconds. @default 200 */
  tooltipDelayMs?: number;
}

/**
 * Root provider of the library. Render it once, at the top of the application (outside the router is
 * fine). Components such as `Tooltip` and `Button` with `disabledReason` require it.
 */
export function NocProvider({ children, tooltipDelayMs = 200 }: NocProviderProps) {
  return <Tooltip.Provider delayDuration={tooltipDelayMs}>{children}</Tooltip.Provider>;
}
