import { Tag, type Tone } from "@noc/platform";
import { Code, MessagesSquare, Mic } from "lucide-react";
import type { ReactNode } from "react";
import type { SessionType } from "@/api/programme/generated/model";
import { sessionTypeLabels } from "./labels";

export const sessionTypeStyles: Record<SessionType, { tone: Exclude<Tone, "neutral">; icon: ReactNode }> = {
  TALK: { tone: "pink", icon: <Mic /> },
  WORKSHOP: { tone: "yellow", icon: <Code /> },
  PANEL: { tone: "mint", icon: <MessagesSquare /> },
};

export function SessionTypeTag({ type }: { type: SessionType }) {
  const { tone, icon } = sessionTypeStyles[type];
  return (
    <Tag tone={tone} icon={icon}>
      {sessionTypeLabels[type]}
    </Tag>
  );
}
