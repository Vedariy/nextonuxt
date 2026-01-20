<script setup lang="ts">
const { isDark, toggleTheme, initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-lg transition-all duration-200 hover:scale-110 group relative bg-palantir-light-2 hover:bg-palantir-light-3 dark:bg-palantir-dark-3 dark:hover:bg-palantir-dark-4 text-palantir-blue"
    :title="isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'"
  >
    <Transition name="theme-icon" mode="out-in">
      <span v-if="isDark" key="moon" class="text-xl block">🌙</span>
      <span v-else key="sun" class="text-xl block">☀️</span>
    </Transition>
    
    <!-- Tooltip -->
    <span 
      class="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white dark:bg-palantir-dark-2 text-palantir-text-dark dark:text-palantir-gray-4 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-palantir-light-3 dark:border-transparent"
    >
      {{ isDark ? 'Светлая тема' : 'Тёмная тема' }}
    </span>
  </button>
</template>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.3s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-180deg) scale(0);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(180deg) scale(0);
}
</style>
