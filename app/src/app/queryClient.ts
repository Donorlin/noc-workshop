import { getErrorStatus } from "@noc/platform";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      // A missing record (404) is a state, not a transient failure: don't retry it.
      retry: (failureCount, error) => getErrorStatus(error) !== 404 && failureCount < 2,
      refetchOnWindowFocus: false,
    },
  },
});
