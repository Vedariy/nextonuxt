<script setup lang="ts">
// Vue 3 Composition API ≈ React Hooks
// <script setup> = функциональный компонент с хуками

const currentSection = ref<string>('basics')

const sections = [
  { id: 'basics', title: 'Basics', icon: '📚' },
  { id: 'state', title: 'State & Reactivity', icon: '⚡' },
  { id: 'props', title: 'Props & Events', icon: '🔄' },
  { id: 'lifecycle', title: 'Lifecycle', icon: '🔁' },
  { id: 'keepalive', title: 'Keep-Alive', icon: '💾' },
  { id: 'computed', title: 'Computed & Watch', icon: '👁️' },
  { id: 'routing', title: 'Routing', icon: '🛤️' },
  { id: 'data', title: 'Data Fetching', icon: '📡' },
  { id: 'composables', title: 'Composables', icon: '🏗️' },
  { id: 'migration', title: 'Migration', icon: '🔄' },
]

const tutorialDescriptions = {
  basics: 'Основы Vue.js и однофайловые компоненты (SFC)',
  state: 'Реактивность, ref, reactive и управление состоянием',
  props: 'Передача данных между компонентами через props и события',
  lifecycle: 'Хуки жизненного цикла компонентов',
  keepalive: 'Кеширование компонентов с помощью keep-alive',
  computed: 'Вычисляемые свойства и наблюдатели (watch)',
  routing: 'Маршрутизация и навигация в Nuxt',
  data: 'Получение данных: useFetch, useAsyncData',
  composables: 'Composables, middleware и архитектура Nuxt',
  migration: 'Миграция с Next.js на Nuxt'
}

const getTutorialDescription = (id: string) => {
  return tutorialDescriptions[id as keyof typeof tutorialDescriptions] || ''
}
</script>

<template>
  <div class="min-h-screen bg-palantir-light text-palantir-text-dark dark:bg-palantir-dark dark:text-palantir-gray-1 font-sans selection:bg-palantir-blue-active selection:text-white transition-colors duration-200">
    <header class="py-6 px-6 border-b border-palantir-light-3 bg-white dark:border-palantir-dark-3 dark:bg-palantir-dark-1 sticky top-0 z-50 shadow-md transition-colors duration-200">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-top justify-between gap-4">
        <div class="flex items-center gap-4 w-full md:w-auto justify-between">
          <div>
            <NuxtLink to="/">
              <h1 class="text-nowrap text-2xl font-bold tracking-tight text-palantir-text-dark dark:text-white flex items-center gap-3">
              <span class="text-palantir-blue">◉</span>
               Next 2 Nuxt 
            </h1>
            </NuxtLink>
            
            <p class="flex flex-col items-center mt-2 gap-1 text-palantir-dark-4 dark:text-palantir-gray-4 text-sm font-mono">
              <span class="text-palantir-blue text-nowrap">Vue/Nuxt Tutorial</span>
              <span class="text-palantir-blue text-nowrap">for React/Next Developer </span>
            </p>
          </div>
          <ThemeToggle class="md:hidden" />
        </div>
        
        <!-- Navigation in Header for Desktop -->
        <div class="flex items-center gap-4 ">
          <nav class="flex flex-wrap gap-2 justify-center">
            <ThemeToggle class="hidden md:block" />
            <NuxtLink
            v-for="section in sections"
            :key="section.id"
            :to="`/tutorials/${section.id}`"
            class="px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium"
            :class="[
              'border',
              'hover:scale-105',
              'hover:shadow-lg',
              'hover:shadow-palantir-blue/20',
              section.id === 'basics' || section.id === 'state' || section.id === 'props'
                ? 'bg-gradient-to-r from-palantir-blue/20 to-palantir-blue/10 border-palantir-blue/40 text-palantir-blue hover:border-palantir-blue/60'
                : section.id === 'lifecycle' || section.id === 'keepalive' || section.id === 'computed'
                  ? 'bg-gradient-to-r from-palantir-green/20 to-palantir-green/10 border-palantir-green/40 text-palantir-green hover:border-palantir-green/60'
                  : section.id === 'routing' || section.id === 'data'
                    ? 'bg-gradient-to-r from-palantir-purple/20 to-palantir-purple/10 border-palantir-purple/40 text-palantir-purple hover:border-palantir-purple/60'
                    : 'bg-gradient-to-r from-palantir-orange/20 to-palantir-orange/10 border-palantir-orange/40 text-palantir-orange hover:border-palantir-orange/60'
            ]"
          >
              <span class="text-lg">{{ section.icon }}</span>
              <span>{{ section.title }}</span>
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation -->
    <nav class="md:hidden flex overflow-x-auto p-4 gap-2 bg-white dark:bg-palantir-dark-1 border-b border-palantir-light-3 dark:border-palantir-dark-3 scrollbar-hide">
      <NuxtLink
        v-for="section in sections"
        :key="section.id"
        :to="`/tutorials/${section.id}`"
        :class="[
          'px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-all duration-200 border',
          'hover:scale-105',
          section.id === 'basics' || section.id === 'state' || section.id === 'props'
            ? 'bg-palantir-blue/20 border-palantir-blue/40 text-palantir-blue'
            : section.id === 'lifecycle' || section.id === 'keepalive' || section.id === 'computed'
              ? 'bg-palantir-green/20 border-palantir-green/40 text-palantir-green'
              : section.id === 'routing' || section.id === 'data'
                ? 'bg-palantir-purple/20 border-palantir-purple/40 text-palantir-purple'
                : 'bg-palantir-orange/20 border-palantir-orange/40 text-palantir-orange'
        ]"
      >
        <span>{{ section.icon }}</span>
        <span>{{ section.title }}</span>
      </NuxtLink>
    </nav>

    <main class="max-w-7xl mx-auto p-6">
      <div class="bp-card mb-6">
        <h2 class="text-lg font-semibold text-palantir-text-dark dark:text-white mb-2 flex items-center gap-2">
          <span class="text-palantir-blue">ℹ️</span> Context
        </h2>
        <p class="text-palantir-text-dark dark:text-palantir-gray-4 leading-relaxed">
          Эта интерактивная документация позволяет изучать Vue 3 и Nuxt 4, сравнивая их напрямую с паттернами React.
          Выберите тему из навигационного меню для начала.
        </p>
      </div>

      <div class="bp-card">
        <h2 class="text-lg font-semibold text-palantir-text-dark dark:text-white mb-4 flex items-center gap-2">
          <span class="text-palantir-green">📚</span> Available Tutorials
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink
            v-for="section in sections"
            :key="section.id"
            :to="`/tutorials/${section.id}`"
            class="block p-4 rounded-lg border border-palantir-light-4 dark:border-palantir-dark-3 hover:border-palantir-blue/50 transition-all duration-200 hover:shadow-lg hover:shadow-palantir-blue/20 hover:scale-105 bg-palantir-light-1 dark:bg-transparent"
          >
            <div class="flex items-center gap-3 mb-2">
              <span class="text-2xl">{{ section.icon }}</span>
              <h3 class="font-semibold text-palantir-text-dark dark:text-white">{{ section.title }}</h3>
            </div>
            <p class="text-sm text-palantir-dark-4 dark:text-palantir-gray-4">
              {{ getTutorialDescription(section.id) }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </main>

    <footer class="text-center py-8 text-palantir-gray-0 border-t border-palantir-light-3 dark:border-palantir-dark-3 mt-12 bg-white dark:bg-palantir-dark-1">
      <div class="flex items-center justify-center gap-2 text-sm font-mono">
        <span class="w-2 h-2 rounded-full bg-palantir-blue animate-pulse"></span>
        System Status: Operational
      </div>
      <p class="text-xs mt-2 opacity-60">Built with Nuxt 4 + Vue 3 + TypeScript</p>
    </footer>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Hide scrollbar for mobile nav */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
