<script setup lang="ts">
// Это Vue 3 Composition API - аналог React Hooks
// <script setup> автоматически экспортирует всё в template
</script>

<template>
  <div class="space-y-8">
    <ComparisonCard title="Component Structure" quizKey="basics-structure">
      <template #react>
        <pre class="text-sm">// React Component (TSX)
const MyComponent = () => {
  return (
    &lt;div&gt;Hello World&lt;/div&gt;
  )
}
export default MyComponent</pre>
      </template>
      <template #vue>
        <pre class="text-sm">&lt;!-- Vue Component (SFC) --&gt;
&lt;script setup lang="ts"&gt;
// логика здесь
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;Hello World&lt;/div&gt;
&lt;/template&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>&lt;script setup&gt;</code> = функциональный компонент</li>
          <li>SFC (Single File Component) = .vue файл</li>
          <li>template вместо JSX (но JSX тоже поддерживается)</li>
          <li>Нет return - template автоматически рендерится</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Text Interpolation" quizKey="basics-interpolation">
      <template #react>
        <pre class="text-sm">// React - фигурные скобки
const name = "World"
return &lt;h1&gt;Hello {name}&lt;/h1&gt;</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>&lt;!-- Vue - двойные фигурные скобки --&gt;
&lt;script setup&gt;
const name = "World"
&lt;/script&gt;

&lt;template&gt;
  &lt;h1&gt;Hello {{ name }}&lt;/h1&gt;
&lt;/template&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>React: <code>{expression}</code></li>
          <li>Vue: <code v-pre>{{ expression }}</code> (mustache syntax)</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard  title="Conditional Rendering" quizKey="basics-conditional">
      <template #react>
        <pre class="text-sm">// React - тернарный оператор / &&
{isVisible && &lt;div&gt;Visible&lt;/div&gt;}
{isLoading 
  ? &lt;Spinner /&gt; 
  : &lt;Content /&gt;}</pre>
      </template>
      <template #vue>
        <pre class="text-sm">&lt;!-- Vue - директивы v-if/v-else --&gt;
&lt;div v-if="isVisible"&gt;Visible&lt;/div&gt;

&lt;Spinner v-if="isLoading" /&gt;
&lt;Content v-else /&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>v-if</code> = условный рендеринг (убирает из DOM)</li>
          <li><code>v-else</code>, <code>v-else-if</code> - цепочка условий</li>
          <li><code>v-show</code> = display: true/false (оставляет в DOM)</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="List Rendering" quizKey="basics-list">
      <template #react>
        <pre class="text-sm">// React - .map()
{items.map(item => (
  &lt;li key={item.id}&gt;
    {item.name}
  &lt;/li&gt;
))}</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>&lt;!-- Vue - v-for директива --&gt;
&lt;li 
  v-for="item in items" 
  :key="item.id"
&gt;
  {{ item.name }}
&lt;/li&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>v-for="item in items"</code> - итерация</li>
          <li><code>:key</code> обязателен (как key в React)</li>
          <li>Можно: <code>v-for="(item, index) in items"</code></li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Attribute Binding" quizKey="basics-attributes">
      <template #react>
        <pre class="text-sm">// React - прямое использование
&lt;img src={imageUrl} /&gt;
&lt;div className={styles} /&gt;
&lt;input disabled={isDisabled} /&gt;</pre>
      </template>
      <template #vue>
        <pre class="text-sm">&lt;!-- Vue - v-bind или : --&gt;
&lt;img :src="imageUrl" /&gt;
&lt;div :class="styles" /&gt;
&lt;input :disabled="isDisabled" /&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>:attr</code> = <code>v-bind:attr</code></li>
          <li>Без <code>:</code> = строковое значение</li>
          <li><code>class</code> вместо <code>className</code></li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Dynamic Components" quizKey="basics-dynamic">
      <template #react>
        <pre class="text-sm">// React - условный рендеринг
{componentType === 'Header' && &lt;Header /&gt;}
{componentType === 'Footer' && &lt;Footer /&gt;}

// Или через маппинг
const componentMap = {
  header: Header,
  footer: Footer
}
const Component = componentMap[currentType]
&lt;Component /&gt;</pre>
      </template>
      <template #vue>
        <pre class="text-sm">&lt;!-- Vue - встроенный component --&gt;
&lt;component :is="currentComponent" /&gt;

// С маппингом компонентов
const componentMap = {
  ComponentA,
  ComponentB,
  ComponentC
}
const currentComponent = computed(() => 
  componentMap[currentViewName]
)
&lt;component :is="currentComponent" /&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>&lt;component :is="..." /&gt;</code> - динамический компонент</li>
          <li>Принимает: имя компонента, объект компонента или HTML тег</li>
          <li>Идеально для: tab navigation, форма wizards</li>
          <li>Работает с <code>&lt;keep-alive&gt;</code> для кеширования</li>
        </ul>
      </template>
    </ComparisonCard>

    <BestPractices :practices="[
      {
        title: 'Script Setup',
        description: 'Всегда используйте `<script setup>` в новых проектах. Это стандарт де-факто для Vue 3: меньше кода, лучше производительность (компилируется в эффективную функцию рендера) и лучшая поддержка TypeScript.',
        type: 'success'
      },
      {
        title: 'v-if vs v-show',
        description: 'Используйте `v-show` для элементов, которые часто переключаются (toggle), так как это дешевле (просто CSS display). `v-if` используйте, если условие меняется редко, так как это вызывает уничтожение и пересоздание DOM.',
        type: 'info'
      },
      {
        title: 'Unique Keys',
        description: 'В `v-for` ВСЕГДА используйте уникальный `:key` (id из базы данных), а не индекс массива. Индекс может привести к ошибкам рендеринга при изменении порядка или фильтрации списка.',
        type: 'warning'
      }
    ]" />
  </div>
</template>
