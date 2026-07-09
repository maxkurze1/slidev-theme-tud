import type { ShikiSetupReturn } from '@slidev/types'
import { defineShikiSetup } from '@slidev/types'
import { bundledThemes } from 'shiki'
import { colors } from '../scripts/color'

// Recolor a handful of syntax categories with the TUD corporate palette on
// top of a well-tested base theme, so code blocks pick up brand accents
// without losing that theme's contrast/hierarchy for everything else
// (comments, punctuation, generic variables, ...).
// Never touch comments — some grammars file them under oddly-named scopes
// (e.g. vitesse's `string.comment`) that would otherwise false-match below.
const isComment = (s: string) => s.split('.').includes('comment')

const CATEGORIES: { match: (scope: string) => boolean, color: (shade: 1 | 2) => string }[] = [
  { match: s => s === 'keyword' || s.startsWith('keyword.control') || s.startsWith('storage.type.class') || s.startsWith('storage.modifier'), color: shade => colors.blue[shade] },
  { match: s => s.split('.')[0] === 'string' || s.startsWith('source.regexp'), color: shade => colors.green[shade] },
  { match: s => s.includes('entity.name.function') || s.includes('support.function'), color: shade => colors.magenta[shade] },
  { match: s => s.includes('entity.name.tag') || s === 'tag.html', color: shade => colors.red[shade] },
  { match: s => s.includes('entity.name.type') || s.includes('entity.name.class') || s.includes('support.type') || s.includes('support.class') || s === 'namespace', color: shade => colors.violet[shade] },
  { match: s => s.includes('constant.numeric') || s === 'number', color: shade => colors.orange[shade] },
]

// shade 1 (saturated) reads well on light backgrounds, shade 2 (pastel) on dark ones.
function recolor(theme: any, shade: 1 | 2) {
  return {
    ...theme,
    tokenColors: theme.tokenColors?.map((rule: any) => {
      const scopes: string[] = (Array.isArray(rule.scope) ? rule.scope : [rule.scope]).filter(Boolean)
      if (scopes.some(isComment)) return rule
      const category = CATEGORIES.find(c => scopes.some(c.match))
      if (!category || !rule.settings?.foreground) return rule
      return { ...rule, settings: { ...rule.settings, foreground: category.color(shade) } }
    }),
  }
}

export default defineShikiSetup(async (): Promise<ShikiSetupReturn> => {
  const [{ default: light }, { default: dark }] = await Promise.all([
    bundledThemes['night-owl-light'](),
    bundledThemes['vitesse-dark'](),
  ])
  return {
    themes: {
      light: recolor(light, 1),
      dark: recolor(dark, 2),
    },
  }
})
