<script setup lang="ts">
interface TVpLiveDemoCard {
  title: string
}

defineProps<TVpLiveDemoCard>()
</script>

<template>
  <div class="bp-card">
    <h3 class="bp-heading mb-4 text-lg flex items-center gap-2">
      <span class="text-palantir-blue">🎮</span> Live Demo: {{ title }}
    </h3>
    <div class="space-y-4">
      <slot />
    </div>
  </div>
</template>
