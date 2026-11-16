import { Card, DescriptionList, Grid, Heading, Page, Section, Stack, Text } from "@donorlin/noc-ui";
import { event } from "./event";

export function HomePage() {
  return (
    <Page
      eyebrow="Night of Chances IT / 2026"
      title="Organizer"
      description="Back office for the people who run the evening: programme, speakers and partners."
    >
      <Section title="Event">
        <DescriptionList
          items={[
            { label: "Name", value: event.name },
            { label: "Date", value: event.date },
            { label: "Time", value: event.time },
            { label: "Venue", value: event.venue },
            { label: "Ticket price", value: event.ticketPrice },
            { label: "Livestream", value: event.livestreamUrl },
          ]}
        />
      </Section>
      <Grid columns={3}>
        {event.highlights.map((highlight) => (
          <Card key={highlight.title} accent={highlight.accent}>
            <Stack gap={2}>
              <Heading level={2} size="sm">
                {highlight.title}
              </Heading>
              <Text size="sm" tone="muted">
                {highlight.text}
              </Text>
            </Stack>
          </Card>
        ))}
      </Grid>
    </Page>
  );
}
