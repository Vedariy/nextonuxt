<script setup lang="ts">
// Эта страница демонстрирует routing в Nuxt
// pages/about.vue → /about (автоматически)

definePageMeta({
  title: 'About'
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white p-8">
    <div class="max-w-4xl mx-auto">
      <NuxtLink 
        to="/"
        class="inline-flex items-center gap-2 text-blue-300 hover:text-white mb-8 transition"
      >
        ← Back to Tutorial
      </NuxtLink>

      <h1 class="text-4xl font-bold mb-6">About This Tutorial</h1>
      
      <div class="space-y-6">
        <section class="bg-blue-800/50 rounded-xl p-6 border border-blue-700">
          <h2 class="text-2xl font-semibold mb-4">🎯 Purpose</h2>
          <p class="text-blue-200">
            This tutorial helps React/Next.js developers quickly transition to Vue/Nuxt 
            by showing side-by-side comparisons of common patterns.
          </p>
        </section>

        <section class="bg-indigo-800/50 rounded-xl p-6 border border-indigo-700">
          <h2 class="text-2xl font-semibold mb-4">📚 What You'll Learn</h2>
          <ul class="space-y-2 text-indigo-200">
            <li>• Component syntax (SFC vs JSX)</li>
            <li>• State management (ref/reactive vs useState)</li>
            <li>• Props and Events (defineProps/defineEmits vs props/callbacks)</li>
            <li>• Lifecycle hooks (onMounted vs useEffect)</li>
            <li>• Computed properties and watchers</li>
            <li>• File-based routing</li>
            <li>• Data fetching (useFetch vs React Query)</li>
          </ul>
        </section>

        <section class="bg-purple-800/50 rounded-xl p-6 border border-purple-700">
          <h2 class="text-2xl font-semibold mb-4">🛠️ Tech Stack</h2>
          <div class="grid grid-cols-2 gap-4 text-purple-200">
            <div>
              <h3 class="font-medium text-white">Framework</h3>
              <p>Nuxt 4 + Vue 3</p>
            </div>
            <div>
              <h3 class="font-medium text-white">Language</h3>
              <p>TypeScript</p>
            </div>
            <div>
              <h3 class="font-medium text-white">Styling</h3>
              <p>TailwindCSS</p>
            </div>
            <div>
              <h3 class="font-medium text-white">API</h3>
              <p>Composition API</p>
            </div>
          </div>
        </section>

        <section class="bg-emerald-800/50 rounded-xl p-6 border border-emerald-700">
          <h2 class="text-2xl font-semibold mb-4">🚀 Route Demo</h2>
          <p class="text-emerald-200 mb-4">
            This page (<code class="bg-emerald-900 px-2 py-1 rounded">/about</code>) 
            was created by adding <code class="bg-emerald-900 px-2 py-1 rounded">pages/about.vue</code> - 
            just like Next.js App Router!
          </p>
          <div class="flex flex-wrap gap-2">
            <NuxtLink 
              to="/blog/hello-world"
              class="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-500 transition"
            >
              Try /blog/hello-world
            </NuxtLink>
            <NuxtLink 
              to="/blog/another-post"
              class="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-500 transition"
            >
              Try /blog/another-post
            </NuxtLink>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
