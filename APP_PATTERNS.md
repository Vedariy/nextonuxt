# Architecture & Patterns Analysis: `/app`

## 1. Architectural Overview
The application follows a **Nuxt 3** architecture using **Vue 3 Composition API** with `<script setup lang="ts">`. It is designed as an interactive educational platform comparing React and Vue concepts.

### Key Characteristics:
- **Framework**: Nuxt 4 (as seen in package.json) / Vue 3.5+.
- **Language**: TypeScript (Strict typing).
- **Styling**: TailwindCSS with a custom "Palantir" dark theme.
- **Navigation**: Hybrid approach - Standard Nuxt file-based routing mixed with in-page state-based navigation for tutorial sections.

## 2. Component Patterns

### 2.1 Script Setup & TypeScript
All components use the `<script setup lang="ts">` syntax.
- **Props Naming**: Interfaces for props consistently use the `T` prefix (e.g., `TPractice`, `TQuizModal`, `TComparisonCard`).
- **Strict Typing**: explicit interfaces for `defineProps` and `defineEmits`.

```typescript
// Pattern Example
interface TMyComponent {
  data: string
}
const props = defineProps<TMyComponent>()
```

### 2.2 Educational Component Pattern
The application relies heavily on a "Comparison" pattern to teach concepts:
- **`ComparisonCard.vue`**: The core structural unit. It accepts `react` and `vue` slots to show side-by-side code comparisons.
- **Quiz Integration**: Components link to quizzes via a `quizKey` prop, decoupling the UI from the quiz data.
- **`BestPractices.vue`**: Standardized way to show tips (Success/Warning/Info).

### 2.3 Composition Organization
Page content is broken down into "Page Compositions" (`app/components/page-compositions/`):
- **10 Tutorial Topics**: Each tutorial (Basics, State, Props, Lifecycle, Computed, Composables, Routing, DataFetching, KeepAlive, Migration) is an isolated component.
- **Dynamic Rendering**: These are dynamically rendered in `pages/index.vue` or `pages/tutorials/[slug].vue` based on user selection.
- **Modular Architecture**: Each page composition is self-contained with its own examples, comparisons, and interactive demos.

## 3. Data Management

### 3.1 Centralized Content
- **Quiz Data**: Separated into `app/data/quizzes.ts` with TypeScript types (`TopicQuiz`, `QuizQuestion`).
- **Decoupling**: Components reference data via string keys (`basics-structure`, `props-definition`), keeping components pure and presentational.
- **Type Safety**: All quiz data is strongly typed with interfaces.

### 3.2 State Management
- **Local State**: Heavy use of `ref` and `computed` for UI state (e.g., current active tab, quiz score).
- **Reactivity**: `watch` is used for side effects like resetting quiz state when a modal opens.
- **Composables**: Shared state logic extracted into composables (e.g., `useTheme()` for theme management).
- **SSR-Safe State**: `useState` from Nuxt for SSR-compatible shared state.

### 3.3 Composables Pattern
- **`useTheme()`**: Manages light/dark theme with localStorage persistence.
  - Returns: `theme`, `isDark`, `isLight`, `toggleTheme`, `setTheme`, `initTheme`.
  - Uses `useState` for SSR-safe shared state across components.
  - Handles document class updates and localStorage synchronization.

## 4. UI/UX & Styling

### 4.1 Design System (Palantir Theme)
- **Colors**: Custom palette extensions in Tailwind (`text-palantir-blue`, `bg-palantir-dark`).
- **Components**: Reusable CSS classes/components for common UI elements:
    - `.bp-card`: Standard card container.
    - `.bp-heading`: Standard headers.
    - `.bp-button`: Custom button styles.

### 4.2 Interactive Elements
- **Modals**: Implemented using Vue's `<Teleport to="body">` (seen in `QuizModal.vue`) to break out of the DOM hierarchy.
- **Animations**: CSS transitions and keyframe animations (`animate-fade-in`, `zoom-in-95`).

## 5. Directory Structure
```
app/
├── app.vue                 # Root layout shell
├── pages/                  # Route views
│   ├── index.vue           # Main tutorial hub (state-based navigation)
│   ├── about.vue           # About page
│   ├── blog/
│   │   └── [slug].vue      # Dynamic blog routes
│   └── tutorials/
│       └── [slug].vue      # Dynamic tutorial routes
├── components/
│   ├── page-compositions/  # Feature-specific content blocks (10 Tutorial*.vue)
│   │   ├── TutorialBasics.vue
│   │   ├── TutorialState.vue
│   │   ├── TutorialProps.vue
│   │   ├── TutorialLifecycle.vue
│   │   ├── TutorialComputed.vue
│   │   ├── TutorialComposables.vue
│   │   ├── TutorialRouting.vue
│   │   ├── TutorialDataFetching.vue
│   │   ├── TutorialKeepAlive.vue
│   │   └── TutorialMigration.vue
│   ├── shared/             # Reusable UI components
│   │   ├── ComparisonCard.vue    # Side-by-side React/Vue comparisons
│   │   ├── QuizModal.vue         # Interactive quiz system
│   │   ├── LiveDemoCard.vue      # Live demo wrapper
│   │   ├── StatsView.vue         # Statistics display
│   │   ├── BestPractices.vue     # Tips and best practices
│   │   └── ThemeToggle.vue       # Theme switcher
│   └── examples/           # Live demo components
│       ├── ComponentA.vue        # KeepAlive demo component
│       ├── ComponentB.vue        # KeepAlive demo component
│       ├── ComponentC.vue        # KeepAlive demo component
│       ├── DemoChild.vue         # Props/Events demo
│       ├── ProfileForm.vue       # Form state demo
│       └── SettingsForm.vue      # Form state demo
├── composables/            # Reusable composition functions
│   └── useTheme.ts         # Theme management composable
├── data/                   # Static content
│   └── quizzes.ts          # Quiz questions and answers
└── assets/                 # Static assets (images, styles)
```

## 6. Key Patterns & Best Practices

### 6.1 Component Communication
- **Props Down**: Type-safe props with `defineProps<T>()`.
- **Events Up**: Type-safe events with `defineEmits<T>()`.
- **v-model**: Two-way binding for modals (`modelValue` + `update:modelValue`).

### 6.2 Code Organization
- **Separation of Concerns**: 
  - `examples/` - Reusable demo components
  - `page-compositions/` - Tutorial content sections
  - `shared/` - Common UI components
- **Single Responsibility**: Each component has a clear, focused purpose.
- **Composition over Inheritance**: Use composables for shared logic.

### 6.3 TypeScript Usage
- **Interface Naming**: `T` prefix for types (e.g., `TComparisonCard`, `TQuizModal`).
- **Strict Typing**: No `any` types, explicit interfaces for all props and emits.
- **Type Imports**: Use `import type` for type-only imports.

### 6.4 Reactivity Patterns
- **ref()**: For primitive values and objects that need `.value` access.
- **computed()**: For derived state that depends on reactive sources.
- **watch()**: For side effects based on reactive data changes.
- **useState()**: For SSR-safe shared state (Nuxt-specific).

## 7. Anti-Patterns / Notes
- **Avoidance of Global State**: Little to no use of global stores (Pinia); relies on composables, prop drilling, or local state - appropriate for this content-driven app.
- **Direct DOM Manipulation**: Avoided in favor of Vue directives (`v-if`, `v-for`, dynamic classes).
- **No Class Components**: Exclusively uses Composition API with `<script setup>`.
- **Minimal useEffect Equivalents**: Prefers computed values over watchers when possible.
