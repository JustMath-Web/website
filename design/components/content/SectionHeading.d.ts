/** Eyebrow + serif heading + lead paragraph — opens every landing-page section. */
export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  level?: 1 | 2 | 3;
  style?: React.CSSProperties;
}
export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;
