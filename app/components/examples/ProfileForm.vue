<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    name: string
    email: string
    bio: string
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
  console.log('📦 ProfileForm mounted at', mountedAt.value)
})

onActivated(() => {
  activatedAt.value = new Date().toLocaleTimeString()
  console.log('✅ ProfileForm activated at', activatedAt.value)
  emit('activated')
})

onDeactivated(() => {
  console.log('💤 ProfileForm deactivated')
  emit('deactivated')
})

const updateField = (field: keyof typeof props.modelValue, value: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<template>
  <div class="space-y-4">
    <h4 class="bp-heading flex items-center gap-2">
      <span class="text-palantir-blue">👤</span> Profile Information
    </h4>
    
    <div class="space-y-3">
      <div>
        <label class="block text-xs font-bold text-palantir-gray-0 dark:text-palantir-gray-3 mb-1 uppercase tracking-wide">Name</label>
        <input
          :value="modelValue.name"
          @input="updateField('name', ($event.target as HTMLInputElement).value)"
          class="bp-input w-full p-2"
          placeholder="Enter your name"
        >
      </div>
      
      <div>
        <label class="block text-xs font-bold text-palantir-gray-0 dark:text-palantir-gray-3 mb-1 uppercase tracking-wide">Email</label>
        <input
          :value="modelValue.email"
          @input="updateField('email', ($event.target as HTMLInputElement).value)"
          type="email"
          class="bp-input w-full p-2"
          placeholder="your@email.com"
        >
      </div>
      
      <div>
        <label class="block text-xs font-bold text-palantir-gray-0 dark:text-palantir-gray-3 mb-1 uppercase tracking-wide">Bio</label>
        <textarea
          :value="modelValue.bio"
          @input="updateField('bio', ($event.target as HTMLTextAreaElement).value)"
          class="bp-input w-full min-h-[80px] p-2"
          rows="3"
          placeholder="Tell us about yourself..."
        />
      </div>
    </div>

    <div class="text-xs font-mono text-palantir-gray-0 dark:text-palantir-gray-3 space-y-1 mt-4 p-3 bg-palantir-light-2 dark:bg-palantir-dark-2 border border-palantir-light-3 dark:border-palantir-dark-3 rounded">
      <div class="flex justify-between">
        <span>Mounted:</span>
        <span class="text-palantir-text-dark dark:text-palantir-gray-0">{{ mountedAt || 'Not yet' }}</span>
      </div>
      <div class="flex justify-between">
        <span>Last activated:</span>
        <span class="text-palantir-text-dark dark:text-palantir-gray-0">{{ activatedAt || 'Not yet' }}</span>
      </div>
      <p class="text-palantir-blue pt-2 border-t border-palantir-light-3 dark:border-palantir-dark-3 mt-2">
        💾 Form state is preserved with keep-alive
      </p>
    </div>
  </div>
</template>
