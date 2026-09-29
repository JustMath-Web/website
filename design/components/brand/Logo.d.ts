/**
 * The Just Math Malaysia lockup.
 *
 * The mark is a square-root sign cut away at its lowest point, with the ochre dot in the cut —
 * adopted 2026-09-29, see `ASSETS.md` §1c. (It supersedes an earlier 2×2 operator cluster,
 * `ASSETS.md` §1/§1b — historical only.) It is drawn with `currentColor`, so `reversed` (or any
 * `color`) recolours the stroke without a second asset; the dot stays ochre-500 on either ground.
 */
export interface LogoProps {
  /**
   * `lockup` (default) — mark + stacked type, the full signature.
   * `monogram` / `mark` — the mark alone, for favicons, avatars, and anywhere the lockup would
   *   fall below its minimum width.
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
