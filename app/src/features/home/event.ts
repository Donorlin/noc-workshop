import type { CardProps } from "@noc/platform";

export const event = {
  name: "Night of Chances IT 2026",
  date: "25 November 2026",
  time: "17:00 – 22:00",
  venue: "FEI STU, Bratislava",
  ticketPrice: "€10",
  livestreamUrl: null,
  highlights: [
    { title: "Talks", text: "Stories and experience from people who build technology.", accent: "pink" },
    { title: "Workshops", text: "Hands-on sessions with tools used every day.", accent: "yellow" },
    { title: "Panels", text: "Several points of view on one question.", accent: "mint" },
  ] satisfies Array<{ title: string; text: string; accent: CardProps["accent"] }>,
};
