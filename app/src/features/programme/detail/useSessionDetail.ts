import { useQueries } from "@tanstack/react-query";
import { getGetSpeakerQueryOptions, useGetSession } from "@/api/programme/generated/endpoints";

/** Loads the session, then – after it succeeds – all its speakers in parallel, in `speakerIds` order. */
export function useSessionDetail(sessionId: string) {
  const sessionQuery = useGetSession(sessionId);
  const speakerQueries = useQueries({
    queries: (sessionQuery.data?.speakerIds ?? []).map((speakerId) => ({
      ...getGetSpeakerQueryOptions(speakerId),
      enabled: sessionQuery.isSuccess,
    })),
  });
  return { sessionQuery, speakerQueries };
}
