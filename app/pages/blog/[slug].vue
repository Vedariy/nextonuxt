<script setup lang="ts">
// Динамический роут: pages/blog/[slug].vue → /blog/:slug
// Аналог: app/blog/[slug]/page.tsx в Next.js

const route = useRoute()
const slug = computed(() => route.params.slug as string)

// Форматируем slug для отображения
const formattedTitle = computed(() => {
  return slug.value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-900 via-red-800 to-pink-900 text-white p-8">
    <div class="max-w-4xl mx-auto">
      <NuxtLink 
        to="/"
        class="inline-flex items-center gap-2 text-orange-300 hover:text-white mb-8 transition"
      >
        ← Back to Tutorial
      </NuxtLink>

      <article class="bg-orange-800/50 rounded-xl p-8 border border-orange-700">
        <div class="mb-6">
          <span class="text-orange-400 text-sm">Dynamic Route Demo</span>
          <h1 class="text-4xl font-bold mt-2">{{ formattedTitle }}</h1>
        </div>

        <div class="bg-orange-900/50 rounded-lg p-4 mb-6">
          <h3 class="font-semibold text-orange-300 mb-2">🔍 Route Information:</h3>
          <ul class="space-y-1 text-orange-200 text-sm">
            <li><strong>Path:</strong> {{ route.path }}</li>
            <li><strong>Params:</strong> {{ JSON.stringify(route.params) }}</li>
            <li><strong>Slug:</strong> {{ slug }}</li>
          </ul>
        </div>

        <div class="prose prose-invert max-w-none">
          <h2 class="text-2xl font-semibold text-white mb-4">How This Works</h2>
          
          <div class="space-y-4 text-orange-100">
            <p>
              This page is rendered from 
              <code class="bg-orange-950 px-2 py-1 rounded">pages/blog/[slug].vue</code>
            </p>
            
            <p>The <code>[slug]</code> in the filename creates a dynamic route parameter, similar to:</p>
            
            <div class="grid md:grid-cols-2 gap-4 my-4">
              <div class="bg-blue-900/50 rounded-lg p-4 border border-blue-700">
                <h4 class="text-blue-400 font-medium mb-2">Next.js</h4>
                <code class="text-blue-200 text-sm">app/blog/[slug]/page.tsx</code>
              </div>
              <div class="bg-green-900/50 rounded-lg p-4 border border-green-700">
                <h4 class="text-green-400 font-medium mb-2">Nuxt</h4>
                <code class="text-green-200 text-sm">pages/blog/[slug].vue</code>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-white mt-6 mb-3">Accessing Parameters</h3>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-blue-900/50 rounded-lg p-4 border border-blue-700">
                <h4 class="text-blue-400 font-medium mb-2">Next.js</h4>
                <pre class="text-blue-200 text-sm overflow-x-auto">
function Page({ params }) {
  return params.slug
}</pre>
              </div>
              <div class="bg-green-900/50 rounded-lg p-4 border border-green-700">
                <h4 class="text-green-400 font-medium mb-2">Nuxt</h4>
                <pre class="text-green-200 text-sm overflow-x-auto">
const route = useRoute()
const slug = route.params.slug</pre>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-orange-700">
          <h3 class="font-semibold mb-4">Try other slugs:</h3>
          <div class="flex flex-wrap gap-2">
            <NuxtLink 
              to="/blog/vue-composition-api"
              class="px-3 py-1 bg-orange-600 rounded hover:bg-orange-500 transition text-sm"
            >
              /blog/vue-composition-api
            </NuxtLink>
            <NuxtLink 
              to="/blog/nuxt-vs-nextjs"
              class="px-3 py-1 bg-orange-600 rounded hover:bg-orange-500 transition text-sm"
            >
              /blog/nuxt-vs-nextjs
            </NuxtLink>
            <NuxtLink 
              to="/blog/typescript-tips"
              class="px-3 py-1 bg-orange-600 rounded hover:bg-orange-500 transition text-sm"
            >
              /blog/typescript-tips
            </NuxtLink>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
