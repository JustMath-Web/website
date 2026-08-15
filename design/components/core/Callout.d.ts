/** A tinted note block for a caveat, a next step, or a teacher's aside in a report. */
export interface CalloutProps {
  tone?: "slate" | "ochre" | "plain";
  title?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Callout(props: CalloutProps): JSX.Element;
