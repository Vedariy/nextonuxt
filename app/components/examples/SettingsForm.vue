<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    theme: string
    notifications: boolean
  }
}>()

const emit = defineEmits<{
  'update:modelValue': [value: typeof props.modelValue]
  'activated': []
  'deactivated': []
}>()

const activatedAt = ref<string | null>(null)
const mountedAt = ref<string | null>(null)

onMounted(() => {
  mountedAt.value = new Date().toLocaleTimeString()
  console.log('📦 SettingsForm mounted at', mountedAt.value)
})

onActivated(() => {
  activatedAt.value = new Date().toLocaleTimeString()
  console.log('✅ SettingsForm activated at', activatedAt.value)
  emit('activated')
})

onDeactivated(() => {
  console.log('💤 SettingsForm deactivated')
  emit('deactivated')
})

const updateTheme = (theme: string) => {
  emit('update:modelValue', { ...props.modelValue, theme })
}

const toggleNotifications = () => {
  emit('update:modelValue', { ...props.modelValue, notifications: !props.modelValue.notifications })
}
</script>

<template>
  <div class="space-y-4">
    <h4 class="bp-heading flex items-center gap-2">
      <span class="text-palantir-blue">⚙️</span> Settings
    </h4>
    
    <div class="space-y-4">
      <div>
        <label class="block text-xs font-bold text-palantir-gray-0 dark:text-palantir-gray-3 mb-2 uppercase tracking-wide">Theme</label>
        <div class="bg-palantir-light-2 dark:bg-palantir-dark-2 p-1 rounded border border-palantir-light-3 dark:border-palantir-dark-3 inline-flex">
          <button
            @click="updateTheme('light')"
            :class="[
              'px-3 py-1.5 text-sm font-medium rounded-sm transition-all flex items-center gap-2',
              modelValue.theme === 'light'
                ? 'bg-palantir-blue text-white shadow-sm'
                : 'text-palantir-gray-0 dark:text-palantir-gray hover:text-palantir-text-dark dark:hover:text-palantir-gray-1 hover:bg-palantir-light-3 dark:hover:bg-palantir-dark-3'
            ]"
          >
            ☀️ Light
          </button>
          <button
            @click="updateTheme('dark')"
            :class="[
              'px-3 py-1.5 text-sm font-medium rounded-sm transition-all flex items-center gap-2',
              modelValue.theme === 'dark'
                ? 'bg-palantir-blue text-white shadow-sm'
                : 'text-palantir-gray-0 dark:text-palantir-gray hover:text-palantir-text-dark dark:hover:text-palantir-gray-1 hover:bg-palantir-light-3 dark:hover:bg-palantir-dark-3'
            ]"
          >
            🌙 Dark
          </button>
          <button
            @click="updateTheme('auto')"
            :class="[
              'px-3 py-1.5 text-sm font-medium rounded-sm transition-all flex items-center gap-2',
              modelValue.theme === 'auto'
                ? 'bg-palantir-blue text-white shadow-sm'
                : 'text-palantir-gray-0 dark:text-palantir-gray hover:text-palantir-text-dark dark:hover:text-palantir-gray-1 hover:bg-palantir-light-3 dark:hover:bg-palantir-dark-3'
            ]"
          >
            🔄 Auto
          </button>
        </div>
      </div>
      
      <div>
        <label class="flex items-center gap-3 cursor-pointer group">
          <div class="relative flex items-center">
            <input
              type="checkbox"
              :checked="modelValue.notifications"
              @change="toggleNotifications"
              class="peer h-4 w-4 rounded border-palantir-light-3 dark:border-palantir-dark-3 bg-white dark:bg-palantir-dark-1 text-palantir-blue focus:ring-1 focus:ring-palantir-blue focus:ring-offset-0"
            >
          </div>
          <span class="text-sm text-palantir-text-dark dark:text-palantir-gray-1 group-hover:text-palantir-blue dark:group-hover:text-white transition-colors">Enable notifications</span>
        </label>
      </div>
    </div>

    <div class="text-xs font-mono text-palantir-gray-0 dark:text-palantir-gray-3 space-y-1 mt-4 p-3 bg-palantir-light-2 dark:bg-palantir-dark-2 border border-palantir-light-3 dark:border-palantir-dark-3 rounded">
      <div class="flex justify-between">
        <span>Mounted:</span>
        <span class="text-palantir-text-dark dark:text-palantir-gray-1">{{ mountedAt || 'Not yet' }}</span>
      </div>
      <div class="flex justify-between">
        <span>Last activated:</span>
        <span class="text-palantir-text-dark dark:text-palantir-gray-1">{{ activatedAt || 'Not yet' }}</span>
      </div>
      <p class="text-palantir-blue pt-2 border-t border-palantir-light-3 dark:border-palantir-dark-3 mt-2">
        💾 Settings preserved with keep-alive
      </p>
    </div>
  </div>
</template>
