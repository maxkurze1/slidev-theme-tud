# Layouts

This theme ships nine layouts. Every preview below is the corresponding slide of
[`example.mdc`](../example.mdc), which you can run locally with `pnpm run dev`.

| Layout | Purpose |
| --- | --- |
| [`cover-white`](#cover-white) / [`cover-blue`](#cover-blue) / `cover` | Opening slide of a deck |
| [`section-white`](#section-white) / [`section-blue`](#section-blue) / `section` | Plain chapter divider |
| [`section-n`](#section-n) | Chapter divider built from the TUD logo mark, six variants |
| [`default`](#default) | Ordinary content slide |
| [`cols`](#cols) | Content slide with side-by-side columns |

`cover` and `section` are aliases for `cover-blue` and `section-blue`.

## Covers

Both cover layouts fall back to the deck's frontmatter, so a cover slide can be
empty. Provide a level-1 heading, a level-2 heading or a paragraph to override
the title, subtitle or author block for that slide only.

```md
---
theme: tud
title: "Some very catchy title"
subtitle: "With a sub-title"
author: "Your Name"
group: "Verified System Design Automation"
# \today renders the current date; \today[YYYY-MM-DD] takes any day.js format
date: '\today'
layout: "cover-white"
---
```

### `cover-white`

![cover-white layout](./screenshots/layout-cover-white.svg)

```md
---
layout: "cover-white"
---

<!-- Optional: overrides the frontmatter title and subtitle -->
# Here goes your fancy Title

## With another sub-title
```

### `cover-blue`

The same layout on the corporate blue, with the full logo reversed to white.
Also available as `cover`.

![cover-blue layout](./screenshots/layout-cover-blue.svg)

```md
---
layout: "cover-blue"
---

# A blue cover slide
```

## Sections

### `section-white`

A divider that keeps the white background. The level-1 heading carries the
chapter name, the level-2 heading an optional subtitle.

![section-white layout](./screenshots/layout-section-white.svg)

```md
---
layout: "section-white"
---

# A white section

## Using `section-white`
```

### `section-blue`

The same, on the corporate blue. Also available as `section`.

![section-blue layout](./screenshots/layout-section-blue.svg)

```md
---
layout: "section"
---

# And a blue section

## Using `section` or `section-blue`
```

### `section-n`

Dividers built from an oversized TUD logo mark. `variant` (1–6) picks both the
composition and, by default, a matching color combination.

Variants 1 and 3 additionally place a `detail` slot in the opposite corner:

```md
---
layout: "section-n"
variant: 1
---

# Here is the title of the section

Here is a subtitle, the name of the speaker, and additional
contextual information.

::detail::

This slide uses `section-n` with `variant: 1`.
```

| | |
| --- | --- |
| ![section-n variant 1](./screenshots/layout-section-n-1.svg) | ![section-n variant 2](./screenshots/layout-section-n-2.svg) |
| `variant: 1` — diagonal split, title top right, `detail` bottom left | `variant: 2` — mark rotated in from the right, content on the left |
| ![section-n variant 3](./screenshots/layout-section-n-3.svg) | ![section-n variant 4](./screenshots/layout-section-n-4.svg) |
| `variant: 3` — title top left, `detail` bottom right | `variant: 4` — wedge from the right, content on the left |
| ![section-n variant 5](./screenshots/layout-section-n-5.svg) | ![section-n variant 6](./screenshots/layout-section-n-6.svg) |
| `variant: 5` — mark centred behind centred text | `variant: 6` — diagonal band behind centred text |

#### Colors

Each variant defaults to the color combination of the same number:

| # | Background | Logo mark | Text |
| --- | --- | --- | --- |
| 1 | `red-2` | `magenta-2` | `primary` |
| 2 | `violet` | `magenta` | `white` |
| 3 | `violet-2` | `primary` | `white` |
| 4 | `teal-1` | `teal-2` | `primary` |
| 5 | `yellow-2` | `teal-2` | `primary` |
| 6 | `magenta-2` | `blue-2` | `primary` |

Override any of them with the `colors` property. Each field takes a palette name
(`green`, `blue-2`, …), any CSS color, or a number to pull that field from
another combination:

```md
---
layout: "section-n"
variant: 3
colors:
  bg: "green-2"
  logo: "green"
  text: "primary"
---

# A green section
```

Passing a number to `bg` or `logo` switches the whole combination, so the
geometry of one variant can be paired with the colors of another:

```md
---
layout: "section-n"
variant: 6      # composition of variant 6
colors:
  bg: 4         # ... with the colors of combination 4
---
```

## Content slides

### `default`

The layout used when no `layout` is given. Headings, lists, tables, code blocks,
LaTeX and footnotes all render here — see the second half of
[`example.mdc`](../example.mdc) for the full set.

![default layout](./screenshots/layout-default.svg)

```md
---
---

# A `default` slide

This slide shows the default layout
```

### `cols`

Splits the slide into columns. Content before the first slot spans the full
width, each `::col-N::` slot becomes a column ordered by its number regardless
of where it appears in the file, and `::bottom::` spans the full width again
underneath.

![cols layout](./screenshots/layout-cols.svg)

```md
---
layout: "cols"
---

# A slots layout with multiple columns

> You can put some content above the columns that will span the whole slide

::col-1::

## First {.red}

This shows on the left in red

::col-3::

## Third {.green}

This shows on the right in green

::col-2::

## Second {.magenta}

This shows in the middle in magenta

::bottom::

This is shown below the columns and spans the whole slide again.
```
