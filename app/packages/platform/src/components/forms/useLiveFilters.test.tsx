import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { Form, useNocForm } from "./Form";
import { FormTextField } from "./FormFields";
import { useLiveFilters } from "./useLiveFilters";

const schema = z.object({
  title: z
    .string()
    .trim()
    .refine((value) => value === "" || value.length >= 2, "Enter at least 2 characters"),
});

function Filters({ onChange }: { onChange: (values: z.output<typeof schema>) => void }) {
  const form = useNocForm({ schema, defaultValues: { title: "" } });
  useLiveFilters({ form, onChange, debounceMs: 300 });
  return (
    <Form form={form}>
      <FormTextField name="title" label="Title" />
    </Form>
  );
}

describe("useLiveFilters", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("emits parsed values once after the user stops typing", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Filters onChange={onChange} />);

    await user.type(screen.getByLabelText("Title"), "  ai ");
    expect(onChange).not.toHaveBeenCalled();

    await act(() => vi.advanceTimersByTimeAsync(400));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ title: "ai" });
  });

  it("shows the schema error and does not emit invalid values", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Filters onChange={onChange} />);

    await user.type(screen.getByLabelText("Title"), "a");
    await act(() => vi.advanceTimersByTimeAsync(400));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByText("Enter at least 2 characters")).toBeInTheDocument();
  });
});
