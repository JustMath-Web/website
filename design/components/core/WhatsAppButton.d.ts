/**
 * The only green control in the system. Opens a wa.me thread with a prefilled message.
 */
export interface WhatsAppButtonProps {
  size?: "sm" | "md" | "lg";
  full?: boolean;
  /** Malaysian number in international form, digits only, e.g. 60123456789 */
  phone?: string;
  /** prefilled message body */
  message?: string;
  label?: string;
  /** small reassurance line under the button, e.g. "Replies usually within a few hours" */
  note?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function WhatsAppButton(props: WhatsAppButtonProps): JSX.Element;
