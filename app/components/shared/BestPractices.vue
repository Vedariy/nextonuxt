<script setup lang="ts">
interface TVpPractice {
  title: string
  description: string
  type: 'success' | 'warning' | 'info'
}

interface TVpBestPracticesProps {
  practices: TVpPractice[]
}

defineProps<TVpBestPracticesProps>()

const getIcon = (type: TVpPractice['type']) => {
  switch (type) {
    case 'success': return '✓'
    case 'warning': return '!'
    case 'info': return 'ℹ'
  }
}

const getColors = (type: TVpPractice['type']) => {
  switch (type) {
    case 'success': return 'border-l-[#0F9960] bg-[rgba(15,153,96,0.1)] text-[#0F9960]'
    case 'warning': return 'border-l-[#D9822B] bg-[rgba(217,130,43,0.1)] text-[#D9822B]'
    case 'info': return 'border-l-palantir-blue bg-palantir-blue/10 text-palantir-blue'
  }
}
</script>

<template>
  <div class="bp-card space-y-4">
    <div class="flex items-center gap-2 mb-4 pb-4 border-b border-palantir-light-3 dark:border-palantir-dark-3">
      <span class="text-xl text-palantir-blue">🏆</span>
      <h3 class="text-lg font-semibold text-palantir-text-dark dark:text-palantir-gray-1 tracking-tight">Best Practices</h3>
    </div>
    
    <div class="grid gap-3">
      <div 
        v-for="(practice, idx) in practices" 
        :key="idx"
        class="p-4 border-l-[3px] transition-all hover:bg-palantir-light-2 dark:hover:bg-palantir-dark-2"
        :class="getColors(practice.type)"
      >
        <div class="flex items-start gap-3">
          <span class="font-bold font-mono mt-0.5">{{ getIcon(practice.type) }}</span>
          <div>
            <h4 class="font-semibold text-palantir-text-dark dark:text-palantir-gray-1 mb-1 text-sm uppercase tracking-wide opacity-90">{{ practice.title }}</h4>
            <p class="text-palantir-text-dark dark:text-palantir-gray-2 text-sm leading-relaxed">
              {{ practice.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
