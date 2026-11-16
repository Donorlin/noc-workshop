import {
  Alert,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  EmptyState,
  Page,
  QueryState,
  SectionSkeleton,
  Stack,
  formatTimeRange,
  getErrorStatus,
} from "@noc/platform";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useParams } from "react-router";
import { sessionTypeLabels } from "../shared/labels";
import { SessionSection } from "./SessionSection";
import { SpeakersSection } from "./SpeakersSection";
import { useSessionDetail } from "./useSessionDetail";

export function SessionDetailPage() {
  const { sessionId = "" } = useParams();
  const location = useLocation();
  // The list keeps its filters and page in the query string; carry it back.
  const listUrl = { pathname: "/programme", search: location.search };
  const { sessionQuery, speakerQueries } = useSessionDetail(sessionId);
  const session = sessionQuery.data;
  const title = session?.title ?? "Session";

  return (
    <Page
      title={title}
      eyebrow={
        session && `${sessionTypeLabels[session.type]} · ${formatTimeRange(session.startsAt, session.endsAt)}`
      }
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbItem asChild>
            <Link to={listUrl}>Programme</Link>
          </BreadcrumbItem>
          <BreadcrumbItem current>{title}</BreadcrumbItem>
        </Breadcrumbs>
      }
      actions={
        <>
          <Button disabledReason="Coming soon">Edit session</Button>
          <Button asChild variant="dark">
            <Link to={listUrl}>
              <ArrowLeft size={16} />
              Back
            </Link>
          </Button>
        </>
      }
    >
      <QueryState
        query={sessionQuery}
        loading={
          <Stack gap={6}>
            <SectionSkeleton rows={10} />
            <SectionSkeleton rows={2} columns={1} />
          </Stack>
        }
        error={(error, retry) =>
          getErrorStatus(error) === 404 ? (
            <EmptyState
              title="Session not found"
              description="It may have been removed from the programme."
              action={
                <Button asChild variant="dark">
                  <Link to={listUrl}>Back to programme</Link>
                </Button>
              }
            />
          ) : (
            <Alert
              tone="error"
              title="The session could not be loaded"
              action={
                <Button size="sm" onClick={retry}>
                  Try again
                </Button>
              }
            />
          )
        }
      >
        {(loaded) => (
          <>
            <SessionSection session={loaded} />
            <SpeakersSection queries={speakerQueries} />
          </>
        )}
      </QueryState>
    </Page>
  );
}
