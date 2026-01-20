<script setup lang="ts">
// Dynamic tutorial page
const route = useRoute()
const slug = route.params.slug as string

// Scroll progress
const scrollProgress = ref(0)
const updateScrollProgress = () => {
  const winScroll = document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})

// Get next/prev tutorial
const allTutorials = [
  'basics', 'state', 'props', 'lifecycle', 'keepalive', 
  'computed', 'routing', 'data', 'composables', 'migration'
]
const currentIndex = allTutorials.indexOf(slug)
const prevTutorial = currentIndex > 0 ? allTutorials[currentIndex - 1] : null
const nextTutorial = currentIndex < allTutorials.length - 1 ? allTutorials[currentIndex + 1] : null

// Print handler
const handlePrint = () => {
  if (typeof window !== 'undefined') {
    window.print()
  }
}

// Map slugs to tutorial components
const componentMap = {
  basics: () => import('~/components/page-compositions/TutorialBasics.vue'),
  state: () => import('~/components/page-compositions/TutorialState.vue'),
  props: () => import('~/components/page-compositions/TutorialProps.vue'),
  lifecycle: () => import('~/components/page-compositions/TutorialLifecycle.vue'),
  keepalive: () => import('~/components/page-compositions/TutorialKeepAlive.vue'),
  computed: () => import('~/components/page-compositions/TutorialComputed.vue'),
  routing: () => import('~/components/page-compositions/TutorialRouting.vue'),
  data: () => import('~/components/page-compositions/TutorialDataFetching.vue'),
  composables: () => import('~/components/page-compositions/TutorialComposables.vue'),
  migration: () => import('~/components/page-compositions/TutorialMigration.vue')
} as const

type TutorialSlug = keyof typeof componentMap

// Tutorial metadata
const tutorialInfo = {
  basics: { title: 'Vue Basics', description: 'Основы Vue.js и SFC' },
  state: { title: 'State & Reactivity', description: 'Реактивность и управление состоянием' },
  props: { title: 'Props & Events', description: 'Передача данных между компонентами' },
  lifecycle: { title: 'Lifecycle Hooks', description: 'Хуки жизненного цикла компонентов' },
  keepalive: { title: 'Keep-Alive', description: 'Кеширование компонентов' },
  computed: { title: 'Computed & Watch', description: 'Вычисляемые свойства и наблюдатели' },
  routing: { title: 'Routing', description: 'Маршрутизация в Nuxt' },
  data: { title: 'Data Fetching', description: 'Получение данных в Nuxt' },
  composables: { title: 'Composables', description: 'Composables и архитектура Nuxt' },
  migration: { title: 'Migration', description: 'Миграция с Next.js на Nuxt' }
} as const

// Validate slug
if (!componentMap[slug as TutorialSlug]) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tutorial not found'
  })
}

// Dynamic component import
const TutorialComponent = defineAsyncComponent(componentMap[slug as TutorialSlug])

// SEO Meta
const currentTutorial = tutorialInfo[slug as TutorialSlug]
useHead({
  title: `${currentTutorial.title} | Vue to Nuxt Tutorial`,
  meta: [
    { name: 'description', content: currentTutorial.description }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-palantir-light text-palantir-text-dark dark:bg-palantir-dark dark:text-palantir-gray-1 font-sans selection:bg-palantir-blue-active selection:text-white transition-colors duration-200">
    <!-- Progress Bar -->
    <div class="fixed top-0 left-0 right-0 h-1 bg-palantir-light-3 dark:bg-palantir-dark-3 z-[60]">
      <div 
        class="h-full bg-gradient-to-r from-palantir-blue via-palantir-purple to-palantir-green transition-all duration-150"
        :style="{ width: `${scrollProgress}%` }"
      ></div>
    </div>

    <!-- Header with navigation -->
    <header class="py-4 px-6 border-b border-palantir-light-3 bg-white/95 dark:border-palantir-dark-3 dark:bg-palantir-dark-1/95 backdrop-blur-sm sticky top-0 z-50 shadow-lg transition-colors duration-200">
      <div class="max-w-7xl mx-auto">
        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-2 text-sm mb-3 text-palantir-dark-4 dark:text-palantir-gray-4">
          <NuxtLink to="/" class="hover:text-palantir-blue transition-colors">Главная</NuxtLink>
          <span>/</span>
          <span class="text-palantir-text-dark dark:text-palantir-gray-1">{{ currentTutorial.title }}</span>
        </nav>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <NuxtLink 
              to="/" 
              class="text-palantir-dark-4 dark:text-palantir-gray-4 hover:text-palantir-blue dark:hover:text-white transition-colors flex items-center gap-2 group"
            >
              <span class="text-xl group-hover:-translate-x-1 transition-transform">←</span>
              <span class="hidden sm:inline">Все туториалы</span>
            </NuxtLink>
            <div class="h-8 w-px bg-palantir-light-3 dark:bg-palantir-dark-3 hidden sm:block"></div>
            <div>
              <h1 class="text-lg sm:text-xl font-bold text-palantir-text-dark dark:text-white">{{ currentTutorial.title }}</h1>
              <p class="text-xs sm:text-sm text-palantir-dark-4 dark:text-palantir-gray-4 hidden sm:block">{{ currentTutorial.description }}</p>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="flex items-center gap-2">
            <ThemeToggle />
            <button 
              @click="handlePrint"
              class="p-2 rounded hover:bg-palantir-light-2 dark:hover:bg-palantir-dark-3 text-palantir-dark-4 dark:text-palantir-gray-4 hover:text-palantir-blue transition-colors hidden md:block"
              title="Печать"
            >
              <span class="text-lg">🖨️</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div class="animate-fade-in">
        <Suspense>
          <template #default>
            <TutorialComponent />
          </template>
          <template #fallback>
            <div class="flex items-center justify-center py-20">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-palantir-blue"></div>
            </div>
          </template>
        </Suspense>
      </div>
    </main>

    <!-- Navigation to Next/Prev Tutorial -->
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-t border-palantir-dark-3">
      <div class="grid grid-cols-2 gap-4">
        <NuxtLink
          v-if="prevTutorial"
          :to="`/tutorials/${prevTutorial}`"
          class="group flex items-center gap-3 p-4 rounded-lg border border-palantir-light-3 dark:border-palantir-dark-3 hover:border-palantir-blue/50 transition-all hover:shadow-lg hover:shadow-palantir-blue/10 bg-palantir-light-1 dark:bg-transparent"
        >
          <span class="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
          <div class="text-left">
            <div class="text-xs text-palantir-dark-4 dark:text-palantir-gray-4 mb-1">Предыдущий</div>
            <div class="text-sm font-semibold text-palantir-text-dark dark:text-white">{{ tutorialInfo[prevTutorial as TutorialSlug].title }}</div>
          </div>
        </NuxtLink>
        <div v-else></div>

        <NuxtLink
          v-if="nextTutorial"
          :to="`/tutorials/${nextTutorial}`"
          class="group flex items-center justify-end gap-3 p-4 rounded-lg border border-palantir-light-3 dark:border-palantir-dark-3 hover:border-palantir-blue/50 transition-all hover:shadow-lg hover:shadow-palantir-blue/10 bg-palantir-light-1 dark:bg-transparent"
        >
          <div class="text-right">
            <div class="text-xs text-palantir-dark-4 dark:text-palantir-gray-4 mb-1">Следующий</div>
            <div class="text-sm font-semibold text-palantir-text-dark dark:text-white">{{ tutorialInfo[nextTutorial as TutorialSlug].title }}</div>
          </div>
          <span class="text-2xl group-hover:translate-x-1 transition-transform">→</span>
        </NuxtLink>
      </div>
    </nav>

    <!-- Footer -->
    <footer class="text-center py-6 text-palantir-gray border-t border-palantir-light-3 dark:border-palantir-dark-3 bg-white dark:bg-palantir-dark-1">
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
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
