/** Label + hint + error wrapper around any form control. */
export interface FieldProps {
  label: string;
  /** helper text shown when there is no error */
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Field(props: FieldProps): JSX.Element;
