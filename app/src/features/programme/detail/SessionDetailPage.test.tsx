import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderRoute } from "@/test/render";
import { programmeFeature } from "..";

describe("Session detail", () => {
  it("shows the session and the speakers that loaded when one speaker fails (AC-06, AC-07)", async () => {
    renderRoute(programmeFeature.routes, "/programme/s-ai-agents?room=AULA");

    expect(
      await screen.findByRole("heading", { level: 1, name: "AI agents in production" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Capacity").nextElementSibling).toHaveTextContent("–");
    const speakers = (await screen.findByText("People presenting this session")).closest("section")!;
    expect(await within(speakers).findByText("Some speaker details could not be loaded")).toBeInTheDocument();
    expect(within(speakers).getByText("Martin Nový")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back" })).toHaveAttribute("href", "/programme?room=AULA");
  });

  it("shows Session not found for an unknown session (AC-08)", async () => {
    renderRoute(programmeFeature.routes, "/programme/does-not-exist");

    expect(await screen.findByText("Session not found")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to programme" })).toHaveAttribute("href", "/programme");
  });
});
