---
name: noc-ui-docs
description: >-
  Read the official @donorlin/noc-ui documentation, which ships inside the npm package
  (node_modules/@donorlin/noc-ui/docs), so code and answers match the real API of the installed version
  instead of guesswork. Use whenever a task touches @donorlin/noc-ui – choosing a component, layout, forms
  and validation with useNocForm and zod, live filters, DataTable, QueryState and data loading, list and
  detail screen patterns, design tokens, formatting – or when someone asks what a noc-ui component does,
  which one to use, how something is done in a NoC application, or wants "the docs for X". Reach for it
  even when docs aren't mentioned: if you are about to assume how a noc-ui API behaves, look it up.
---

# @donorlin/noc-ui documentation

`@donorlin/noc-ui` is the UI platform library of Night of Chances applications. No model has seen its API
during training, so **everything you need comes from the files in the installed package** – never from
memory. The docs give you *intent and usage* (which component, which pattern, why); the installed type
declarations give you *exact names*.

## Where the docs are

```bash
node -p "require('./node_modules/@donorlin/noc-ui/package.json').version"   # installed version
ls node_modules/@donorlin/noc-ui/docs                                          # the documentation
```

The docs ship in the same package as the code, so they always match the installed version. No package
in `node_modules`? The project isn't installed (`npm install`) or doesn't use noc-ui – say so and stop.

## Find a page

Start at the index – one line per page with a description and the exports the page documents:

```bash
D=node_modules/@donorlin/noc-ui/docs
grep -i "filter" $D/llms.txt                 # fastest way to the right page
grep -rln "disabledReason" $D               # sweep for an exact prop or export
```

Layout: `getting-started.mdx`, `foundations/` (design tokens, layout, typography), `components/` (one page per
component group), `patterns/` (list screen, detail screen, data loading), `utilities/` (formatting).
Every page's frontmatter `components:` lists the exports it documents.

**Patterns before components.** For anything bigger than one prop – "build a list screen", "load a detail
and its related records", "filters that apply while typing" – read the page in `patterns/` first. It names
the components, how they combine and where the state lives. Then read the component pages it links.

Scale the effort: one prop → `llms.txt`, one page, stop. A screen → its pattern page plus the component
pages it names. "Everything about X" → `grep -rl` the whole folder.

## Exact names come from the types

Doc pages are hand-written; the declarations are what the project compiles against. When they disagree,
the types win:

```bash
grep -n "export" node_modules/@donorlin/noc-ui/dist/index.d.ts | head -80     # every public export
grep -rn "interface DataTableProps" -A 60 node_modules/@donorlin/noc-ui/dist --include="*.d.ts"
```

Copy union types whole (`ButtonVariant` is `"primary" | "dark" | "secondary" | "ghost" | "danger"`) – a
partial list reads as complete. **Defaults** are stated in the JSDoc (`@default`) and the docs; if they
disagree, read the implementation in `dist/index.js`.

## Rules the docs establish (read them, don't rely on this list)

The getting-started page lists the rules every NoC application follows – library components instead of
custom markup and CSS, tokens instead of hard-coded values, `useNocForm` + zod, `QueryState` for server data,
`–` for empty values, `disabledReason` for unavailable actions. Read the current page; this summary can be
stale.

## Answering

Cite the doc path you read (`docs/components/data-table.mdx`); never cite one you didn't. Prefer exact names
and a short sketch over prose. Never invent a prop, export or variant – "the docs don't cover this, here's
what the types show" is a better answer than a guess. For broad asks, list the primary page *and* the
adjacent ones, one line each, so the asker knows what to read.
