# PROG-12 – Programme management

| | |
|---|---|
| **Feature** | Programme (`programme`) |
| **Application** | NoC Organizer |
| **Screens** | [Programme list](01-programme-list.md), [Session detail](02-session-detail.md) |
| **Backend** | Programme API – [`programme-openapi.yaml`](programme-openapi.yaml), gateway base path `/api/programme` |
| **Mockups** | [`mockups/`](mockups/) |

## 1. Goal

Organizers need one place to look up the programme of the evening: which talks, workshops and panels run
when and where, how many spots are left, and who presents them. Today they search a shared spreadsheet.

This ticket delivers a **read-only** programme: a filterable list of sessions and a session detail with its
speakers.

## 2. Scope

**In scope**

- Main navigation item **Programme**.
- Screen [Programme list](01-programme-list.md) at `/programme`.
- Screen [Session detail](02-session-detail.md) at `/programme/{sessionId}`.
- Integration of the Programme API: `searchSessions`, `getSession`, `getSpeaker`.
- Mocks of all three operations for local development, including the error cases in [section 5](#5-test-data-and-mocks).

**Out of scope** (visible in the UI, but disabled with the tooltip `Coming soon`)

- Creating sessions (`New session`), editing sessions (`Edit session`).

**Not part of this ticket:** attendee registration, speaker management, authentication.

## 3. Navigation

```text
Header: Home · Programme
            │
            ▼
/programme ──── click a row ────▶ /programme/{sessionId}
    ▲                                   │
    └──── Back · breadcrumb · browser back ┘   (filters and page are kept)
```

- The list keeps its filters and current page in the URL (e.g. `/programme?type=WORKSHOP&page=2`), so they
  survive opening a detail, browser back/forward and a page reload, and a filtered list can be shared as a link.
- Returning from the detail (Back, breadcrumb, browser back) shows the list with the same filters and page.

## 4. Non-functional requirements

- **NFR-1** UI is built with `@donorlin/noc-ui` only and follows its documented list-screen and
  detail-screen patterns.
- **NFR-2** Texts, labels and messages are exactly as written in this specification (English).
- **NFR-3** All actions are usable with the keyboard; table rows open with Enter.
- **NFR-4** A filtered search answers within 1 second on the production backend.
- **NFR-5** Where a mockup and this text disagree, **the text wins**.

## 5. Test data and mocks

Mocks must make every state of both screens reachable in the browser. All data is fictional.

- At least **25 sessions** on 25 November 2026 between 17:00 and 22:00 (time zone `+01:00`), covering all
  types, rooms and tracks.
- Sessions without registration (`freeSpots: null`), full sessions (`freeSpots: 0`) and sessions with free spots.
- At least 12 fictional speakers with fictional companies; some sessions with two or more speakers, some
  speakers without a photo, one session **without speakers**.
- Session **`s-ai-agents`** ("AI agents in production") has two speakers; the speaker **`sp-unavailable`**
  always answers **HTTP 500**.
- Any unknown `sessionId` answers **HTTP 404**.
- `searchSessions` filters and pages exactly as described in the contract; responses are delayed by
  300–600 ms so loading states are visible.

## 6. Acceptance criteria

| ID    | Criterion |
|-------|-----------|
| AC-01 | The header contains the navigation item **Programme**; it opens `/programme` and is highlighted there. |
| AC-02 | The list shows the eyebrow, title and description of [section 1 of the list](01-programme-list.md#1-page) and the action **New session**, disabled, with the tooltip `Coming soon`. |
| AC-03 | Opening the list loads the first page of all sessions without any user action: 10 rows per page, ordered by start time, with the result count. |
| AC-04 | Filters apply automatically about 400 ms after the last change; there is no search button. **Reset** restores the defaults and reloads the results. |
| AC-05 | A title filter with 1 character shows `Enter at least 2 characters` and does not search; the previous results stay visible. |
| AC-06 | Type, Room and Only with free spots filter the results and combine with each other and with the title. |
| AC-07 | The table shows the columns, tags and values of [section 3 of the list](01-programme-list.md#3-results-table); sessions without registration show `–` as free spots. |
| AC-08 | A search without results shows `No sessions match your filters`. |
| AC-09 | Clicking a row, or pressing Enter on a focused row, opens `/programme/{sessionId}` of that session. |
| AC-10 | The detail shows the **Session** section with all fields of [section 2 of the detail](02-session-detail.md#2-session-section); missing values show `–`. |
| AC-11 | Speakers load after the session, in the order of `speakerIds`. If a speaker cannot be loaded, the section shows the warning `Some speaker details could not be loaded`, and the session and the other speakers are still shown. |
| AC-12 | **Back**, the breadcrumb **Programme** and the browser back button return to the list with the same filters and page. Reloading the list keeps its filters and page. |
| AC-13 | An unknown session shows `Session not found` with a link **Back to programme**. |
| AC-14 | While data loads, skeletons are shown. A failed list or detail request shows an error with **Try again**. |
| AC-15 | **Edit session** on the detail is disabled with the tooltip `Coming soon`. |
