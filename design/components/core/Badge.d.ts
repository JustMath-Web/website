/** Small status or category label: syllabus, form level, report period. */
export interface BadgeProps {
  tone?: "neutral" | "ink" | "slate" | "ochre";
  /** uppercase + wide tracking, for meta labels like "TERM 2" */
  uppercase?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
