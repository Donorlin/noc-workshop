# API and mocks

## Add a backend API

1. Copy the contract from the specification to `src/api/<name>/openapi.yaml` (do not rewrite it).
2. Register it in `redocly.yaml`:

   ```yaml
   apis:
     <name>:
       root: src/api/<name>/openapi.yaml
   ```

3. Register it in `orval.config.ts`:

   ```ts
   <name>: {
     input: { target: "./src/api/<name>/openapi.yaml" },
     output: {
       mode: "tags-split",
       target: "./src/api/<name>/generated/endpoints",
       schemas: "./src/api/<name>/generated/model",
       client: "react-query",
       httpClient: "fetch",
       baseUrl: "/api/<name>",
       clean: true,
       override: {
         mutator: { path: "./src/api/http-client.ts", name: "httpClient" },
         fetch: { includeHttpResponseReturnType: false },
       },
     },
   },
   ```

4. `npm run validate:schema` – fix contract errors before generating.
5. `npm run generate:api -- --project <name>`.
6. Add the API to the table in `ARCHITECTURE.md`.

Generated code (`src/api/<name>/generated/`) is never edited and is committed. Screens import the generated
hooks (`useGetSession`, …), query-option factories and model types from there.

## Errors

`httpClient` throws `ApiError` for non-2xx responses; `getErrorStatus(error)` from noc-ui returns its
`status`. HTTP 404 is not retried (`src/app/queryClient.ts`).

## Mocks

Each API has a folder in `src/mocks/<name>/`:

```text
src/mocks/<name>/
├── data.ts        # synthetic, internally consistent records typed with the generated model types
└── handlers.ts    # MSW handlers for every operation, e.g. http.get("/api/<name>/sessions/:id", …)
```

Register the handlers in `src/mocks/handlers.ts`. Handlers implement the behaviour the screens need –
filtering and paging by query parameters, `404` for unknown ids, and the error cases named in the
specification – and add a small `delay()` so loading states are visible. The same handlers run in tests.

MSW 3 API reminders: `http`, `HttpResponse`, `delay` from `msw`; `setupWorker` from `msw/browser`;
`setupServer` from `msw/node`; unhandled requests are configured with `onUnhandledFrame`.
