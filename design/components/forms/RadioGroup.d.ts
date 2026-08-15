/** Two to four mutually exclusive choices, rendered as selectable rows. */
export interface RadioGroupProps {
  name: string;
  options?: Array<string | { value: string; label: string; note?: string }>;
  value?: string;
  onChange?: (value: string) => void;
  /** grid columns, default 1 */
  columns?: number;
  style?: React.CSSProperties;
}
export declare function RadioGroup(props: RadioGroupProps): JSX.Element;
