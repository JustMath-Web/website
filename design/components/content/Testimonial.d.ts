/** A parent's words, set in serif under an ink rule. No portraits, no star ratings. */
export interface TestimonialProps {
  quote: string;
  name: string;
  /** context line, e.g. "Parent, Form 4 · Petaling Jaya" */
  detail?: string;
  style?: React.CSSProperties;
}
export declare function Testimonial(props: TestimonialProps): JSX.Element;
