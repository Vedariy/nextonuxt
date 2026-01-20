<script setup lang="ts">
// defineProps ≈ interface Props в React
// defineEmits ≈ callback props в React

const message = ref('Hello from parent!')
const receivedMessage = ref('')

const handleChildEvent = (msg: string) => {
  receivedMessage.value = msg
}

// Live Demo Data
const userProfile = ref({
  name: '',
  profile: {
    email: '',
    settings: {
      theme: 'dark',
      notifications: true
    }
  },
  hobbies: []
})

const todos = ref([
  { id: 1, text: 'Изучить Vue', done: false },
  { id: 2, text: 'Создать приложение', done: true }
])

const newTodoText = ref('')

const tags = ref(['vue', 'nuxt', 'typescript'])

const addTodo = () => {
  if (newTodoText.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodoText.value,
      done: false
    })
    newTodoText.value = ''
  }
}

</script>

<template>
  <div class="space-y-8">
    <ComparisonCard title="Props Definition" quizKey="props-definition">
      <template #react>
        <pre class="text-sm">
// React - interface + destructuring
interface Props {
  title: string
  count?: number
}

const MyComponent = ({ 
  title, 
  count = 0 
}: Props) => {
  return &lt;h1&gt;{title}: {count}&lt;/h1&gt;
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
&lt;!-- Vue - defineProps --&gt;
&lt;script setup lang="ts"&gt;
interface TVpMyComponent {
  title: string
  count?: number
}

const props = withDefaults(
  defineProps&lt;TVpMyComponent&gt;(),
  { count: 0 }
)
&lt;/script&gt;

&lt;template&gt;
  &lt;h1&gt;{props.title }: { props.count }&lt;/h1&gt;
&lt;/template&gt;
</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>defineProps&lt;T&gt;()</code> - compile-time macro</li>
          <li><code>withDefaults()</code> для default values</li>
          <li>Props доступны напрямую в template</li>
          <li>Без <code>props.</code> если не нужно в script</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="defineProps() - Compile-time Macro" quizKey="props-macro">
      <template #react>
        <pre class="text-sm">// React - PropTypes или TypeScript interfaces
interface Props {
  title: string
  count?: number
}

const MyComponent = ({ title, count = 0 }: Props) => {
  return &lt;h1&gt;{title}: {count}&lt;/h1&gt;
}

// Или PropTypes (runtime)
MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>&lt;!-- Vue - compile-time macro --&gt;
&lt;script setup lang="ts"&gt;
interface TVpMyComponent {
  title: string
  count?: number
}

// ✅ Компилируется во время сборки
const props = defineProps&lt;TVpMyComponent&gt;()

// ❌ Не runtime функция!
// defineProps не существует в браузере
&lt;/script&gt;

&lt;template&gt;
  &lt;h1&gt;{{ props.title }}: {{ props.count }}&lt;/h1&gt;
&lt;/template&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>🔧 **Compile-time macro**: выполняется во время сборки</li>
          <li>🚀 **Нулевые накладные расходы**: удаляется из runtime</li>
          <li>📝 **TypeScript поддержка**: полная типизация</li>
          <li>✨ **Автоматическая валидация**: встроенная проверка типов</li>
          <li>🎯 **Лаконичный синтаксис**: меньше кода чем в React</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Как работает defineProps()" quizKey="props-runtime">
      <template #react>
        <pre class="text-sm">// React - runtime проверка
import PropTypes from 'prop-types'

const MyComponent = ({ title, count }) => {
  // Валидация происходит в браузере
  return &lt;h1&gt;{title}: {count}&lt;/h1&gt;
}

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>&lt;!-- До компиляции --&gt;
&lt;script setup lang="ts"&gt;
const props = defineProps&lt;{
  title: string
  count?: number
}&gt;()
&lt;/script&gt;

&lt;!-- После компиляции --&gt;
export default {
  props: {
    title: { type: String, required: true },
    count: { type: Number, default: undefined }
  },
  setup(props) {
    return { props }
  }
}</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>🔄 **Трансформация**: Vue компилятор превращает macro в обычный options API</li>
          <li>⚡ **Производительность**: нет runtime проверки типов</li>
          <li>🛡️ **Type Safety**: TypeScript проверяет типы во время разработки</li>
          <li>📦 **Размер**: не увеличивает размер bundle</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Events (Child → Parent)" quizKey="events-emit">
      <template #react>
        <pre class="text-sm">
// React - callback props
interface Props {
  onSubmit: (data: string) => void
}

const Child = ({ onSubmit }: Props) => {
  return (
    &lt;button onClick={() => onSubmit('data')}&gt;
      Submit
    &lt;/button&gt;
  )
}

// Parent
&lt;Child onSubmit={(d) => console.log(d)} /&gt;</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>&lt;!-- Child.vue - отдельный компонент --&gt;
&lt;script setup lang="ts"&gt;
const emit = defineEmits&lt;{
  submit: [data: string]
}&gt;()
&lt;/script&gt;

&lt;template&gt;
  &lt;button @click="emit('submit', 'data')"&gt;
    Submit
  &lt;/button&gt;
&lt;/template&gt;

&lt;!-- Parent.vue - использует Child --&gt;
&lt;template&gt;
  &lt;Child @submit="(d) => console.log(d)" /&gt;
&lt;/template&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>defineEmits</code> - типизированные события</li>
          <li><code>@event</code> = <code>v-on:event</code></li>
          <li>Конвенция: <code>@click</code>, <code>@submit</code>, <code>@update</code></li>
          <li>emit вызывается напрямую в template или script</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="defineEmits() - Compile-time Macro" quizKey="events-macro">
      <template #react>
        <pre class="text-sm">// React - callback props
interface Props {
  onSubmit: (data: string) => void
}

const Child = ({ onSubmit }: Props) => {
  return (
    &lt;button onClick={() => onSubmit('data')}&gt;
      Submit
    &lt;/button&gt;
  )
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>&lt;!-- Vue - defineEmits macro --&gt;
&lt;script setup lang="ts"&gt;
// ✅ Compile-time macro
const emit = defineEmits<{
  // Один параметр
  submit: [data: string]
  
  // Множественные параметры  
  update: [id: number, value: string, timestamp: number]
  
  // Без параметров
  close: []
}>()

// Вызов с одним параметром
emit('submit', 'hello world')

// Вызов с множественными параметрами
emit('update', 123, 'new value', Date.now())

// Вызов без параметров
emit('close')

// Вызов функции в template
&lt;/script&gt;

&lt;template&gt;
  &lt;button @click="emit('submit', 'hello world')"&gt;
    Submit
  &lt;/button&gt;
  
  &lt;button @click="emit('update', 123, 'new value', Date.now())"&gt;
    Update
  &lt;/button&gt;
  
  &lt;button @click="emit('close')"&gt;
    Close
  &lt;/button&gt;
&lt;/template&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>🔧 **Compile-time macro**: выполняется во время сборки</li>
          <li>📝 **TypeScript типизация**: строгие типы для событий</li>
          <li>🚀 **Нулевые накладные расходы**: удаляется из runtime</li>
          <li>✨ **Автодополнение**: IDE подсказывает доступные события</li>
          <li>🛡️ **Валидация**: проверка типов во время разработки</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Как работает defineEmits()" quizKey="events-runtime">
      <template #react>
        <pre class="text-sm">// React - runtime проверка
const Child = ({ onSubmit }) => {
  const handleClick = () => {
    if (typeof onSubmit === 'function') {
      onSubmit('data')
    }
  }
  
  return &lt;button onClick={handleClick}&gt;Submit&lt;/button&gt;
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>&lt;!-- До компиляции --&gt;
&lt;script setup lang="ts"&gt;
const emit = defineEmits&lt;{
  submit: [data: string]
}&gt;()
&lt;/script&gt;

&lt;!-- После компиляции --&gt;
export default {
  emits: ['submit'],
  setup(props, context) {
    // emit доступен через context.emit
    context.emit('submit', 'data')
  }
}

// ИЛИ с деструктуризацией
export default {
  emits: ['submit'],
  setup(props, { emit }) {
    // emit доступен напрямую после деструктуризации
    emit('submit', 'data')
  }
}</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>🔄 **Трансформация**: превращается в options API emits</li>
          <li>⚡ **Производительность**: нет runtime проверки типов</li>
          <li>📦 **Размер**: не увеличивает bundle</li>
          <li>🎯 **Контекст**: emit доступен через второй аргумент setup</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Типизация событий в defineEmits" quizKey="events-typing">
      <template #react>
        <pre class="text-sm">// React - TypeScript interfaces
interface Props {
  onSubmit: (data: string) => void
  onChange: (value: number) => void
  onClose?: () => void
}

// Использование
const Child = ({ onSubmit, onChange, onClose }: Props) => {
  onSubmit('string')     // ✅ OK
  onChange(123)         // ✅ OK
  onClose()             // ✅ OK
  
  // onSubmit(123)      // ❌ TypeScript error
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>&lt;!-- Vue - строгая типизация событий --&gt;
&lt;script setup lang="ts"&gt;
const emit = defineEmits&lt;{
  submit: [data: string]      // обязателен string
  change: [value: number]     // обязателен number  
  close: []                   // без параметров
  update?: [value: string]    // опциональное событие
}&gt;()

// ✅ TypeScript проверяет типы
emit('submit', 'hello')    // OK
emit('change', 42)         // OK
emit('close')              // OK

// ❌ TypeScript ошибки
emit('submit', 123)        // Error: number не string
emit('change', 'hello')    // Error: string не number
emit('unknown', 'data')    // Error: событие не существует
&lt;/script&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>📝 **Синтаксис**: `eventName: [param1, param2, ...]`</li>
          <li>🔒 **Строгие типы**: проверка параметров во время разработки</li>
          <li>❓ **Опциональные события**: `?` для необязательных событий</li>
          <li>🎯 **Автодополнение**: IDE показывает доступные события</li>
        </ul>
      </template>
    </ComparisonCard>

    <!-- Live Demo -->
    <LiveDemoCard title="Props & Events">
      <div class="space-y-4">
        <div class="p-4 bg-palantir-dark-2 rounded border border-palantir-dark-3">
          <p class="text-palantir-gray-3 text-xs font-bold uppercase tracking-wide mb-2">Parent sends message to Child</p>
          <input
            v-model="message"
            class="bp-input w-full"
            placeholder="Type message..."
          >
        </div>

        <DemoChild 
          :message="message" 
          @reply="handleChildEvent"
        />

        <div 
          v-if="receivedMessage" 
          class="p-4 bg-blue-500/10 rounded border border-blue-500/20"
        >
          <p class="text-blue-300 flex items-center gap-2">
            <span>📨</span> Received from child: <strong class="text-blue-200">{{ receivedMessage }}</strong>
          </p>
        </div>
      </div>
    </LiveDemoCard>

    <ComparisonCard title="v-model (Two-way Binding)" quizKey="vmodel-binding">
      <template #react>
        <pre class="text-sm">
// React - controlled component
const [value, setValue] = useState('')

&lt;input 
  value={value}
  onChange={(e) => setValue(e.target.value)}
/&gt;</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
&lt;!-- Vue - v-model --&gt;
&lt;script setup&gt;
const value = ref('')
&lt;/script&gt;

&lt;template&gt;
  &lt;input v-model="value" /&gt;
&lt;/template&gt;

&lt;!-- Эквивалент: --&gt;
&lt;input 
  :value="value" 
  @input="value = $event.target.value"
/&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>v-model</code> = value + onChange в одном</li>
          <li>Работает с input, select, textarea, checkbox</li>
          <li>Можно использовать на custom компонентах</li>
          <li>Модификаторы: <code>.trim</code>, <code>.number</code>, <code>.lazy</code></li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="v-model с разными контролами" quizKey="vmodel-controls">
      <template #react>
        <pre class="text-sm">// React - разные контролы
function Form() {
  const [text, setText] = useState('')
  const [checked, setChecked] = useState(false)
  const [selected, setSelected] = useState('a')
  
  return (
    &lt;&gt;
      &lt;input 
        value={text} 
        onChange={e => setText(e.target.value)} 
      /&gt;
      
      &lt;input 
        type="checkbox"
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
      /&gt;
      
      &lt;select 
        value={selected}
        onChange={e => setSelected(e.target.value)}
      &gt;
        &lt;option value="a"&gt;A&lt;/option&gt;
        &lt;option value="b"&gt;B&lt;/option&gt;
      &lt;/select&gt;
    &lt;/&gt;
  )
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>&lt;!-- Vue - v-model с разными контролами --&gt;
&lt;script setup&gt;
const text = ref('')
const checked = ref(false)
const selected = ref('a')
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- Text input --&gt;
  &lt;input v-model="text" /&gt;
  
  &lt;!-- Checkbox --&gt;
  &lt;input 
    type="checkbox" 
    v-model="checked" 
  /&gt;
  
  &lt;!-- Select --&gt;
  &lt;select v-model="selected"&gt;
    &lt;option value="a"&gt;A&lt;/option&gt;
    &lt;option value="b"&gt;B&lt;/option&gt;
  &lt;/select&gt;
  
  &lt;!-- Textarea --&gt;
  &lt;textarea v-model="text"&gt;&lt;/textarea&gt;
  
  &lt;!-- Radio buttons --&gt;
  &lt;input type="radio" value="male" v-model="gender" /&gt;
  &lt;input type="radio" value="female" v-model="gender" /&gt;
&lt;/template&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>📝 **Text input**: `v-model` ↔ `value` + `@input`</li>
          <li>☑️ **Checkbox**: `v-model` ↔ `checked` + `@change`</li>
          <li>📋 **Select**: `v-model` ↔ `value` + `@change`</li>
          <li>📄 **Textarea**: `v-model` ↔ `value` + `@input`</li>
          <li>🎛️ **Radio**: `v-model` ↔ `value` + `@change`</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="v-model модификаторы" quizKey="vmodel-modifiers">
      <template #react>
        <pre class="text-sm">// React - ручная обработка
function Form() {
  const [text, setText] = useState('')
  const [age, setAge] = useState('')
  
  const handleTextChange = (e) => {
    setText(e.target.value.trim())
  }
  
  const handleAgeChange = (e) => {
    const num = parseInt(e.target.value)
    setAge(isNaN(num) ? '' : num)
  }
  
  return (
    &lt;&gt;
      &lt;input value={text} onChange={handleTextChange} /&gt;
      &lt;input value={age} onChange={handleAgeChange} /&gt;
    &lt;/&gt;
  )
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>&lt;!-- Vue - модификаторы v-model --&gt;
&lt;script setup&gt;
const message = ref('')
const age = ref('')
const lazyText = ref('')
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- .trim - удаляет пробелы --&gt;
  &lt;input v-model.trim="message" /&gt;
  
  &lt;!-- .number - преобразует в число --&gt;
  &lt;input v-model.number="age" /&gt;
  
  &lt;!-- .lazy - обновление при change, не input --&gt;
  &lt;input v-model.lazy="lazyText" /&gt;
  
  &lt;!-- Комбинация модификаторов --&gt;
  &lt;input v-model.trim.number.lazy="value" /&gt;
&lt;/template&gt;

&lt;!-- Эквивалент .trim: --&gt;
&lt;input 
  :value="message" 
  @input="message = $event.target.value.trim()"
/&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>✂️ **.trim**: удаляет пробелы в начале и конце</li>
          <li>🔢 **.number**: автоматически преобразует в Number</li>
          <li>🐌 **.lazy**: обновление при событии change вместо input</li>
          <li>🔗 **Комбинация**: можно использовать несколько модификаторов</li>
          <li>⚡ **Производительность**: модификаторы обрабатываются во время компиляции</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="v-model со сложными данными" quizKey="vmodel-complex">
      <template #react>
        <pre class="text-sm">// React - сложные объекты
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    profile: {
      email: '',
      settings: {
        theme: 'dark',
        notifications: true
      }
    },
    hobbies: []
  })
  
  const updateName = (e) => {
    setUser(prev => ({
      ...prev,
      name: e.target.value
    }))
  }
  
  const updateEmail = (e) => {
    setUser(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        email: e.target.value
      }
    }))
  }
  
  return (
    &lt;input value={user.name} onChange={updateName} /&gt;
  )
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>&lt;!-- Vue - v-model со сложными данными --&gt;
&lt;script setup&gt;
const user = ref({
  name: '',
  profile: {
    email: '',
    settings: {
      theme: 'dark',
      notifications: true
    }
  },
  hobbies: []
})
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- Прямая привязка к свойствам объекта --&gt;
  &lt;input v-model="user.name" /&gt;
  
  &lt;!-- Вложенные свойства --&gt;
  &lt;input v-model="user.profile.email" /&gt;
  
  &lt;!-- Глубоко вложенные свойства --&gt;
  &lt;select v-model="user.profile.settings.theme"&gt;
    &lt;option value="dark"&gt;Dark&lt;/option&gt;
    &lt;option value="light"&gt;Light&lt;/option&gt;
  &lt;/select&gt;
  
  &lt;!-- Массивы --&gt;
  &lt;input v-model="user.hobbies[0]" /&gt;
  
  &lt;!-- Чекбокс для boolean --&gt;
  &lt;input 
    type="checkbox" 
    v-model="user.profile.settings.notifications" 
  /&gt;
&lt;/template&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>🏗️ **Объекты**: `v-model="user.name"` - прямая привязка к свойству</li>
          <li>🔗 **Вложенность**: `v-model="user.profile.email"` - работает с любой глубиной</li>
          <li>📋 **Массивы**: `v-model="array[0]"` - привязка к элементам массива</li>
          <li>☑️ **Boolean**: автоматическая работа с checkbox</li>
          <li>⚡ **Реактивность**: Vue автоматически отслеживает изменения</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="v-model с массивами и списками" quizKey="vmodel-arrays">
      <template #react>
        <pre class="text-sm">// React - работа с массивами
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn Vue', done: false },
    { id: 2, text: 'Build app', done: true }
  ])
  
  const updateTodo = (id, newText) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }
  
  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }
  
  return (
    &lt;div&gt;
      {todos.map(todo => (
        &lt;div key={todo.id}&gt;
          &lt;input 
            value={todo.text} 
            onChange={e => updateTodo(todo.id, e.target.value)}
          /&gt;
          &lt;input 
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleTodo(todo.id)}
          /&gt;
        &lt;/div&gt;
      ))}
    &lt;/div&gt;
  )
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm" v-pre>&lt;!-- Vue - v-model с массивами --&gt;
&lt;script setup&gt;
const todos = ref([
  { id: 1, text: 'Learn Vue', done: false },
  { id: 2, text: 'Build app', done: true }
])

const newTodo = ref('')
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- Редактирование элементов массива --&gt;
  &lt;div v-for="todo in todos" :key="todo.id"&gt;
    &lt;input v-model="todo.text" /&gt;
    &lt;input 
      type="checkbox" 
      v-model="todo.done" 
    /&gt;
    &lt;span&gt;{{ todo.text }}&lt;/span&gt;
  &lt;/div&gt;
  
  &lt;!-- Добавление новых элементов --&gt;
  &lt;input v-model="newTodo" @keyup.enter="todos.push({ 
    id: Date.now(), 
    text: newTodo.value, 
    done: false 
  })" /&gt;
  
  &lt;!-- Массив примитивов --&gt;
  &lt;div v-for="(tag, index) in tags" :key="index"&gt;
    &lt;input v-model="tags[index]" /&gt;
  &lt;/div&gt;
&lt;/template&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>🔄 **Реактивность**: Vue автоматически обновляет массивы</li>
          <li>✏️ **Прямое редактирование**: `v-model="todo.text"` изменяет объект в массиве</li>
          <li>➕ **Добавление**: `todos.push()` с реактивными данными</li>
          <li>🏷️ **Примитивы**: `v-model="tags[index]"` для массива строк/чисел</li>
          <li>⚠️ **Осторожно**: прямая мутация реактивных массивов безопасна в Vue</li>
        </ul>
      </template>
    </ComparisonCard>

    <!-- Live Demo -->
    <LiveDemoCard title="v-model with Complex Data">
      <div class="space-y-6">
        <div class="p-4 bg-palantir-light-2 dark:bg-palantir-dark-2 rounded border border-palantir-light-3 dark:border-palantir-dark-3">
          <p class="text-palantir-gray-3 text-xs font-bold uppercase tracking-wide mb-3">User Profile</p>
          
          <div class="space-y-3">
            <input 
              v-model="userProfile.name" 
              placeholder="Name"
              class="bp-input w-full"
            />
            
            <input 
              v-model="userProfile.profile.email" 
              placeholder="Email"
              class="bp-input w-full"
            />
            
            <select 
              v-model="userProfile.profile.settings.theme"
              class="bp-input w-full"
            >
              <option value="dark">🌙 Dark Theme</option>
              <option value="light">☀️ Light Theme</option>
            </select>
            
            <label class="flex items-center space-x-2 text-palantir-text-dark dark:text-palantir-gray-1 cursor-pointer hover:text-palantir-blue transition-colors">
              <input 
                type="checkbox" 
                v-model="userProfile.profile.settings.notifications"
                class="rounded bg-palantir-light-1 dark:bg-palantir-dark-1 border-palantir-light-3 dark:border-palantir-dark-3 text-palantir-blue focus:ring-palantir-blue"
              />
              <span>Notifications</span>
            </label>
          </div>
          
          <div class="mt-4 p-3 bg-palantir-light-1 dark:bg-palantir-dark-1 rounded border border-palantir-light-3 dark:border-palantir-dark-3 text-xs font-mono text-palantir-text-dark dark:text-palantir-gray-1 overflow-x-auto">
            <pre>{{ JSON.stringify(userProfile, null, 2) }}</pre>
          </div>
        </div>

        <div class="p-4 bg-palantir-light-2 dark:bg-palantir-dark-2 rounded border border-palantir-light-3 dark:border-palantir-dark-3">
          <p class="text-palantir-gray-3 text-xs font-bold uppercase tracking-wide mb-3">Todo List</p>
          
          <div class="space-y-2 mb-3">
            <div v-for="(todo, index) in todos" :key="todo.id" class="flex items-center gap-2 group">
              <input 
                type="checkbox" 
                v-model="todo.done"
                class="rounded bg-palantir-light-1 dark:bg-palantir-dark-1 border-palantir-light-3 dark:border-palantir-dark-3 text-palantir-blue focus:ring-palantir-blue"
              />
              <input 
                v-model="todo.text"
                class="bp-input flex-1"
                placeholder="Todo item..."
              />
              <button 
                @click="todos.splice(index, 1)"
                class="px-2 py-1 text-palantir-gray-3 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                ✕
              </button>
            </div>
          </div>
          
          <button 
            @click="todos.push({ id: Date.now(), text: '', done: false })"
            class="bp-button bp-button-primary"
          >
            + Add Todo
          </button>
          
          <div class="mt-4 p-3 bg-palantir-light-1 dark:bg-palantir-dark-1 rounded border border-palantir-light-3 dark:border-palantir-dark-3 text-xs font-mono text-palantir-text-dark dark:text-palantir-gray-1 overflow-x-auto">
            <pre>{{ JSON.stringify(todos, null, 2) }}</pre>
          </div>
        </div>

        <div class="p-4 bg-palantir-light-2 dark:bg-palantir-dark-2 rounded border border-palantir-light-3 dark:border-palantir-dark-3">
          <p class="text-palantir-gray-3 text-xs font-bold uppercase tracking-wide mb-3">Tags (Primitive Array)</p>
          
          <div class="space-y-2 mb-3">
            <div v-for="(tag, index) in tags" :key="index" class="flex items-center gap-2 group">
              <input 
                v-model="tags[index]" 
                class="bp-input flex-1"
                placeholder="Tag..."
              />
              <button 
                @click="tags.splice(index, 1)"
                class="px-2 py-1 text-palantir-gray-3 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                ✕
              </button>
            </div>
          </div>
          
          <button 
            @click="tags.push('')"
            class="bp-button bp-button-primary"
          >
            + Add Tag
          </button>
          
          <div class="mt-4 p-3 bg-palantir-light-1 dark:bg-palantir-dark-1 rounded border border-palantir-light-3 dark:border-palantir-dark-3 text-xs font-mono text-palantir-text-dark dark:text-palantir-gray-1 overflow-x-auto">
            <pre>{{ JSON.stringify(tags, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </LiveDemoCard>

    <BestPractices :practices="[
      {
        title: 'Reactive Props Destructure (Vue 3.5+)',
        description: 'В Vue 3.5+ можно деструктурировать `defineProps` с сохранением реактивности: `const { count = 0 } = defineProps<{ count?: number }>()`. Это чище, чем `props.count` или `withDefaults`.',
        type: 'success'
      },
      {
        title: 'Strict Event Typing',
        description: 'Всегда используйте синтаксис кортежей (tuples) в `defineEmits` для строгой типизации аргументов: `update: [id: number, val: string]`. Это предотвращает ошибки передачи данных.',
        type: 'warning'
      },
      {
        title: 'Model Arguments',
        description: 'Используйте именованные аргументы `v-model:title` вместо создания отдельных пропсов и событий. Это делает API компонента более предсказуемым и стандартным.',
        type: 'info'
      }
    ]" />
  </div>
</template>

