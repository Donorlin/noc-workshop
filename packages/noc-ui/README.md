# @donorlin/noc-ui

UI platform library of **Night of Chances** applications – opinionated React components, forms, tables and
patterns built on [Radix UI](https://www.radix-ui.com/), [TanStack Table](https://tanstack.com/table) and
[react-hook-form](https://react-hook-form.com/) + [zod](https://zod.dev/), styled after the
[Night of Chances](https://www.nightofchances.com/) visual identity.

It plays the role of a company's design system: an API no AI model has seen before, documented so that
agents can read it.

The library is an npm workspace of this repository. Applications depend on it with `"@donorlin/noc-ui": "*"`
and compile its TypeScript source directly – nothing is built or published.

```tsx
import "@donorlin/noc-ui/styles.css";
import { AppShell, NocProvider, Page } from "@donorlin/noc-ui";
```

## Documentation

```text
docs/
├── llms.txt                 # index: every page with a one-line description and the exports it covers
├── getting-started.mdx
├── foundations/             # design tokens, layout, typography
├── components/              # DataTable, forms, FilterPanel, QueryState, Button, Tag, …
├── patterns/                # list screen, detail screen, data loading
└── utilities/               # formatting, empty values
```

Coding agents: start at `docs/llms.txt` and read the pages relevant to your task before writing code. The
`noc-ui-docs` skill of this repository does that.

## Development

From the repository root:

```bash
npm run dev:ui       # playground with every component at http://localhost:5180
npm run check:ui     # types, lint, tests, docs check (every export documented, links resolve, llms.txt current)
```

Regenerate the index after changing a doc's frontmatter: `npm run check:docs -w @donorlin/noc-ui -- --write`.

## Credits

Colours and typography are inspired by the Night of Chances website; this is a workshop project, not an
official Night of Chances product. Fonts: Montserrat and Parkinsans (SIL OFL) via Fontsource. Icons: Lucide
(ISC). License: MIT.
