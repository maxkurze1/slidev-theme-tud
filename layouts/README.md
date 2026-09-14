Note that `cover.vue` and `section.vue` are only symbolic links
to the `cover-blue.vue` and `section-blue.vue` layouts, respectively.

`section-n.vue` is internal: it implements all six section compositions,
parameterized by its `variant` prop. Decks use the public `section-1.vue` …
`section-6.vue` layouts, which are thin aliases that preset that prop.
