/**
 * 色は Hex をコンポーネントに直書きせず、CSS 変数（`index.css` の `:root`）を参照する。
 * インラインや JS で色が必要なときのみこの定数を使う。
 */
export const COLORS = {
  text: 'var(--text)',
  textHeading: 'var(--text-h)',
  bg: 'var(--bg)',
  border: 'var(--border)',
  accent: 'var(--accent)',
  codeBg: 'var(--code-bg)',
  primary: 'var(--primary)',
  primaryHover: 'var(--primary-hover)',
  rowHover: 'var(--row-hover)',
} as const

export type ColorToken = (typeof COLORS)[keyof typeof COLORS]
