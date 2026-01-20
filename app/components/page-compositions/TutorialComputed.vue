<script setup lang="ts">
// computed ≈ useMemo (но проще!)
// watch ≈ useEffect с dependencies

const firstName = ref('Viktor')
const lastName = ref('Mirusenko')

// computed - кешируется автоматически
const fullName = computed(() => {
  console.log('computed fullName called')
  return `${firstName.value} ${lastName.value}`
})

// watch - для side effects
const searchQuery = ref('')
const searchResults = ref<string[]>([])

watch(searchQuery, async (newValue, oldValue) => {
  console.log(`Search changed: ${oldValue} → ${newValue}`)
  // Имитация API запроса
  if (newValue.length > 2) {
    searchResults.value = [`Result for "${newValue}"`, `Another result`]
  } else {
    searchResults.value = []
  }
})

// watchEffect - автоматически отслеживает все зависимости
const counter = ref(0)
watchEffect(() => {
  console.log(`Counter is now: ${counter.value}`)
})
</script>

<template>
  <div class="space-y-8">
    <ComparisonCard title="useMemo → computed" quizKey="computed-vs-memo">
      <template #react>
        <pre class="text-sm">
// React - useMemo
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')

const fullName = useMemo(() => {
  return `${firstName} ${lastName}`
}, [firstName, lastName]) // ⚠️ deps вручную!</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
// Vue - computed
const firstName = ref('')
const lastName = ref('')

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
}) // ✅ deps автоматически!</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>computed</code> автоматически отслеживает зависимости</li>
          <li>Кеширует результат до изменения зависимостей</li>
          <li>Нет массива зависимостей - меньше ошибок!</li>
          <li>В template доступен как <code v-pre>{{ fullName }}</code></li>
        </ul>
      </template>
    </ComparisonCard>

    <!-- Live Demo: computed -->
    <LiveDemoCard title="computed()">
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-palantir-gray-1 text-xs font-bold uppercase tracking-wide mb-2">First Name</label>
          <input
            v-model="firstName"
            class="bp-input w-full"
          >
        </div>
        <div>
          <label class="block text-palantir-gray-1 text-xs font-bold uppercase tracking-wide mb-2">Last Name</label>
          <input
            v-model="lastName"
            class="bp-input w-full"
          >
        </div>
      </div>
      
      <div class="mt-4 p-3 bg-palantir-light-2 dark:bg-palantir-dark-2 rounded border border-palantir-light-3 dark:border-palantir-dark-3 flex items-center gap-2">
        <span class="text-palantir-gray-0 dark:text-palantir-gray-2">Full Name (computed):</span>
        <strong class="text-palantir-blue font-medium">{{ fullName }}</strong>
      </div>
    </LiveDemoCard>

    <ComparisonCard title="useEffect → watch / watchEffect" quizKey="watch-vs-effect">
      <template #react>
        <pre class="text-sm">
// React - useEffect
// ⚡ Mount + Update (Post-render)
useEffect(() => {
  const controller = new AbortController()

  if (query.length > 2) {
    fetchResults(query, controller.signal)
  }

  return () => controller.abort()
}, [query])</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>
const query = ref('')

// 1. watch: 🐢 Lazy, Explicit Deps
// Запускается ТОЛЬКО при изменении query
watch(query, (newVal, oldVal, onCleanup) => {
  const controller = new AbortController()
  fetchResults(newVal, controller.signal)
  onCleanup(() => controller.abort())
})

// 2. watchEffect: ⚡ Immediate, Auto Deps
// Запускается СРАЗУ (Pre-render default)
watchEffect((onCleanup) => {
  /* ...использует query внутри... */
})

// 3. watchPostEffect:
// 🎯 Точный аналог useEffect (Post-render)
// Полезно если нужен доступ к обновленному DOM
watchPostEffect(() => {
  /* ... */
})</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>watch</code> - <strong>Lazy</strong>, точный контроль зависимостей</li>
          <li><code>watchEffect</code> - <strong>Immediate</strong>, отслеживает всё, что используется внутри</li>
          <li><strong>Timing:</strong> <code>watchEffect</code> (pre) vs <code>useEffect</code> (post). Для доступа к DOM используйте <code>watchPostEffect</code></li>
          <li><strong>Cleanup:</strong> Vue передаёт <code>onCleanup</code> callback первым аргументом</li>
        </ul>
      </template>
    </ComparisonCard>

    <!-- Live Demo: watch -->
    <LiveDemoCard title="watch()">
      <div>
        <label class="block text-palantir-gray-2 text-xs font-bold uppercase tracking-wide mb-2">
          Search (type 3+ chars)
        </label>
        <input
          v-model="searchQuery"
          class="bp-input w-full"
          placeholder="Type to search..."
        >
      </div>
      
      <div v-if="searchResults.length" class="mt-4">
        <p class="text-palantir-gray-2 text-xs font-bold uppercase tracking-wide mb-2">Results:</p>
        <ul class="space-y-1">
          <li 
            v-for="(result, index) in searchResults" 
            :key="index"
            class="text-palantir-text-dark dark:text-palantir-gray-1 bg-palantir-light-2 dark:bg-palantir-dark-2 px-3 py-2 rounded border border-palantir-light-3 dark:border-palantir-dark-3 text-sm"
          >
            {{ result }}
          </li>
        </ul>
      </div>
    </LiveDemoCard>

    <ComparisonCard title="watch vs watchEffect" quizKey="watch-vs-watcheffect-details">
      <template #react>
        <pre class="text-sm">
// React - один useEffect
// Нет разделения - всё в одном месте</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
// watch - explicit source
watch(source, (newVal, oldVal) => {
  // callback
}, { immediate: true, deep: true })

// watchEffect - auto-track
watchEffect((onCleanup) => {
  const timer = setInterval(...)
  onCleanup(() => clearInterval(timer))
})</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>watch</code>: точный контроль, доступ к old/new</li>
          <li><code>watchEffect</code>: автоматика, меньше кода</li>
          <li><code>immediate: true</code> = запуск сразу</li>
          <li><code>deep: true</code> = глубокое наблюдение объектов</li>
        </ul>
      </template>
    </ComparisonCard>

    <BestPractices :practices="[
      {
        title: 'Computed for Derived State',
        description: 'Всегда используйте `computed` для вычисления значений на основе другого состояния. Это декларативно, кешируется и легче тестируется, чем ручное обновление через `watch`.',
        type: 'success'
      },
      {
        title: 'No Side Effects in Computed',
        description: 'Computed свойства должны быть чистыми функциями. НИКОГДА не делайте в них API запросы или мутации DOM. Для этого используйте `watch` или `watchEffect`.',
        type: 'warning'
      },
      {
        title: 'Watch Cleanup',
        description: 'Если вы запускаете таймеры или подписки внутри `watch/watchEffect`, всегда используйте `onCleanup` callback для очистки ресурсов при изменении зависимостей или размонтировании.',
        type: 'info'
      }
    ]" />
  </div>
</template>
