<script setup lang="ts">
// ref() ≈ useState() - для примитивов
// reactive() ≈ useState({}) - для объектов

const count = ref(0)
const user = reactive({
  name: 'Viktor',
  age: 30
})

const increment = () => {
  count.value++ // .value для ref!
}

const updateName = () => {
  user.name = 'Updated Viktor' // без .value для reactive
}
</script>

<template>
  <div class="space-y-8">
    <ComparisonCard title="useState → ref()" quizKey="state-ref">
      <template #react>
        <pre class="text-sm">
// React - useState
const [count, setCount] = useState(0)

const increment = () => {
  setCount(count + 1)
  // или
  setCount(prev => prev + 1)
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>// Vue - ref()
const count = ref(0)

const increment = () => {
  count.value++ // ⚠️ .value в JS &lt;script&gt;!
}

// в template автоматически unwrap `value`
&lt;span&gt;{{ count }}&lt;/span&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>ref()</code> для примитивов (string, number, boolean)</li>
          <li><strong>В script:</strong> нужен <code>.value</code></li>
          <li><strong>В template:</strong> автоматический unwrap</li>
          <li>Реактивность "из коробки" - нет сеттера</li>
        </ul>
      </template>
    </ComparisonCard>

    <!-- Live Demo: ref -->
    <LiveDemoCard title="ref()">
      <div class="flex items-center gap-4">
        <button
          class="bp-button bp-button-primary"
          @click="increment"
        >
          Count: {{ count }}
        </button>
        <span class="text-palantir-gray-0 text-sm">← Click me!</span>
      </div>
    </LiveDemoCard>

    <ComparisonCard title="useState({}) → reactive({})" quizKey="state-reactive">
      <template #react>
        <pre class="text-sm">
// React - useState с объектом
const [user, setUser] = useState({
  name: 'Viktor',
  age: 30
})

const updateName = () => {
  setUser(prev => ({
    ...prev,
    name: 'New Name'
  }))
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
// Vue - reactive()
const user = reactive({
  name: 'Viktor',
  age: 30
})

const updateName = () => {
  user.name = 'New Name' // напрямую!
}</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>reactive()</code> для объектов и массивов</li>
          <li>Без <code>.value</code> - прямой доступ к свойствам</li>
          <li>Мутации разрешены и реактивны</li>
          <li>⚠️ Нельзя переназначить весь объект (потому что константа)</li>
        </ul>
      </template>
    </ComparisonCard>

    <!-- Live Demo: reactive -->
    <LiveDemoCard title="reactive()">
      <div class="text-palantir-text-dark dark:text-palantir-gray-1 p-3 bg-palantir-light-2 dark:bg-palantir-dark-2 rounded border border-palantir-light-3 dark:border-palantir-dark-3 font-mono text-sm">
        User: <strong class="text-palantir-blue">{{ user.name }}</strong>, Age: <span class="text-palantir-accent">{{ user.age }}</span>
      </div>
      <button
        class="bp-button bp-button-primary"
        @click="updateName"
      >
        Update Name
      </button>
    </LiveDemoCard>

    <ComparisonCard title="ref() vs reactive() - когда что?" quizKey="state-ref-vs-reactive">
      <template #react>
        <pre class="text-sm">
// В React всегда useState
// Разницы нет - всегда иммутабельно

const [value, setValue] = useState(0)
const [obj, setObj] = useState({...})</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
// ref() - примитивы, single values
const count = ref(0)
const isLoading = ref(false)

// reactive() - объекты, формы
const form = reactive({
  email: '',
  password: ''
})

// 💡 Совет: используй ref() по умолчанию</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>🎯 <code>ref()</code> - универсальный выбор</li>
          <li><code>reactive()</code> - удобен для форм</li>
          <li><code>reactive()</code> теряет реактивность при деструктуризации</li>
          <li>Используй <code>toRefs()</code> для деструктуризации reactive</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Деструктуризация reactive → toRefs()" quizKey="state-torefs">
      <template #react>
        <pre class="text-sm">// React - деструктуризация useState
const [user, setUser] = useState({ 
  name: 'Alex', 
  email: 'alex@example.com' 
})

// Просто деструктуризируем
const { name, email } = user
</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>// Vue - toRefs() для сохранения реактивности
const user = reactive({ 
  name: 'Alex', 
  email: 'alex@example.com' 
})

// ❌ Потеряет реактивность!
// const { name, email } = user

// ✅ Сохраняет реактивность
const { name, email } = toRefs(user)

// теперь name и email - это ref()
console.log(name.value) // 'Alex'</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>toRefs()</code> превращает свойства reactive объекта в ref</li>
          <li>Сохраняет реактивность при деструктуризации</li>
          <li>Удобно для передачи свойств в дочерние компоненты</li>
          <li>Каждое свойство становится независимым ref</li>
          <li>Вложенные объекты остаются reactive (не превращаются в ref)</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Вложенные объекты в toRefs()" quizKey="state-nested-torefs">
      <template #react>
        <pre class="text-sm">// React - вложенные объекты
const [user, setUser] = useState({ 
  name: 'Alex', 
  profile: {
    email: 'alex@example.com',
    settings: {
      theme: 'dark'
    }
  }
})

// Деструктуризация вложенных свойств
const { name, profile } = user
const { email } = profile</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>// Vue - toRefs() с вложенными объектами
const user = reactive({ 
  name: 'Alex', 
  profile: {
    email: 'alex@example.com',
    settings: {
      theme: 'dark'
    }
  }
})

// ✅ name становится ref, profile остается reactive
const { name, profile } = toRefs(user)

// profile - это reactive объект, не ref!
// Можно обращаться напрямую к вложенным свойствам
console.log(profile.email)        // 'alex@example.com'
console.log(profile.settings.theme) // 'dark'

// Или деструктуризировать вложенные reactive объекты
const { email, settings } = profile
console.log(settings.theme) // 'dark'</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>toRefs()</code> преобразует только верхний уровень в ref</li>
          <li>Вложенные объекты остаются reactive</li>
          <li>Можно напрямую обращаться к вложенным свойствам</li>
          <li>Вложенные reactive объекты тоже можно деструктурировать</li>
          <li>Глубина реактивности сохраняется на всех уровнях</li>
        </ul>
      </template>
    </ComparisonCard>

    <BestPractices :practices="[
      {
        title: 'Ref vs Reactive',
        description: 'Рекомендуется использовать `ref` по умолчанию для всех типов данных. Это делает очевидным, где используется реактивность (через `.value`), и избегает проблем при замене объекта целиком.',
        type: 'success'
      },
      {
        title: 'Destructuring Safety',
        description: 'Никогда не деструктурируйте результат `reactive()` или `props` напрямую — реактивность потеряется! Всегда используйте `toRefs(props)` или `toRef(props, \'key\')`.',
        type: 'warning'
      },
      {
        title: 'Shallow Refs',
        description: 'Для больших структур данных (например, большие списки или графики), которые не требуют глубокого отслеживания, используйте `shallowRef` для производительности.',
        type: 'info'
      }
    ]" />
  </div>
</template>
