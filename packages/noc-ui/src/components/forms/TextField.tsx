import { type ComponentPropsWithoutRef, type ReactNode, forwardRef, useId } from "react";
import { cx } from "../../utils/cx";
import { Field, fieldDescriptionId } from "./Field";

export interface TextFieldProps extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  /** Icon inside the input on the left, e.g. a search icon. */
  iconStart?: ReactNode;
}

/** Standalone text input with label. Inside a `Form`, use `FormTextField` instead. */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, description, error, iconStart, required, id, className, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <Field
      id={inputId}
      label={label}
      description={description}
      error={error}
      required={required}
      className={className}
    >
      <div className={cx("noc-input", iconStart && "noc-input--with-icon")}>
        {iconStart && (
          <span className="noc-input__icon" aria-hidden="true">
            {iconStart}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error || description ? fieldDescriptionId(inputId) : undefined}
          {...props}
        />
      </div>
    </Field>
  );
});
