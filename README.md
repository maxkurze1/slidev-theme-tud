[![npm version](https://img.shields.io/npm/v/slidev-theme-tud?logo=npm)](https://www.npmjs.com/package/slidev-theme-tud)

# slidev-theme-tud

A [TU Dresden](https://tu-dresden.de/) theme for [Slidev](https://github.com/slidevjs/slidev) (following the [new 2025 corporate desing](https://tu-dresden.de/tu-dresden/organisation/zentrale-universitaetsverwaltung/dezernat-7/sachgebiet-7-1-corporate-design/cd)).

[![demo title slide](./docs/screenshots/title-slide.svg)](https://maxkurze1.github.io/slidev-theme-tud/)

## Usage

You can install this theme into an existing repository using

```bash
$ pnpm install slidev-theme-tud
```

Then you should be able to use it by setting the `theme` in your frontmatter:

```md
---
theme: tud
---
```

Slidev automatically appends the `slidev-theme-` prefix to find the correct package.
(as described [here](https://sli.dev/guide/theme-addon#use-theme)).

## Layouts

See [docs/layouts.md](./docs/layouts.md) for a preview and usage example of each layout.

## Components

This theme provides the following components:

None

## Composables

The background, logos and footer of a slide can be changed from a layout or from
a single slide. See [docs/composables.md](./docs/composables.md) for what each
composable accepts.

## Contributing

- `pnpm install`
- `pnpm run dev` to start theme preview of `example.mdc`
- Edit the `example.mdc` and style to see the changes

