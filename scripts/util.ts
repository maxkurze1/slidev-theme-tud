// Import dayjs's native ESM build (not the UMD `dayjs`/`dayjs/plugin/*` entries).
// The UMD bundle has no real `default` export, so when this theme is consumed as a
// dependency Vite serves it raw and `import dayjs from "dayjs"` throws
// "doesn't provide an export named: 'default'". The `/esm` build is proper ESM.
import dayjs from "dayjs/esm";
import advancedFormat from "dayjs/esm/plugin/advancedFormat";
import { getCurrentInstance, inject, reactive, ref, toValue, watchEffect } from "vue";
import type { MaybeRefOrGetter, Ref } from "vue";
import { useSlideContext } from "@slidev/client";

export const WIDTH = 1280
export const HEIGHT = 720

// `Do` (ordinal day, e.g. "23rd") lives in the advancedFormat plugin.
dayjs.extend(advancedFormat);

/* ================================ */
/*        export composables        */
/* ================================ */

// Slidev's authoritative, reactive slide scale.
//
// Caution this relies on Slidev's internal injection key.
// It seems there is no other way to access the slide's
// scale reactively.
export function useScale(): Ref<number> {
  return inject<Ref<number>>("$$slidev-slide-scale", ref(1));
}

// How deeply the calling component is nested. A slide's own `<script setup>`
// runs in the component that *renders* the layout, so it always sits above it.
function componentDepth() {
  let depth = 0
  for (let i = getCurrentInstance()?.parent; i; i = i.parent) depth++
  return depth
}

/**
 * A per-slide value store.
 *
 * `publish` is meant to be called from a layout's (or a slide's) `setup`; it
 * records the value under the slide it was called on, so that the globals
 * (e.g. `global-bottom.vue`) can look it up by page number. Values stay
 * reactive: refs/getters are re-evaluated whenever their sources change.
 */
export function createRegistry<T>() {
  const store = reactive<Record<number, T>>({})
  // keep outside of `store` to avoid `watchEffect` dep. cycle
  const owner: Record<number, number> = {}

  function publish(value: MaybeRefOrGetter<T>) {
    const page = toValue(useSlideContext().$page)
    const depth = componentDepth() // fix priority order
    watchEffect(() => {
      const resolved = toValue(value)
      if (owner[page] !== undefined && depth > owner[page]) return
      owner[page] = depth
      store[page] = resolved
    })
  }

  return { store, publish }
}

export function formatString(template : string, values : any) {
  return template.replace(/{(\w+)}/g, (_, key) => values[key] ?? `{${key}}`);
}

// Expand `\today` and `\now` tokens in a string, each with an optional
// day.js format in square brackets (see https://day.js.org/docs/en/display/format):
//   \today               -> "June 23rd, 2026"        (the long, human format)
//   \today[YYYY-MM-DD]    -> "2026-06-23"
//   \now                 -> "2026-06-23 14:05:09"     (date + time, no format given)
//   \now[HH:mm]           -> "14:05"
// `\today` and `\now` only differ in their default (no-bracket) format; both
// accept any day.js format string.
export function expandDateTokens(template : string, now = new Date()) {
  const d = dayjs(now);
  return String(template).replace(
    /\\(today|now)(?:\[([^\]]*)\])?/g,
    (_, kind, fmt) => {
      if (fmt != null)
        return d.format(fmt);
      return kind === "today" ? d.format("MMMM Do, YYYY") : d.format("MMMM Do, YYYY HH:mm");
    },
  );
}
