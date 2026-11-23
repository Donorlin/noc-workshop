import { CalendarDays, Code, Mic, MessagesSquare, Plus, Search } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import {
  Alert,
  AppShell,
  AppShellNav,
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  DataTable,
  type DataTableColumn,
  DescriptionList,
  EmptyState,
  FilterPanel,
  Form,
  FormSelect,
  FormSwitch,
  FormTextField,
  Inline,
  Page,
  Section,
  SectionSkeleton,
  Stack,
  Tag,
  formatTimeRange,
  useLiveFilters,
  useNocForm,
} from "../src";

interface Session {
  id: string;
  title: string;
  type: "TALK" | "WORKSHOP" | "PANEL";
  room: string;
  startsAt: string;
  endsAt: string;
  freeSpots: number | null;
}

const rooms = ["CD300", "CD150", "BC150", "BC35", "AB150"];
const types = ["TALK", "WORKSHOP", "PANEL"] as const;
const sessions: Session[] = Array.from({ length: 27 }, (_, index) => ({
  id: `s-${index + 1}`,
  title:
    ["Shipping AI features safely", "Design systems at scale", "From intern to tech lead", "Hacking the CTF"][
      index % 4
    ]! + ` #${index + 1}`,
  type: types[index % 3]!,
  room: rooms[index % rooms.length]!,
  startsAt: `2026-11-25T${String(17 + (index % 5)).padStart(2, "0")}:00:00`,
  endsAt: `2026-11-25T${String(18 + (index % 5)).padStart(2, "0")}:00:00`,
  freeSpots: index % 4 === 0 ? null : (index * 7) % 30,
}));

const typeTag = {
  TALK: { label: "Talk", tone: "pink", icon: <Mic /> },
  WORKSHOP: { label: "Workshop", tone: "yellow", icon: <Code /> },
  PANEL: { label: "Panel", tone: "mint", icon: <MessagesSquare /> },
} as const;

const columns: DataTableColumn<Session>[] = [
  { id: "title", header: "Title", accessor: "title", sortable: true },
  {
    id: "type",
    header: "Type",
    accessor: "type",
    cell: (row) => (
      <Tag tone={typeTag[row.type].tone} icon={typeTag[row.type].icon}>
        {typeTag[row.type].label}
      </Tag>
    ),
  },
  { id: "room", header: "Room", accessor: "room", sortable: true },
  {
    id: "time",
    header: "Time",
    accessor: "startsAt",
    cell: (row) => formatTimeRange(row.startsAt, row.endsAt),
  },
  { id: "freeSpots", header: "Free spots", accessor: "freeSpots", align: "end" },
];

const filterSchema = z.object({
  title: z
    .string()
    .trim()
    .refine((value) => value === "" || value.length >= 2, "Enter at least 2 characters"),
  type: z.enum(types).optional(),
  onlyAvailable: z.boolean(),
});

export function Playground() {
  const [filters, setFilters] = useState<z.output<typeof filterSchema>>({ title: "", onlyAvailable: false });
  const [pageIndex, setPageIndex] = useState(0);
  const form = useNocForm({ schema: filterSchema, defaultValues: { title: "", onlyAvailable: false } });
  useLiveFilters({
    form,
    onChange: (values) => {
      setFilters(values);
      setPageIndex(0);
    },
  });

  const visible = sessions.filter(
    (session) =>
      session.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      (!filters.type || session.type === filters.type) &&
      (!filters.onlyAvailable || (session.freeSpots ?? 0) > 0),
  );

  return (
    <AppShell
      appName="Organizer"
      navigation={
        <AppShellNav>
          <a href="#" aria-current="page">
            Programme
          </a>
          <a href="#">Speakers</a>
          <a href="#">Partners</a>
        </AppShellNav>
      }
      actions={
        <Button variant="primary" size="sm" iconEnd={<Plus size={16} />}>
          New session
        </Button>
      }
    >
      <Page
        eyebrow="Night of Chances IT / 2026"
        title="Programme"
        description="All talks, workshops and panels of the evening."
        breadcrumbs={
          <Breadcrumbs>
            <BreadcrumbItem asChild>
              <a href="#">Home</a>
            </BreadcrumbItem>
            <BreadcrumbItem current>Programme</BreadcrumbItem>
          </Breadcrumbs>
        }
        actions={
          <Button variant="primary" disabledReason="Coming soon" iconEnd={<Plus size={16} />}>
            New session
          </Button>
        }
      >
        <Form form={form}>
          <FilterPanel onReset={() => form.reset({ title: "", type: undefined, onlyAvailable: false })}>
            <FormTextField
              name="title"
              label="Title"
              placeholder="Search by title"
              iconStart={<Search />}
              description="At least 2 characters"
            />
            <FormSelect
              name="type"
              label="Type"
              emptyOptionLabel="All types"
              options={types.map((type) => ({ value: type, label: typeTag[type].label }))}
            />
            <FormSwitch name="onlyAvailable" label="Only with free spots" />
          </FilterPanel>
        </Form>

        <DataTable
          columns={columns}
          data={visible}
          getRowId={(row) => row.id}
          onRowClick={(row) => alert(row.title)}
          pageIndex={pageIndex}
          onPageChange={setPageIndex}
          caption="Programme sessions"
        />

        <Section
          title="Session"
          accent="yellow"
          actions={
            <Inline gap={2}>
              <Button size="sm" disabledReason="Coming soon">
                Edit
              </Button>
              <Button size="sm" variant="dark">
                Back
              </Button>
            </Inline>
          }
        >
          <DescriptionList
            items={[
              { label: "Title", value: "Hacking the CTF" },
              {
                label: "Type",
                value: (
                  <Tag tone="yellow" icon={<Code />}>
                    Workshop
                  </Tag>
                ),
              },
              { label: "Room", value: "BC150" },
              { label: "Time", value: formatTimeRange("2026-11-25T18:00:00", "2026-11-25T19:00:00") },
              { label: "Capacity", value: null },
              {
                label: "Description",
                value: "Find the vulnerabilities in a deliberately broken AI app.",
                fullWidth: true,
              },
            ]}
          />
        </Section>

        <Section title="Speakers">
          <Stack gap={4}>
            <Inline gap={3}>
              <Avatar name="Jana Nováková" />
              <Stack gap={0}>
                <strong>Jana Nováková</strong>
                <span>Staff Engineer, Example Corp</span>
              </Stack>
            </Inline>
            <Alert tone="warning" title="Speaker details unavailable">
              Some speaker information could not be loaded.
            </Alert>
          </Stack>
        </Section>
        <SectionSkeleton />
        <Alert tone="error" title="Something went wrong" action={<Button size="sm">Try again</Button>}>
          The server responded with status 500.
        </Alert>
        <EmptyState
          title="No sessions match your filters"
          description="Try a different title or type."
          icon={<CalendarDays size={28} />}
        />
      </Page>
    </AppShell>
  );
}
