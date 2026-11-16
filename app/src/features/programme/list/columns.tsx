import { type DataTableColumn, formatTimeRange } from "@noc/platform";
import type { SessionSummary } from "@/api/programme/generated/model";
import { roomLabel, trackLabels } from "../shared/labels";
import { SessionTypeTag } from "../shared/SessionTypeTag";

export const columns: DataTableColumn<SessionSummary>[] = [
  {
    id: "time",
    header: "Time",
    accessor: "startsAt",
    cell: (row) => formatTimeRange(row.startsAt, row.endsAt),
    width: 150,
  },
  { id: "title", header: "Title", accessor: "title" },
  { id: "type", header: "Type", accessor: "type", cell: (row) => <SessionTypeTag type={row.type} /> },
  { id: "room", header: "Room", accessor: "room", cell: (row) => roomLabel(row.room) },
  { id: "track", header: "Track", accessor: "track", cell: (row) => trackLabels[row.track] },
  { id: "freeSpots", header: "Free spots", accessor: "freeSpots", align: "end" },
];
