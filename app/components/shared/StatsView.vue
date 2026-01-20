<script setup lang="ts">
const emit = defineEmits<{
  'activated': []
  'deactivated': []
}>()

const activatedAt = ref<string | null>(null)
const mountedAt = ref<string | null>(null)
const counter = ref(0)
const intervalId = ref<number | null>(null)

onMounted(() => {
  mountedAt.value = new Date().toLocaleTimeString()
  console.log('📦 StatsView mounted at', mountedAt.value)
})

onActivated(() => {
  activatedAt.value = new Date().toLocaleTimeString()
  console.log('✅ StatsView activated at', activatedAt.value)
  emit('activated')
  
  intervalId.value = window.setInterval(() => {
    counter.value++
  }, 1000)
})

onDeactivated(() => {
  console.log('💤 StatsView deactivated')
  emit('deactivated')
  
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
})

onUnmounted(() => {
  console.log('🗑️ StatsView unmounted')
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
})

const stats = computed(() => [
  { label: 'Active Time', value: `${counter.value}s`, icon: '⏱️' },
  { label: 'Status', value: 'Active', icon: '🟢' },
  { label: 'Updates', value: counter.value, icon: '🔄' }
])
</script>

<template>
  <div class="space-y-4">
    <h4 class="bp-heading flex items-center gap-2">
      <span class="text-palantir-blue">📊</span> Statistics
    </h4>
    
    <div class="grid grid-cols-3 gap-3">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-palantir-light-2 dark:bg-palantir-dark-2 border border-palantir-light-3 dark:border-palantir-dark-3 p-3 rounded text-center transition-all hover:border-palantir-blue/30"
      >
        <div class="text-xl mb-1 opacity-80">{{ stat.icon }}</div>
        <div class="text-xl font-bold text-palantir-text-dark dark:text-palantir-gray-1 font-mono">{{ stat.value }}</div>
        <div class="text-xs text-palantir-dark-4 dark:text-palantir-gray-3 uppercase tracking-wide mt-1">{{ stat.label }}</div>
      </div>
    </div>

    <div class="text-xs font-mono text-palantir-dark-4 dark:text-palantir-gray-3 space-y-1 mt-4 p-3 bg-palantir-light-2 dark:bg-palantir-dark-2 border border-palantir-light-3 dark:border-palantir-dark-3 rounded">
      <div class="flex justify-between">
        <span>Mounted:</span>
        <span class="text-palantir-text-dark dark:text-palantir-gray-1">{{ mountedAt || 'Not yet' }}</span>
      </div>
      <div class="flex justify-between">
        <span>Last activated:</span>
        <span class="text-palantir-text-dark dark:text-palantir-gray-1">{{ activatedAt || 'Not yet' }}</span>
      </div>
      <div class="border-t border-palantir-light-3 dark:border-palantir-dark-3 my-2 pt-2 space-y-1">
        <p class="text-palantir-blue flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-palantir-blue opacity-50"></span>
          Timer pauses when deactivated
        </p>
        <p class="text-palantir-blue flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-palantir-blue"></span>
          Timer resumes when activated
        </p>
      </div>
    </div>
  </div>
</template>
