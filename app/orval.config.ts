import { defineConfig } from "orval";

/**
 * One entry per backend API, generated with `npm run generate:api` (or `npm run generate:api -- --project <name>`).
 * Conventions – see docs/api-and-mocks.md:
 * - the contract lives in `src/api/<name>/openapi.yaml`,
 * - generated code goes to `src/api/<name>/generated/` (never edit it),
 * - every API uses the shared `httpClient` mutator and the gateway base path `/api/<name>`.
 */
export default defineConfig({
  programme: {
    input: { target: "./src/api/programme/openapi.yaml" },
    output: {
      mode: "tags-split",
      target: "./src/api/programme/generated/endpoints",
      schemas: "./src/api/programme/generated/model",
      client: "react-query",
      httpClient: "fetch",
      baseUrl: "/api/programme",
      clean: true,
      override: {
        mutator: { path: "./src/api/http-client.ts", name: "httpClient" },
        fetch: { includeHttpResponseReturnType: false },
      },
    },
  },
});
