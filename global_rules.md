# Global Development Rules

## Core Principles
- **DDD (Domain-Driven Design)**: Organize code by business domains
- **Clean Architecture**: Separate concerns into distinct layers
- **Functional Programming**: Prefer pure functions and immutability
- **Type Safety**: Use TypeScript for all code

## Language & Communication
- Use Russian for chat communication
- Use English for code, comments, and documentation
- Translate DeepWiki content to Russian when needed

## Technology Stack Rules
- **Vue 3.5+** with Composition API
- **Nuxt 4.2+** for full-stack development
- **TypeScript 5+** for type safety
- **TailwindCSS 4+** for styling
- **pnpm** as package manager

## Code Quality Standards

### General
- Keep functions under 30 lines
- Single responsibility principle
- Early returns over nested conditions
- Use arrow functions for simple cases
- Prefer functional approaches

### TypeScript
- Always declare variable and function types
- Avoid `any` type
- Create necessary interfaces
- Use discriminated unions
- Prefix types with `T` 

### Vue Specific
- Use `<script setup lang="ts">` syntax
- Prefer Composition API over Options API
- Use `ref()` for primitives, `reactive()` for objects
- Type props with interfaces
- Use `computed()` for derived values

### Import Management
- Remove unused imports
- Keep alphabetical order within groups
- Use `@` aliases for absolute imports
- Use relative imports for same folder
- Never import from `_deprecated` folder

### Data Structures
- Prefer Maps over Objects
- Prefer Sets over Arrays
- Use template literals over concatenation
- Use optional chaining over null checks
- Prefer immutable data structures

## Development Workflow

### Component Development
1. Create component in domain directory
2. Define props interface with `TVp` prefix
3. Implement as arrow function
4. Add unit tests
5. Document usage

### Feature Development
1. Define domain entities
2. Implement use cases
3. Create infrastructure
4. Build UI components
5. Integration testing

## Performance Guidelines
- Avoid unnecessary re-renders
- Implement proper error boundaries
- Use proper data fetching patterns
- Follow Vue/Nuxt performance best practices

## Security Guidelines
- Implement proper authentication
- Secure API endpoints
- Handle sensitive data appropriately
- Follow OWASP security practices

## Git Workflow
- Use conventional commit format
- Keep commit messages under 72 characters
- Include major changes, UI improvements, code cleanup sections
- Enable pre-commit hooks

## Testing Strategy
- Unit tests for domain logic
- Integration tests for use cases
- E2E tests for critical flows
- Component tests with Vue Test Utils

## AI Interaction Guidelines
- Always check project rules and configs
- Use non-destructive approaches
- Avoid conflicts with existing code
- Create new files instead of modifying when possible
- Ask permission before modifying existing files
