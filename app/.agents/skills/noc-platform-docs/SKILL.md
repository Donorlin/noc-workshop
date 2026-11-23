---
name: noc-platform-docs
description: >-
  Read the official @noc/platform documentation in packages/platform/docs, so code and answers match the
  real API of the library instead of guesswork. Use whenever a task touches @noc/platform – choosing a
  component, layout, forms and validation with useNocForm and zod, live filters, DataTable, QueryState and
  data loading, list and detail screen patterns, design tokens, formatting – or when someone asks what a
  platform component does, which one to use, how something is done in a NoC application, or wants "the docs
  for X". Reach for it even when docs aren't mentioned: if you are about to assume how an @noc/platform API behaves,
  look it up.
---

# @noc/platform documentation

`@noc/platform` is the UI platform library of NoC applications, in `packages/platform/` of this repository.
No model has seen its API during training, so **everything comes from its documentation and source – never
from memory.** The docs give you *intent and usage* (which component, which pattern, why); the source gives
you *exact names*.

## Find a page

Start at the index – one line per page, with a description and the exports the page documents:

```bash
D=packages/platform/docs
grep -i "filter" $D/llms.txt                 # fastest way to the right page
grep -rln "disabledReason" $D               # sweep for an exact prop or export
```

Layout: `getting-started.mdx`, `foundations/` (design tokens, layout, typography), `components/` (one page per
component group), `patterns/` (list screen, detail screen, data loading), `utilities/` (formatting).

**Patterns before components.** For anything bigger than one prop – a list screen, a detail with related
records, filters that apply while typing – read the page in `patterns/` first. It names the components, how
they combine and where the state lives. Then read the component pages it links.

Scale the effort: one prop → `llms.txt`, one page, stop. A screen → its pattern page plus the component pages
it names.

## Exact names come from the source

Doc pages are hand-written; the TypeScript source is what the app compiles against. When they disagree, the
source wins:

```bash
cat packages/platform/src/index.ts                                   # every public export
grep -rn "interface DataTableProps" -A 60 packages/platform/src      # props with JSDoc and @default
```

Copy union types whole (`ButtonVariant` is `"primary" | "dark" | "secondary" | "ghost" | "danger"`).
Use only what `src/index.ts` exports – never import from deeper paths.

## Rules

- **Read, don't change.** The library belongs to the platform team; never edit `packages/platform` while building
  a feature. If it lacks something, say so.
- Follow the rules in `getting-started.mdx` (library components instead of custom markup and CSS, tokens,
  `useNocForm` + zod, `QueryState`, `–` for empty values, `disabledReason`).
- Cite the doc path you read (`docs/components/data-table.mdx`); never cite one you didn't. Never invent a
  prop, export or variant – "the docs don't cover this, here's what the source shows" beats a guess.
