/**
 * Hairline container for grouped content: lesson blocks, fee tiers, report sections.
 */
export interface CardProps {
  tone?: "plain" | "sunken" | "outline" | "invert";
  /** padding in px, default 28 */
  padding?: number;
  /** adds a resting shadow that deepens on hover — for clickable cards only */
  lift?: boolean;
  /** 3px ink rule across the top, used on report sections */
  rule?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
