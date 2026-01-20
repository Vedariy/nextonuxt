<script setup lang="ts">
interface TVpDemoChild {
  message: string
}

defineProps<TVpDemoChild>()

const emit = defineEmits<{
  reply: [message: string]
}>()

const sendReply = () => {
  emit('reply', `Reply at ${new Date().toLocaleTimeString()}`)
}
</script>

<template>
  <div class="bg-palantir-light-2 dark:bg-palantir-dark-1 border border-palantir-light-3 dark:border-palantir-dark-3 p-4 rounded-sm">
    <p class="text-xs font-bold text-palantir-dark-4 dark:text-palantir-gray-2 mb-2 uppercase tracking-wide">Child Component</p>
    <p class="text-palantir-text-dark dark:text-palantir-gray-1 mb-3 flex items-center gap-2">
      <span class="text-palantir-blue">📩</span> Message from parent: <strong class="text-palantir-text-dark dark:text-white">{{ message }}</strong>
    </p>
    <button
      class="bp-button bp-button-primary w-full justify-center"
      @click="sendReply"
    >
      Send Reply to Parent
    </button>
  </div>
</template>
