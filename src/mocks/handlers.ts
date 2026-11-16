import type { RequestHandler } from "msw";

/**
 * All mock handlers, used by the browser worker (development) and by tests.
 * Each API has its own folder `src/mocks/<api-name>/` with `handlers.ts` and synthetic `data.ts`.
 */
export const handlers: RequestHandler[] = [];
