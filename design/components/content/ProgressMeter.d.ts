/**
 * Topic-level progress bar for written parent reports.
 */
export interface ProgressMeterProps {
  /** the topic in the parent's words, e.g. "Quadratic equations" */
  topic: string;
  level?: "secure" | "building" | "practise";
  /** override the bar fill percentage; defaults from level */
  value?: number;
  showLabel?: boolean;
  style?: React.CSSProperties;
}
export declare function ProgressMeter(props: ProgressMeterProps): JSX.Element;
