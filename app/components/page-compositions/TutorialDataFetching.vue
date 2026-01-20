<script setup lang="ts">
// Nuxt composables ≈ React Query / SWR
// useFetch, useAsyncData - встроены в Nuxt

interface TVpTodo {
  id: number
  title: string
  completed: boolean
}

// useFetch - автоматический data fetching
const { data: todos, pending, error, refresh } = await useFetch<TVpTodo[]>(
  'https://jsonplaceholder.typicode.com/todos',
  {
    query: { _limit: 5 }
  }
)
</script>

<template>
  <div class="space-y-8">
    <ComparisonCard title="Data Fetching Overview" quizKey="data-overview">
      <template #react>
        <pre class="text-sm">
// Next.js / React
// 1. Server Components (RSC)
// 2. React Query / SWR
// 3. useEffect + fetch

// React Query пример:
const { data, isLoading, error } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos
})</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
// Nuxt - встроенные composables
const { data, pending, error, refresh } = 
  await useFetch('/api/todos')

// или useAsyncData для кастомной логики
const { data } = await useAsyncData(
  'todos',
  () => $fetch('/api/todos')
)</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>Nuxt имеет встроенный data fetching</li>
          <li>Автоматическая дедупликация запросов</li>
          <li>SSR-ready из коробки</li>
          <li>Кеширование и refresh включены</li>
        </ul>
      </template>
    </ComparisonCard>

    <!-- Live Demo -->
    <LiveDemoCard title="useFetch()">
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <button
            class="bp-button bp-button-primary"
            :disabled="pending"
            @click="refresh()"
          >
            <span v-if="pending" class="animate-spin mr-1">⟳</span>
            {{ pending ? 'Loading...' : 'Refresh Data' }}
          </button>
        </div>

        <div v-if="error" class="p-4 bg-red-500/10 rounded border border-red-500/20">
          <p class="text-red-400 text-sm flex items-center gap-2">
            <span>⚠️</span> Error: {{ error.message }}
          </p>
        </div>

        <div v-else-if="pending" class="p-4 text-palantir-gray-2 text-sm italic flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-palantir-blue animate-pulse"></span>
          Loading todos...
        </div>

        <ul v-else class="space-y-1">
          <li 
            v-for="todo in todos" 
            :key="todo.id"
            class="flex items-center gap-3 p-2 bg-palantir-dark-2 rounded border border-palantir-dark-3 text-sm transition-colors hover:border-palantir-blue/30"
          >
            <span 
              :class="todo.completed ? 'text-green-500' : 'text-palantir-accent'"
              class="font-mono"
            >
              {{ todo.completed ? '✓' : '○' }}
            </span>
            <span :class="todo.completed ? 'line-through text-palantir-gray-4' : 'text-palantir-gray-1'">
              {{ todo.title }}
            </span>
          </li>
        </ul>
      </div>
    </LiveDemoCard>

    <ComparisonCard title="useFetch vs useAsyncData" quizKey="data-usefetch-vs">
      <template #react>
        <pre class="text-sm">
// React - обычно используют библиотеки
// React Query:
useQuery({ queryKey, queryFn })

// SWR:
useSWR(key, fetcher)

// Нативный подход:
useEffect(() => {
  fetch(url).then(...)
}, [])</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
// 1. useFetch (Standard)
// Обертка над useAsyncData + $fetch
const { data } = await useFetch('/api/data')

// 2. useAsyncData (Flexible)
// Базовый composable для любой асинхронной логики
const { data } = await useAsyncData('my-key', async () => {
  const [u, p] = await Promise.all([
    $fetch('/api/users'),
    $fetch('/api/posts')
  ])
  return { u, p }
})

// 3. Lazy Variants (Non-blocking)
// useLazyFetch = useFetch с lazy: true
// Не блокирует роутинг, показывает лоадер
const { pending } = await useLazyFetch('/api/data')</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>useFetch</code> — самый простой способ (URL → Data)</li>
          <li><code>useAsyncData</code> — полный контроль, любая async функция</li>
          <li><code>Lazy</code> версии — не блокируют навигацию (SSR не ждет)</li>
          <li><code>$fetch</code> — HTTP клиент (улучшенный fetch)</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Server-Side Rendering" quizKey="data-ssr">
      <template #react>
        <pre class="text-sm">
// Next.js App Router
// Server Component (по умолчанию)
async function Page() {
  const data = await fetch('...')
  return &lt;div&gt;{data}&lt;/div&gt;
}

// Client Component
'use client'
function ClientComponent() {
  const [data, setData] = useState()
  // ...
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
&lt;!-- Nuxt - гибридный рендеринг --&gt;
&lt;script setup&gt;
// Выполняется на сервере И клиенте
const { data } = await useFetch('/api/data')

// Только на клиенте
onMounted(() => {
  // client-only code
})

// Только на сервере (Tree Shaking)
// На клиенте это превратится в if(false) и код удалится из бандла
if (import.meta.server) {
  // server-only code (secrets, db calls)
}
&lt;/script&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>Nuxt - Universal (SSR + CSR) по умолчанию</li>
          <li><code>&lt;ClientOnly&gt;</code> компонент для client-only</li>
          <li><code>import.meta.<span>server</span></code> / <code>import.meta.<span>client</span></code></li>
          <li>Data fetching автоматически работает на обоих</li>
        </ul>
      </template>
      <template #live>
        <h3 class="text-md font-semibold mb-1">🎮Rendered ENV consts:</h3>
        <ul class="list-disc pl-4 space-y-1">
          <li>import.meta.<span>server</span>: <code>import.meta.server</code> </li>
          <li>import.meta.<span>client:</span> <code>import.meta.client</code></li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="API Routes" quizKey="data-api">
      <template #react>
        <pre class="text-sm">
// Next.js - app/api/users/route.ts
export async function GET(request: Request) {
  const users = await db.users.findMany()
  return Response.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await db.users.create(body)
  return Response.json(user)
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
// Nuxt - server/api/users.ts
export default defineEventHandler(async (event) => {
  // GET запрос
  if (event.method === 'GET') {
    return await db.users.findMany()
  }
  
  // POST запрос
  if (event.method === 'POST') {
    const body = await readBody(event)
    return await db.users.create(body)
  }
})

// Или отдельные файлы:
// server/api/users.get.ts
// server/api/users.post.ts</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>server/api/</code> директория для API routes</li>
          <li><code>defineEventHandler</code> для обработчиков</li>
          <li>Можно разделять по HTTP методам в имени файла</li>
          <li>Авто-импорт утилит: readBody, getQuery, etc.</li>
        </ul>
      </template>
    </ComparisonCard>

    <BestPractices :practices="[
      {
        title: 'Payload Optimization',
        description: 'Всегда используйте `pick` или `transform` в useFetch, чтобы не отправлять лишние данные с сервера на клиент (hydration payload). Это уменьшает HTML и ускоряет загрузку.',
        type: 'success'
      },
      {
        title: 'Unique Keys in Loops',
        description: 'При использовании useAsyncData внутри циклов или компонентов, которые используются многократно, ОБЯЗАТЕЛЬНО задавайте уникальный `key`, иначе данные будут перетерты.',
        type: 'warning'
      },
      {
        title: 'Lazy Fetching',
        description: 'Для второстепенного контента (комментарии, футер) используйте `lazy: true`, чтобы не блокировать основной рендеринг страницы.',
        type: 'info'
      }
    ]" />
  </div>
</template>
