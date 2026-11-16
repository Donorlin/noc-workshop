import { DescriptionList, Section, formatTimeRange } from "@noc/platform";
import type { Session } from "@/api/programme/generated/model";
import { languageLabels, levelLabels, roomLabel, trackLabels } from "../shared/labels";
import { SessionTypeTag, sessionTypeStyles } from "../shared/SessionTypeTag";

export function SessionSection({ session }: { session: Session }) {
  return (
    <Section title="Session" accent={sessionTypeStyles[session.type].tone}>
      <DescriptionList
        items={[
          { label: "Type", value: <SessionTypeTag type={session.type} /> },
          { label: "Track", value: trackLabels[session.track] },
          { label: "Room", value: roomLabel(session.room) },
          { label: "Time", value: formatTimeRange(session.startsAt, session.endsAt) },
          { label: "Language", value: languageLabels[session.language] },
          { label: "Level", value: levelLabels[session.level] },
          { label: "Capacity", value: session.capacity },
          { label: "Free spots", value: session.freeSpots },
          { label: "Requirements", value: session.requirements.join(", ") },
          { label: "Description", value: session.description, fullWidth: true },
        ]}
      />
    </Section>
  );
}
