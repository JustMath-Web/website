/**
 * Dark footer carrying the reversed wordmark, link columns and contact details.
 */
export interface SiteFooterProps {
  columns?: Array<{ title: string; items: Array<{ label: string; href?: string }> }>;
  /** copyright / legal line */
  note?: string;
  phone?: string;
  email?: string;
  style?: React.CSSProperties;
}
export declare function SiteFooter(props: SiteFooterProps): JSX.Element;
