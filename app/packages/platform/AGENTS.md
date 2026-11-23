# AGENTS.md – @noc/platform

Instructions for agents **maintaining** the library. Agents building application features: don't change
this package – read `docs/llms.txt` instead.

## Project

- React 19 component library in TypeScript, consumed as source by the applications of this repository
  (no build). Public API = `src/index.ts`; `exports` in `package.json` point at the source.
- Built on Radix UI (`radix-ui`), TanStack Table v9, react-hook-form + zod 4, lucide-react.
- Styling: plain CSS per component group (`src/components/<group>/<group>.css`, imported by
  `src/styles/index.css`), `noc-` prefixed classes, values only from the `--noc-*` tokens in
  `src/styles/tokens.css`.
- `docs/` is the source of truth for agents in applications. `playground/` is a dev-only kitchen sink.

## Rules

- Every public export is listed in the `components` frontmatter of a page in `docs/`; `npm run check:docs`
  enforces it (`-- --write` regenerates `llms.txt`).
- When you change props or behaviour, update the doc page, the patterns that use it and the playground.
- Keep the opinionated API: applications must not need TanStack Table, Radix or react-hook-form directly.
- Keep components accessible. No new dependencies without the maintainer's consent.

## Checks

`npm run check` in this folder (or `npm run check:ui` from the root).
