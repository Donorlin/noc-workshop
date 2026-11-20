# MSW handler patterns

Check the installed MSW version's types before copying – these match MSW 2/3 (`http`, `HttpResponse`,
`delay` from `msw`).

## Shared helpers

```ts
import { delay, http, HttpResponse } from "msw";
import type { Problem } from "@/api/<name>/generated/model";

const BASE = "/api/<name>";

/** Visible loading states in the browser, instant tests. */
const latency = () => delay(import.meta.env.MODE === "test" ? 0 : 300 + Math.random() * 300);

const problem = (status: number, title: string, detail?: string) =>
  HttpResponse.json<Problem>(
    { status, title, detail },
    { status, headers: { "Content-Type": "application/problem+json" } },
  );
```

## Search with filters and paging (GET with query parameters)

```ts
http.get<never, never, SessionPage | Problem>(`${BASE}/sessions`, async ({ request }) => {
  await latency();
  const params = new URL(request.url).searchParams;
  const title = params.get("title")?.trim().toLowerCase();
  const page = Number(params.get("page") ?? 0);
  const size = Number(params.get("size") ?? 10);

  if (title !== undefined && title.length < 2) return problem(400, "Invalid title");

  const matching = sessions
    .filter((s) => !title || s.title.toLowerCase().includes(title))
    .filter((s) => !params.get("type") || s.type === params.get("type"))
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt) || a.title.localeCompare(b.title));

  return HttpResponse.json<SessionPage>({
    items: matching.slice(page * size, (page + 1) * size).map(toSummary),
    totalCount: matching.length,
    page,
    size,
  });
}),
```

## Detail with 404

```ts
http.get<{ sessionId: string }, never, Session | Problem>(`${BASE}/sessions/:sessionId`, async ({ params }) => {
  await latency();
  const session = sessions.find((s) => s.id === params.sessionId);
  return session ? HttpResponse.json<Session>(session) : problem(404, "Session not found");
}),
```

## A dependency that fails on purpose

```ts
/** Speaker whose request always fails with HTTP 500 (specification, test data). */
export const UNAVAILABLE_SPEAKER_ID = "sp-unavailable";

http.get<{ speakerId: string }, never, Speaker | Problem>(`${BASE}/speakers/:speakerId`, async ({ params }) => {
  await latency();
  if (params.speakerId === UNAVAILABLE_SPEAKER_ID) return problem(500, "Speaker service unavailable");
  const speaker = speakers.find((s) => s.id === params.speakerId);
  return speaker ? HttpResponse.json<Speaker>(speaker) : problem(404, "Speaker not found");
}),
```

## POST search with a JSON body

```ts
http.post<never, SearchRequest, SearchResponse | Problem>(`${BASE}/users/search`, async ({ request }) => {
  await latency();
  const body = await request.json();
  …
}),
```

## Overriding a handler in one test

```ts
import { http, HttpResponse } from "msw";
import { server } from "@/mocks/node";

server.use(http.get("/api/<name>/sessions", () => HttpResponse.json({ title: "Down" }, { status: 503 })));
```

## Offline images

Mock photos as inline SVG data URIs so the app works without network access:

```ts
const photo = (bg: string, fg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${bg}"/><circle cx="32" cy="25" r="11" fill="${fg}"/><path d="M12 60c2-13 10-19 20-19s18 6 20 19z" fill="${fg}"/></svg>`)}`;
```
