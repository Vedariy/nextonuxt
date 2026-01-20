<script setup lang="ts">
defineOptions({
  name: 'ComponentA'
})

const inputValue = ref('')
const mountedAt = ref<string | null>(null)
const activatedCount = ref(0)
const deactivatedCount = ref(0)

onMounted(() => {
  mountedAt.value = new Date().toLocaleTimeString()
  console.log('📦 ComponentA mounted')
})

onActivated(() => {
  activatedCount.value++
  console.log('✅ ComponentA activated', activatedCount.value)
})

onDeactivated(() => {
  deactivatedCount.value++
  console.log('💤 ComponentA deactivated', deactivatedCount.value)
})
</script>

<template>
  <div class="bg-blue-500/5 border border-blue-500/20 p-4 rounded-sm transition-all hover:border-blue-500/40">
    <h5 class="text-sm font-bold text-blue-400 mb-3 uppercase tracking-wider flex items-center gap-2">
      <span class="text-lg">A</span> Component A
    </h5>
    
    <input
      v-model="inputValue"
      class="p-2 bp-input w-full mb-3 border-blue-500/20 focus:border-blue-500"
      placeholder="Type something in Component A..."
    >
    
    <div class="text-xs font-mono text-palantir-gray-0 dark:text-palantir-gray-2 space-y-1 p-2 bg-palantir-light-2 dark:bg-palantir-dark-2 rounded border border-palantir-light-3 dark:border-palantir-dark-3">
      <div class="flex justify-between">
        <span>Mounted:</span>
        <span class="text-palantir-text-dark dark:text-palantir-gray-1">{{ mountedAt }}</span>
      </div>
      <div class="flex justify-between">
        <span>Activated:</span>
        <span class="text-blue-500 dark:text-blue-400">{{ activatedCount }} times</span>
      </div>
      <div class="flex justify-between">
        <span>Deactivated:</span>
        <span class="text-palantir-gray-0 dark:text-palantir-gray-4">{{ deactivatedCount }} times</span>
      </div>
      <div v-if="inputValue" class="pt-2 mt-1 border-t border-palantir-light-3 dark:border-palantir-dark-3 text-blue-600 dark:text-blue-300 truncate">
        💾 Value: "{{ inputValue }}"
      </div>
    </div>
  </div>
</template>
