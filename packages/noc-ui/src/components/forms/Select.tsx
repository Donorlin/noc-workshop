import { Select as RadixSelect } from "radix-ui";
import { Check, ChevronDown } from "lucide-react";
import { type ReactNode, useId } from "react";
import { Field, fieldDescriptionId } from "./Field";

export interface SelectOption {
  value: string;
  label: ReactNode;
}

export interface SelectProps {
  label: ReactNode;
  options: SelectOption[];
  /** Selected value; `undefined` means nothing selected (or the empty option). */
  value: string | undefined;
  onValueChange: (value: string | undefined) => void;
  placeholder?: string;
  /**
   * Adds a first option that clears the value, e.g. `"All types"`. Typical for filters. Selecting it calls
   * `onValueChange(undefined)`.
   */
  emptyOptionLabel?: string;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  onBlur?: () => void;
}

const EMPTY = "__noc_empty__";

/** Standalone single select (Radix Select). Inside a `Form`, use `FormSelect` instead. */
export function Select({
  label,
  options,
  value,
  onValueChange,
  placeholder = "Select…",
  emptyOptionLabel,
  description,
  error,
  required,
  disabled,
  id,
  name,
  onBlur,
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const radixValue = value ?? (emptyOptionLabel ? EMPTY : "");

  return (
    <Field id={selectId} label={label} description={description} error={error} required={required}>
      <RadixSelect.Root
        value={radixValue}
        onValueChange={(next) => onValueChange(next === EMPTY ? undefined : next)}
        disabled={disabled}
        name={name}
        onOpenChange={(open) => !open && onBlur?.()}
      >
        <RadixSelect.Trigger
          id={selectId}
          className="noc-select__trigger"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error || description ? fieldDescriptionId(selectId) : undefined}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className="noc-select__chevron">
            <ChevronDown size={16} />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className="noc-select__content" position="popper" sideOffset={4}>
            <RadixSelect.Viewport className="noc-select__viewport">
              {emptyOptionLabel && <SelectItem value={EMPTY}>{emptyOptionLabel}</SelectItem>}
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </Field>
  );
}

function SelectItem({ value, children }: { value: string; children: ReactNode }) {
  return (
    <RadixSelect.Item value={value} className="noc-select__item">
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="noc-select__indicator">
        <Check size={14} />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
}
