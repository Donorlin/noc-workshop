import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderRoute } from "@/test/render";
import { programmeFeature } from "..";

const bodyRows = () => within(screen.getByRole("table")).getAllByRole("row").slice(1);

describe("Programme list", () => {
  it("loads the first page of all sessions on open (AC-02)", async () => {
    renderRoute(programmeFeature.routes, "/programme");

    expect(await screen.findByText("26 sessions")).toBeInTheDocument();
    expect(bodyRows()).toHaveLength(10);
    expect(bodyRows()[0]).toHaveTextContent("17:30 – 17:45Opening of the evening");
  });

  it("does not search with a 1-character title and filters live with a valid one (AC-03)", async () => {
    const { router } = renderRoute(programmeFeature.routes, "/programme");
    await screen.findByText("26 sessions");

    await userEvent.type(screen.getByLabelText("Title"), "a");
    expect(await screen.findByText("Enter at least 2 characters")).toBeInTheDocument();
    expect(screen.getByText("26 sessions")).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText("Title"), "i");
    expect(await screen.findByText("4 sessions", {}, { timeout: 2000 })).toBeInTheDocument();
    expect(router.state.location.search).toBe("?title=ai");
  });

  it("restores filters and page from the URL and opens a detail with them (AC-05)", async () => {
    const { router } = renderRoute(programmeFeature.routes, "/programme?type=WORKSHOP&page=2");

    expect(await screen.findByText("Showing 11–11 of 11")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Type" })).toHaveTextContent("Workshop");

    await userEvent.click(bodyRows()[0]!);
    await waitFor(() => expect(router.state.location.pathname).toMatch(/^\/programme\/s-/));
    expect(router.state.location.search).toBe("?type=WORKSHOP&page=2");
  });
});
