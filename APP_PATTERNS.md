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
- **Props Naming**: Interfaces for props consistently use the `TVp` prefix (e.g., `TVpPractice`, `TVpQuizModal`, `TVpComparisonCard`).
- **Strict Typing**: explicit interfaces for `defineProps` and `defineEmits`.

```typescript
// Pattern Example
interface TVpMyComponent {
  data: string
}
const props = defineProps<TVpMyComponent>()
```

### 2.2 Educational Component Pattern
The application relies heavily on a "Comparison" pattern to teach concepts:
- **`ComparisonCard.vue`**: The core structural unit. It accepts `react` and `vue` slots to show side-by-side code comparisons.
- **Quiz Integration**: Components link to quizzes via a `quizKey` prop, decoupling the UI from the quiz data.
- **`BestPractices.vue`**: Standardized way to show tips (Success/Warning/Info).

### 2.3 Composition Organization
Page content is broken down into "Page Compositions" (`app/components/page-compositions/`):
- Each tutorial topic (Basics, Props, State) is an isolated component.
- These are dynamically rendered in `pages/index.vue` based on user selection.

## 3. Data Management

### 3.1 Centralized Content
- **Quiz Data**: Separated into `app/data/quizzes.ts`.
- **Decoupling**: Components reference data via string keys (`basics-structure`, `props-definition`), keeping components pure and presentational.

### 3.2 State Management
- **Local State**: Heavy use of `ref` and `computed` for UI state (e.g., current active tab, quiz score).
- **Reactivity**: `watch` is used for side effects like resetting quiz state when a modal opens.

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
│   └── index.vue           # Main tutorial hub (state-based navigation)
├── components/
│   ├── page-compositions/  # Feature-specific content blocks (Tutorial*.vue)
│   ├── shared/             # Reusable UI (ComparisonCard, QuizModal)
│   └── examples/           # Live demos
└── data/                   # Static content (quizzes.ts)
```

## 6. Anti-Patterns / Notes
- **Avoidance of Global State**: Little to no use of global stores (Pinia) observed; relies on prop drilling or local state, appropriate for this content-driven app.
- **Direct DOM Manipulation**: Avoided in favor of Vue directives (`v-if`, `v-for`, dynamic classes).
