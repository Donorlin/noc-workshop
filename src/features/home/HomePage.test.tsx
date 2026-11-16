import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderRoute } from "@/test/render";
import { homeFeature } from ".";

describe("HomePage", () => {
  it("shows the event and renders the missing livestream as an empty value", async () => {
    renderRoute(homeFeature.routes);

    expect(await screen.findByRole("heading", { level: 1, name: "Organizer" })).toBeInTheDocument();
    expect(screen.getByText("FEI STU, Bratislava")).toBeInTheDocument();
    expect(screen.getByText("Livestream").nextElementSibling).toHaveTextContent("–");
  });
});
