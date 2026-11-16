import { NocProvider } from "@donorlin/noc-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, type RouteObject } from "react-router";

/** Renders routes with all application providers, starting at `path`. Network calls go to MSW. */
export function renderRoute(routes: RouteObject[], path = "/") {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <NocProvider tooltipDelayMs={0}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </NocProvider>,
  );
  return { router, queryClient };
}
