import { Alert, Avatar, Inline, Section, SectionSkeleton, Stack, Text } from "@noc/platform";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Speaker } from "@/api/programme/generated/model";

export function SpeakersSection({ queries }: { queries: UseQueryResult<Speaker, unknown>[] }) {
  if (queries.some((query) => query.isPending)) return <SectionSkeleton rows={2} columns={1} />;

  const speakers = queries.flatMap((query) => (query.data ? [query.data] : []));
  const someFailed = queries.some((query) => query.isError);

  return (
    <Section title="Speakers" description="People presenting this session">
      <Stack gap={5}>
        {someFailed && <Alert tone="warning" title="Some speaker details could not be loaded" />}
        {queries.length === 0 && <Text tone="muted">No speakers assigned yet.</Text>}
        {speakers.map((speaker) => (
          <SpeakerRow key={speaker.id} speaker={speaker} />
        ))}
      </Stack>
    </Section>
  );
}

function SpeakerRow({ speaker }: { speaker: Speaker }) {
  return (
    <Inline gap={4} align="start" wrap={false}>
      <Avatar name={speaker.fullName} src={speaker.photoUrl ?? undefined} size="lg" />
      <Stack gap={1}>
        <Text weight="bold">{speaker.fullName}</Text>
        <Text size="sm" tone="muted">
          {speaker.jobTitle}, {speaker.company}
        </Text>
        <Text size="sm">{speaker.bio}</Text>
      </Stack>
    </Inline>
  );
}
