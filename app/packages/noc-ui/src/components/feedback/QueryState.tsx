import type { ReactNode } from "react";
import { Alert } from "../data-display/Alert";
import { Button } from "../actions/Button";
import { EmptyState } from "../data-display/EmptyState";
import { SectionSkeleton } from "../data-display/Skeleton";

/**
 * The subset of a TanStack Query `useQuery` result (or any similar object) that `QueryState` reads.
 * Pass the query result object directly – no mapping needed.
 */
export interface QueryLike<TData> {
  data: TData | undefined;
  isPending: boolean;
  isError: boolean;
  error: unknown;
  refetch?: () => unknown;
}

export interface QueryStateProps<TData> {
  query: QueryLike<TData>;
  /** Rendered with the loaded data. */
  children: (data: TData) => ReactNode;
  /** Placeholder while pending. @default `<SectionSkeleton />` */
  loading?: ReactNode;
  /** Custom error UI. By default an error `Alert` with a "Try again" button calling `query.refetch`. */
  error?: (error: unknown, retry: () => void) => ReactNode;
  /** Title of the default error alert. @default "Something went wrong" */
  errorTitle?: ReactNode;
  /** Return `true` to render `empty` instead of children, e.g. `(data) => data.items.length === 0`. */
  isEmpty?: (data: TData) => boolean;
  /** Rendered when `isEmpty` returns true. @default `<EmptyState title="Nothing found" />` */
  empty?: ReactNode;
}

/**
 * Renders the right state of an asynchronous request: loading → error → empty → content. This is the
 * standard way to render server data in NoC applications – do not hand-roll `if (isLoading)` chains.
 */
export function QueryState<TData>({
  query,
  children,
  loading,
  error,
  errorTitle = "Something went wrong",
  isEmpty,
  empty,
}: QueryStateProps<TData>) {
  const retry = () => {
    void query.refetch?.();
  };

  if (query.isPending) return <>{loading ?? <SectionSkeleton />}</>;

  if (query.isError || query.data === undefined) {
    if (error) return <>{error(query.error, retry)}</>;
    return (
      <Alert
        tone="error"
        title={errorTitle}
        action={
          query.refetch && (
            <Button size="sm" onClick={retry}>
              Try again
            </Button>
          )
        }
      >
        {getErrorMessage(query.error)}
      </Alert>
    );
  }

  if (isEmpty?.(query.data)) return <>{empty ?? <EmptyState title="Nothing found" />}</>;

  return <>{children(query.data)}</>;
}

/** Best-effort human readable message from an unknown error (Error, fetch/axios-like errors, strings). */
export function getErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (error && typeof error === "object") {
    const candidate = error as { message?: unknown; status?: unknown };
    if (typeof candidate.status === "number") return `The server responded with status ${candidate.status}.`;
    if (typeof candidate.message === "string" && candidate.message) return candidate.message;
  }
  return "Please try again later.";
}

/** Returns the HTTP status of an error thrown by a generated API client (fetch- and axios-like), if any. */
export function getErrorStatus(error: unknown): number | undefined {
  if (!error || typeof error !== "object") return undefined;
  const candidate = error as { status?: unknown; response?: { status?: unknown } };
  if (typeof candidate.status === "number") return candidate.status;
  if (typeof candidate.response?.status === "number") return candidate.response.status;
  return undefined;
}
