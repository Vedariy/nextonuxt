// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: ['@nuxtjs/tailwindcss'],

  components: [
    {
      path: '~/components',
      pathPrefix: false
    },    {
      path: '~/components/examples',
      pathPrefix: false
    },    {
      path: '~/components/page-compositions',
      pathPrefix: false
    },    {
      path: '~/components/shared',
      pathPrefix: false
    }
  ],

  app: {
    head: {
      title: 'Vue/Nuxt Tutorial for React Developers',
      meta: [
        { name: 'description', content: 'Learn Vue.js and Nuxt coming from React/Next.js' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap' }
      ]
    }
  }
})
