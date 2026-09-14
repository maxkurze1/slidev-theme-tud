# Composables

The theme's chrome — background, logos and footer — is not hard-coded into the
slide: every part of it is published by a composable. A layout calls those in
its `<script setup>` to define its look, and a single slide can call the very
same composable from a `<script setup>` block in the markdown to override it:

```md
---
layout: "section-3"
---

# A section slide that keeps its footer

<script setup lang="ts">
import { useFooter } from 'slidev-theme-tud/scripts/footer'

useFooter({ template: '{title}', number: true })
</script>
```

A slide always wins over its layout, and settings that are left out keep the
theme default — so each call only states what it wants to change.

Wherever a colour is expected, both a palette name (`primary`, `gray`, `blue`,
`blue-2`, … see [scripts/color.ts](../scripts/color.ts)) and any plain CSS
colour (`white`, `#ff0000`, …) are accepted. Every value may also be a ref or a
getter, in which case the chrome follows it reactively.

## `useFooter(footer)`

From `slidev-theme-tud/scripts/footer`. Controls the footer of the slide it is
called on, through two independent settings:

- `template` — the footer text, or `null` for none. `{key}` placeholders are
  filled from the headmatter (plus `{date}`, with its `\today` / `\now` tokens
  expanded) and the result is rendered as HTML, so markup is allowed.
  Defaults to the headmatter's `footer`, else `{title} • {author}`.
- `number` — whether the page number (with its click counter) is shown.
  Defaults to `true`.

A bare string or `null` is shorthand for `template`:

```ts
useFooter('{title} — {subtitle}')            // keep the number, change the text
useFooter(null)                              // only the page number
useFooter({ number: false })                 // only the text
useFooter({ template: null, number: false }) // no footer at all
useFooter(() => (done ? null : '{title}'))   // reactive
```

`footer: false` in the headmatter drops the text deck-wide, without touching the
page number. The cover and section layouts opt out of both parts, which is why a
slide using one of them needs the explicit `useFooter` shown above to get a
footer back.

## `useLogo(logos)`

From `slidev-theme-tud/scripts/background`. Picks which of the three TU Dresden
marks the slide shows, and in which colour. Each field takes a colour; a field
that is left out hides that mark, and changes are cross-faded:

- `text` — the full logo with the wordmark, top left (220 px wide). Used by the
  cover layouts.
- `normal` — the bare logo without the wordmark, in the same spot (68 px wide).
- `small` — the compact wordmark in the bottom left corner (54 px wide), next to
  the footer. This is the one ordinary content slides carry.

```ts
useLogo({ small: 'primary' })   // what the `default` layout does
useLogo({ text: 'white' })      // a cover on a dark background
useLogo({})                     // no logo at all
useLogo(computed(() => ({ small: textColor.value })))
```

`text` and `normal` share a position, so they are alternatives rather than a
pair — setting both stacks the bare logo on top of the wordmark version.

## `useBackground(color)` and `useBackgroundLogo(logo)`

Also from `slidev-theme-tud/scripts/background`: the first fills the slide with a
colour, the second places the two oversized logo halves that the section layouts
are built from. See [layouts/section-n.vue](../layouts/section-n.vue) for a
worked example of both.
