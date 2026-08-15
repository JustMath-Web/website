/**
 * The Just Math Malaysia lockup.
 *
 * The mark is the 2×2 operator cluster (+ − × ÷), carried over from the live site
 * (`mathematicsmalaysia.com`) and redrawn as pure geometry in brand ink — see `ASSETS.md` §1b.
 * It is drawn with `currentColor`, so `reversed` (or any `color`) recolours it without a second
 * asset. The mark is **never** green: green is reserved for controls that open WhatsApp.
 */
export interface LogoProps {
  /**
   * `lockup` (default) — mark + stacked type, the full signature.
   * `monogram` / `mark` — the operator cluster alone, for favicons, avatars, and anywhere the
   *   lockup would fall below its minimum width.
   * `wordmark` / `stacked` — type alone, for contexts where the mark already appears nearby.
   */
  variant?: "lockup" | "monogram" | "mark" | "wordmark" | "stacked";
  /** Type size in px for the lockup/wordmark; the mark scales from it. Default 24. */
  size?: number;
  /** Overrides the ink. Prefer `reversed` for the standard paper-on-ink treatment. */
  color?: string;
  /** Paper on ink, for the dark footer and the ink bands. */
  reversed?: boolean;
  /** Accessible name. Default "Just Math Malaysia". */
  title?: string;
  style?: React.CSSProperties;
}
export declare function Logo(props: LogoProps): JSX.Element;
