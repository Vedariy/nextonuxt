<script setup lang="ts">
import ComponentA from '../examples/ComponentA.vue'
import ComponentB from '../examples/ComponentB.vue'
import ComponentC from '../examples/ComponentC.vue'

const currentTab = ref('profile')

const currentViewName = ref('ComponentA')
const includeList = ref(['ComponentA', 'ComponentB'])
const maxCache = ref(2)

const componentMap = {
  ComponentA,
  ComponentB,
  ComponentC
} as const

const currentComponent = computed(() => {
  return componentMap[currentViewName.value as keyof typeof componentMap]
})

const profileData = ref({
  name: '',
  email: '',
  bio: ''
})

const settingsData = ref({
  theme: 'dark',
  notifications: true
})

const tabs = [
  { id: 'profile', label: 'Profile Form', icon: '👤' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: 'stats', label: 'Statistics', icon: '📊' }
]

const components = ['ComponentA', 'ComponentB', 'ComponentC']

const activationCount = ref({
  profile: 0,
  settings: 0,
  stats: 0
})

const deactivationCount = ref({
  profile: 0,
  settings: 0,
  stats: 0
})

const logEvent = (event: string, tab: string) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${event}: ${tab}`)
}
</script>

<template>
  <div class="space-y-8">
    <ComparisonCard title="<keep-alive> → Component Caching" quizKey="keepalive-basics">
      <template #react>
        <pre class="text-sm">
// React - нет встроенного keep-alive
// Нужна ручная реализация

const cache = useRef(new Map())

function KeepAlive({ children, cacheKey }) {
  if (!cache.current.has(cacheKey)) {
    cache.current.set(cacheKey, children)
  }
  return cache.current.get(cacheKey)
}

// Или использовать библиотеки
// react-activation, react-keep-alive</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
// Vue - встроенный компонент
&lt;keep-alive&gt;
  &lt;component :is="currentComponent" /&gt;
&lt;/keep-alive&gt;

// С опциями
&lt;keep-alive 
  :include="['ComponentA', 'ComponentB']"
  :exclude="['HeavyComponent']"
  :max="5"
&gt;
  &lt;component :is="currentComponent" /&gt;
&lt;/keep-alive&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>keep-alive</code> кеширует компоненты вместо уничтожения</li>
          <li><code>include</code> - список компонентов для кеширования</li>
          <li><code>exclude</code> - список компонентов для исключения</li>
          <li><code>max</code> - максимальное количество кешированных компонентов</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Lifecycle Hooks with keep-alive" quizKey="keepalive-lifecycle">
      <template #react>
        <pre class="text-sm">
// React - ручная реализация
useEffect(() => {
  // "activated"
  console.log('Component visible')
  
  return () => {
    // "deactivated"
    console.log('Component hidden')
  }
}, [isVisible])</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
// Vue - специальные хуки
onActivated(() => {
  console.log('Component activated')
  // Возобновить таймеры, подписки
})

onDeactivated(() => {
  console.log('Component deactivated')
  // Приостановить таймеры
})

// Обычные хуки вызываются только раз
onMounted(() => console.log('Mounted once'))
onUnmounted(() => console.log('Never called'))</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li><code>onActivated</code> - вызывается при показе компонента</li>
          <li><code>onDeactivated</code> - вызывается при скрытии</li>
          <li><code>onMounted</code> - вызывается только при первом создании</li>
          <li><code>onUnmounted</code> - не вызывается с keep-alive</li>
        </ul>
      </template>
    </ComparisonCard>

    <LiveDemoCard title="Tab Navigation with keep-alive">
      <div class="space-y-4">
        <div class="flex gap-2">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="currentTab = tab.id"
            :class="[
              'px-4 py-2 rounded transition-colors border',
              currentTab === tab.id
                ? 'bg-palantir-blue border-palantir-blue text-white shadow-md'
                : 'bg-palantir-light-2 dark:bg-palantir-dark-2 border-palantir-light-3 dark:border-palantir-dark-3 text-palantir-text-dark dark:text-palantir-gray-1 hover:bg-palantir-light-3 dark:hover:bg-palantir-dark-3'
            ]"
          >
            {{ tab.icon }} {{ tab.label }}
          </button>
        </div>

        <keep-alive>
          <div v-if="currentTab === 'profile'" class="bg-palantir-light-2 dark:bg-palantir-dark-2 p-4 rounded border border-palantir-light-3 dark:border-palantir-dark-3">
            <ProfileForm v-model="profileData" @activated="activationCount.profile++" @deactivated="deactivationCount.profile++" />
          </div>
          <div v-else-if="currentTab === 'settings'" class="bg-palantir-light-2 dark:bg-palantir-dark-2 p-4 rounded border border-palantir-light-3 dark:border-palantir-dark-3">
            <SettingsForm v-model="settingsData" @activated="activationCount.settings++" @deactivated="deactivationCount.settings++" />
          </div>
          <div v-else class="bg-palantir-light-2 dark:bg-palantir-dark-2 p-4 rounded border border-palantir-light-3 dark:border-palantir-dark-3">
            <StatsView @activated="activationCount.stats++" @deactivated="deactivationCount.stats++" />
          </div>
        </keep-alive>

        <div class="text-sm text-palantir-text-dark dark:text-palantir-gray-1 space-y-1">
          <p>💡 <strong>Попробуйте:</strong> Заполните форму → Переключите tab → Вернитесь обратно</p>
          <p>✨ Данные сохранились благодаря <code>keep-alive</code>!</p>
          <p class="text-xs mt-2 text-palantir-dark-4 dark:text-palantir-gray-2">
            Активаций: Profile: {{ activationCount.profile }}, Settings: {{ activationCount.settings }}, Stats: {{ activationCount.stats }}
          </p>
        </div>
      </div>
    </LiveDemoCard>

    <ComparisonCard title="include/exclude Props" quizKey="keepalive-include">
      <template #react>
        <pre class="text-sm">
// React - условная логика
const shouldCache = (key) => {
  return ['ComponentA', 'ComponentB'].includes(key)
}

{shouldCache(currentKey) 
  ? cachedComponent 
  : &lt;Component /&gt;
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
// Vue - декларативный подход
&lt;keep-alive :include="['ComponentA', 'ComponentB']"&gt;
  &lt;component :is="current" /&gt;
&lt;/keep-alive&gt;

// Или regex
&lt;keep-alive :include="/^Component[AB]$/"&gt;
  &lt;component :is="current" /&gt;
&lt;/keep-alive&gt;

// Или массив
&lt;keep-alive :exclude="['HeavyComponent']"&gt;
  &lt;component :is="current" /&gt;
&lt;/keep-alive&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>Принимает: string, RegExp, Array</li>
          <li>Проверяет по <code>name</code> компонента</li>
          <li><code>exclude</code> имеет приоритет над <code>include</code></li>
          <li>Динамическое изменение работает реактивно</li>
        </ul>
      </template>
    </ComparisonCard>

    <LiveDemoCard title="include/exclude">
      <div class="grid lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-palantir-text-dark dark:text-palantir-gray-2 text-sm mb-2">Include компоненты (будут кешироваться):</label>
            <div class="flex gap-2">
              <label v-for="comp in components" :key="comp" class="flex items-center gap-2 text-sm cursor-pointer hover:opacity-80 transition-opacity">
                <input
                  type="checkbox"
                  :value="comp"
                  v-model="includeList"
                  class="rounded bg-palantir-light-2 dark:bg-palantir-dark-2 border-palantir-light-4 dark:border-palantir-dark-3 text-palantir-green focus:ring-palantir-green"
                >
                <span :class="includeList.includes(comp) ? 'text-palantir-blue font-semibold' : 'text-palantir-text-dark dark:text-palantir-gray-4'">
                  {{ includeList.includes(comp) ? '💾' : '🚫' }} {{ comp }}
                </span>
              </label>
            </div>
          </div>

          <div class="flex gap-2">
            <button
              v-for="comp in components"
              :key="comp"
              @click="currentViewName = comp"
              :class="[
                'px-6 py-2 rounded text-sm transition-colors relative border',
                currentViewName === comp
                  ? 'bg-palantir-blue border-palantir-blue text-white shadow-md '
                  : 'bg-palantir-light-2 dark:bg-palantir-dark-2 border-palantir-light-3 dark:border-palantir-dark-3 text-palantir-text-dark dark:text-palantir-gray-1 hover:bg-palantir-light-3 dark:hover:bg-palantir-dark-3'
              ]"
            >
              {{ comp }}
              <span v-if="includeList.includes(comp)" class="absolute top-1 right-1 text-xs shadow-md shadow-white">💾</span>
              <div class="text-[10px] mt-1 opacity-80">{{ includeList.includes(comp) ? 'Кешируется' : 'Пересоздается' }}</div>
            </button>
          </div>

          <keep-alive :include="includeList">
            <component :is="currentComponent" />
          </keep-alive>

          <div class="bg-palantir-light-2 dark:bg-palantir-dark-2 p-3 rounded text-xs text-palantir-text-dark dark:text-palantir-gray-1 space-y-2 border border-palantir-light-3 dark:border-palantir-dark-3">
            <p class="mt-2">
              💡 <strong>Попробуйте:</strong> Заполните данные в компонентах → Снимите галочку → Переключитесь между компонентами
            </p>
            <p class="text-blue-600 dark:text-blue-400">
              💾 С галочкой: данные сохраняются (mounted вызывается 1 раз)
            </p>
            <p class="text-red-600 dark:text-red-400">
              🚫 Без галочки: данные теряются (mounted вызывается каждый раз)
            </p>
          </div>
        </div>

        <div class="bg-palantir-light-1 dark:bg-palantir-dark-1 rounded-lg p-4 text-xs font-mono overflow-x-auto border border-palantir-light-3 dark:border-palantir-dark-3 self-start">
<pre class="text-palantir-text-dark dark:text-palantir-gray-2" v-pre>
&lt;!-- Script Code --&gt;
&lt;script setup lang="ts"&gt;
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'
import ComponentC from './ComponentC.vue'
...
  const currentViewName = ref('ComponentA')
  const includeList = ref(['ComponentA', 'ComponentB'])
  const components = ['ComponentA', 'ComponentB', 'ComponentC']

  const componentMap = {
    ComponentA,
    ComponentB,
    ComponentC
  } as const

  const currentComponent = computed(() => {
    return componentMap[currentViewName.value as keyof typeof componentMap]
  })
  ...
&lt;/script&gt;

&lt;!-- Template Code --&gt;
&lt;div&gt;
  &lt;label v-for="comp in components" :key="comp"&gt;
    &lt;input
      type="checkbox"
      :value="comp"
      v-model="includeList"
    &gt;
    {{ comp }}
  &lt;/label&gt;
&lt;/div&gt;

&lt;div&gt;
  &lt;button
    v-for="comp in components"
    :key="comp"
    @click="currentViewName = comp"
  &gt;
    {{ comp }}
  &lt;/button&gt;
&lt;/div&gt;

&lt;keep-alive :include="includeList"&gt;
  &lt;component :is="currentComponent" /&gt;
&lt;/keep-alive&gt;
</pre>
        </div>
      </div>
    </LiveDemoCard>

    <ComparisonCard title="max Prop - Cache Limit" quizKey="keepalive-max">
      <template #react>
        <pre class="text-sm">
// React - LRU cache реализация
const cache = useRef(new Map())
const MAX_SIZE = 5

function addToCache(key, value) {
  if (cache.current.size >= MAX_SIZE) {
    const firstKey = cache.current.keys().next().value
    cache.current.delete(firstKey)
  }
  cache.current.set(key, value)
}</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
// Vue - встроенный LRU
&lt;keep-alive :max="5"&gt;
  &lt;component :is="current" /&gt;
&lt;/keep-alive&gt;

// Автоматически удаляет 
// самый старый компонент
// при превышении лимита</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>LRU (Least Recently Used) стратегия</li>
          <li>Удаляет самый давно использованный компонент</li>
          <li>Полезно для memory management</li>
          <li>Предотвращает утечки памяти</li>
        </ul>
      </template>
    </ComparisonCard>

    <ComparisonCard title="Use Cases" quizKey="keepalive-usecases">
      <template #react>
        <pre class="text-sm">
// React - ручная оптимизация
const MemoizedComponent = memo(Component)

// Сохранение состояния через Context
const [tabStates, setTabStates] = useState({})

// Библиотеки
import { AliveScope, KeepAlive } from 'react-activation'</pre>
      </template>
      <template #vue>
        <pre class="text-sm">
// 1. Tab Navigation
&lt;keep-alive&gt;
  &lt;router-view /&gt;
&lt;/keep-alive&gt;

// 2. Dynamic Forms
&lt;keep-alive&gt;
  &lt;component :is="currentForm" /&gt;
&lt;/keep-alive&gt;

// 3. Expensive Components
&lt;keep-alive :max="3"&gt;
  &lt;ChartComponent :data="data" /&gt;
&lt;/keep-alive&gt;</pre>
      </template>
      <template #notes>
        <ul class="list-disc pl-4 space-y-1">
          <li>✅ Tab navigation с формами</li>
          <li>✅ Дорогие компоненты (графики, карты)</li>
          <li>✅ Сохранение scroll позиции</li>
          <li>❌ Компоненты с WebSocket/timers без cleanup</li>
        </ul>
      </template>
    </ComparisonCard>

    <BestPractices :practices="[
      {
        title: 'Component Names Requirement',
        description: 'Для работы `include` и `exclude` компоненты ОБЯЗАНЫ иметь имя. В SFC (Single File Components) имя выводится из имени файла, но лучше задавать явно через `defineOptions({ name: \'MyComp\' })`.',
        type: 'warning'
      },
      {
        title: 'Memory Management',
        description: 'Всегда используйте проп `:max`, если количество кешируемых компонентов может расти динамически. Это предотвратит утечки памяти, удаляя старые экземпляры (LRU стратегия).',
        type: 'success'
      },
      {
        title: 'Resource Cleanup',
        description: 'Используйте `onDeactivated` для приостановки таймеров, анимаций или вебсокетов. Компонент не уничтожается, поэтому `onUnmounted` не сработает!',
        type: 'info'
      }
    ]" />
  </div>
</template>
