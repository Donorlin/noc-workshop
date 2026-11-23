# Conventions

## Feature folder

```text
src/features/<feature>/
├── index.ts                  # Feature object: id, navigation, routes (lazy)
├── <screen>/                 # one folder per screen (route), e.g. list/, detail/
│   ├── <Screen>Page.tsx      # route component, renders one <Page>
│   └── components…           # parts of the screen
├── shared/                   # parts used by several screens (e.g. enum tags, labels)
└── *.test.tsx                # tests next to the code
```

- Components and files in PascalCase, hooks `useSomething.ts`, other modules camelCase.
- Named exports only.
- Keep data access in hooks (`useSessionSearch`), not inline in JSX.

## UI

- Only `@noc/platform` components. Check the docs (`packages/platform/docs/llms.txt`)
  for the right component and pattern before writing a screen.
- No CSS files in features, no inline styles, no hard-coded colours.
- Icons from `lucide-react`.
- Labels, messages and texts exactly as written in the specification.
- Enum values are mapped to labels and `Tag` tones once, in `shared/`, and reused by every screen.

## Forms and filters

`useNocForm` with a zod schema; rules and messages in the schema. Filters on list screens use
`FilterPanel` + `useLiveFilters` (no search button).

## State

- Server data: TanStack Query only. No `useEffect` + `fetch`.
- Navigation-relevant UI state (filters, page, selected tab): URL search params.
- Local ephemeral state (open/closed): `useState`.

## Dates and numbers

Formatting helpers from @noc/platform (`formatDate`, `formatTimeRange`, …). Missing values render as `–`
(`DescriptionList` and `DataTable` do it automatically).
