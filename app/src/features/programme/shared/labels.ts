import type { Language, Level, Room, SessionType, Track } from "@/api/programme/generated/model";

export const sessionTypeLabels: Record<SessionType, string> = {
  TALK: "Talk",
  WORKSHOP: "Workshop",
  PANEL: "Panel",
};

export const trackLabels: Record<Track, string> = {
  AI: "AI",
  SECURITY: "Security",
  DEVELOPMENT: "Development",
  DATA: "Data",
  CAREER: "Career",
};

export const languageLabels: Record<Language, string> = { EN: "English", SK: "Slovak" };

export const levelLabels: Record<Level, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

/** `AULA` is shown as `Aula`, the other rooms as their code. */
export const roomLabel = (room: Room): string => (room === "AULA" ? "Aula" : room);
