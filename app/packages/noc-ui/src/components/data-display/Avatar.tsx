import { Avatar as RadixAvatar } from "radix-ui";
import { cx } from "../../utils/cx";

export interface AvatarProps {
  /** Full name; used for the initials fallback and the accessible label. */
  name: string;
  /** Photo URL. Initials are shown while loading or when missing. */
  src?: string;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  className?: string;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

/** Round photo of a person with an initials fallback. */
export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  return (
    <RadixAvatar.Root className={cx("noc-avatar", `noc-avatar--${size}`, className)} aria-label={name}>
      {src && <RadixAvatar.Image className="noc-avatar__image" src={src} alt={name} />}
      <RadixAvatar.Fallback className="noc-avatar__fallback" delayMs={src ? 300 : 0}>
        {initials(name)}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}
