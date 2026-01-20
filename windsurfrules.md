# Vue/Nuxt Tutorial Project Rules
## Goal :
 - to train Vue 3 and Nuxt 4 from React/Next.js background
 - to create a simple app
 - to understand the basics of Vue 3 and Nuxt 4

## Project Stack
- **Vue 3.5+** - Frontend framework
- **Nuxt 4.2+** - Full-stack framework  
- **TypeScript** - Type safety
- **TailwindCSS 6.14+** - Styling
- **pnpm** - Package manager

## Vue/Nuxt Specific Guidelines

### Component Development
- Use Vue 3 Composition API with `<script setup>`
- Prefer `<script setup lang="ts">` syntax
- Use `defineProps()` and `defineEmits()` for component interfaces
- Keep components under 100 lines
- Use PascalCase for component names
- Use kebab-case for component file names

### Nuxt Structure
- Follow Nuxt file-based routing in `pages/`
- Place reusable components in `components/`
- Use `composables/` for shared logic
- Use `stores/` for Pinia stores if needed
- Place utilities in `utils/`

### Vue Patterns
- Use `ref()` for primitive values
- Use `reactive()` for objects
- Use `computed()` for derived values
- Use `watch()` and `watchEffect()` for side effects
- Prefer `v-model` for form bindings
- Use `v-if` vs `v-show` appropriately

### TypeScript in Vue
- Always type props with interfaces
- Use `PropType` for complex prop types
- Type component emits
- Use `as const` for literal types
- Avoid `any` type

### Styling with Tailwind
- Use utility classes over custom CSS
- Follow Tailwind naming conventions
- Use responsive prefixes (sm:, md:, lg:)
- Prefer semantic HTML with Tailwind classes
- Use `@apply` sparingly

### Performance
- Use `v-memo` for expensive components
- Implement lazy loading with `defineAsyncComponent`
- Use `v-once` for static content
- Optimize images with Nuxt Image module if needed

### SEO & Meta
- Use `useHead()` composable for meta tags
- Implement structured data
- Use semantic HTML5 elements
- Add proper alt texts to images

## Code Style (Vue Specific)
- Use single quotes for template attributes
- Use double quotes for JavaScript strings
- Indent with 2 spaces
- Add line breaks between template sections
- Order: template, script, style

## Testing
- Use Vitest for unit tests
- Use Vue Test Utils for component testing
- Use Cypress for E2E tests
- Test composables separately
- Mock API calls in tests

## Development Workflow
1. Create component in appropriate directory
2. Define props and emits interfaces
3. Implement with Composition API
4. Add TypeScript types
5. Style with Tailwind
6. Add tests if needed
7. Update documentation

## Git Commit Format
- **feat**: New features
- **fix**: Bug fixes  
- **refactor**: Code refactoring
- **style**: Styling changes
- **docs**: Documentation
- **test**: Testing
- **chore**: Maintenance

## Security
- Validate user input
- Sanitize user-generated content
- Use HTTPS in production
- Implement proper authentication
- Follow OWASP guidelines
