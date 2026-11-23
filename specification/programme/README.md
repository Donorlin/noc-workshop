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

**Already done** – the app already integrates the Programme API: hooks generated from the contract for
`searchSessions`, `getSession` and `getSpeaker` (`app/src/api/programme/`) and mocks of all three operations with
the test data of [section 5](#5-test-data-and-mocks) (`app/src/mocks/programme/`). Use them; don't regenerate them.

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

- **NFR-1** UI is built with `@noc/platform` only and follows its documented list-screen and
  detail-screen patterns.
- **NFR-2** Texts, labels and messages are exactly as written in this specification (English).
- **NFR-3** All actions are usable with the keyboard; table rows open with Enter.
- **NFR-4** A filtered search answers within 1 second on the production backend.
- **NFR-5** Where a mockup and this text disagree, **the text wins**.

## 5. Test data and mocks

The mocks in the app make every state of both screens reachable in the browser. All data is fictional.

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

**Programme list**

| ID    | Criterion |
|-------|-----------|
| AC-01 | The header contains the navigation item **Programme**, which opens `/programme`. The list shows the eyebrow, title and description of [section 1 of the list](01-programme-list.md#1-page) and the action **New session**, disabled, with the tooltip `Coming soon`. |
| AC-02 | Opening the list loads the first page without any user action: 10 rows ordered by start time, the result count, and the columns, tags and values of [section 3 of the list](01-programme-list.md#3-results-table). |
| AC-03 | Filters apply automatically about 400 ms after the last change and combine with each other; there is no search button. A title with 1 character shows `Enter at least 2 characters` and does not search. **Reset** restores the defaults. |
| AC-04 | While data loads, skeletons are shown. A search without results shows `No sessions match your filters`; a failed request shows an error with **Try again**. |
| AC-05 | Filters and page are kept in the URL, so a reload and the browser back button keep them. Clicking a row, or pressing Enter on a focused row, opens `/programme/{sessionId}`. |

**Session detail** (homework)

| ID    | Criterion |
|-------|-----------|
| AC-06 | The detail shows the **Session** section with all fields of [section 2 of the detail](02-session-detail.md#2-session-section) (missing values show `–`) and **Edit session**, disabled, with the tooltip `Coming soon`. |
| AC-07 | Speakers load after the session, in the order of `speakerIds`. If a speaker cannot be loaded, the section shows the warning `Some speaker details could not be loaded`, and the session and the other speakers are still shown. |
| AC-08 | **Back** and the breadcrumb **Programme** return to the list with the same filters and page. An unknown session shows `Session not found` with a link **Back to programme**. |
