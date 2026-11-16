import { Alert, Button, DataTable, EmptyState, Page } from "@noc/platform";
import { keepPreviousData } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useSearchSessions } from "@/api/programme/generated/endpoints";
import { columns } from "./columns";
import { PAGE_SIZE, toSearchRequest } from "./filters";
import { ProgrammeFilters } from "./ProgrammeFilters";
import { useListParams } from "./useListParams";

export function ProgrammeListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { filters, setFilters, pageIndex, setPageIndex } = useListParams();
  const query = useSearchSessions(toSearchRequest(filters, pageIndex), {
    query: { placeholderData: keepPreviousData },
  });

  return (
    <Page
      eyebrow="Night of Chances IT / 2026"
      title="Programme"
      description="Talks, workshops and panels of the evening."
      actions={
        <Button variant="primary" iconStart={<Plus size={16} />} disabledReason="Coming soon">
          New session
        </Button>
      }
    >
      <ProgrammeFilters value={filters} onChange={setFilters} />

      {query.isError && (
        <Alert
          tone="error"
          title="The programme could not be loaded"
          action={
            <Button size="sm" onClick={() => query.refetch()}>
              Try again
            </Button>
          }
        />
      )}

      <DataTable
        caption="Programme sessions"
        columns={columns}
        data={query.data?.items ?? []}
        rowCount={query.data?.totalCount ?? 0}
        pageSize={PAGE_SIZE}
        pageIndex={pageIndex}
        onPageChange={setPageIndex}
        getRowId={(row) => row.id}
        loading={query.isFetching}
        onRowClick={(row) => navigate({ pathname: `/programme/${row.id}`, search: location.search })}
        rowLabel={(row) => `Open ${row.title}`}
        resultCountLabel={(count) => `${count} ${count === 1 ? "session" : "sessions"}`}
        emptyState={
          <EmptyState
            title="No sessions match your filters"
            description="Try a different title, type or room."
          />
        }
      />
    </Page>
  );
}
