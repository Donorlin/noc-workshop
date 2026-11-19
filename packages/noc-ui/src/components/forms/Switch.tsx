import { Switch as RadixSwitch } from "radix-ui";
import { type ReactNode, useId } from "react";

export interface SwitchProps {
  label: ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  description?: ReactNode;
  disabled?: boolean;
  id?: string;
  name?: string;
  onBlur?: () => void;
}

/** On/off toggle with a label on the right. Inside a `Form`, use `FormSwitch` instead. */
export function Switch({
  label,
  checked,
  onCheckedChange,
  description,
  disabled,
  id,
  name,
  onBlur,
}: SwitchProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;
  return (
    <div className="noc-switch">
      <RadixSwitch.Root
        id={switchId}
        className="noc-switch__root"
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        name={name}
        onBlur={onBlur}
      >
        <RadixSwitch.Thumb className="noc-switch__thumb" />
      </RadixSwitch.Root>
      <div className="noc-switch__text">
        <label htmlFor={switchId} className="noc-switch__label">
          {label}
        </label>
        {description && <p className="noc-field__description">{description}</p>}
      </div>
    </div>
  );
}
