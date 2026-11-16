import type { RouteObject } from "react-router";

/**
 * A feature is a vertical slice of the application (e.g. `programme`). It contributes its routes and,
 * optionally, one item of the main navigation. Register it in `src/features/index.ts`.
 */
export interface Feature {
  id: string;
  /** Routes, relative to the root layout. Use `lazy` so each feature is its own chunk. */
  routes: RouteObject[];
  /** Main navigation item shown in the header. */
  navigation?: { label: string; to: string };
}
