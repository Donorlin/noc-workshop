import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { Form, type NocForm, useNocForm } from "./Form";
import { FormSelect } from "./FormFields";

const schema = z.object({ type: z.enum(["TALK", "WORKSHOP"]).optional() });
const options = [
  { value: "TALK", label: "Talk" },
  { value: "WORKSHOP", label: "Workshop" },
];

describe("FormSelect", () => {
  it("shows the empty option when the value is cleared, even if the form started with a value", () => {
    let form!: NocForm<typeof schema>;
    function Filters() {
      form = useNocForm({ schema, defaultValues: { type: "WORKSHOP" } });
      return (
        <Form form={form}>
          <FormSelect name="type" label="Type" emptyOptionLabel="All types" options={options} />
        </Form>
      );
    }
    render(<Filters />);
    expect(screen.getByRole("combobox", { name: "Type" })).toHaveTextContent("Workshop");

    act(() => form.reset({ type: undefined }));
    expect(screen.getByRole("combobox", { name: "Type" })).toHaveTextContent("All types");

    act(() => form.setValue("type", "TALK"));
    act(() => form.setValue("type", undefined));
    expect(screen.getByRole("combobox", { name: "Type" })).toHaveTextContent("All types");
  });
});
