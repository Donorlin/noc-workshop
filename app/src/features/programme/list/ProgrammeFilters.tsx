import {
  FilterPanel,
  Form,
  FormSelect,
  FormSwitch,
  FormTextField,
  useLiveFilters,
  useNocForm,
} from "@noc/platform";
import { Search } from "lucide-react";
import { useEffect, useRef } from "react";
import { Room, SessionType } from "@/api/programme/generated/model";
import { roomLabel, sessionTypeLabels } from "../shared/labels";
import { defaultFilters, filterSchema, type Filters, sameFilters } from "./filters";

const typeOptions = Object.values(SessionType).map((type) => ({
  value: type,
  label: sessionTypeLabels[type],
}));
const roomOptions = Object.values(Room).map((room) => ({ value: room, label: roomLabel(room) }));

interface ProgrammeFiltersProps {
  value: Filters;
  onChange: (filters: Filters) => void;
}

export function ProgrammeFilters({ value, onChange }: ProgrammeFiltersProps) {
  const form = useNocForm({ schema: filterSchema, defaultValues: value });
  const lastEmitted = useRef(value);

  useLiveFilters({
    form,
    onChange: (filters) => {
      lastEmitted.current = filters;
      onChange(filters);
    },
  });

  // The URL can change without the form (e.g. the "Programme" navigation link clears the filters).
  useEffect(() => {
    if (!sameFilters(value, lastEmitted.current)) {
      lastEmitted.current = value;
      form.reset(value);
    }
  }, [value, form]);

  return (
    <Form form={form}>
      <FilterPanel columns={4} onReset={() => form.reset(defaultFilters)}>
        <FormTextField
          name="title"
          label="Title"
          placeholder="Search by title"
          description="At least 2 characters"
          iconStart={<Search />}
        />
        <FormSelect name="type" label="Type" emptyOptionLabel="All types" options={typeOptions} />
        <FormSelect name="room" label="Room" emptyOptionLabel="All rooms" options={roomOptions} />
        <FormSwitch name="onlyWithFreeSpots" label="Only with free spots" />
      </FilterPanel>
    </Form>
  );
}
