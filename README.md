# Vue.js / Nuxt Tutorial for React Developers

Interactive tutorial to help React/Next.js developers quickly learn Vue.js and Nuxt.

## 🚀 Quick Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📚 What's Covered

| Topic | React | Vue |
|-------|-------|-----|
| **Component** | JSX function | SFC (.vue) |
| **State** | `useState()` | `ref()`, `reactive()` |
| **Props** | interface + destructure | `defineProps<T>()` |
| **Events** | callback props | `defineEmits<T>()` |
| **Lifecycle** | `useEffect` | `onMounted`, `onUnmounted` |
| **Computed** | `useMemo` | `computed()` |
| **Side Effects** | `useEffect` | `watch`, `watchEffect` |
| **Composables** | Custom hooks | Composables |
| **Routing** | Next.js App Router | Nuxt pages/ |
| **Data Fetching** | React Query / SWR | `useFetch`, `useAsyncData` |
| **KeepAlive** | Manual state preservation | `<KeepAlive>` component |
| **Migration** | - | React → Vue guide |

## 🔑 Key Differences Cheatsheet

### Component Syntax
```vue
<!-- Vue SFC -->
<script setup lang="ts">
const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

```tsx
// React
const Component = () => {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

### State Management
| React | Vue |
|-------|-----|
| `const [x, setX] = useState(0)` | `const x = ref(0)` |
| `setX(5)` | `x.value = 5` |
| `{x}` in JSX | `{{ x }}` in template (auto-unwrap) |

### Event Handling
| React | Vue |
|-------|-----|
| `onClick` | `@click` or `v-on:click` |
| `onChange` | `@change` or `v-model` |
| `onSubmit` | `@submit` |

### Conditional Rendering
| React | Vue |
|-------|-----|
| `{show && <Comp />}` | `<Comp v-if="show" />` |
| `{show ? <A /> : <B />}` | `<A v-if="show" />` + `<B v-else />` |

### List Rendering
| React | Vue |
|-------|-----|
| `items.map(i => <li key={i.id}>{i.name}</li>)` | `<li v-for="i in items" :key="i.id">{{ i.name }}</li>` |

### Attribute Binding
| React | Vue |
|-------|-----|
| `className={x}` | `:class="x"` |
| `style={obj}` | `:style="obj"` |
| `disabled={bool}` | `:disabled="bool"` |

## 📁 Project Structure

```
vue-nuxt-tutorial/
├── app/
│   ├── app.vue              # Root component (like _app.tsx)
│   ├── components/          # Auto-imported components
│   │   ├── examples/        # Example components for demos
│   │   │   ├── ComponentA.vue
│   │   │   ├── ComponentB.vue
│   │   │   ├── ComponentC.vue
│   │   │   ├── DemoChild.vue
│   │   │   ├── ProfileForm.vue
│   │   │   └── SettingsForm.vue
│   │   ├── page-compositions/  # Tutorial page sections
│   │   │   ├── TutorialBasics.vue
│   │   │   ├── TutorialState.vue
│   │   │   ├── TutorialProps.vue
│   │   │   ├── TutorialLifecycle.vue
│   │   │   ├── TutorialComputed.vue
│   │   │   ├── TutorialComposables.vue
│   │   │   ├── TutorialRouting.vue
│   │   │   ├── TutorialDataFetching.vue
│   │   │   ├── TutorialKeepAlive.vue
│   │   │   └── TutorialMigration.vue
│   │   └── shared/          # Shared UI components
│   │       ├── ComparisonCard.vue
│   │       ├── LiveDemoCard.vue
│   │       ├── QuizModal.vue
│   │       ├── StatsView.vue
│   │       ├── BestPractices.vue
│   │       └── ThemeToggle.vue
│   ├── composables/         # Reusable composables
│   ├── assets/              # Static assets
│   └── pages/               # File-based routing
│       ├── index.vue        # /
│       ├── about.vue        # /about
│       ├── blog/
│       │   └── [slug].vue   # /blog/:slug
│       └── tutorials/
│           └── [slug].vue   # /tutorials/:slug
├── nuxt.config.ts           # Nuxt configuration
├── tailwind.config.ts       # TailwindCSS config
├── global_rules.md          # Project guidelines
├── APP_PATTERNS.md          # Application patterns
└── package.json
```

## 🛠️ Tech Stack

- **Nuxt 4.2.2** - Vue meta-framework (like Next.js for React)
- **Vue 3.5.27** - Composition API with `<script setup>`
- **TypeScript 5.9.3** - Type safety
- **TailwindCSS 6.14.0** - Utility-first CSS
- **pnpm 9.12.3** - Fast, disk space efficient package manager

## ✨ Features

[APP_PATTERNS.md](./APP_PATTERNS.md)

- **Interactive Tutorials** - Step-by-step guides with live code examples
- **Side-by-Side Comparisons** - React vs Vue code snippets
- **Live Demos** - Interactive components to test concepts
- **Quiz System** - Test your knowledge with interactive quizzes
- **Theme Toggle** - Dark/Light mode support
- **Statistics Tracking** - Monitor your learning progress
- **Best Practices** - Learn Vue/Nuxt conventions and patterns
- **Migration Guide** - Comprehensive React to Vue migration reference

## 📖 Resources

- [Vue.js Docs](https://vuejs.org/)
- [Nuxt Docs](https://nuxt.com/)
- [Vue Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Nuxt Modules](https://nuxt.com/modules)
