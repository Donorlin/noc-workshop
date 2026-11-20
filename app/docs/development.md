# Development

## Prerequisites

Node.js 22.12+ and npm. No Java, no Docker.

## Run

```bash
npm install
npm run dev
```

The app runs at <http://localhost:5173>. Every `/api/...` request is answered by MSW mocks from
`src/mocks/`; the browser console shows nothing unless a handler is missing.

## Environment

Copy `.env.example` to `.env.local` to change:

| Variable           | Default   | Meaning |
|--------------------|-----------|---------|
| `VITE_API_MOCKING` | `enabled` | `disabled` turns MSW off. |
| `API_PROXY_TARGET` | –         | Backend that the dev server proxies `/api` to when mocks are off. |

## Checks

Run after every change (CI runs the same):

```bash
npm run check:types && npm run lint && npm test
```

## Working with a feature spec

Specifications live outside the app, in `../specification/<feature>/`: an overview with acceptance criteria (`README.md`), one file per
screen, mockups in `mockups/` and the OpenAPI contract. Where the mockup and the text disagree, the text wins.
