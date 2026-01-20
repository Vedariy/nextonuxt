<script setup lang="ts">
// Nuxt Ecosystem Migration
</script>

<template>
  <div class="space-y-8">
    <div class="bp-card">
      <h2 class="text-xl font-bold text-white mb-4">Миграция Экосистемы</h2>
      <p class="text-palantir-gray-4 leading-relaxed">
        Миграция с Next.js на Nuxt включает в себя больше, чем просто синтаксис. Это требует понимания экосистемы библиотек и инструментов.
        Здесь показано, как распространенные решения Next.js транслируются в экосистему Nuxt.
      </p>
    </div>

    <ComparisonCard title="Аутентификация (Auth.js)" quizKey="migration-auth">
      <template #react>
        <pre class="text-sm">// Next.js (NextAuth.js / Auth.js)
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
})

export { handler as GET, handler as POST }</pre>
      </template>
      <template #vue>
        <pre class="text-sm">// Nuxt (Auth.js с @hebilicious/authjs-nuxt)
// server/api/auth/[...].ts
import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'

export default NuxtAuthHandler({
  providers: [
    GithubProvider.default({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ]
})</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><strong>Auth.js</strong> поддерживает оба фреймворка.</li>
          <li>В Nuxt используйте <code>@hebilicious/authjs-nuxt</code> или <code>sidebase/nuxt-auth</code>.</li>
          <li>Конфигурация очень похожа, часто используются те же провайдеры.</li>
          <li>Nuxt модуль автоматически импортирует composables, такие как <code>useAuth()</code>.</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Оптимизация Изображений" quizKey="migration-image">
      <template #react>
        <pre class="text-sm">// Next.js (next/image)
import Image from 'next/image'

&lt;Image
  src="/hero.png"
  alt="Hero"
  width={500}
  height={300}
/&gt;</pre>
      </template>
      <template #vue>
        <pre class="text-sm">&lt;!-- Nuxt (@nuxt/image) --&gt;
&lt;script setup&gt;
// Авто-импорт
&lt;/script&gt;

&lt;template&gt;
  &lt;NuxtImg
    src="/hero.png"
    alt="Hero"
    width="500"
    height="300"
  /&gt;
&lt;/template&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><strong>@nuxt/image</strong> — это прямой аналог <code>next/image</code>.</li>
          <li>Используйте <code>&lt;NuxtImg&gt;</code> для автоматической оптимизации.</li>
          <li>Поддерживает тех же провайдеров (Vercel, Cloudinary, IPX и др.).</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Оптимизация Шрифтов" quizKey="migration-fonts">
      <template #react>
        <pre class="text-sm">// Next.js (next/font)
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

&lt;body className={inter.className}&gt;</pre>
      </template>
      <template #vue>
        <pre class="text-sm">// Nuxt (@nuxt/fonts)
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/fonts']
})

// CSS автоматически подхватывает шрифты
font-family: 'Inter';</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><strong>@nuxt/fonts</strong> автоматически загружает и оптимизирует шрифты.</li>
          <li>Нет необходимости вручную импортировать объекты шрифтов.</li>
          <li>Просто используйте имя шрифта в CSS/Tailwind.</li>
        </ul>
      </template>
    </ComparisonCard>

    <BestPractices :practices="[
      {
        title: 'Экосистема Модулей',
        description: 'В Nuxt есть модули практически для всего. Перед установкой сырого npm пакета, проверьте наличие Nuxt модуля (например, @nuxtjs/tailwindcss, @pinia/nuxt). Модули дают авто-импорты и лучшую интеграцию.',
        type: 'success'
      },
      {
        title: 'Server-Side Возможности',
        description: 'Next.js App Router полагается на Server Components. Nuxt достигает похожих результатов с помощью `server/api` роутов, `useFetch` и экспериментальной поддержки Server Components.',
        type: 'info'
      }
    ]" />
  </div>
</template>
