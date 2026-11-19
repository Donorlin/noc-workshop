import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NocProvider } from "../provider/NocProvider";
import { Button } from "./Button";

describe("Button", () => {
  it("with disabledReason stays focusable, ignores clicks and explains why in a tooltip", async () => {
    const onClick = vi.fn();
    render(
      <NocProvider tooltipDelayMs={0}>
        <Button disabledReason="Coming soon" onClick={onClick}>
          Register
        </Button>
      </NocProvider>,
    );
    const button = screen.getByRole("button", { name: "Register" });

    await userEvent.tab();
    expect(button).toHaveFocus();
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Coming soon");

    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
    expect(button).toHaveAttribute("aria-disabled", "true");
  });
});
