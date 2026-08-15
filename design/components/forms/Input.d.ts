/** Single-line or multiline text entry. */
export interface InputProps {
  invalid?: boolean;
  /** renders a textarea */
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent) => void;
  style?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
