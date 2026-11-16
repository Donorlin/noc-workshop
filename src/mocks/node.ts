import { setupServer } from "msw/node";
import { handlers } from "./handlers";

/** MSW server for Vitest – the same handlers as in the browser. */
export const server = setupServer(...handlers);
