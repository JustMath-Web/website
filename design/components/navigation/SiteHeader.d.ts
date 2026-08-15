/**
 * Landing-page header: wordmark left, text links right, one WhatsApp control.
 */
export interface SiteHeaderProps {
  links?: Array<{ href: string; label: string }>;
  /** href of the current section */
  active?: string;
  onNavigate?: (href: string) => void;
  phone?: string;
  sticky?: boolean;
  style?: React.CSSProperties;
}
export declare function SiteHeader(props: SiteHeaderProps): JSX.Element;
