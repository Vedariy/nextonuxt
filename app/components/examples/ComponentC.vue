<script setup lang="ts">
defineOptions({
  name: 'ComponentC'
})

const mountedAt = ref<string | null>(null)
const activatedCount = ref(0)
const deactivatedCount = ref(0)
const items = ref<string[]>([])
const newItem = ref('')

onMounted(() => {
  mountedAt.value = new Date().toLocaleTimeString()
  console.log('📦 ComponentC mounted')
})

onActivated(() => {
  activatedCount.value++
  console.log('✅ ComponentC activated', activatedCount.value)
})

onDeactivated(() => {
  deactivatedCount.value++
  console.log('💤 ComponentC deactivated', deactivatedCount.value)
})

const addItem = () => {
  if (newItem.value.trim()) {
    items.value.push(newItem.value)
    newItem.value = ''
  }
}

const removeItem = (index: number) => {
  items.value.splice(index, 1)
}
</script>

<template>
  <div class="bg-palantir-orange/5 border border-palantir-orange/20 p-4 rounded-sm transition-all hover:border-palantir-orange/40">
    <h5 class="text-sm font-bold text-palantir-orange mb-3 uppercase tracking-wider flex items-center gap-2">
      <span class="text-lg">C</span> Component C
    </h5>
    
    <div class="flex gap-2 mb-3">
      <input
        v-model="newItem"
        @keyup.enter="addItem"
        class="bp-input flex-1 border-palantir-orange/20 focus:border-palantir-orange focus:ring-palantir-orange"
        placeholder="Add item..."
      >
      <button
        @click="addItem"
        class="px-3 py-1.5 bg-palantir-orange/20 hover:bg-palantir-orange/30 text-palantir-orange rounded text-sm font-medium transition-colors"
      >
        Add
      </button>
    </div>
    
    <ul class="space-y-1 mb-3 max-h-[120px] overflow-y-auto pr-1 custom-scrollbar">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center justify-between bg-palantir-light-2 dark:bg-palantir-dark-1 px-3 py-2 rounded text-sm border border-palantir-light-3 dark:border-palantir-dark-3 group"
      >
        <span class="text-palantir-text-dark dark:text-palantir-gray-1 truncate">{{ item }}</span>
        <button
          @click="removeItem(index)"
          class="text-palantir-gray-0 dark:text-palantir-gray-4 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      </li>
      <li v-if="items.length === 0" class="text-center text-palantir-gray-0 dark:text-palantir-gray-4 text-xs py-2 italic">
        No items yet
      </li>
    </ul>

    <div class="text-xs font-mono text-palantir-gray-0 dark:text-palantir-gray-2 space-y-1 p-2 bg-palantir-light-2 dark:bg-palantir-dark-2 rounded border border-palantir-light-3 dark:border-palantir-dark-3">
      <div class="flex justify-between">
        <span>Mounted:</span>
        <span class="text-palantir-text-dark dark:text-palantir-gray-1">{{ mountedAt }}</span>
      </div>
      <div class="flex justify-between">
        <span>Activated:</span>
        <span class="text-palantir-orange">{{ activatedCount }} times</span>
      </div>
      <div class="flex justify-between">
        <span>Deactivated:</span>
        <span class="text-palantir-gray-0 dark:text-palantir-gray-4">{{ deactivatedCount }} times</span>
      </div>
      <div class="pt-2 mt-1 border-t border-palantir-light-3 dark:border-palantir-dark-3 text-palantir-orange">
        💾 Items: {{ items.length }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-palantir-dark-4 rounded;
}
</style>
