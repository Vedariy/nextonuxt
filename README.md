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
| **Routing** | Next.js App Router | Nuxt pages/ |
| **Data Fetching** | React Query / SWR | `useFetch`, `useAsyncData` |

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
│   │   ├── ComparisonCard.vue
│   │   ├── DemoChild.vue
│   │   ├── TutorialBasics.vue
│   │   ├── TutorialState.vue
│   │   ├── TutorialProps.vue
│   │   ├── TutorialLifecycle.vue
│   │   ├── TutorialComputed.vue
│   │   ├── TutorialRouting.vue
│   │   └── TutorialDataFetching.vue
│   └── pages/               # File-based routing
│       ├── index.vue        # /
│       ├── about.vue        # /about
│       └── blog/
│           └── [slug].vue   # /blog/:slug
├── nuxt.config.ts           # Nuxt configuration
├── tailwind.config.ts       # TailwindCSS config
└── package.json
```

## 🛠️ Tech Stack

- **Nuxt 4** - Vue meta-framework (like Next.js for React)
- **Vue 3** - Composition API
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS

## 📖 Resources

- [Vue.js Docs](https://vuejs.org/)
- [Nuxt Docs](https://nuxt.com/)
- [Vue Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Nuxt Modules](https://nuxt.com/modules)
