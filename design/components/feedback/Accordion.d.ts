/**
 * Ruled question-and-answer accordion. One panel open at a time; no card, no icons but a
 * plus/minus rule.
 *
 * Accessibility contract (do not drop when re-implementing):
 * - the trigger is a `<button>` carrying `aria-expanded` and `aria-controls`
 * - the panel is `role="region"` with `aria-labelledby` pointing back at its trigger
 * - a closed panel is `inert`, so its answer is neither focusable nor announced
 *   (`inert` rather than `hidden`: `hidden` sets display:none and would kill the
 *   measured-height animation)
 */
export interface AccordionProps {
  items?: Array<{ q: string; a: string }>;
  /** index open on mount; -1 for all closed. Default 0 */
  defaultOpen?: number;
  /**
   * Prefix for the generated trigger/panel ids (`${idPrefix}-q-${i}` / `${idPrefix}-a-${i}`).
   * Default "faq". Set a distinct value if more than one Accordion renders on a page,
   * otherwise the ids collide and aria-controls points at the wrong panel.
   */
  idPrefix?: string;
  style?: React.CSSProperties;
}
export declare function Accordion(props: AccordionProps): JSX.Element;
