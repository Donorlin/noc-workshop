import type { ReactNode } from "react";
import { cx } from "../../utils/cx";

export interface FieldProps {
  /** Id of the control, links the label. */
  id: string;
  label: ReactNode;
  /** Help text below the control, e.g. `At least 2 characters`. Shown until there is an error. */
  description?: ReactNode;
  /** Validation message. Replaces the description and marks the field invalid. */
  error?: ReactNode;
  /** Adds a visual `*` to the label. Validation itself belongs in the zod schema. */
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export const fieldDescriptionId = (id: string) => `${id}-description`;

/** Label + control + description/error layout shared by all inputs. Use it to wrap custom controls. */
export function Field({ id, label, description, error, required, children, className }: FieldProps) {
  const message = error ?? description;
  return (
    <div className={cx("noc-field", Boolean(error) && "noc-field--invalid", className)}>
      <label className="noc-field__label" htmlFor={id}>
        {label}
        {required && (
          <span className="noc-field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {message && (
        <p id={fieldDescriptionId(id)} className={error ? "noc-field__error" : "noc-field__description"}>
          {message}
        </p>
      )}
    </div>
  );
}
