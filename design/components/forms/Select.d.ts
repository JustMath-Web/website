/** Native select with brand chrome — form level, syllabus, preferred lesson time. */
export interface SelectProps {
  options?: Array<string | { value: string; label: string }>;
  placeholder?: string;
  invalid?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent) => void;
  style?: React.CSSProperties;
}
export declare function Select(props: SelectProps): JSX.Element;
