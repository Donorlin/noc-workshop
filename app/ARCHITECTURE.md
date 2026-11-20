# Architecture

Single-page React application. Vite builds it, React Router routes it, TanStack Query loads its data and
`@donorlin/noc-ui` renders it. In development, Mock Service Worker answers every `/api` request.

## Features and routing

The application is split into **features** – vertical slices in `src/features/<feature>/`. A feature exports
a `Feature` object (`src/features/types.ts`):

```ts
export const programmeFeature: Feature = {
  id: "programme",
  navigation: { label: "Programme", to: "/programme" },
  routes: [
    { path: "programme", lazy: async () => ({ Component: (await import("./list/ProgrammeListPage")).ProgrammeListPage }) },
    { path: "programme/:sessionId", lazy: async () => ({ Component: (await import("./detail/SessionDetailPage")).SessionDetailPage }) },
  ],
};
```

and is registered in [`src/features/index.ts`](src/features/index.ts). The router
([`src/app/router.tsx`](src/app/router.tsx)) mounts all feature routes under the root layout
([`src/app/RootLayout.tsx`](src/app/RootLayout.tsx)), which renders `AppShell` with the navigation items of
all features. Unknown paths render `NotFoundPage`; render errors render `ErrorPage`.

Every screen is its own route and renders one `Page`. State the user expects to survive navigation, back
and reload (list filters, current page) lives in **URL search params**, not in component state – see the
list-screen pattern in the noc-ui docs.

| Feature                     | Routes | Description |
|-----------------------------|--------|-------------|
| [home](src/features/home)   | `/`    | Event overview |

## UI

All UI comes from `@donorlin/noc-ui` – the npm workspace `packages/noc-ui`, consumed as TypeScript source
without a build (documentation: `packages/noc-ui/docs/llms.txt`).
Its styles are imported once in `src/main.tsx`, `NocProvider` wraps the app in `src/app/App.tsx`. Features
contain no CSS; layout uses the library's `Stack`, `Inline`, `Grid`, `Card` and `Section`.

## Data loading

[`src/app/queryClient.ts`](src/app/queryClient.ts) configures TanStack Query: 30 s stale time, no retry for
HTTP 404, at most two retries otherwise. Screens use the query hooks generated per API and render their
states with noc-ui's `QueryState` (details) or `DataTable loading` (lists).

## API layer

Every backend API is described by an OpenAPI contract and generated with orval:

```text
src/api/
├── http-client.ts            # the one fetch wrapper; throws ApiError with `status` for non-2xx
└── <name>/
    ├── openapi.yaml          # contract (copied from ../specification/, validated by redocly)
    └── generated/            # orval output – TanStack Query hooks + types. Never edit.
```

APIs are registered in [`orval.config.ts`](orval.config.ts) and [`redocly.yaml`](redocly.yaml). All requests
go through the gateway under `/api/<name>`. See [docs/api-and-mocks.md](docs/api-and-mocks.md).

| API | Base path | Used by |
|-----|-----------|---------|
| –   | –         | –       |

## Mocks

[`src/mocks/handlers.ts`](src/mocks/handlers.ts) collects the MSW handlers of all APIs (one folder per API in
`src/mocks/<name>/`). The browser worker ([`src/mocks/browser.ts`](src/mocks/browser.ts)) uses them in
development, the Node server ([`src/mocks/node.ts`](src/mocks/node.ts)) in tests. The worker script is served
by the `msw/vite` plugin; nothing is committed to `public/`.

## Tests

Vitest with jsdom and Testing Library. `renderRoute` ([`src/test/render.tsx`](src/test/render.tsx)) renders
feature routes with all providers; network calls hit the same MSW handlers. See
[docs/testing.md](docs/testing.md).
