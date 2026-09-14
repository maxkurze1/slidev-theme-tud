<!-- Alias: for the `section-n` layout with `variant: 4`. -->
<!-- Any other property (e.g. `colors`) falls through to `section-n`. -->
<template>
  <SectionN :variant="4">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </SectionN>
</template>

<script setup lang="ts">
import SectionN from './section-n.vue'
</script>
