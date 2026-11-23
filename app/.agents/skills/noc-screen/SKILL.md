---
name: noc-screen
description: >-
  Build a screen of a NoC application from its specification and mockup image with @noc/platform:
  read the spec and the image, list the screen's concerns (layout, filters, forms, tables, detail sections,
  data loading, navigation, states), look each up in the platform docs (noc-platform-docs skill), present a plan,
  write the code on the generated API hooks, and check the result in a real browser (playwright-cli skill).
  Use whenever the user wants to implement, build or code a screen, page or feature UI – "build the list
  screen", "implement 01-programme-list.md", "code this mockup", "continue with step two" – even if they don't
  name the platform.
---

# Specification + mockup → platform screen

- **The specification** says *what*: texts, fields, rules, states, data, navigation. It is authoritative.
- **The mockup** says *where*: regions and order. Where it disagrees with the spec, the spec wins – say so.
- **The platform docs** say *how*: which component and pattern, with its real props.

The failures this skill prevents: inventing labels, inventing components or props, and hand-rolling what the
library provides (debounced filters with `useEffect`, raw `<table>`, `if (isLoading)` chains, CSS).

## 1. Understand the project

Read `AGENTS.md`, `ARCHITECTURE.md` and `docs/conventions.md`; read an existing feature (`src/features/home`)
for structure and registration. Find the generated hooks and model types (`src/api/<name>/generated/`) and the
mocks. If the API layer doesn't exist yet, stop and say it must be built first (`noc-api` skill).

## 2. Read the spec and the mockup

- Read the screen spec **and** the feature overview (scope, navigation, acceptance criteria).
- **View the mockup image itself.** Note the regions top to bottom.
- Write a **text inventory**: every visible string, verbatim from the spec (labels, placeholders, help texts,
  errors, empty states, tooltips, buttons). Never write a string you didn't read in the spec or the mockup.
- List every **state** (loading, empty, error, not found, disabled actions) and every **spec vs mockup
  difference**.

## 3. Name the concerns, then look them up

Describe the screen by what it does – "page frame with a disabled primary action; filters that apply while
typing, with a min-length rule; a server-paged table with a result count and clickable rows; state that
survives the detail and a reload; loading, empty and error states". Then use the **`noc-platform-docs` skill** to
answer each concern from `packages/platform/docs` – **`docs/patterns/` first** (list screen, detail
screen, data loading), then the component pages, then the props in `packages/platform/src`. Never edit
`packages/platform` while building a screen. If your
agent can delegate to a subagent, let it do the reading and return cited answers.

## 4. Plan – and wait for confirmation

Present, before writing code:

1. **Concern → component table** with the doc page for each row. A mapping you can't cite is invented.
2. **Files and routes**, registered the way the repo does it.
3. **Data and state**: hooks and parameters; where filter/page state lives (per the docs' pattern).
4. **Text inventory**, states, spec-vs-mockup decisions, open questions with a proposed default.

Wait for the user's approval unless they told you to go ahead.

## 5. Build

- Only @noc/platform components and layout primitives. No raw `<table>`/`<button>`/`<input>`/`<select>`, no CSS
  files, no `style={{…}}`, no hard-coded colours or sizes.
- Highest-level component, default props; no wrapper the design doesn't need.
- Forms and filters: `useNocForm` + zod, messages verbatim from the spec.
- Server data only through the generated hooks.
- Each enum mapped once (label, tag tone, icon) in the feature's `shared/` folder.
- Feature folder, one component per file, named exports. No new dependencies.

## 6. Verify

1. `npm run check:types && npm run lint && npm test`. Unknown-prop errors mean something was recalled – look
   it up, don't cast.
2. **Look at it** with the `playwright-cli` skill: start `npm run dev` unless it runs, open the route at
   1440×900, take a snapshot and diff it against the text inventory, exercise the behaviour (filters, paging,
   row click, back, reload), trigger the states the mocks provide, read the console. Close the browser and stop
   the server you started. States the mocks can't produce are covered by tests that override one handler
   (`server.use(...)`), not by extra servers.
3. Walk the spec – every rule, state and acceptance criterion of this screen – against what you saw.

Never call a screen verified if you didn't see it; say why if you couldn't run it.

**Summary:** files and routes, key concern → component mappings with doc pages, what you checked in the
browser, spec-vs-mockup decisions, anything left open.
