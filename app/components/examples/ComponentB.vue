<script setup lang="ts">
defineOptions({
  name: 'ComponentB'
})

const counter = ref(0)
const mountedAt = ref<string | null>(null)
const activatedCount = ref(0)
const deactivatedCount = ref(0)

onMounted(() => {
  mountedAt.value = new Date().toLocaleTimeString()
  console.log('📦 ComponentB mounted')
})

onActivated(() => {
  activatedCount.value++
  console.log('✅ ComponentB activated', activatedCount.value)
})

onDeactivated(() => {
  deactivatedCount.value++
  console.log('💤 ComponentB deactivated', deactivatedCount.value)
})
</script>

<template>
  <div class="bg-purple-500/5 border border-purple-500/20 p-4 rounded-sm transition-all hover:border-purple-500/40">
    <h5 class="text-sm font-bold text-purple-400 mb-3 uppercase tracking-wider flex items-center gap-2">
      <span class="text-lg">B</span> Component B
    </h5>
    
    <div class="flex items-center gap-2 mb-3 bg-palantir-light-2 dark:bg-palantir-dark-1 p-2 rounded border border-purple-500/20">
      <button
        @click="counter--"
        class="w-8 h-8 flex items-center justify-center rounded bg-palantir-light-3 dark:bg-palantir-dark-3 hover:bg-purple-500/20 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
      >
        -
      </button>
      <span class="flex-1 text-center text-xl font-bold font-mono text-palantir-text-dark dark:text-palantir-gray-1">{{ counter }}</span>
      <button
        @click="counter++"
        class="w-8 h-8 flex items-center justify-center rounded bg-palantir-light-3 dark:bg-palantir-dark-3 hover:bg-purple-500/20 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
      >
        +
      </button>
    </div>
    
    <div class="text-xs font-mono text-palantir-gray-0 dark:text-palantir-gray-2 space-y-1 p-2 bg-palantir-light-2 dark:bg-palantir-dark-2 rounded border border-palantir-light-3 dark:border-palantir-dark-3">
      <div class="flex justify-between">
        <span>Mounted:</span>
        <span class="text-palantir-text-dark dark:text-palantir-gray-1">{{ mountedAt }}</span>
      </div>
      <div class="flex justify-between">
        <span>Activated:</span>
        <span class="text-purple-600 dark:text-purple-400">{{ activatedCount }} times</span>
      </div>
      <div class="flex justify-between">
        <span>Deactivated:</span>
        <span class="text-palantir-gray-0 dark:text-palantir-gray-4">{{ deactivatedCount }} times</span>
      </div>
      <div class="pt-2 mt-1 border-t border-palantir-light-3 dark:border-palantir-dark-3 text-purple-600 dark:text-purple-300">
        💾 Counter: {{ counter }}
      </div>
    </div>
  </div>
</template>
