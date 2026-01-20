<script setup lang="ts">
// Nuxt Composables & Architecture
</script>

<template>
  <div class="space-y-8">
    <div class="bp-card">
      <h2 class="text-xl font-bold text-white mb-4">Composables и Архитектура</h2>
      <p class="text-palantir-gray-4 leading-relaxed">
        Nuxt предоставляет мощную систему авто-импорта для composables (хуков) и структурированный архитектурный подход.
        Узнайте, как эффективно организовать вашу логику.
      </p>
    </div>

    <ComparisonCard title="Custom Hooks vs Composables" quizKey="arch-composables">
      <template #react>
        <pre class="text-sm">// React - hooks/useUser.ts
// Нужно вручную экспортировать и импортировать
import { useState, useEffect } from 'react'

export const useUser = () => {
  const [user, setUser] = useState(null)
  // логика...
  return { user }
}

// Component.tsx
import { useUser } from '../hooks/useUser'</pre>
      </template>
      <template #vue>
        <pre class="text-sm">// Nuxt - composables/useUser.ts
// Авто-импорт везде!
export const useUser = () => {
  const user = useState('user', () => null)
  // логика...
  return { user }
}

// Component.vue
// Импорт не нужен
const { user } = useUser()</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>Файлы в <code>composables/</code> импортируются автоматически.</li>
          <li>Используйте <code>useState</code> для общего состояния между компонентами (поддержка SSR).</li>
          <li>Экспорты верхнего уровня автоматически доступны во всем приложении.</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Глобальное Состояние (State)" quizKey="arch-state">
      <template #react>
        <pre class="text-sm">// React - Redux / Context / Zustand
// store/userStore.ts
import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
}))</pre>
      </template>
      <template #vue>
        <pre class="text-sm">// Nuxt - useState (Встроенный)
// composables/states.ts
export const useUser = () => 
  useState('user', () => null)

// ИЛИ Pinia (Рекомендуется для сложных приложений)
// stores/user.ts
export const useUserStore = defineStore('user', {
  state: () => ({ user: null }),
  actions: { ... }
})</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>useState</code> достаточно для простого общего состояния.</li>
          <li>Pinia — это стандарт для сложного управления состоянием (аналог Redux/Zustand).</li>
          <li>Оба поддерживают гидратацию SSR из коробки.</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Middleware (Route Guards)" quizKey="arch-middleware">
      <template #react>
        <pre class="text-sm">// React Router / Next.js Middleware
// middleware.ts
export function middleware(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.redirect('/login')
  }
}

// ИЛИ per-component HOC/Wrapper</pre>
      </template>
      <template #vue>
        <pre class="text-sm">// Nuxt - middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (!isAuthenticated()) {
    return navigateTo('/login')
  }
})

// Использование на странице
definePageMeta({
  middleware: 'auth'
})</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>Директория <code>middleware/</code> для переиспользуемых защитников маршрутов.</li>
          <li>Могут быть глобальными (<code>.global.ts</code>) или для конкретных страниц.</li>
          <li>Запускаются как на сервере (SSR), так и на клиенте (при навигации).</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Серверные Маршруты (API)" quizKey="arch-api">
      <template #react>
        <pre class="text-sm">// Next.js App Router
// app/api/hello/route.ts
export async function GET(request) {
  return Response.json({ msg: 'Hello' })
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm">// Nuxt Nitro Server
// server/api/hello.ts
export default defineEventHandler((event) => {
  return { msg: 'Hello' }
})
// Возвращает JSON автоматически</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>Файлы в <code>server/api/</code> становятся API эндпоинтами.</li>
          <li>Работают на движке Nitro.</li>
          <li>Возвращают объекты напрямую (автоматическая JSON сериализация).</li>
          <li>Хелперы <code>readBody(event)</code>, <code>getQuery(event)</code>.</li>
        </ul>
      </template>
    </ComparisonCard>

    <BestPractices :practices="[
      {
        title: 'Именование Composables',
        description: 'Всегда используйте префикс `use` для composables (например, `useAuth`, `useTheme`). Это сигнализирует о том, что внутри может быть состояние или побочные эффекты.',
        type: 'success'
      },
      {
        title: 'Использование useState',
        description: 'НЕ используйте `ref` для глобального состояния в composables, так как это приведет к расшариванию состояния между ВСЕМИ запросами на сервере (утечка данных!). Всегда используйте `useState` для состояния, общего для компонентов, чтобы обеспечить безопасность SSR.',
        type: 'warning'
      },
      {
        title: 'Utils vs Composables',
        description: 'Используйте `utils/` для чистых функций без состояния (форматирование дат, обработка строк). Используйте `composables/` для логики с состоянием или использования хуков Vue.',
        type: 'info'
      }
    ]" />
  </div>
</template>
