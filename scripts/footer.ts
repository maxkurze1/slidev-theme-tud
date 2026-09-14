import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { createRegistry } from './util'

/** The footer text used when neither a slide nor the headmatter provides one. */
export const DEFAULT_FOOTER_TEMPLATE = '{title} • {author}'

export interface Footer {
  /**
   * The footer text, or `null` for none.
   * Defaults to the headmatter's `footer`, else {@link DEFAULT_FOOTER_TEMPLATE}.
   */
  template?: string | null
  /** Whether the page number (+ click counter) is shown (default: `true`) */
  number?: boolean
}

/** Shorthand accepted by {@link useFooter}: a `string` or `null` sets {@link Footer.template}. */
export type FooterInput = string | null | Footer

const footerReg = createRegistry<Footer>()
export const slideFooters = footerReg.store

/** Normalize the {@link useFooter} shorthands into a {@link Footer}. */
export function toFooter(footer: FooterInput | undefined): Footer {
  if (footer === undefined) return {}
  if (footer === null || typeof footer === 'string') return { template: footer }
  return footer
}

/**
 * Override the footer of the slide this is called on.
 *
 * Call it from a layout's or a slide's `setup`. The text and the page number
 * are independent, and each field left unset keeps its default — so the footer
 * stays visible with its usual content unless asked otherwise.
 *
 * ```ts
 * useFooter({ template: null, number: false }) // no footer at all
 * useFooter('{title} — {subtitle}')            // keep it, change the text
 * useFooter(null)                              // only the page number
 * useFooter({ number: false })                 // only the text
 * useFooter(() => (done ? null : '{title}'))   // reactive: refs and getters work too
 * ```
 */
export function useFooter(footer: MaybeRefOrGetter<FooterInput>) {
  footerReg.publish(() => toFooter(toValue(footer)))
}
