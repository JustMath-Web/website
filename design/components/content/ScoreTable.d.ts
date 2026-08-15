/** Plain ruled table for marks and attendance in reports. Figures set in mono, tabular. */
export interface ScoreTableProps {
  columns?: string[];
  /** row cells; the first column is the label, the rest are right-aligned figures */
  rows?: Array<Array<string | number>>;
  caption?: string;
  style?: React.CSSProperties;
}
export declare function ScoreTable(props: ScoreTableProps): JSX.Element;
