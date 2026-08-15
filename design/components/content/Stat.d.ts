/** One honest number: lesson length, fee, years teaching. */
export interface StatProps {
  value: string;
  label: string;
  note?: string;
  align?: "left" | "center";
  style?: React.CSSProperties;
}
export declare function Stat(props: StatProps): JSX.Element;
