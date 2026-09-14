<!-- Alias: for the `section-n` layout with `variant: 2`. -->
<!-- Any other property (e.g. `colors`) falls through to `section-n`. -->
<template>
  <SectionN :variant="2">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </SectionN>
</template>

<script setup lang="ts">
import SectionN from './section-n.vue'
</script>
