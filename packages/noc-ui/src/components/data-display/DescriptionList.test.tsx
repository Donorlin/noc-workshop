import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DescriptionList } from "./DescriptionList";

describe("DescriptionList", () => {
  it("renders the library placeholder for empty values but keeps 0 and false-like content", () => {
    render(
      <DescriptionList
        items={[
          { label: "Missing", value: null },
          { label: "Blank", value: "  " },
          { label: "None", value: [] },
          { label: "Zero", value: 0 },
        ]}
      />,
    );

    expect(screen.getAllByText("–")).toHaveLength(3);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
