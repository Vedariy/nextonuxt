<script setup lang="ts">
const mountTime = ref<string | null>(null)
const updateCount = ref(0)
const inputValue = ref('')

onMounted(() => {
  mountTime.value = new Date().toLocaleTimeString()
  console.log('Component mounted!')
})

onUpdated(() => {
  updateCount.value++
  console.log('Component updated!')
})

onUnmounted(() => {
  console.log('Component will unmount!')
})
</script>

<template>
  <div class="space-y-8">
    <ComparisonCard title="useEffect → Lifecycle Hooks" quizKey="lifecycle-basics">
      <template #react>
        <pre class="text-sm">
// React - useEffect для всего
useEffect(() => {
  // componentDidMount
  console.log('mounted')
  
  return () => {
    // componentWillUnmount
    console.log('cleanup')
  }
}, [])

useEffect(() => {
  // componentDidUpdate (при изменении dep)
  console.log('updated')
}, [dependency])</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
// Vue - отдельные хуки
onMounted(() => {
  console.log('mounted')
})

onUpdated(() => {
  console.log('updated')
})

onUnmounted(() => {
  console.log('cleanup')
})

// Для зависимостей - watch/watchEffect</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>Vue разделяет lifecycle на отдельные хуки</li>
          <li><code>onMounted</code> = useEffect с []</li>
          <li><code>onUnmounted</code> = return в useEffect</li>
          <li><code>onUpdated</code> = после каждого обновления DOM</li>
        </ul>
      </template>
    </ComparisonCard>

    <!-- Live Demo -->
    <LiveDemoCard title="Lifecycle">
      <div class="p-3 bg-palantir-light-2 dark:bg-palantir-dark-2 rounded border border-palantir-light-3 dark:border-palantir-dark-3 text-sm">
        <span class="text-palantir-dark-4 dark:text-palantir-gray-3">🕐 Mounted at:</span> 
        <strong class="text-palantir-text-dark dark:text-palantir-gray-1 ml-2 font-mono">{{ mountTime }}</strong>
      </div>
      
      <div>
        <label class="block text-palantir-dark-4 dark:text-palantir-gray-3 text-xs font-bold uppercase tracking-wide mb-2">Type to trigger updates:</label>
        <input
          v-model="inputValue"
          class="bp-input w-full"
          placeholder="Type something..."
        >
      </div>
      
      <p class="text-palantir-blue text-sm flex items-center gap-2">
        <span>ℹ️</span> Check console for lifecycle logs!
      </p>
    </LiveDemoCard>

    <ComparisonCard title="All Lifecycle Hooks" quizKey="lifecycle-all">
      <template #react>
        <pre class="text-sm">
// React has limited hooks
useEffect(() => {}, [])     // mount
useEffect(() => {}, [deps]) // update
useLayoutEffect             // before paint</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
// Vue - полный набор
onBeforeMount()   // до mount
onMounted()       // после mount
onBeforeUpdate()  // до обновления DOM
onUpdated()       // после обновления DOM
onBeforeUnmount() // до unmount
onUnmounted()     // после unmount
onErrorCaptured() // перехват ошибок
onActivated()     // keep-alive activated
onDeactivated()   // keep-alive deactivated</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>Vue предоставляет больше granularity</li>
          <li><code>onBeforeMount</code> - до первого рендера</li>
          <li><code>onErrorCaptured</code> ≈ Error Boundary</li>
          <li><code>keep-alive</code> хуки для кеширования</li>
        </ul>
      </template>
    </ComparisonCard>

    <BestPractices :practices="[
      {
        title: 'SSR & onMounted',
        description: 'Помните, что `onMounted` вызывается ТОЛЬКО на клиенте. Не используйте его для fetch данных, которые нужны для SEO (используйте `useAsyncData`). Используйте его для доступа к `window` или DOM.',
        type: 'warning'
      },
      {
        title: 'Event Cleanup',
        description: 'Если вы вручную вешаете слушатели событий в `onMounted` (например, `window.addEventListener`), ОБЯЗАТЕЛЬНО удаляйте их в `onUnmounted`, чтобы избежать утечек памяти.',
        type: 'success'
      },
      {
        title: 'Async Setup',
        description: 'В `<script setup>` верхнего уровня можно использовать `await`. Это делает компонент асинхронным, и он должен быть обернут в `<Suspense>` (в Nuxt это происходит автоматически).',
        type: 'info'
      }
    ]" />
  </div>
</template>
