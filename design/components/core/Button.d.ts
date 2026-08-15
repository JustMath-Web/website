/**
 * Standard action button. Never green — a green control means WhatsApp only.
 */
export interface ButtonProps {
  /** primary = ink fill, secondary = ink outline, quiet = hairline, ghost = text only */
  variant?: "primary" | "secondary" | "quiet" | "ghost";
  size?: "sm" | "md" | "lg";
  /** stretch to the container width (mobile CTAs) */
  full?: boolean;
  disabled?: boolean;
  /** renders an <a> when set */
  href?: string;
  as?: "button" | "a" | "span";
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
