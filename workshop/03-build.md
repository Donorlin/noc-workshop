```text
+==[ NIGHT OF AGENTS // MODULE 03 ]======[ CONTRACT: VALID ]==[ DOCS: CITED ]==[ BROWSER: OPENED ]+

██████╗ ██╗   ██╗██╗██╗     ██████╗
██╔══██╗██║   ██║██║██║     ██╔══██╗
██████╔╝██║   ██║██║██║     ██║  ██║
██╔══██╗██║   ██║██║██║     ██║  ██║
██████╔╝╚██████╔╝██║███████╗██████╔╝
╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝

+==[ IF IT ISN'T IN THE SPEC, THE MOCKUP OR THE DOCS, IT ISN'T IN THE CODE. ]==[ SESSION 03 // LIVE ]+
```

# 03 · Build

**Time:** 20–50 minutes · [Previous](02-understand-and-plan.md) | [Overview](../README.md) | [Next: Verify](04-verify.md)

## 1. API layer (≈ 6 minutes of agent time)

```text
Start with step one.
```

The `noc-api` skill runs a fixed pipeline: **copy the contract → register → validate → generate → mock →
verify**. Watch for:

- validation **before** generation, and no hand-written code in `src/api/programme/generated/`;
- hooks like `useSearchSessions` and enum types generated from the contract;
- mocks typed with the generated model, with the spec's test data (25+ sessions, a failing speaker, 404);
- the agent reading the *installed* MSW types – MSW 3 renamed an option that models still recall wrong.

Checkpoint: `npm run check:types && npm test`, then `git add -A && git commit -m "feat: API layer"`.
Behind? `git switch step-1-api`.

## 2. The list screen (≈ 12 minutes of agent time)

```text
Continue with step two.
```

The `noc-screen` skill reads the spec and the mockup, names the screen's **concerns**, looks each one up in
the noc-ui docs (`docs/patterns/list-screen.mdx` first), and **stops with a plan**. Review it before you
approve:

- Does every component cite a doc page – or was one recalled from memory?
- Live filters (`FilterPanel` + `useLiveFilters` + zod) and **no Search button**?
- `DataTable` with server-side paging, 10 rows, `{n} sessions`, clickable rows?
- Filters and page in the URL; `New session` with `disabledReason="Coming soon"`?
- No CSS, no `useEffect` + `fetch`, no new dependency?

Approve, then watch it build and open the page with `playwright-cli`. Try it yourself at
<http://localhost:5173/programme>: type `a` (error, results stay), `ai` (4 sessions), pick `Workshop`, go to
page 2, reload – everything survives.

Checkpoint: `npm run check:types && npm run lint && npm test`, commit. Behind? `git switch step-2-list`.

**Takeaways:** the skill enforces the research step people skip under time pressure · the library documents
*patterns*, so the agent doesn't invent where state lives · compiling isn't rendering – look at the screen.

[Previous](02-understand-and-plan.md) | [Overview](../README.md) | [Next: Verify](04-verify.md)
