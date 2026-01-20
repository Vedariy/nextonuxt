<script setup lang="ts">
// Nuxt routing ≈ Next.js App Router
// File-based routing - одинаковая концепция!

const route = useRoute()
const router = useRouter()

const goToAbout = () => {
  router.push('/about')
}
</script>

<template>
  <div class="space-y-8">
    <ComparisonCard title="File-based Routing" quizKey="routing-file-based">
      <template #react>
        <pre class="text-sm">
// Next.js App Router
app/
├── page.tsx          → /
├── about/
│   └── page.tsx      → /about
├── blog/
│   ├── page.tsx      → /blog
│   └── [slug]/
│       └── page.tsx  → /blog/:slug
└── [...slug]/
    └── page.tsx      → catch-all</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
// Nuxt 3
pages/
├── index.vue         → /
├── about.vue         → /about
├── blog/
│   ├── index.vue     → /blog
│   └── [slug].vue    → /blog/:slug
└── [...slug].vue     → catch-all</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>Обе системы используют file-based routing</li>
          <li>Next: <code>[param]</code> = Nuxt: <code>[param]</code></li>
          <li>Next: <code>page.tsx</code> = Nuxt: <code>index.vue</code> или <code>name.vue</code></li>
          <li>Catch-all: <code>[...slug]</code> в обоих</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Navigation" quizKey="routing-navigation">
      <template #react>
        <pre class="text-sm">
// Next.js
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Декларативно
&lt;Link href="/about"&gt;About&lt;/Link&gt;

// Программно
const router = useRouter()
router.push('/about')
router.replace('/home')
router.back()</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
&lt;!-- Nuxt --&gt;
&lt;!-- Декларативно --&gt;
&lt;NuxtLink to="/about"&gt;About&lt;/NuxtLink&gt;

&lt;!-- Программно --&gt;
&lt;script setup&gt;
const router = useRouter()
router.push('/about')
router.replace('/home')
router.back()
&lt;/script&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>Link</code> → <code>NuxtLink</code></li>
          <li><code>href</code> → <code>to</code></li>
          <li><code>useRouter</code> - одинаковый API</li>
          <li>NuxtLink автоматически prefetch</li>
        </ul>
      </template>
    </ComparisonCard>

    <!-- Live Demo -->
    <LiveDemoCard title="Routing">
      <div class="space-y-4">
        <div class="p-3 bg-palantir-light-2 dark:bg-palantir-dark-2 rounded border border-palantir-light-3 dark:border-palantir-dark-3 flex items-center gap-2 text-sm">
          <span class="text-palantir-gray-1 dark:text-palantir-gray-3">Current route:</span>
          <code class="text-palantir-orange font-mono bg-palantir-light-3 dark:bg-palantir-dark-1 px-2 py-0.5 rounded border border-palantir-light-4 dark:border-palantir-dark-3">{{ route.path }}</code>
        </div>
        
        <div class="flex flex-wrap gap-2">
          <NuxtLink 
            to="/about"
            class="bp-button bp-button-primary"
          >
            Go to /about (NuxtLink)
          </NuxtLink>
          
          <button
            class="bp-button text-palantir-text-dark dark:text-palantir-gray-1 bg-palantir-light-2 dark:bg-palantir-dark-2 border border-palantir-light-3 dark:border-palantir-dark-3 hover:bg-palantir-light-3 dark:hover:bg-palantir-dark-3"
            @click="goToAbout"
          >
            Go to /about (programmatic)
          </button>
          
          <NuxtLink 
            to="/blog/my-post"
            class="bp-button text-palantir-text-dark dark:text-palantir-gray-1 bg-palantir-light-2 dark:bg-palantir-dark-2 border border-palantir-light-3 dark:border-palantir-dark-3 hover:bg-palantir-light-3 dark:hover:bg-palantir-dark-3"
          >
            Go to /blog/my-post
          </NuxtLink>
        </div>
      </div>
    </LiveDemoCard>

    <ComparisonCard title="Route Parameters" quizKey="routing-params">
      <template #react>
        <pre class="text-sm">
// Next.js 15+ (Server Component)
export default async function Page({ 
  params,
  searchParams
}: { 
  params: Promise&lt;{ slug: string }&gt;
  searchParams: Promise&lt;{ [key: string]: string }&gt;
}) {
  const { slug } = await params
  const { q } = await searchParams // Query params
  
  return &lt;div&gt;Slug: {slug}, Search: {q}&lt;/div&gt;
}

// Client Component
import { useParams, useSearchParams } from 'next/navigation'
const params = useParams()
const searchParams = useSearchParams()</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>
&lt;!-- Nuxt: pages/blog/[slug].vue --&gt;
&lt;script setup&gt;
const route = useRoute()

// ⚠️ Используйте computed для реактивности
// при переходе /blog/1 -> /blog/2
const slug = computed(() => route.params.slug)
const query = computed(() => route.query.q)

// Watcher для сайд-эффектов
watch(() => route.params.slug, (newSlug) => {
  console.log('Changed to:', newSlug)
})
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    Slug: {{ slug }}
    Search: {{ query }}
  &lt;/div&gt;
&lt;/template&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><strong>Next.js 15+:</strong> <code>params</code> и <code>searchParams</code> - это <strong>Promises</strong></li>
          <li><strong>Vue:</strong> <code>route</code> реактивен, но destructuring ломает связь</li>
          <li>Используйте <code>computed</code> или `route.params.id` в template</li>
          <li>Vue переиспользует компоненты при смене параметров</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Layouts" quizKey="routing-layouts">
      <template #react>
        <pre class="text-sm">
// Next.js - layout.tsx
// app/layout.tsx
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    &lt;html&gt;
      &lt;body&gt;
        &lt;Header /&gt;
        {children}
        &lt;Footer /&gt;
      &lt;/body&gt;
    &lt;/html&gt;
  )
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
&lt;!-- Nuxt - layouts/default.vue --&gt;
&lt;template&gt;
  &lt;div&gt;
    &lt;Header /&gt;
    &lt;slot /&gt;
    &lt;Footer /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;!-- Использование в странице --&gt;
&lt;script setup&gt;
definePageMeta({
  layout: 'custom' // или 'default'
})
&lt;/script&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>layouts/</code> директория для layout компонентов</li>
          <li><code>&lt;slot /&gt;</code> вместо <code>{children}</code></li>
          <li><code>definePageMeta</code> для выбора layout</li>
          <li>Default layout применяется автоматически</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Nested Layouts (State Persistence)" quizKey="routing-nested">
      <template #react>
        <pre class="text-sm">
// Next.js: app/dashboard/layout.tsx
export default function DashboardLayout({
  children
}: { children: ReactNode }) {
  // 🟢 State сохраняется при навигации
  // между /dashboard/settings и /dashboard/profile
  const [count, setCount] = useState(0)

  return (
    &lt;div&gt;
      &lt;nav&gt;
        &lt;button onClick={() => setCount(c => c + 1)}&gt;
          Count: {count}
        &lt;/button&gt;
      &lt;/nav&gt;
      {children}
    &lt;/div&gt;
  )
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>
&lt;!-- Nuxt: pages/dashboard.vue --&gt;
&lt;script setup&gt;
// 🟢 State сохраняется, пока мы внутри /dashboard/*
const count = ref(0)
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;nav&gt;
      &lt;button @click="count++"&gt;
        Count: {{ count }}
      &lt;/button&gt;
    &lt;/nav&gt;
    
    &lt;!-- Вложенные страницы рендерятся здесь --&gt;
    &lt;NuxtPage /&gt;
  &lt;/div&gt;
&lt;/template&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><strong>Persistence:</strong> Layout не размонтируется при смене дочерних роутов</li>
          <li>Идеально для: Sidebar, Player, Search State</li>
          <li>В Nuxt родительский <code>pages/parent.vue</code> действует как Layout</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Templates & Re-rendering" quizKey="routing-templates">
      <template #react>
        <pre class="text-sm">
// Next.js: app/dashboard/template.tsx
// 🔴 Remounts on navigation!

export default function Template({ 
  children 
}: { children: ReactNode }) {
  // State сбрасывается при каждом переходе
  const [count, setCount] = useState(0)

  return (
    &lt;div className="animate-in"&gt;
      {children}
    &lt;/div&gt;
  )
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>
&lt;!-- Nuxt: Аналог template.tsx --&gt;
&lt;!-- pages/dashboard.vue --&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;!-- 🔴 Force remount с помощью key --&gt;
    &lt;NuxtPage :page-key="route => route.fullPath" /&gt;
    
    &lt;!-- Или для транзиций --&gt;
    &lt;NuxtPage 
      :transition="{ 
        name: 'fade', 
        mode: 'out-in' 
      }" 
    /&gt;
  &lt;/div&gt;
&lt;/template&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><strong>Next.js <code>template.tsx</code>:</strong> Создает новый инстанс при навигации</li>
          <li><strong>Nuxt:</strong> По умолчанию переиспользует компоненты (как Layout)</li>
          <li>Для поведения "Template" в Nuxt: используйте <code>key</code> на <code>&lt;NuxtPage&gt;</code></li>
          <li>Полезно для: анимаций входа/выхода, сброса скролла, трекинга просмотров</li>
        </ul>
      </template>
    </ComparisonCard>

    <BestPractices :practices="[
      {
        title: 'Route Params Reactivity',
        description: 'В Vue компоненты переиспользуются. Если вы переходите с /users/1 на /users/2, `onMounted` НЕ сработает повторно. Используйте `watch(() => route.params.id)` или `computed` для реактивных обновлений.',
        type: 'warning'
      },
      {
        title: 'Typed Routing',
        description: 'В Nuxt включен `experimental.typedPages`. Используйте `NuxtLink` с типизированными путями или `navigateTo({ name: \'user-id\', params: { id: 1 } })` для безопасности типов.',
        type: 'success'
      },
      {
        title: 'Middleware Usage',
        description: 'Для защиты роутов используйте `definePageMeta({ middleware: [\'auth\'] })`. Это эффективнее, чем проверки внутри `setup` или `onMounted`.',
        type: 'info'
      }
    ]" />
  </div>
</template>
