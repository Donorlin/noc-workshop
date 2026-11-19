import type { ReactNode } from "react";
import { useController, useFormContext, useWatch } from "react-hook-form";
import { Select, type SelectOption } from "./Select";
import { Switch } from "./Switch";
import { TextField, type TextFieldProps } from "./TextField";

interface FormFieldBaseProps {
  /** Path of the value in the form, e.g. `"title"` or `"speaker.email"`. */
  name: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface FormTextFieldProps
  extends
    FormFieldBaseProps,
    Pick<
      TextFieldProps,
      "placeholder" | "type" | "inputMode" | "maxLength" | "autoComplete" | "iconStart" | "required"
    > {}

/** Text input connected to the surrounding `Form` by `name`. Errors come from the zod schema. */
export function FormTextField({ name, label, description, disabled, ...inputProps }: FormTextFieldProps) {
  const { control } = useFormContext();
  const {
    field: { ref, value, onChange, onBlur, name: fieldName },
    fieldState,
  } = useController({ name, control });
  return (
    <TextField
      {...inputProps}
      label={label}
      description={description}
      disabled={disabled}
      error={fieldState.error?.message}
      name={fieldName}
      ref={ref}
      value={(value as string | undefined) ?? ""}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
    />
  );
}

export interface FormSelectProps extends FormFieldBaseProps {
  options: SelectOption[];
  placeholder?: string;
  /** Adds a first option that sets the value to `undefined`, e.g. `"All types"`. */
  emptyOptionLabel?: string;
  required?: boolean;
}

/** Single select connected to the surrounding `Form` by `name`. The value is the option's `value` string. */
export function FormSelect({ name, label, description, disabled, ...selectProps }: FormSelectProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  // useController falls back to the initial default when the value becomes `undefined` (the empty option);
  // useWatch reports the current value.
  const value = useWatch({ control, name }) as string | undefined;
  return (
    <Select
      {...selectProps}
      label={label}
      description={description}
      disabled={disabled}
      error={fieldState.error?.message}
      name={field.name}
      value={value || undefined}
      onValueChange={field.onChange}
      onBlur={field.onBlur}
    />
  );
}

export type FormSwitchProps = FormFieldBaseProps;

/** Boolean toggle connected to the surrounding `Form` by `name`. */
export function FormSwitch({ name, label, description, disabled }: FormSwitchProps) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  return (
    <Switch
      label={label}
      description={description}
      disabled={disabled}
      name={field.name}
      checked={Boolean(field.value)}
      onCheckedChange={field.onChange}
      onBlur={field.onBlur}
    />
  );
}
