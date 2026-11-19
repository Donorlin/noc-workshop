---
name: noc-api
description: >-
  Build the API layer of a NoC application from an OpenAPI contract: copy the contract into the project,
  register it for Redocly and orval, validate, generate typed TanStack Query hooks and model types, then write
  MSW mocks (synthetic typed data and handlers with filtering, paging and the error cases the specification
  asks for). Use whenever the user wants to add, integrate, generate or regenerate an API client, mock an API
  or endpoint, add a 404/500/empty case, "build the API layer", or a plan step covers the API or mocks – even
  if they don't mention orval or MSW.
---

# API layer: OpenAPI → hooks → mocks

A NoC application never hand-writes API calls, response types or "generated" code. The pipeline is always the
same: **place → register → validate → generate → mock → verify**. Read `AGENTS.md` and
`docs/api-and-mocks.md` first – the project's conventions win over the defaults here.

## 1. Place and register the contract

1. Copy the contract **unchanged** from the specification to `src/api/<name>/openapi.yaml` (`<name>` = short
   kebab-case API name, e.g. `programme`). It belongs to the backend team: report problems, don't rewrite it.
2. Add it to `redocly.yaml` (`apis.<name>.root`) and `orval.config.ts` – copy the entry shown in
   `docs/api-and-mocks.md` (react-query client, fetch, `baseUrl: "/api/<name>"`, the shared `httpClient`
   mutator, `includeHttpResponseReturnType: false`).

## 2. Validate, then generate

```bash
npm run validate:schema                       # errors stop the pipeline – report them
npm run generate:api -- --project <name>
npm run check:types
```

Expect `src/api/<name>/generated/endpoints/**` (one `use<OperationId>` hook, query key and
`get<OperationId>QueryOptions` per operation) and `generated/model/**` (types; enums as `const` objects). If
generation fails, fix the cause (config, contract) and regenerate. **Never write or edit `generated/` by
hand.**

## 3. Mocks – `src/mocks/<name>/`

Read the installed MSW types before writing handlers – the API changes between majors (MSW 3:
`onUnhandledFrame`, not `onUnhandledRequest`). Patterns: [references/msw-patterns.md](references/msw-patterns.md).

- **`data.ts`** – records typed with the generated model types; deterministic; fictional people and
  companies only; every enum value, `null`s and empty arrays present; more rows than one page; ids of special
  records exported as constants with a comment saying what they trigger. Follow the specification's test-data
  section exactly.
- **`handlers.ts`** – one handler per operation at the URL the generated client calls (see
  `get<OperationId>Url`; path params as `:name`). Implement the contract's semantics: filters, sort order,
  `page`/`size`/`totalCount`, `400` for invalid parameters, `404` for unknown ids, the specification's failure
  cases with real statuses and the contract's error body. Latency 300–600 ms in the browser, none in tests
  (`import.meta.env.MODE === "test"`). Type each handler's response union
  (`http.get<Params, never, Session | Problem>`).
- Register the handlers in `src/mocks/handlers.ts`.

## 4. Verify and report

1. `npm run check:types && npm run lint && npm test`.
2. Call every operation and variant through the **generated client** in a throwaway Vitest file (the test
   setup runs the MSW server): counts, filters, paging, 404, 500, 400. Delete the file.
3. Update the API table in `ARCHITECTURE.md` and the mock triggers in `docs/api-and-mocks.md`.

Report: the hooks and types screens should import (table: operation → hook → query options → types), and a
table of mock triggers (unknown id → 404, …).

## Never

Hand-written fetch calls or types · edits in `generated/` · generating without validating · a second HTTP
client · new dependencies without the user's consent · random data per request · mock data imported by app
code.
