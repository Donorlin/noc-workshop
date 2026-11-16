import { delay, http, HttpResponse } from "msw";
import type { Problem, Session, SessionPage, SessionSummary, Speaker } from "@/api/programme/generated/model";
import { Room, SessionType } from "@/api/programme/generated/model";
import { sessions, speakers, UNAVAILABLE_SPEAKER_ID } from "./data";

const BASE = "/api/programme";

/** 300–600 ms in the browser so loading states are visible; none in tests. */
const latency = () => delay(import.meta.env.MODE === "test" ? 0 : 300 + Math.random() * 300);

const problem = (status: number, title: string, detail?: string) =>
  HttpResponse.json<Problem>(
    { status, title, detail },
    { status, headers: { "Content-Type": "application/problem+json" } },
  );

const toSummary = ({
  id,
  title,
  type,
  room,
  track,
  startsAt,
  endsAt,
  freeSpots,
}: Session): SessionSummary => ({
  id,
  title,
  type,
  room,
  track,
  startsAt,
  endsAt,
  freeSpots,
});

const isOneOf = <T extends string>(values: Record<string, T>, value: string): value is T =>
  Object.values(values).includes(value as T);

export const programmeHandlers = [
  http.get<never, never, SessionPage | Problem>(`${BASE}/sessions`, async ({ request }) => {
    await latency();
    const params = new URL(request.url).searchParams;
    const title = params.get("title")?.trim().toLowerCase();
    const type = params.get("type");
    const room = params.get("room");
    const onlyWithFreeSpots = params.get("onlyWithFreeSpots") === "true";
    const page = Number(params.get("page") ?? 0);
    const size = Number(params.get("size") ?? 10);

    if (title !== undefined && title.length < 2)
      return problem(400, "Invalid title", "Enter at least 2 characters.");
    if (type && !isOneOf(SessionType, type)) return problem(400, "Invalid type");
    if (room && !isOneOf(Room, room)) return problem(400, "Invalid room");
    if (!Number.isInteger(page) || page < 0 || !Number.isInteger(size) || size < 1 || size > 50) {
      return problem(400, "Invalid paging");
    }

    const matching = sessions
      .filter((session) => !title || session.title.toLowerCase().includes(title))
      .filter((session) => !type || session.type === type)
      .filter((session) => !room || session.room === room)
      .filter((session) => !onlyWithFreeSpots || (session.freeSpots ?? 0) > 0)
      .sort((a, b) => a.startsAt.localeCompare(b.startsAt) || a.title.localeCompare(b.title));

    return HttpResponse.json<SessionPage>({
      items: matching.slice(page * size, (page + 1) * size).map(toSummary),
      totalCount: matching.length,
      page,
      size,
    });
  }),

  http.get<{ sessionId: string }, never, Session | Problem>(
    `${BASE}/sessions/:sessionId`,
    async ({ params }) => {
      await latency();
      const session = sessions.find((candidate) => candidate.id === params.sessionId);
      return session ? HttpResponse.json<Session>(session) : problem(404, "Session not found");
    },
  ),

  http.get<{ speakerId: string }, never, Speaker | Problem>(
    `${BASE}/speakers/:speakerId`,
    async ({ params }) => {
      await latency();
      if (params.speakerId === UNAVAILABLE_SPEAKER_ID) return problem(500, "Speaker service unavailable");
      const speaker = speakers.find((candidate) => candidate.id === params.speakerId);
      return speaker ? HttpResponse.json<Speaker>(speaker) : problem(404, "Speaker not found");
    },
  ),
];
