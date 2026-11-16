# Testing

- Vitest + Testing Library + jsdom; `npm test`.
- Network: MSW server from `src/mocks/node.ts` with the application handlers; unhandled requests fail the test.
  Override a handler for one test with `server.use(...)`.
- Render screens through their routes with `renderRoute(feature.routes, "/path")` from `src/test/render.tsx`;
  it provides `NocProvider`, a fresh `QueryClient` (no retries) and a memory router.
- Query by role and visible text, as a user would.
- Test behaviour from the acceptance criteria, not implementation details.
