/** Index into the `--noc-space-*` scale: 0 = 0px, 1 = 4px, 2 = 8px, 3 = 12px, 4 = 16px, 5 = 20px, 6 = 24px, 7 = 32px, 8 = 40px, 9 = 56px, 10 = 72px. */
export type Space = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/** Colour tone shared by tags, cards and alerts. */
export type Tone = "mint" | "yellow" | "pink" | "neutral";

export const spaceVar = (space: Space) => `var(--noc-space-${space})`;
