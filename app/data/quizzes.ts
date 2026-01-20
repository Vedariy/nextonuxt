export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number // 0-based index
  explanation: string
}

export interface TopicQuiz {
  title: string
  questions: QuizQuestion[]
}

export const quizzes: Record<string, TopicQuiz> = {
  basics: {
    title: 'Vue Basics Quiz',
    questions: [
      {
        id: 1,
        question: 'Что такое SFC во Vue?',
        options: [
          'Simple Function Component',
          'Single File Component',
          'Static File Compiler',
          'Stateful Functional Component'
        ],
        correctAnswer: 1,
        explanation: 'SFC (Single File Component) — это файл с расширением .vue, который инкапсулирует шаблон, логику и стили компонента в одном файле.'
      },
      {
        id: 2,
        question: 'Какой синтаксис используется для интерполяции текста во Vue?',
        options: [
          '{value}',
          '{{ value }}',
          '<%= value %>',
          'v-text="value"'
        ],
        correctAnswer: 1,
        explanation: 'Vue использует двойные фигурные скобки {{ value }} ("mustache" syntax) для вывода текста в шаблон.'
      },
      {
        id: 3,
        question: 'В чем разница между v-if и v-show?',
        options: [
          'Нет разницы, это алиасы',
          'v-if скрывает элемент через CSS, а v-show удаляет из DOM',
          'v-if удаляет элемент из DOM, а v-show переключает CSS свойство display',
          'v-show работает только с анимациями'
        ],
        correctAnswer: 2,
        explanation: 'v-if — это "настоящий" условный рендеринг (элемент уничтожается и создается заново). v-show только переключает display: none.'
      },
      {
        id: 4,
        question: 'Какой атрибут обязателен при использовании v-for?',
        options: [
          'index',
          'id',
          ':key',
          'unique'
        ],
        correctAnswer: 2,
        explanation: 'Атрибут :key обязателен для подсказки алгоритму виртуального DOM, как идентифицировать узлы при обновлении списка.'
      },
      {
        id: 5,
        question: 'Как правильно забиндить значение переменной "url" к атрибуту src тега img?',
        options: [
          '<img src="{url}" />',
          '<img :src="url" />',
          '<img src={{url}} />',
          '<img v-src="url" />'
        ],
        correctAnswer: 1,
        explanation: 'Используется директива v-bind (сокращенно :) — <img :src="url" />.'
      }
    ]
  },
  state: {
    title: 'Reactivity Quiz',
    questions: [
      {
        id: 1,
        question: 'Как изменить значение переменной, созданной через ref(0)?',
        options: [
          'count = 1',
          'count.value = 1',
          'count.set(1)',
          'ref.set(count, 1)'
        ],
        correctAnswer: 1,
        explanation: 'Внутри <script setup> (в JS/TS коде) доступ к значению ref осуществляется через свойство .value.'
      },
      {
        id: 2,
        question: 'Для каких типов данных рекомендуется использовать reactive()?',
        options: [
          'Только для примитивов (string, number)',
          'Для всего подряд',
          'Для объектов и массивов (глубокая реактивность)',
          'Только для массивов'
        ],
        correctAnswer: 2,
        explanation: 'reactive() предназначен для объектов и массивов. Он создает Proxy-обертку, обеспечивающую глубокую реактивность. Для примитивов нужно использовать ref().'
      },
      {
        id: 3,
        question: 'Что произойдет при деструктуризации объекта reactive напрямую: const { count } = state?',
        options: [
          'count останется реактивным',
          'count потеряет реактивность',
          'Vue выдаст ошибку компиляции',
          'count станет ref-объектом'
        ],
        correctAnswer: 1,
        explanation: 'При прямой деструктуризации reactive-объекта связь с исходным прокси теряется, и переменные становятся обычными значениями. Для сохранения реактивности используйте toRefs().'
      },
      {
        id: 4,
        question: 'Нужно ли использовать .value в шаблоне (template) для ref-переменных?',
        options: [
          'Да, всегда',
          'Нет, Vue разворачивает (unwrap) их автоматически',
          'Только если это вложенный ref',
          'Только внутри v-if'
        ],
        correctAnswer: 1,
        explanation: 'В шаблоне Vue автоматически "разворачивает" ref-ы верхнего уровня, поэтому .value писать не нужно.'
      }
    ]
  },
  props: {
    title: 'Props & Events Quiz',
    questions: [
      {
        id: 1,
        question: 'Какая функция используется для объявления пропсов в <script setup>?',
        options: [
          'useProps()',
          'defineProps()',
          'getProps()',
          'withProps()'
        ],
        correctAnswer: 1,
        explanation: 'defineProps() — это макрос компилятора, используемый для объявления входных параметров (props).'
      },
      {
        id: 2,
        question: 'Является ли defineEmits() runtime-функцией?',
        options: [
          'Да, она работает в браузере',
          'Нет, это макрос компилятора, который исчезает в runtime',
          'Да, это часть Vue Router',
          'Это функция только для Nuxt'
        ],
        correctAnswer: 1,
        explanation: 'defineEmits (как и defineProps) — это макрос, который обрабатывается на этапе компиляции и не существует в итоговом JS-коде как функция.'
      },
      {
        id: 3,
        question: 'Как реализовать двустороннее связывание (two-way binding) в Vue 3?',
        options: [
          'v-bind',
          'v-two-way',
          'v-model',
          'v-sync'
        ],
        correctAnswer: 2,
        explanation: 'v-model обеспечивает двустороннее связывание данных между родительским и дочерним компонентом (или элементом формы).'
      },
      {
        id: 4,
        question: 'Какой модификатор v-model автоматически удаляет пробелы?',
        options: [
          '.clean',
          '.trim',
          '.strip',
          '.space'
        ],
        correctAnswer: 1,
        explanation: 'Модификатор .trim автоматически удаляет пробелы в начале и конце введенной строки.'
      },
      {
        id: 5,
        question: 'Можно ли мутировать props напрямую в дочернем компоненте?',
        options: [
          'Да, если это объект',
          'Да, с помощью .value',
          'Нет, props доступны только для чтения (one-way data flow)',
          'Можно, если использовать v-model'
        ],
        correctAnswer: 2,
        explanation: 'Props во Vue следуют принципу однонаправленного потока данных. Дочерний компонент не должен изменять пропсы; он должен эмитить событие родителю для изменения данных.'
      }
    ]
  },
  computed: {
    title: 'Computed & Watch Quiz',
    questions: [
      {
        id: 1,
        question: 'В чем главное отличие computed от методов?',
        options: [
          'Computed асинхронны',
          'Computed кешируются на основе зависимостей',
          'Методы нельзя использовать в шаблоне',
          'Computed принимают аргументы'
        ],
        correctAnswer: 1,
        explanation: 'Computed свойства кешируются. Они пересчитываются только тогда, когда изменяются их реактивные зависимости. Методы вызываются при каждом рендере.'
      },
      {
        id: 2,
        question: 'Какую функцию лучше использовать для побочных эффектов (API запросы, DOM)?',
        options: [
          'computed()',
          'watch() / watchEffect()',
          'ref()',
          'reactive()'
        ],
        correctAnswer: 1,
        explanation: 'Computed должны быть чистыми функциями без побочных эффектов. Для сайд-эффектов предназначены watch и watchEffect.'
      },
      {
        id: 3,
        question: 'В чем особенность watchEffect по сравнению с watch?',
        options: [
          'watchEffect ленивый (lazy)',
          'watchEffect не поддерживает async',
          'watchEffect автоматически отслеживает зависимости и запускается сразу',
          'watchEffect работает только с массивами'
        ],
        correctAnswer: 2,
        explanation: 'watchEffect запускается немедленно и автоматически отслеживает все реактивные свойства, к которым было обращение внутри функции.'
      }
    ]
  },
  lifecycle: {
    title: 'Lifecycle Quiz',
    questions: [
      {
        id: 1,
        question: 'Какой хук соответствует componentDidMount / useEffect([], ...) из React?',
        options: [
          'onCreated',
          'onMounted',
          'onSetup',
          'onReady'
        ],
        correctAnswer: 1,
        explanation: 'onMounted вызывается после того, как компонент был смонтирован в DOM.'
      },
      {
        id: 2,
        question: 'Сработает ли onMounted при серверном рендеринге (SSR)?',
        options: [
          'Да',
          'Нет, только на клиенте',
          'Зависит от настроек Nuxt',
          'Да, если использовать useFetch'
        ],
        correctAnswer: 1,
        explanation: 'Хуки жизненного цикла, связанные с DOM (onMounted, onUpdated, onUnmounted), не вызываются во время SSR. Они работают только в браузере.'
      },
      {
        id: 3,
        question: 'Какой хук нужно использовать для очистки таймеров или слушателей событий?',
        options: [
          'onDeleted',
          'onClean',
          'onUnmounted',
          'onDisposed'
        ],
        correctAnswer: 2,
        explanation: 'onUnmounted вызывается перед уничтожением компонента. Это идеальное место для очистки ресурсов.'
      }
    ]
  },
  routing: {
    title: 'Nuxt Routing Quiz',
    questions: [
      {
        id: 1,
        question: 'Как создать динамический маршрут с параметром id?',
        options: [
          'pages/users/{id}.vue',
          'pages/users/[id].vue',
          'pages/users/:id.vue',
          'pages/users/_id.vue'
        ],
        correctAnswer: 1,
        explanation: 'Nuxt использует квадратные скобки для динамических сегментов: [id].vue.'
      },
      {
        id: 2,
        question: 'Какой компонент используется для навигации между страницами (вместо <a>)?',
        options: [
          '<Link>',
          '<RouterLink>',
          '<NuxtLink>',
          '<GoTo>'
        ],
        correctAnswer: 2,
        explanation: '<NuxtLink> — это встроенный компонент для навигации, который обеспечивает SPA-переходы и префетчинг.'
      },
      {
        id: 3,
        question: 'Как получить доступ к параметрам текущего маршрута?',
        options: [
          'useRouter().params',
          'useRoute().params',
          'defineProps()',
          'useParams()'
        ],
        correctAnswer: 1,
        explanation: 'composable useRoute() возвращает объект текущего маршрута, содержащий params, query, path и т.д.'
      }
    ]
  },
  dataFetching: {
    title: 'Data Fetching Quiz',
    questions: [
      {
        id: 1,
        question: 'Какой composable рекомендуется использовать для получения данных в Nuxt?',
        options: [
          'fetch()',
          'axios()',
          'useFetch()',
          'useRequest()'
        ],
        correctAnswer: 2,
        explanation: 'useFetch() — это обертка над useAsyncData и $fetch, предоставляющая удобный API с кешированием, дедупликацией и SSR-поддержкой.'
      },
      {
        id: 2,
        question: 'Что делает опция lazy: true в useFetch?',
        options: [
          'Отключает кеширование',
          'Загружает данные только при скролле',
          'Не блокирует навигацию, загружает данные асинхронно',
          'Делает запрос только на клиенте'
        ],
        correctAnswer: 2,
        explanation: 'lazy: true позволяет не блокировать переход на страницу (навигацию) ожиданием данных. Данные загружаются параллельно, и пользователь видит страницу быстрее (с состоянием pending).'
      },
      {
        id: 3,
        question: 'В чем преимущество useAsyncData перед обычным fetch?',
        options: [
          'Оно работает быстрее',
          'Оно предотвращает повторные запросы при гидратации (hydration mismatch)',
          'Оно поддерживает GraphQL',
          'Никакой разницы'
        ],
        correctAnswer: 1,
        explanation: 'useAsyncData (и useFetch) передает данные с сервера на клиент через payload, предотвращая повторный запрос данных в браузере сразу после загрузки страницы.'
      }
    ]
  },
  keepAlive: {
    title: 'KeepAlive Quiz',
    questions: [
      {
        id: 1,
        question: 'Зачем нужен компонент <keep-alive>?',
        options: [
          'Для продления сессии пользователя',
          'Для кеширования экземпляров компонентов и сохранения их состояния',
          'Для защиты от XSS атак',
          'Для SEO оптимизации'
        ],
        correctAnswer: 1,
        explanation: '<keep-alive> позволяет сохранить состояние компонента и избежать его повторного рендеринга (уничтожения/создания) при переключении.'
      },
      {
        id: 2,
        question: 'Какие специальные хуки жизненного цикла появляются при использовании keep-alive?',
        options: [
          'onCached / onRestored',
          'onKeep / onDrop',
          'onActivated / onDeactivated',
          'onShow / onHide'
        ],
        correctAnswer: 2,
        explanation: 'onActivated вызывается при появлении компонента из кеша, а onDeactivated — при уходе в кеш.'
      },
      {
        id: 3,
        question: 'Как указать, какие компоненты нужно кешировать?',
        options: [
          'С помощью пропса filter',
          'С помощью пропсов include и exclude',
          'Автоматически кешируются все',
          'В nuxt.config.ts'
        ],
        correctAnswer: 1,
        explanation: 'Проп include принимает имена компонентов (строка, RegEx или массив), которые нужно кешировать. Exclude — наоборот.'
      }
    ]
  }
}

export const cardQuizzes: Record<string, TopicQuiz> = {
  // TutorialBasics.vue
  'basics-structure': {
    title: 'Component Structure Quiz',
    questions: [
      {
        id: 1,
        question: 'Что такое SFC во Vue?',
        options: ['Single Function Component', 'Single File Component', 'Simple File Creator', 'Static File Content'],
        correctAnswer: 1,
        explanation: 'SFC означает Single File Component (однофайловый компонент) — файл с расширением .vue.'
      },
      {
        id: 2,
        question: 'Какой тег используется для логики в Composition API?',
        options: ['<script>', '<script setup>', '<code setup>', '<logic>'],
        correctAnswer: 1,
        explanation: '<script setup> — это синтаксический сахар для Composition API, упрощающий написание компонентов.'
      },
      {
        id: 3,
        question: 'Нужен ли явный export default в <script setup>?',
        options: ['Да, всегда', 'Нет, это делается автоматически', 'Только для пропсов', 'Только для TypeScript'],
        correctAnswer: 1,
        explanation: 'В <script setup> не нужно писать export default, компилятор Vue делает это автоматически.'
      },
      {
        id: 4,
        question: 'Где находится шаблон компонента в .vue файле?',
        options: ['В функции render()', 'В теге <template>', 'В переменной template', 'В JSX блоке'],
        correctAnswer: 1,
        explanation: 'Шаблон компонента определяется внутри тега <template>.'
      },
      {
        id: 5,
        question: 'Можно ли использовать TypeScript в .vue файлах?',
        options: ['Нет, только JS', 'Да, добавив lang="ts" в <script>', 'Только в отдельном файле', 'Да, но без проверки типов'],
        correctAnswer: 1,
        explanation: 'Vue полностью поддерживает TypeScript. Достаточно добавить атрибут lang="ts" к тегу <script>.'
      }
    ]
  },
  'basics-interpolation': {
    title: 'Text Interpolation Quiz',
    questions: [
      {
        id: 1,
        question: 'Какой синтаксис используется для вывода текста?',
        options: ['{text}', '{{ text }}', '<%= text %>', 'v-text="text"'],
        correctAnswer: 1,
        explanation: 'Vue использует "Mustache" синтаксис (двойные фигурные скобки) {{ }} для интерполяции текста.'
      },
      {
        id: 2,
        question: 'Можно ли использовать выражения JS внутри {{ }}?',
        options: ['Нет, только переменные', 'Да, любые выражения JS', 'Только тернарные операторы', 'Только вызовы функций'],
        correctAnswer: 1,
        explanation: 'Внутри {{ }} можно использовать полноценные JavaScript выражения.'
      },
      {
        id: 3,
        question: 'Как этот синтаксис отличается от React?',
        options: ['В React используются тройные скобки', 'В React используются одинарные скобки {}', 'В React нет интерполяции', 'Разницы нет'],
        correctAnswer: 1,
        explanation: 'В React для внедрения выражений используются одинарные фигурные скобки {}, а во Vue — двойные {{ }}.'
      },
      {
        id: 4,
        question: 'Будет ли интерпретироваться HTML внутри {{ }}?',
        options: ['Да, всегда', 'Нет, он экранируется как текст', 'Только если разрешено в конфиге', 'Зависит от браузера'],
        correctAnswer: 1,
        explanation: 'Данные внутри {{ }} всегда интерпретируются как обычный текст, а не HTML, для защиты от XSS.'
      },
      {
        id: 5,
        question: 'Какую директиву использовать для вывода "сырого" HTML?',
        options: ['v-html', 'v-raw', 'v-render', 'v-unsafe'],
        correctAnswer: 0,
        explanation: 'Для вывода необработанного HTML используется директива v-html.'
      }
    ]
  },
  'basics-conditional': {
    title: 'Conditional Rendering Quiz',
    questions: [
      {
        id: 1,
        question: 'Какая директива полностью удаляет элемент из DOM?',
        options: ['v-hide', 'v-show', 'v-if', 'v-none'],
        correctAnswer: 2,
        explanation: 'v-if удаляет элемент из DOM, если условие ложно.'
      },
      {
        id: 2,
        question: 'Какая директива переключает CSS свойство display?',
        options: ['v-if', 'v-display', 'v-show', 'v-visible'],
        correctAnswer: 2,
        explanation: 'v-show переключает свойство display (block/none), но элемент остается в DOM.'
      },
      {
        id: 3,
        question: 'Что эффективнее для частых переключений?',
        options: ['v-if', 'v-show', 'Одинаково', 'v-render'],
        correctAnswer: 1,
        explanation: 'v-show эффективнее для частых переключений, так как не требует перерисовки DOM структуры, только CSS.'
      },
      {
        id: 4,
        question: 'Можно ли использовать v-else без v-if?',
        options: ['Да', 'Нет', 'Только в циклах', 'Только с v-show'],
        correctAnswer: 1,
        explanation: 'v-else должен следовать непосредственно за элементом с v-if или v-else-if.'
      },
      {
        id: 5,
        question: 'Работает ли v-if с тегом <template>?',
        options: ['Нет', 'Да, для группировки элементов', 'Только в Nuxt', 'Нет, только с div'],
        correctAnswer: 1,
        explanation: 'Да, v-if можно использовать на <template> для условного рендеринга группы элементов без добавления лишнего узла в DOM.'
      }
    ]
  },
  'basics-list': {
    title: 'List Rendering Quiz',
    questions: [
      {
        id: 1,
        question: 'Какая директива используется для списков?',
        options: ['v-list', 'v-map', 'v-for', 'v-each'],
        correctAnswer: 2,
        explanation: 'v-for используется для рендеринга списка элементов на основе массива или объекта.'
      },
      {
        id: 2,
        question: 'Какой атрибут обязателен при использовании v-for?',
        options: ['id', 'index', ':key', 'unique'],
        correctAnswer: 2,
        explanation: ':key обязателен для отслеживания идентичности элементов и оптимизации перерисовки.'
      },
      {
        id: 3,
        question: 'Какой синтаксис для получения индекса?',
        options: ['v-for="item in items"', 'v-for="(item, index) in items"', 'v-for="item: index in items"', 'v-for="item in items track by index"'],
        correctAnswer: 1,
        explanation: 'Синтаксис (item, index) in items позволяет получить доступ к индексу элемента.'
      },
      {
        id: 4,
        question: 'Что рекомендуется использовать в качестве ключа (:key)?',
        options: ['Индекс массива', 'Случайное число', 'Уникальный ID из данных', 'Текст элемента'],
        correctAnswer: 2,
        explanation: 'Рекомендуется использовать уникальные ID из данных (например, id из базы данных), а не индексы, чтобы избежать багов при изменении порядка.'
      },
      {
        id: 5,
        question: 'Можно ли использовать v-for с объектами?',
        options: ['Нет, только с массивами', 'Да, для перебора свойств', 'Только с Map', 'Только с Set'],
        correctAnswer: 1,
        explanation: 'v-for поддерживает перебор свойств объекта: (value, key, index) in object.'
      }
    ]
  },
  'basics-attributes': {
    title: 'Attribute Binding Quiz',
    questions: [
      {
        id: 1,
        question: 'Как динамически привязать атрибут?',
        options: ['src={url}', ':src="url"', 'v-src="url"', 'bind:src="url"'],
        correctAnswer: 1,
        explanation: 'Сокращенный синтаксис v-bind — это двоеточие перед именем атрибута, например :src.'
      },
      {
        id: 2,
        question: 'Что делает v-bind?',
        options: ['Создает переменную', 'Связывает атрибут тега с выражением JS', 'Компилирует шаблон', 'Импортирует файл'],
        correctAnswer: 1,
        explanation: 'v-bind динамически связывает атрибут HTML элемента с выражением JavaScript.'
      },
      {
        id: 3,
        question: 'Как передать статический класс и динамический одновременно?',
        options: ['Нельзя', 'class="static" :class="{ dynamic: isActive }"', 'Использовать только :class', 'class="static {{ dynamic }}"'],
        correctAnswer: 1,
        explanation: 'Vue позволяет использовать обычный атрибут class и :class одновременно, они будут объединены.'
      },
      {
        id: 4,
        question: 'Если значение атрибута null или undefined, что произойдет?',
        options: ['Атрибут будет иметь значение "null"', 'Атрибут будет удален из элемента', 'Будет ошибка', 'Атрибут будет пустым'],
        correctAnswer: 1,
        explanation: 'Если значение v-bind равно null или undefined, атрибут будет удален из рендеринга.'
      },
      {
        id: 5,
        question: 'Какой синтаксис для привязки нескольких атрибутов сразу?',
        options: [':attrs="object"', 'v-bind="object"', '...object', 'bind-all="object"'],
        correctAnswer: 1,
        explanation: 'v-bind="object" без аргумента привяжет все свойства объекта как атрибуты.'
      }
    ]
  },
  'basics-dynamic': {
    title: 'Dynamic Components Quiz',
    questions: [
      {
        id: 1,
        question: 'Какой специальный тег используется для динамических компонентов?',
        options: ['<dynamic>', '<component>', '<view>', '<render>'],
        correctAnswer: 1,
        explanation: 'Тег <component> с атрибутом :is используется для рендеринга динамических компонентов.'
      },
      {
        id: 2,
        question: 'Что принимает атрибут :is?',
        options: ['Только строку с именем', 'Только объект компонента', 'Строку, объект компонента или HTML тег', 'Только путь к файлу'],
        correctAnswer: 2,
        explanation: ':is может принимать имя зарегистрированного компонента, сам объект компонента или имя HTML тега.'
      },
      {
        id: 3,
        question: 'Как сохранить состояние динамического компонента при переключении?',
        options: ['Использовать v-show', 'Обернуть в <keep-alive>', 'Использовать LocalStorage', 'Это невозможно'],
        correctAnswer: 1,
        explanation: 'Обертывание <component> в <keep-alive> позволяет кешировать экземпляры компонентов.'
      },
      {
        id: 4,
        question: 'Аналогом чего является <component> в React?',
        options: ['React.Fragment', 'Условного рендеринга или переменной с компонентом', 'Higher Order Component', 'Context'],
        correctAnswer: 1,
        explanation: 'В React это обычно реализуется через переменную (const Comp = components[type]) или условный рендеринг.'
      },
      {
        id: 5,
        question: 'Можно ли использовать v-model на динамическом компоненте?',
        options: ['Нет', 'Да', 'Только если это input', 'Только в Nuxt'],
        correctAnswer: 1,
        explanation: 'Да, v-model работает на динамических компонентах так же, как и на обычных.'
      }
    ]
  },

  // TutorialState.vue
  'state-ref': {
    title: 'ref() Quiz',
    questions: [
      {
        id: 1,
        question: 'Что принимает функция ref()?',
        options: ['Только объекты', 'Только примитивы', 'Любой тип данных', 'Только функции'],
        correctAnswer: 2,
        explanation: 'ref() может принимать любой тип данных, но чаще всего используется для примитивов (string, number, boolean).'
      },
      {
        id: 2,
        question: 'Как получить значение ref в JavaScript?',
        options: ['variable.value', 'variable.get()', 'variable()', 'Просто variable'],
        correctAnswer: 0,
        explanation: 'В JS/TS доступ к значению ref осуществляется через свойство .value.'
      },
      {
        id: 3,
        question: 'Нужно ли .value в шаблоне?',
        options: ['Да', 'Нет', 'Иногда', 'Только в циклах'],
        correctAnswer: 1,
        explanation: 'В шаблоне Vue автоматически разворачивает (unwrap) ref-ы верхнего уровня, поэтому .value не нужно.'
      },
      {
        id: 4,
        question: 'Является ли объект внутри ref() реактивным?',
        options: ['Нет', 'Да, он оборачивается в reactive()', 'Только на первом уровне', 'Зависит от настроек'],
        correctAnswer: 1,
        explanation: 'Если передать объект в ref(), Vue автоматически сделает его глубоко реактивным.'
      },
      {
        id: 5,
        question: 'Что возвращает ref()?',
        options: ['Обычное значение', 'Объект с свойством value', 'Proxy', 'Promise'],
        correctAnswer: 1,
        explanation: 'ref() возвращает реактивный объект (RefImpl) с единственным свойством .value.'
      }
    ]
  },
  'state-reactive': {
    title: 'reactive() Quiz',
    questions: [
      {
        id: 1,
        question: 'Для чего предназначен reactive()?',
        options: ['Для примитивов', 'Для объектов и массивов', 'Для функций', 'Для констант'],
        correctAnswer: 1,
        explanation: 'reactive() используется для создания реактивных объектов и массивов (ссылочных типов).'
      },
      {
        id: 2,
        question: 'Нужно ли использовать .value с reactive()?',
        options: ['Да', 'Нет', 'Только для чтения', 'Только для записи'],
        correctAnswer: 1,
        explanation: 'Нет, reactive() возвращает Proxy-объект, к свойствам которого можно обращаться напрямую.'
      },
      {
        id: 3,
        question: 'Можно ли переназначить весь reactive объект (obj = {})?',
        options: ['Да, реактивность сохранится', 'Нет, связь потеряется', 'Да, если использовать let', 'Да, если использовать const'],
        correctAnswer: 1,
        explanation: 'Переназначение переменной, содержащей reactive объект, разорвет связь с реактивностью. Нужно изменять свойства существующего объекта или использовать ref.'
      },
      {
        id: 4,
        question: 'Что произойдет, если передать примитив в reactive()?',
        options: ['Ошибка', 'Ничего, он станет реактивным', 'Vue вернет предупреждение и значение как есть', 'Он превратится в ref'],
        correctAnswer: 2,
        explanation: 'reactive() работает только с объектами. Если передать примитив, Vue выдаст предупреждение и вернет значение без реактивности.'
      },
      {
        id: 5,
        question: 'Поддерживает ли reactive() глубокую реактивность?',
        options: ['Нет, только первый уровень', 'Да, по умолчанию', 'Только если включить опцию', 'Только для массивов'],
        correctAnswer: 1,
        explanation: 'Да, reactive() создает глубокий Proxy, отслеживающий изменения на всех уровнях вложенности.'
      }
    ]
  },
  'state-ref-vs-reactive': {
    title: 'ref() vs reactive() Quiz',
    questions: [
      {
        id: 1,
        question: 'Что является аналогом useState в Vue?',
        options: ['ref()', 'reactive()', 'Оба варианта', 'Ни один'],
        correctAnswer: 2,
        explanation: 'И ref(), и reactive() используются для управления состоянием, как useState, но имеют разные области применения.'
      },
      {
        id: 2,
        question: 'Что безопаснее использовать, если вы не уверены?',
        options: ['ref()', 'reactive()', 'var', 'let'],
        correctAnswer: 0,
        explanation: 'ref() считается более универсальным и безопасным выбором, так как работает со всеми типами данных и более очевиден (.value).'
      },
      {
        id: 3,
        question: 'Какой тип данных теряет реактивность при деструктуризации?',
        options: ['ref', 'reactive', 'computed', 'store'],
        correctAnswer: 1,
        explanation: 'Объект reactive теряет связь с Proxy при деструктуризации его свойств в отдельные переменные.'
      },
      {
        id: 4,
        question: 'Как использовать reactive в формах?',
        options: ['Не рекомендуется', 'Очень удобно для группировки полей', 'Только через ref', 'Только с v-model.number'],
        correctAnswer: 1,
        explanation: 'reactive отлично подходит для форм, так как позволяет сгруппировать все поля в один объект (например, formData).'
      },
      {
        id: 5,
        question: 'Можно ли использовать ref внутри reactive?',
        options: ['Нет', 'Да, он автоматически разворачивается (unwrapped)', 'Только с .value', 'Ошибка компиляции'],
        correctAnswer: 1,
        explanation: 'Да, если ref является свойством reactive объекта, он автоматически разворачивается при доступе (кроме доступа внутри массивов и коллекций типа Map).'
      }
    ]
  },
  'state-torefs': {
    title: 'toRefs() Quiz',
    questions: [
      {
        id: 1,
        question: 'Зачем нужна функция toRefs()?',
        options: ['Превращает ref в reactive', 'Сохраняет реактивность при деструктуризации reactive объекта', 'Создает копию объекта', 'Удаляет реактивность'],
        correctAnswer: 1,
        explanation: 'toRefs() преобразует свойства reactive объекта в набор ref-ов, позволяя деструктурировать их без потери реактивности.'
      },
      {
        id: 2,
        question: 'Что возвращает toRefs(state)?',
        options: ['Массив значений', 'Обычный объект с значениями', 'Объект, где каждое свойство - это ref', 'Новый Proxy'],
        correctAnswer: 2,
        explanation: 'Она возвращает обычный объект, где каждое свойство является ref-ссылкой на соответствующее свойство исходного reactive объекта.'
      },
      {
        id: 3,
        question: 'Если изменить значение ref, полученного из toRefs, изменится ли исходный reactive объект?',
        options: ['Нет, это копия', 'Да, они связаны', 'Только если вызвать update()', 'Зависит от типа данных'],
        correctAnswer: 1,
        explanation: 'Да, созданные ref-ы сохраняют связь с исходным свойством reactive объекта. Изменение одного меняет другое.'
      },
      {
        id: 4,
        question: 'Можно ли использовать toRefs с обычным объектом?',
        options: ['Да', 'Нет, только с reactive', 'Да, но не будет эффекта', 'Будет ошибка'],
        correctAnswer: 1,
        explanation: 'toRefs ожидает реактивный объект (обычно созданный через reactive).'
      },
      {
        id: 5,
        question: 'Есть ли альтернатива для одного свойства?',
        options: ['toRef()', 'singleRef()', 'oneRef()', 'makeRef()'],
        correctAnswer: 0,
        explanation: 'Да, функция toRef(object, key) создает ref для одного конкретного свойства.'
      }
    ]
  },
  // TutorialProps.vue
  'props-definition': {
    title: 'Props Definition Quiz',
    questions: [
      {
        id: 1,
        question: 'Какую функцию использовать для объявления пропсов в TS?',
        options: ['defineProps<Props>()', 'props<Props>()', 'declareProps<Props>()', 'useProps<Props>()'],
        correctAnswer: 0,
        explanation: 'defineProps<Interface>() — стандартный способ объявления типизированных пропсов в <script setup>.'
      },
      {
        id: 2,
        question: 'Как задать значения по умолчанию для пропсов?',
        options: ['Через defaultProps', 'Используя withDefaults()', 'В интерфейсе', 'Через = в деструктуризации (Vue 3.5+)'],
        correctAnswer: 1,
        explanation: 'Традиционно используется withDefaults(defineProps(), ...). В Vue 3.5+ доступна деструктуризация с значениями по умолчанию.'
      },
      {
        id: 3,
        question: 'Нужно ли импортировать defineProps?',
        options: ['Да', 'Нет, это макрос', 'Только в Nuxt', 'Только в Vite'],
        correctAnswer: 1,
        explanation: 'defineProps — это макрос компилятора, он доступен глобально внутри <script setup> без импорта.'
      },
      {
        id: 4,
        question: 'Доступны ли пропсы в шаблоне без prefix?',
        options: ['Да, всегда', 'Нет, нужно props.propName', 'Только если вернуть их из setup', 'Только в options API'],
        correctAnswer: 1,
        explanation: 'В шаблоне пропсы доступны напрямую по имени (или через props.имя, но обычно используется имя). *Уточнение: В шаблоне можно писать {{ title }}, Vue автоматически проксирует к props.title, если нет конфликта.*'
      },
      {
        id: 5,
        question: 'Можно ли изменять пропсы внутри компонента?',
        options: ['Да', 'Нет, они readonly', 'Только примитивы', 'Только объекты'],
        correctAnswer: 1,
        explanation: 'Пропсы предназначены только для чтения (one-way data flow). Изменение пропса приведет к предупреждению Vue.'
      }
    ]
  },
  'props-macro': {
    title: 'defineProps Macro Quiz',
    questions: [
      {
        id: 1,
        question: 'Когда выполняется defineProps?',
        options: ['В runtime', 'Во время компиляции', 'При маунте', 'При обновлении'],
        correctAnswer: 1,
        explanation: 'defineProps — это макрос, который обрабатывается компилятором Vue и превращается в код options API.'
      },
      {
        id: 2,
        question: 'Влияет ли defineProps на размер бандла?',
        options: ['Да, добавляет много кода', 'Нет, он исчезает', 'Минимально (превращается в props option)', 'Зависит от количества пропсов'],
        correctAnswer: 2,
        explanation: 'Макрос исчезает, заменяясь на стандартное определение props: {} в скомпилированном компоненте.'
      },
      {
        id: 3,
        question: 'Можно ли использовать переменные, объявленные в setup, внутри defineProps generic?',
        options: ['Да', 'Нет, только импортированные типы или локальные интерфейсы', 'Только константы', 'Только let'],
        correctAnswer: 1,
        explanation: 'Generic аргумент defineProps должен быть ссылкой на тип или литералом типа. Он не может ссылаться на локальные переменные, так как выполняется в compile-time.'
      },
      {
        id: 4,
        question: 'Есть ли defineProps в браузере?',
        options: ['Да', 'Нет', 'Только в dev mode', 'В виде полифила'],
        correctAnswer: 1,
        explanation: 'Нет, это синтаксическая конструкция для компилятора, в браузере этой функции не существует.'
      },
      {
        id: 5,
        question: 'Что возвращает defineProps?',
        options: ['Объект с пропсами (readonly)', 'Массив пропсов', 'Функцию обновления', 'Proxy'],
        correctAnswer: 0,
        explanation: 'Он возвращает реактивный (но readonly) объект, содержащий все переданные пропсы.'
      }
    ]
  },
  'props-runtime': {
    title: 'Props Runtime Quiz',
    questions: [
      {
        id: 1,
        question: 'Как Vue проверяет типы пропсов в runtime?',
        options: ['Не проверяет', 'Использует TypeScript', 'Через конструкторы типов (String, Number)', 'Через PropTypes'],
        correctAnswer: 2,
        explanation: 'Vue конвертирует TS типы в runtime-проверки, используя конструкторы: type: String, type: Number и т.д.'
      },
      {
        id: 2,
        question: 'Что произойдет, если передать неправильный тип пропса?',
        options: ['Приложение упадет', 'Предупреждение в консоли (в dev mode)', 'Ничего', 'Автоматическое приведение типа'],
        correctAnswer: 1,
        explanation: 'В режиме разработки Vue выведет предупреждение в консоль о несоответствии типа.'
      },
      {
        id: 3,
        question: 'Как определить обязательный пропс?',
        options: ['required: true', 'В TS: ! (non-null)', 'В TS: без ?', 'Все варианты верны'],
        correctAnswer: 3,
        explanation: 'В TS интерфейсе отсутствие `?` делает пропс обязательным. Компилятор превращает это в `required: true`.'
      },
      {
        id: 4,
        question: 'Что такое validator в пропсах?',
        options: ['Функция для кастомной валидации значения', 'Библиотека валидации', 'Плагин Vue', 'Тип данных'],
        correctAnswer: 0,
        explanation: 'Можно передать функцию validator, которая вернет true/false для проверки значения пропса.'
      },
      {
        id: 5,
        question: 'Можно ли передать функцию через пропс?',
        options: ['Нет', 'Да', 'Только события', 'Только стрелочные функции'],
        correctAnswer: 1,
        explanation: 'Да, функции (например, коллбэки) можно передавать как пропсы, хотя в Vue идиоматичнее использовать события (emits).'
      }
    ]
  },
  'events-emit': {
    title: 'Events (Child → Parent) Quiz',
    questions: [
      {
        id: 1,
        question: 'Как дочерний компонент сообщает родителю о событии?',
        options: ['Через props.onChange()', 'Через emit("event")', 'Через dispatch()', 'Через store'],
        correctAnswer: 1,
        explanation: 'Vue использует систему событий: emit("name", payload) отправляет событие родителю.'
      },
      {
        id: 2,
        question: 'Как родитель слушает событие ребенка?',
        options: ['onEvent={handler}', '@event="handler"', 'v-on="event: handler"', 'listen:event="handler"'],
        correctAnswer: 1,
        explanation: 'Используется директива v-on (сокращенно @): @submit="handleSubmit".'
      },
      {
        id: 3,
        question: 'Как получить доступ к emit в <script setup>?',
        options: ['Через this.$emit', 'Через defineEmits()', 'Через useContext()', 'Через props'],
        correctAnswer: 1,
        explanation: 'const emit = defineEmits() возвращает функцию для отправки событий.'
      },
      {
        id: 4,
        question: 'Можно ли передавать аргументы в событии?',
        options: ['Нет', 'Да, один', 'Да, сколько угодно', 'Только объект'],
        correctAnswer: 2,
        explanation: 'emit("event", arg1, arg2, ...) поддерживает любое количество аргументов.'
      },
      {
        id: 5,
        question: 'Отличается ли это от React?',
        options: ['Нет', 'В React передают callback-функции в пропсы', 'В React используют Redux', 'В React события всплывают автоматически'],
        correctAnswer: 1,
        explanation: 'В React обычно передают функции (onUpdate) как пропсы. В Vue события — это отдельный механизм (хотя передача функций-пропсов тоже возможна).'
      }
    ]
  },
  'events-macro': {
    title: 'defineEmits Macro Quiz',
    questions: [
      {
        id: 1,
        question: 'Что принимает defineEmits в TypeScript?',
        options: ['Массив строк', 'Объект валидаторов', 'Generic тип с сигнатурами', 'Ничего'],
        correctAnswer: 2,
        explanation: 'В TS defineEmits принимает generic тип, описывающий события и их аргументы: defineEmits<{ (e: "change", id: number): void }>() или кортежи.'
      },
      {
        id: 2,
        question: 'Нужно ли импортировать defineEmits?',
        options: ['Да', 'Нет, это макрос', 'Только в main.ts', 'Только для JS'],
        correctAnswer: 1,
        explanation: 'Как и defineProps, defineEmits доступен глобально в <script setup>.'
      },
      {
        id: 3,
        question: 'Что возвращает defineEmits?',
        options: ['Объект событий', 'Функцию emit', 'Promise', 'Массив слушателей'],
        correctAnswer: 1,
        explanation: 'Возвращает функцию emit, которую можно вызывать в коде: emit("my-event").'
      },
      {
        id: 4,
        question: 'Можно ли использовать defineEmits внутри функций?',
        options: ['Да', 'Нет, только на верхнем уровне setup', 'Только в хуках', 'Только в if'],
        correctAnswer: 1,
        explanation: 'Макросы компилятора должны использоваться только на верхнем уровне <script setup>.'
      },
      {
        id: 5,
        question: 'Как объявить события без TS (в JS)?',
        options: ['defineEmits(["event1", "event2"])', 'defineEmits({ event1: null })', 'Оба варианта', 'Нельзя'],
        correctAnswer: 2,
        explanation: 'Можно передать массив строк с именами событий или объект (для валидации).'
      }
    ]
  },
  'events-runtime': {
    title: 'Events Runtime Quiz',
    questions: [
      {
        id: 1,
        question: 'Как работает defineEmits под капотом?',
        options: ['Компилируется в опцию emits', 'Использует EventBus', 'Использует window.dispatchEvent', 'Создает RxJS поток'],
        correctAnswer: 0,
        explanation: 'Макрос компилируется в опцию emits: ["event1", ...] компонента Vue.'
      },
      {
        id: 2,
        question: 'Доступен ли emit в шаблоне?',
        options: ['Нет', 'Да, как $emit', 'Да, как emit', 'Только через метод'],
        correctAnswer: 1,
        explanation: 'В шаблоне доступна встроенная функция $emit("event").'
      },
      {
        id: 3,
        question: 'Всплывают ли события Vue (bubbling) как DOM события?',
        options: ['Да', 'Нет', 'Только click', 'Если добавить .bubble'],
        correctAnswer: 1,
        explanation: 'Кастомные события Vue НЕ всплывают по дереву компонентов. Родитель должен слушать их напрямую.'
      },
      {
        id: 4,
        question: 'Где находится emit в Options API?',
        options: ['this.emit', 'this.$emit', 'context.emit', 'props.emit'],
        correctAnswer: 1,
        explanation: 'В Options API используется this.$emit().'
      },
      {
        id: 5,
        question: 'Что если родитель не слушает событие?',
        options: ['Ошибка', 'Ничего не произойдет', 'Событие пойдет выше', 'Компонент зависнет'],
        correctAnswer: 1,
        explanation: 'Ничего страшного, событие просто "уйдет в пустоту".'
      }
    ]
  },
  'vmodel-binding': {
    title: 'v-model Basics Quiz',
    questions: [
      {
        id: 1,
        question: 'Что такое v-model?',
        options: ['Одностороннее связывание', 'Двустороннее связывание (Two-way binding)', 'Событие клика', 'Функция валидации'],
        correctAnswer: 1,
        explanation: 'v-model создает двустороннюю связь между состоянием и элементом формы (input, textarea и т.д.).'
      },
      {
        id: 2,
        question: 'Во что разворачивается v-model="text" на input?',
        options: [':value="text" @input="text = $event"', ':model="text"', 'v-bind:value="text"', 'onChange={setText}'],
        correctAnswer: 0,
        explanation: 'Это синтаксический сахар для привязки значения (:value) и слушателя обновления (@input).'
      },
      {
        id: 3,
        question: 'С какими элементами работает v-model?',
        options: ['Только input', 'input, textarea, select', 'div, span', 'Только кастомные компоненты'],
        correctAnswer: 1,
        explanation: 'v-model работает с элементами форм: input, textarea, select.'
      },
      {
        id: 4,
        question: 'Нужно ли писать функцию-обработчик для v-model?',
        options: ['Да, всегда', 'Нет, Vue обновляет переменную автоматически', 'Только для сложных форм', 'Только в React'],
        correctAnswer: 1,
        explanation: 'В этом и суть: Vue обновляет переменную автоматически при вводе, писать onChange не нужно.'
      },
      {
        id: 5,
        question: 'Можно ли использовать v-model на кастомном компоненте?',
        options: ['Нет', 'Да', 'Только в Vue 2', 'Только с плагинами'],
        correctAnswer: 1,
        explanation: 'Да, компонент должен принимать modelValue prop и эмитить update:modelValue event.'
      }
    ]
  },
  'vmodel-controls': {
    title: 'v-model Controls Quiz',
    questions: [
      {
        id: 1,
        question: 'Что связывает v-model на checkbox?',
        options: ['value', 'checked (boolean)', 'id', 'name'],
        correctAnswer: 1,
        explanation: 'Для checkbox v-model работает со свойством checked и использует событие change.'
      },
      {
        id: 2,
        question: 'Что связывает v-model на select?',
        options: ['selectedIndex', 'value выбранной option', 'innerHTML', 'text content'],
        correctAnswer: 1,
        explanation: 'v-model на select привязывается к value выбранной опции.'
      },
      {
        id: 3,
        question: 'Что связывает v-model на radio?',
        options: ['checked', 'value группы', 'boolean', 'index'],
        correctAnswer: 1,
        explanation: 'v-model на radio кнопках привязывается к value той кнопки, которая выбрана.'
      },
      {
        id: 4,
        question: 'Что делает textarea с v-model?',
        options: ['Ничего', 'Связывает содержимое как строку', 'Связывает HTML', 'Разбивает на массив строк'],
        correctAnswer: 1,
        explanation: 'Работает так же, как input type="text", связывая содержимое текстового поля.'
      },
      {
        id: 5,
        question: 'Нужно ли manually обрабатывать @change для checkbox?',
        options: ['Да', 'Нет, v-model это делает', 'Только для массивов', 'Если нужен preventDefault'],
        correctAnswer: 1,
        explanation: 'v-model автоматически слушает change и обновляет boolean переменную.'
      }
    ]
  },
  'vmodel-modifiers': {
    title: 'v-model Modifiers Quiz',
    questions: [
      {
        id: 1,
        question: 'Что делает модификатор .trim?',
        options: ['Обрезает строку до 10 символов', 'Удаляет пробелы в начале и конце', 'Удаляет все пробелы', 'Приводит к нижнему регистру'],
        correctAnswer: 1,
        explanation: '.trim автоматически вызывает .trim() на введенной строке.'
      },
      {
        id: 2,
        question: 'Что делает модификатор .number?',
        options: ['Запрещает ввод букв', 'Преобразует ввод в число (через parseFloat)', 'Валидирует номер телефона', 'Форматирует с запятыми'],
        correctAnswer: 1,
        explanation: '.number пытается преобразовать ввод в число. Если это невозможно, возвращает строку.'
      },
      {
        id: 3,
        question: 'Что делает модификатор .lazy?',
        options: ['Ленивая загрузка компонента', 'Обновляет данные при событии change (blur), а не input', 'Задержка 500мс', 'Асинхронное обновление'],
        correctAnswer: 1,
        explanation: 'По умолчанию v-model обновляет данные на каждый ввод (input). .lazy переключает это на событие change (потеря фокуса или Enter).'
      },
      {
        id: 4,
        question: 'Можно ли комбинировать модификаторы?',
        options: ['Нет', 'Да, например v-model.trim.number', 'Только два максимум', 'Только с разными типами input'],
        correctAnswer: 1,
        explanation: 'Да, модификаторы можно объединять в цепочку.'
      },
      {
        id: 5,
        question: 'Где обрабатываются модификаторы?',
        options: ['В браузере', 'Vue генерирует код обработки при компиляции шаблона', 'На сервере', 'В CSS'],
        correctAnswer: 1,
        explanation: 'Vue компилятор преобразует модификаторы в соответствующий JS код обработки событий.'
      }
    ]
  },
  'vmodel-complex': {
    title: 'Complex v-model Quiz',
    questions: [
      {
        id: 1,
        question: 'Можно ли привязать v-model к свойству вложенного объекта?',
        options: ['Нет', 'Да, v-model="user.profile.name"', 'Только через computed', 'Только в Vuex'],
        correctAnswer: 1,
        explanation: 'Да, v-model поддерживает пути к свойствам любой глубины, если объект реактивен.'
      },
      {
        id: 2,
        question: 'Нужно ли инициализировать объект перед использованием?',
        options: ['Нет, Vue создаст его', 'Да, объект должен существовать', 'Только для TypeScript', 'Нет, если использовать ?.'],
        correctAnswer: 1,
        explanation: 'Если user.profile undefined, то попытка доступа user.profile.name вызовет ошибку JS. Структура должна быть инициализирована.'
      },
      {
        id: 3,
        question: 'Как это влияет на реактивность?',
        options: ['Никак, всё работает', 'Вложенные свойства не реактивны', 'Нужен deep: true', 'Работает только с ref'],
        correctAnswer: 0,
        explanation: 'Благодаря глубокой реактивности (reactive/ref), изменения глубоко вложенных свойств отслеживаются корректно.'
      },
      {
        id: 4,
        question: 'Можно ли использовать v-model с JSON структурой?',
        options: ['Да, легко редактировать части JSON', 'Нет', 'Только строки', 'Только числа'],
        correctAnswer: 0,
        explanation: 'Это частый кейс: редактирование сложного объекта конфигурации или профиля через форму.'
      },
      {
        id: 5,
        question: 'Что если свойство не существует в объекте?',
        options: ['Оно добавится реактивно (Vue 3 Proxy)', 'Ошибка', 'Ничего не произойдет', 'Нужно использовать Vue.set'],
        correctAnswer: 0,
        explanation: 'В Vue 3 (Proxy) добавление новых свойств в реактивный объект работает автоматически.'
      }
    ]
  },
  'vmodel-arrays': {
    title: 'v-model Arrays Quiz',
    questions: [
      {
        id: 1,
        question: 'Как привязать checkbox к массиву?',
        options: ['Нельзя', 'v-model="array" - добавляет/удаляет value при клике', 'Нужен computed', 'Через push/splice'],
        correctAnswer: 1,
        explanation: 'Если несколько чекбоксов имеют один v-model, указывающий на массив, Vue будет добавлять/удалять value чекбокса из этого массива.'
      },
      {
        id: 2,
        question: 'Как редактировать элемент массива в v-for?',
        options: ['v-model="item"', 'v-model="array[index]"', 'v-model="item.value"', 'Оба варианта 2 и 3'],
        correctAnswer: 3,
        explanation: 'Можно привязаться к свойству объекта (item.text) или к элементу массива по индексу (array[index]).'
      },
      {
        id: 3,
        question: 'Можно ли использовать v-model для Select с multiple?',
        options: ['Нет', 'Да, v-model будет массивом', 'Только через плагин', 'Будет строкой через запятую'],
        correctAnswer: 1,
        explanation: 'Для <select multiple> v-model ожидает и обновляет массив выбранных значений.'
      },
      {
        id: 4,
        question: 'Безопасно ли мутировать массив через v-model?',
        options: ['Нет', 'Да, Vue 3 отслеживает мутации массивов', 'Только методы push/pop', 'Только замена всего массива'],
        correctAnswer: 1,
        explanation: 'Vue 3 перехватывает методы массивов и отслеживает изменения индексов, так что это безопасно.'
      },
      {
        id: 5,
        question: 'Как добавить новый элемент в список через инпут?',
        options: ['v-model="list"', 'Отдельный v-model="newItem" и кнопка Add', 'v-model="list.push"', 'Автоматически'],
        correctAnswer: 1,
        explanation: 'Обычно создают отдельную переменную для нового элемента и по событию (Enter/Click) пушат её значение в основной массив.'
      }
    ]
  },

  // TutorialComputed.vue
  'computed-vs-memo': {
    title: 'computed() Quiz',
    questions: [
      {
        id: 1,
        question: 'Что такое computed свойство?',
        options: ['Функция, которая запускается один раз', 'Реактивное значение, которое кешируется', 'Обычный метод', 'Watcher'],
        correctAnswer: 1,
        explanation: 'computed() создает значение, которое пересчитывается только при изменении его реактивных зависимостей и кешируется.'
      },
      {
        id: 2,
        question: 'Нужно ли указывать массив зависимостей для computed?',
        options: ['Да, как в useMemo', 'Нет, Vue определяет их автоматически', 'Только для сложных вычислений', 'Только в Options API'],
        correctAnswer: 1,
        explanation: 'Vue автоматически отслеживает, какие реактивные переменные были использованы внутри computed функции.'
      },
      {
        id: 3,
        question: 'Можно ли изменять значение computed свойства вручную?',
        options: ['Да', 'Нет, по умолчанию оно readonly', 'Только если есть setter', 'Да, через .value'],
        correctAnswer: 1,
        explanation: 'По умолчанию computed свойства доступны только для чтения. Для записи нужно передать объект с get и set.'
      },
      {
        id: 4,
        question: 'Когда пересчитывается computed?',
        options: ['При каждом рендере', 'Каждую секунду', 'Только когда меняются зависимости', 'При клике'],
        correctAnswer: 2,
        explanation: 'Это главное преимущество: ленивый пересчет только при необходимости.'
      },
      {
        id: 5,
        question: 'Чем computed отличается от methods?',
        options: ['Ничем', 'Computed кешируются, методы нет', 'Методы быстрее', 'Computed асинхронны'],
        correctAnswer: 1,
        explanation: 'Методы запускаются каждый раз при вызове (или рендере), а computed возвращает закешированное значение.'
      }
    ]
  },
  'watch-vs-effect': {
    title: 'watch() Quiz',
    questions: [
      {
        id: 1,
        question: 'Для чего используется watch?',
        options: ['Для вычислений', 'Для побочных эффектов (side effects)', 'Для рендеринга', 'Для создания переменных'],
        correctAnswer: 1,
        explanation: 'watch используется для выполнения действий (API запросы, таймеры, DOM манипуляции) в ответ на изменение данных.'
      },
      {
        id: 2,
        question: 'Чем watch отличается от watchEffect?',
        options: ['Ничем', 'watch требует явного указания источника', 'watch работает быстрее', 'watchEffect не реактивен'],
        correctAnswer: 1,
        explanation: 'В watch нужно явно передать переменную или геттер, за которыми нужно следить. watchEffect определяет зависимости автоматически.'
      },
      {
        id: 3,
        question: 'Предоставляет ли watch доступ к старому значению?',
        options: ['Да (new, old)', 'Нет', 'Только для примитивов', 'Только в dev режиме'],
        correctAnswer: 0,
        explanation: 'Callback функция watch получает два аргумента: новое значение и старое значение.'
      },
      {
        id: 4,
        question: 'Запускается ли watch сразу (при маунте)?',
        options: ['Да', 'Нет (лениво)', 'Только если immediate: true', 'Зависит от фазы луны'],
        correctAnswer: 2,
        explanation: 'По умолчанию watch ленив — он ждет первого изменения. Опция { immediate: true } заставляет его сработать сразу.'
      },
      {
        id: 5,
        question: 'Можно ли следить за несколькими источниками?',
        options: ['Нет', 'Да, передав массив', 'Только создав несколько watch', 'Только через computed'],
        correctAnswer: 1,
        explanation: 'Да, watch может принимать массив источников: watch([ref1, ref2], ([new1, new2]) => ...).'
      }
    ]
  },
  'watch-vs-watcheffect-details': {
    title: 'watchEffect() Quiz',
    questions: [
      {
        id: 1,
        question: 'Когда запускается watchEffect?',
        options: ['Только при изменении', 'Сразу (immediate) и при изменениях', 'Только при маунте', 'Никогда'],
        correctAnswer: 1,
        explanation: 'watchEffect запускается немедленно для сбора зависимостей, и затем перезапускается при их изменении.'
      },
      {
        id: 2,
        question: 'Как остановить watch/watchEffect?',
        options: ['Нельзя', 'Вызвать функцию, которую он возвращает', 'stopWatch()', 'destroy()'],
        correctAnswer: 1,
        explanation: 'Функции watch возвращают handle (функцию), вызов которой останавливает наблюдение.'
      },
      {
        id: 3,
        question: 'Что такое onCleanup?',
        options: ['Функция очистки памяти', 'Callback для очистки побочных эффектов перед следующим запуском', 'Событие удаления', 'Метод компонента'],
        correctAnswer: 1,
        explanation: 'onCleanup позволяет зарегистрировать логику отмены (например, abort fetch или clearTimeout), которая сработает перед следующим вызовом эффекта.'
      },
      {
        id: 4,
        question: 'Нужно ли вручную чистить watch внутри компонента?',
        options: ['Да, в onUnmounted', 'Нет, Vue делает это автоматически при размонтировании', 'Только для watchEffect', 'Только в SSR'],
        correctAnswer: 1,
        explanation: 'Watchers, созданные внутри setup(), автоматически привязываются к инстансу компонента и останавливаются при его уничтожении.'
      },
      {
        id: 5,
        question: 'Что такое watchPostEffect?',
        options: ['Запускается после рендера DOM', 'Запускается перед рендером', 'Запускается на сервере', 'Отложенный watch'],
        correctAnswer: 0,
        explanation: 'watchPostEffect (или flush: "post") гарантирует, что эффект выполнится после обновления DOM, что полезно для работы с элементами.'
      }
    ]
  },

  // TutorialLifecycle.vue
  'lifecycle-basics': {
    title: 'Lifecycle Basics Quiz',
    questions: [
      {
        id: 1,
        question: 'Какой хук является аналогом componentDidMount?',
        options: ['onCreated', 'onMounted', 'onSetup', 'onReady'],
        correctAnswer: 1,
        explanation: 'onMounted вызывается после того, как компонент был смонтирован в DOM.'
      },
      {
        id: 2,
        question: 'Где писать код, который должен выполниться до маунта (аналог constructor)?',
        options: ['onBeforeMount', 'Прямо в теле <script setup>', 'onCreated', 'onInit'],
        correctAnswer: 1,
        explanation: 'Код внутри <script setup> выполняется при создании экземпляра компонента (аналог created/constructor).'
      },
      {
        id: 3,
        question: 'Какой хук используется для очистки (аналог componentWillUnmount)?',
        options: ['onDelete', 'onDestroyed', 'onUnmounted', 'onCleanup'],
        correctAnswer: 2,
        explanation: 'onUnmounted вызывается перед уничтожением компонента. Здесь нужно очищать таймеры и слушатели событий.'
      },
      {
        id: 4,
        question: 'Вызывается ли onMounted на сервере (SSR)?',
        options: ['Да', 'Нет', 'Только в Nuxt', 'Зависит от настроек'],
        correctAnswer: 1,
        explanation: 'Нет, хуки монтирования (onMounted, onUnmounted) вызываются только в браузере, так как на сервере нет DOM.'
      },
      {
        id: 5,
        question: 'Можно ли использовать несколько onMounted в одном компоненте?',
        options: ['Нет, будет ошибка', 'Да, они выполнятся по очереди', 'Перезапишется только последний', 'Только в разных файлах'],
        correctAnswer: 1,
        explanation: 'Да, Composition API позволяет вызывать хуки многократно, что удобно для разделения логики.'
      }
    ]
  },
  'lifecycle-all': {
    title: 'Advanced Lifecycle Quiz',
    questions: [
      {
        id: 1,
        question: 'Какой хук срабатывает при обновлении DOM?',
        options: ['onUpdate', 'onUpdated', 'onRender', 'onChange'],
        correctAnswer: 1,
        explanation: 'onUpdated вызывается после того, как компонент обновил свое DOM-дерево в ответ на изменение состояния.'
      },
      {
        id: 2,
        question: 'Что такое onActivated?',
        options: ['Когда компонент становится активным (keep-alive)', 'При клике', 'При фокусе', 'При наведении'],
        correctAnswer: 0,
        explanation: 'onActivated вызывается, когда компонент внутри <keep-alive> становится видимым (восстанавливается из кеша).'
      },
      {
        id: 3,
        question: 'Какой хук перехватывает ошибки в дочерних компонентах?',
        options: ['onError', 'onCatch', 'onErrorCaptured', 'onFail'],
        correctAnswer: 2,
        explanation: 'onErrorCaptured работает как Error Boundary в React, перехватывая ошибки от потомков.'
      },
      {
        id: 4,
        question: 'Когда срабатывает onBeforeUnmount?',
        options: ['После удаления из DOM', 'Перед удалением из DOM', 'При закрытии вкладки', 'При ошибке'],
        correctAnswer: 1,
        explanation: 'onBeforeUnmount вызывается прямо перед размонтированием компонента. Экземпляр еще полностью функционален.'
      },
      {
        id: 5,
        question: 'Существует ли хук onRenderTracked?',
        options: ['Нет', 'Да, для отладки', 'Только в Vue 2', 'Это плагин'],
        correctAnswer: 1,
        explanation: 'Да, onRenderTracked и onRenderTriggered — это хуки отладки, которые показывают, какие зависимости вызвали перерисовку.'
      }
    ]
  },

  // TutorialRouting.vue
  'routing-file-based': {
    title: 'File-based Routing Quiz',
    questions: [
      {
        id: 1,
        question: 'Где должны лежать страницы в Nuxt?',
        options: ['src/views', 'app/routes', 'pages/', 'components/pages'],
        correctAnswer: 2,
        explanation: 'Nuxt использует директорию pages/ для автоматической генерации маршрутов на основе файловой структуры.'
      },
      {
        id: 2,
        question: 'Какой файл соответствует корню сайта (/?',
        options: ['main.vue', 'index.vue', 'root.vue', 'home.vue'],
        correctAnswer: 1,
        explanation: 'pages/index.vue соответствует корневому маршруту /.'
      },
      {
        id: 3,
        question: 'Как создать динамический маршрут для /users/:id?',
        options: ['users/:id.vue', 'users/[id].vue', 'users/{id}.vue', 'users/_id.vue'],
        correctAnswer: 1,
        explanation: 'В Nuxt 3 используются квадратные скобки: pages/users/[id].vue.'
      },
      {
        id: 4,
        question: 'Что такое catch-all маршрут?',
        options: ['[...slug].vue', '404.vue', 'error.vue', '*'],
        correctAnswer: 0,
        explanation: '[...slug].vue (с тремя точками) перехватывает все вложенные пути, например /a/b/c.'
      },
      {
        id: 5,
        question: 'Нужно ли настраивать router.js вручную?',
        options: ['Да, всегда', 'Нет, Nuxt делает это сам', 'Только для middleware', 'Только для SSR'],
        correctAnswer: 1,
        explanation: 'Nuxt автоматически создает конфигурацию vue-router на основе файлов в pages/.'
      }
    ]
  },
  'routing-navigation': {
    title: 'Navigation Quiz',
    questions: [
      {
        id: 1,
        question: 'Какой компонент используется для ссылок?',
        options: ['<Link>', '<a>', '<NuxtLink>', '<RouterLink>'],
        correctAnswer: 2,
        explanation: '<NuxtLink> — это оптимизированный компонент (замена <a>), который поддерживает SPA переходы и префетчинг.'
      },
      {
        id: 2,
        question: 'Какой атрибут используется для указания пути?',
        options: ['href', 'to', 'src', 'path'],
        correctAnswer: 1,
        explanation: 'Используется атрибут to="/path".'
      },
      {
        id: 3,
        question: 'Как перейти на страницу программно?',
        options: ['window.location', 'useRouter().push()', 'navigateTo()', 'Оба варианта 2 и 3'],
        correctAnswer: 3,
        explanation: 'Можно использовать useRouter().push() (из vue-router) или утилиту navigateTo() (из Nuxt).'
      },
      {
        id: 4,
        question: 'Что делает <NuxtLink> с префетчингом?',
        options: ['Ничего', 'Загружает код и данные страницы, когда ссылка в viewport', 'Загружает все страницы сразу', 'Только при наведении'],
        correctAnswer: 1,
        explanation: 'По умолчанию NuxtLink загружает js-чанк и payload данных для страницы, когда ссылка попадает в видимую область экрана.'
      },
      {
        id: 5,
        question: 'В чем разница между push и replace?',
        options: ['Нет разницы', 'push добавляет запись в историю, replace заменяет текущую', 'replace быстрее', 'push только для стека'],
        correctAnswer: 1,
        explanation: 'push сохраняет возможность нажать "Назад", replace перезаписывает текущую запись истории.'
      }
    ]
  },
  'routing-params': {
    title: 'Route Parameters Quiz',
    questions: [
      {
        id: 1,
        question: 'Как получить доступ к параметрам URL?',
        options: ['useParams()', 'useRoute().params', 'props.params', 'context.params'],
        correctAnswer: 1,
        explanation: 'composable useRoute() возвращает объект текущего маршрута, содержащий .params.'
      },
      {
        id: 2,
        question: 'Реактивен ли объект route?',
        options: ['Нет, это просто объект', 'Да, это reactive объект', 'Только route.path', 'Только в computed'],
        correctAnswer: 1,
        explanation: 'Да, объект, возвращаемый useRoute(), является реактивным. Изменения URL обновляют его свойства.'
      },
      {
        id: 3,
        question: 'Что произойдет, если деструктурировать const { id } = useRoute().params?',
        options: ['Ничего, всё работает', 'Потеряется реактивность при смене id', 'Будет ошибка', 'id станет ref'],
        correctAnswer: 1,
        explanation: 'Так как route.params — это свойство реактивного объекта, прямая деструктуризация создаст обычную переменную, которая не обновится при смене маршрута.'
      },
      {
        id: 4,
        question: 'Как правильно использовать параметр в computed?',
        options: ['computed(() => route.params.id)', 'computed(() => id)', 'route.params.id', 'watch(id)'],
        correctAnswer: 0,
        explanation: 'Нужно обращаться к свойству route внутри функции computed, чтобы сохранить реактивную зависимость.'
      },
      {
        id: 5,
        question: 'Как получить query параметры (?q=search)?',
        options: ['route.params', 'route.query', 'route.search', 'useSearchParams()'],
        correctAnswer: 1,
        explanation: 'GET-параметры доступны через route.query.'
      }
    ]
  },
  'routing-layouts': {
    title: 'Layouts Quiz',
    questions: [
      {
        id: 1,
        question: 'Где хранятся layout компоненты?',
        options: ['components/', 'layouts/', 'views/', 'templates/'],
        correctAnswer: 1,
        explanation: 'В директории layouts/.'
      },
      {
        id: 2,
        question: 'Какой компонент используется для вывода контента страницы внутри layout?',
        options: ['<RouterView>', '<slot />', '<children>', '<Content>'],
        correctAnswer: 1,
        explanation: 'Layout — это обертка, поэтому он использует <slot /> для отображения содержимого страницы.'
      },
      {
        id: 3,
        question: 'Как применить кастомный layout к странице?',
        options: ['В nuxt.config', 'definePageMeta({ layout: "custom" })', '<NuxtLayout name="custom">', 'Автоматически по имени'],
        correctAnswer: 1,
        explanation: 'Макрос definePageMeta позволяет задать метаданные страницы, включая layout.'
      },
      {
        id: 4,
        question: 'Какой layout используется по умолчанию?',
        options: ['main.vue', 'index.vue', 'default.vue', 'app.vue'],
        correctAnswer: 2,
        explanation: 'Если layout не указан, Nuxt ищет layouts/default.vue.'
      },
      {
        id: 5,
        question: 'Перемонтируется ли layout при смене страниц?',
        options: ['Да, всегда', 'Нет, он остается неизменным (persisted)', 'Только хедер', 'Зависит от браузера'],
        correctAnswer: 1,
        explanation: 'Layout не размонтируется при навигации между страницами, использующими тот же layout. Это позволяет сохранять состояние (например, скролл в сайдбаре).'
      }
    ]
  },
  'routing-nested': {
    title: 'Nested Routes Quiz',
    questions: [
      {
        id: 1,
        question: 'Как создать вложенные маршруты (nested routes)?',
        options: ['Создать папку с тем же именем, что и файл родителя', 'Использовать children: [] в конфиге', 'Невозможно в file-based routing', 'Через definePageMeta'],
        correctAnswer: 0,
        explanation: 'Если есть pages/blog.vue и папка pages/blog/..., то blog.vue становится родительским компонентом для файлов внутри папки.'
      },
      {
        id: 2,
        question: 'Что должен содержать родительский компонент?',
        options: ['<slot>', '<NuxtPage />', '<Child>', 'Ничего'],
        correctAnswer: 1,
        explanation: 'Родительский компонент (например, blog.vue) должен содержать <NuxtPage /> (или <RouterView>), чтобы отрендерить вложенный маршрут.'
      },
      {
        id: 3,
        question: 'Сохраняется ли состояние родителя при навигации по детям?',
        options: ['Нет', 'Да', 'Только если использовать keep-alive', 'Только в SSR'],
        correctAnswer: 1,
        explanation: 'Да, родительский компонент не размонтируется, пока мы перемещаемся между его дочерними маршрутами.'
      },
      {
        id: 4,
        question: 'Какой файл соответствует корню вложенного маршрута?',
        options: ['index.vue внутри папки', 'main.vue', 'default.vue', 'parent.vue'],
        correctAnswer: 0,
        explanation: 'pages/blog/index.vue будет отрендерен внутри pages/blog.vue по адресу /blog.'
      },
      {
        id: 5,
        question: 'Где это полезно?',
        options: ['Табы, сайдбары, сложные дашборды', 'Простые лендинги', 'Модальные окна', 'Футер'],
        correctAnswer: 0,
        explanation: 'Вложенные маршруты идеальны для UI с постоянными частями (меню раздела) и меняющимся контентом.'
      }
    ]
  },
  'routing-templates': {
    title: 'Templates vs Layouts Quiz',
    questions: [
      {
        id: 1,
        question: 'В чем различие между app.vue (layout) и template?',
        options: ['Нет различий', 'Layout сохраняется, Template пересоздается', 'Template сохраняется, Layout пересоздается', 'Template только для email'],
        correctAnswer: 1,
        explanation: 'В концепции Next.js (и аналоге в Nuxt через key) Layout персистентный, а Template создает новый инстанс при каждой навигации.'
      },
      {
        id: 2,
        question: 'Как заставить страницу перезагрузиться полностью при смене параметра?',
        options: ['window.reload()', 'Использовать :key на <NuxtPage>', 'Использовать v-if', 'Нельзя'],
        correctAnswer: 1,
        explanation: 'Установка атрибута :key (например, :key="route.fullPath") на <NuxtPage> заставит Vue уничтожить и пересоздать компонент страницы.'
      },
      {
        id: 3,
        question: 'Для чего это нужно?',
        options: ['Для анимаций перехода', 'Для сброса скролла', 'Для полного сброса состояния', 'Все вышеперечисленное'],
        correctAnswer: 3,
        explanation: 'Это полезно для транзиций, и когда вы хотите гарантировать "чистое" состояние при переходе между похожими страницами.'
      },
      {
        id: 4,
        question: 'Как настроить транзиции между страницами?',
        options: ['CSS файлом', 'definePageMeta({ pageTransition: ... })', 'В <script>', 'Через JS анимации'],
        correctAnswer: 1,
        explanation: 'В Nuxt транзиции настраиваются через definePageMeta или глобально в nuxt.config.'
      },
      {
        id: 5,
        question: 'Какой компонент оборачивает страницы для транзиций?',
        options: ['<Transition>', '<Animation>', '<Motion>', '<Move>'],
        correctAnswer: 0,
        explanation: 'Nuxt автоматически использует встроенный компонент Vue <Transition> вокруг страниц.'
      }
    ]
  },

  // TutorialDataFetching.vue
  'data-overview': {
    title: 'Data Fetching Basics Quiz',
    questions: [
      {
        id: 1,
        question: 'Какой самый простой способ получить данные в Nuxt?',
        options: ['fetch()', 'axios', 'useFetch()', 'ajax'],
        correctAnswer: 2,
        explanation: 'useFetch() — это универсальный и наиболее удобный composable для получения данных в Nuxt.'
      },
      {
        id: 2,
        question: 'Что делает useFetch автоматически?',
        options: ['Только запрос', 'Кеширование, дедупликацию, SSR-поддержку', 'Валидацию', 'Авторизацию'],
        correctAnswer: 1,
        explanation: 'useFetch предотвращает дублирование запросов (hydratiom mismatch) и эффективно работает на сервере и клиенте.'
      },
      {
        id: 3,
        question: 'Что возвращает useFetch?',
        options: ['Promise с данными', 'Объект { data, pending, error, refresh }', 'Только данные', 'Коллбэк'],
        correctAnswer: 1,
        explanation: 'Он возвращает реактивные объекты состояния: data (результат), pending (загрузка), error (ошибка) и функцию refresh.'
      },
      {
        id: 4,
        question: 'Работает ли useFetch на сервере?',
        options: ['Да, при SSR', 'Нет, только в браузере', 'Только если настроить', 'Только для API'],
        correctAnswer: 0,
        explanation: 'Да, при серверном рендеринге useFetch выполняет запрос на сервере и передает данные клиенту.'
      },
      {
        id: 5,
        question: 'Как перезапросить данные?',
        options: ['window.reload()', 'Вызвать refresh()', 'Снова вызвать useFetch', 'Изменить URL'],
        correctAnswer: 1,
        explanation: 'Функция refresh() (или execute) позволяет повторно выполнить запрос.'
      }
    ]
  },
  'data-usefetch-vs': {
    title: 'useFetch vs useAsyncData Quiz',
    questions: [
      {
        id: 1,
        question: 'В чем суть useFetch?',
        options: ['Это обертка над useAsyncData + $fetch', 'Это аналог axios', 'Это нативный fetch', 'Это библиотека'],
        correctAnswer: 0,
        explanation: 'useFetch — это синтаксический сахар: useAsyncData(key, () => $fetch(url)).'
      },
      {
        id: 2,
        question: 'Когда использовать useAsyncData?',
        options: ['Всегда', 'Для простых URL', 'Для сложной логики, нескольких запросов или не-fetch вызовов', 'Никогда'],
        correctAnswer: 2,
        explanation: 'useAsyncData подходит, когда вам нужно обернуть любую асинхронную логику (например, запрос к CMS SDK или GraphQL), а не просто $fetch URL.'
      },
      {
        id: 3,
        question: 'Что такое $fetch?',
        options: ['Библиотека jQuery', 'Улучшенный fetch от Nuxt (ofetch)', 'Переменная с деньгами', 'Плагин'],
        correctAnswer: 1,
        explanation: '$fetch (из библиотеки ofetch) — это умный fetch, который умеет парсить JSON автоматически и работать в любом окружении.'
      },
      {
        id: 4,
        question: 'Что делает lazy: true?',
        options: ['Ничего', 'Откладывает загрузку до клика', 'Не блокирует навигацию (клиентская загрузка)', 'Кеширует данные'],
        correctAnswer: 2,
        explanation: 'useLazyFetch (или lazy: true) позволяет показать страницу сразу, показывая лоадер, пока данные грузятся, вместо ожидания завершения запроса.'
      },
      {
        id: 5,
        question: 'Нужен ли ключ для useAsyncData?',
        options: ['Нет', 'Да, уникальный ключ для дедупликации данных', 'Только для кеша', 'Любая строка'],
        correctAnswer: 1,
        explanation: 'useAsyncData требует уникальный ключ (первый аргумент), чтобы сопоставить данные с сервера с данными на клиенте.'
      }
    ]
  },
  'data-ssr': {
    title: 'SSR & Data Quiz',
    questions: [
      {
        id: 1,
        question: 'Как Nuxt передает данные с сервера на клиент?',
        options: ['Через Cookies', 'Через LocalStorage', 'Через payload (Nuxt payload)', 'Повторным запросом'],
        correctAnswer: 2,
        explanation: 'Nuxt сериализует данные, полученные при SSR, в скрипт __NUXT__ (payload), чтобы клиент мог их "гидрировать" без повторного запроса.'
      },
      {
        id: 2,
        question: 'Что такое Hydration Mismatch?',
        options: ['Ошибка воды', 'Когда HTML сервера отличается от того, что хочет рендерить клиент', 'Ошибка базы данных', 'Стилевая ошибка'],
        correctAnswer: 1,
        explanation: 'Это происходит, если данные на клиенте отличаются от тех, с которыми рендерил сервер. useFetch помогает этого избежать.'
      },
      {
        id: 3,
        question: 'Где выполнять код только для сервера?',
        options: ['if (import.meta.server)', 'if (process.server)', 'В server/ папке', 'Все варианты верны'],
        correctAnswer: 3,
        explanation: 'Можно использовать проверки import.meta.server или выносить логику в API маршруты (server/).'
      },
      {
        id: 4,
        question: 'Где выполнять код только для клиента (window, document)?',
        options: ['В onMounted', 'if (import.meta.client)', 'В <ClientOnly>', 'Все варианты верны'],
        correctAnswer: 3,
        explanation: 'onMounted работает только на клиенте. Также есть проверки и компонент <ClientOnly>.'
      },
      {
        id: 5,
        question: 'Что будет с секретными ключами (API Keys) в useFetch?',
        options: ['Они утекут на клиент', 'Они безопасны', 'Нужно использовать server-proxy', 'Nuxt их скроет'],
        correctAnswer: 0,
        explanation: 'Если вы используете useFetch прямо в компоненте с приватным ключом, он попадет в бандл клиента! Секретные запросы нужно делать через server/api.'
      }
    ]
  },
  'data-api': {
    title: 'Server API Quiz',
    questions: [
      {
        id: 1,
        question: 'Где создаются API эндпоинты в Nuxt?',
        options: ['app/api', 'server/api', 'pages/api', 'routes/api'],
        correctAnswer: 1,
        explanation: 'Файлы в server/api автоматически становятся API маршрутами (например, /api/users).'
      },
      {
        id: 2,
        question: 'Какую функцию нужно экспортировать в API файле?',
        options: ['export default defineEventHandler', 'export function handler', 'module.exports', 'export const api'],
        correctAnswer: 0,
        explanation: 'Стандартный способ: export default defineEventHandler(event => ...).'
      },
      {
        id: 3,
        question: 'Как прочитать тело POST запроса?',
        options: ['req.body', 'await readBody(event)', 'event.body', 'JSON.parse()'],
        correctAnswer: 1,
        explanation: 'Nuxt (через h3) предоставляет утилиту readBody(event).'
      },
      {
        id: 4,
        question: 'Как получить query параметры в API?',
        options: ['event.query', 'getQuery(event)', 'req.query', 'useQuery()'],
        correctAnswer: 1,
        explanation: 'Утилита getQuery(event) возвращает объект параметров запроса.'
      },
      {
        id: 5,
        question: 'Можно ли вызывать серверный API из компонента как функцию?',
        options: ['Нет, только по HTTP', 'Да, Nuxt оптимизирует это при SSR', 'Только в dev', 'Это запрещено'],
        correctAnswer: 1,
        explanation: 'При SSR Nuxt может вызывать функции обработчиков напрямую, минуя сетевой стек, для производительности (если использовать $fetch/useFetch).'
      }
    ]
  },

  // TutorialKeepAlive.vue
  'keepalive-basics': {
    title: 'KeepAlive Basics Quiz',
    questions: [
      {
        id: 1,
        question: 'Что делает <keep-alive>?',
        options: ['Уничтожает компонент', 'Кеширует экземпляр компонента (сохраняет состояние)', 'Перезагружает страницу', 'Делает компонент глобальным'],
        correctAnswer: 1,
        explanation: 'Обернутый компонент не уничтожается при скрытии, а сохраняется в памяти вместе с текущим состоянием.'
      },
      {
        id: 2,
        question: 'Что происходит с DOM при скрытии кешированного компонента?',
        options: ['Удаляется', 'Становится display: none', 'Остается видимым', 'Становится прозрачным'],
        correctAnswer: 0,
        explanation: 'Компонент удаляется из DOM (unmounted), но его экземпляр JS остается в памяти.'
      },
      {
        id: 3,
        question: 'Сработает ли onMounted при повторном показе?',
        options: ['Да', 'Нет, только при первом создании', 'Иногда', 'Только если изменились пропсы'],
        correctAnswer: 1,
        explanation: 'Так как компонент не создается заново, onMounted вызывается только один раз.'
      },
      {
        id: 4,
        question: 'Для чего это нужно?',
        options: ['Для сохранения данных форм при переключении табов', 'Для красоты', 'Для SEO', 'Для безопасности'],
        correctAnswer: 0,
        explanation: 'Типичный кейс: пользователь заполнил поля, перешел на другую вкладку и вернулся — данные должны остаться.'
      },
      {
        id: 5,
        question: 'Есть ли аналог в React?',
        options: ['Встроенный <KeepAlive>', 'Нет встроенного, нужна ручная реализация (display: none) или библиотеки', 'useMemo', 'React.memo'],
        correctAnswer: 1,
        explanation: 'В React "из коробки" компоненты размонтируются. <KeepAlive> приходится реализовывать вручную или брать сторонние решения.'
      }
    ]
  },
  'keepalive-lifecycle': {
    title: 'KeepAlive Lifecycle Quiz',
    questions: [
      {
        id: 1,
        question: 'Какой хук вызывается при появлении кешированного компонента?',
        options: ['onMounted', 'onActivated', 'onShow', 'onVisible'],
        correctAnswer: 1,
        explanation: 'onActivated вызывается каждый раз, когда компонент вставляется в DOM из кеша.'
      },
      {
        id: 2,
        question: 'Какой хук вызывается при скрытии кешированного компонента?',
        options: ['onUnmounted', 'onDeactivated', 'onHide', 'onHidden'],
        correctAnswer: 1,
        explanation: 'onDeactivated вызывается вместо onUnmounted.'
      },
      {
        id: 3,
        question: 'Где лучше всего запускать таймеры/подписки?',
        options: ['onMounted', 'onActivated', 'В setup', 'В шаблоне'],
        correctAnswer: 1,
        explanation: 'Если таймер должен работать только когда компонент виден, лучше использовать onActivated.'
      },
      {
        id: 4,
        question: 'А где их останавливать?',
        options: ['onUnmounted', 'onDeactivated', 'Никогда', 'В onUpdated'],
        correctAnswer: 1,
        explanation: 'В паре с onActivated используется onDeactivated для приостановки активности.'
      },
      {
        id: 5,
        question: 'Вызовется ли onUnmounted, если компонент удалится из кеша (например, по лимиту)?',
        options: ['Нет', 'Да', 'Только в dev', 'Зависит от браузера'],
        correctAnswer: 1,
        explanation: 'Да, если компонент выбрасывается из кеша (уничтожается окончательно), срабатывает onUnmounted.'
      }
    ]
  },
  'keepalive-include': {
    title: 'Include/Exclude Quiz',
    questions: [
      {
        id: 1,
        question: 'Как выбрать, какие компоненты кешировать?',
        options: ['Проп include', 'Проп filter', 'Проп cache', 'Проп allow'],
        correctAnswer: 0,
        explanation: '<keep-alive :include="..."> позволяет указать имена компонентов для кеширования.'
      },
      {
        id: 2,
        question: 'Что принимает include?',
        options: ['Строку', 'Регулярное выражение', 'Массив', 'Все вышеперечисленное'],
        correctAnswer: 3,
        explanation: 'Можно передать "A,B", /A|B/ или ["A", "B"].'
      },
      {
        id: 3,
        question: 'Что важно для работы include?',
        options: ['У компонента должно быть имя (name)', 'Компонент должен быть большим', 'Компонент должен иметь пропсы', 'Ничего'],
        correctAnswer: 0,
        explanation: 'Кеширование работает по имени компонента. В SFC имя часто выводится из файла, но лучше задать явно через defineOptions({ name: "..." }).'
      },
      {
        id: 4,
        question: 'Что делает exclude?',
        options: ['Кеширует все, КРОМЕ указанных', 'Удаляет компонент', 'Исключает из DOM', 'Игнорирует ошибки'],
        correctAnswer: 0,
        explanation: 'exclude работает наоборот: кеширует всё, кроме перечисленных компонентов.'
      },
      {
        id: 5,
        question: 'Можно ли менять include динамически?',
        options: ['Нет, это константа', 'Да, реактивно', 'Только при перезагрузке', 'Только один раз'],
        correctAnswer: 1,
        explanation: 'Да, изменение массива include динамически добавит или удалит компоненты из кеша.'
      }
    ]
  },
  'keepalive-max': {
    title: 'Max Cache Quiz',
    questions: [
      {
        id: 1,
        question: 'Зачем нужен проп max?',
        options: ['Максимальный размер компонента', 'Лимит количества кешированных экземпляров', 'Максимальное время жизни', 'Максимальная вложенность'],
        correctAnswer: 1,
        explanation: 'max ограничивает количество компонентов, которые хранятся в памяти одновременно.'
      },
      {
        id: 2,
        question: 'Что происходит при превышении лимита?',
        options: ['Ошибка', 'Ничего', 'Удаляется самый старый (LRU)', 'Удаляется самый новый'],
        correctAnswer: 2,
        explanation: 'Используется стратегия LRU (Least Recently Used): удаляется тот экземпляр, к которому обращались давно.'
      },
      {
        id: 3,
        question: 'Почему это важно?',
        options: ['Для красоты', 'Для предотвращения утечек памяти', 'Для скорости интернета', 'Для SEO'],
        correctAnswer: 1,
        explanation: 'Без лимита бесконечное переключение табов или страниц могло бы забить память браузера.'
      },
      {
        id: 4,
        question: 'Какое значение max по умолчанию?',
        options: ['10', '100', 'Нет лимита', '5'],
        correctAnswer: 2,
        explanation: 'По умолчанию лимита нет, все посещенные компоненты (попадающие под include) остаются в памяти.'
      },
      {
        id: 5,
        question: 'Как работает LRU?',
        options: ['Удаляет первый попавшийся', 'Удаляет тот, который не использовался дольше всех', 'Удаляет самый большой', 'Удаляет случайный'],
        correctAnswer: 1,
        explanation: 'При добавлении нового, если место кончилось, удаляется тот, который был активен "давнее" всех.'
      }
    ]
  },
  'keepalive-usecases': {
    title: 'KeepAlive Use Cases Quiz',
    questions: [
      {
        id: 1,
        question: 'Где keep-alive наиболее полезен?',
        options: ['В статических сайтах', 'В навигации с вкладками (Tabs)', 'В футере', 'В кнопках'],
        correctAnswer: 1,
        explanation: 'Табы, переключение шагов формы (Wizard), списки с фильтрами — идеальные кандидаты.'
      },
      {
        id: 2,
        question: 'Можно ли использовать keep-alive с router-view?',
        options: ['Нет', 'Да, <keep-alive><router-view /></keep-alive>', 'Только в Nuxt', 'Только с transition'],
        correctAnswer: 1,
        explanation: 'Да, это позволяет кешировать целые страницы при навигации.'
      },
      {
        id: 3,
        question: 'Стоит ли кешировать всё подряд?',
        options: ['Да, так быстрее', 'Нет, это расходует память', 'Не имеет значения', 'Только картинки'],
        correctAnswer: 1,
        explanation: 'Кеширование потребляет память. Нужно кешировать только "тяжелые" компоненты или те, где важно сохранить состояние пользователя (scroll, input).'
      },
      {
        id: 4,
        question: 'Как сбросить кеш программно?',
        options: ['window.clear()', 'Исключить компонент из include и вернуть обратно', 'clearCache()', 'delete()'],
        correctAnswer: 1,
        explanation: 'Один из способов — временно убрать имя компонента из массива include, дождаться nextTick, и вернуть обратно.'
      },
      {
        id: 5,
        question: 'Работает ли keep-alive с v-if?',
        options: ['Нет', 'Да, для переключения компонентов', 'Только с v-show', 'Только с v-for'],
        correctAnswer: 1,
        explanation: 'Да, часто используется конструкция <keep-alive><comp v-if="..." /></keep-alive>.'
      }
    ]
  },

  // TutorialComposables.vue
  'arch-composables': {
    title: 'Composables Quiz',
    questions: [
      {
        id: 1,
        question: 'В чем главное преимущество директории composables/ в Nuxt?',
        options: ['Она компилируется быстрее', 'Файлы автоматически импортируются', 'Она требует строгой типизации', 'Она обязательна для маршрутизации'],
        correctAnswer: 1,
        explanation: 'Nuxt автоматически импортирует именованные экспорты из файлов в директории composables/, поэтому их можно использовать везде без import.'
      },
      {
        id: 2,
        question: 'Какую директорию следует использовать для чистых вспомогательных функций (stateless)?',
        options: ['utils/', 'composables/', 'helpers/', 'lib/'],
        correctAnswer: 0,
        explanation: 'Директория utils/ также авто-импортируется, но предназначена для чистых утилит (логика без состояния), тогда как composables/ — для логики с состоянием (Vue logic).'
      }
    ]
  },
  'arch-state': {
    title: 'State Management Quiz',
    questions: [
      {
        id: 1,
        question: 'Почему следует избегать const state = ref() в файле composable (вне функции)?',
        options: ['Это вызывает синтаксическую ошибку', 'Это создает глобальное состояние, общее для ВСЕХ запросов сервера (Cross-Request Pollution)', 'Это не работает с TypeScript', 'Это медленнее'],
        correctAnswer: 1,
        explanation: 'Переменные, объявленные вне функций в модуле, являются синглтонами в Node.js. Это означает, что данные одного пользователя могут утечь к другому при SSR. Всегда используйте useState() или defineStore().'
      },
      {
        id: 2,
        question: 'Какой встроенный composable в Nuxt используется для SSR-friendly общего состояния?',
        options: ['useRef()', 'useState()', 'useStore()', 'useShared()'],
        correctAnswer: 1,
        explanation: 'useState(key, init) создает реактивную ссылку, которая синхронизируется между сервером и клиентом (hydration friendly).'
      }
    ]
  },
  'arch-middleware': {
    title: 'Middleware Quiz',
    questions: [
      {
        id: 1,
        question: 'Где определяются переиспользуемые защитники маршрутов (route guards)?',
        options: ['guards/', 'middleware/', 'plugins/', 'routes/'],
        correctAnswer: 1,
        explanation: 'Директория middleware/ используется для middleware маршрутизации (navigation guards).'
      },
      {
        id: 2,
        question: 'Как применить middleware к странице?',
        options: ['Используя компонент <Middleware>', 'Используя definePageMeta({ middleware: "name" })', 'Импортируя его в script setup', 'Только в nuxt.config.ts'],
        correctAnswer: 1,
        explanation: 'Вы можете назначить middleware конкретной странице с помощью макроса definePageMeta.'
      }
    ]
  },
  'arch-api': {
    title: 'Server API Quiz',
    questions: [
      {
        id: 1,
        question: 'Какая helper-функция используется для определения серверного обработчика событий?',
        options: ['defineHandler()', 'createServer()', 'defineEventHandler()', 'apiHandler()'],
        correctAnswer: 2,
        explanation: 'defineEventHandler((event) => { ... }) — это стандартный способ определения серверных маршрутов Nitro.'
      },
      {
        id: 2,
        question: 'Как прочитать тело запроса (request body) в API роуте?',
        options: ['req.body', 'await readBody(event)', 'event.body', 'getJSON(event)'],
        correctAnswer: 1,
        explanation: 'Nitro предоставляет утилиты, такие как readBody(event), для асинхронного парсинга входящих данных запроса.'
      }
    ]
  },

  // TutorialMigration.vue
  'migration-auth': {
    title: 'Auth Migration Quiz',
    questions: [
      {
        id: 1,
        question: 'Какая библиотека является аналогом NextAuth.js для Nuxt?',
        options: ['Passport.js', 'Auth.js (через @hebilicious/authjs-nuxt)', 'Nuxt Security', 'Firebase'],
        correctAnswer: 1,
        explanation: 'Auth.js (ранее NextAuth.js) поддерживает Nuxt через @hebilicious/authjs-nuxt или sidebase/nuxt-auth, позволяя использовать те же провайдеры.'
      },
      {
        id: 2,
        question: 'Где обычно определяется обработчик auth в Nuxt?',
        options: ['app/api/auth.ts', 'server/api/auth/[...].ts', 'pages/api/auth.js', 'auth/route.ts'],
        correctAnswer: 1,
        explanation: 'В Nuxt серверные API маршруты находятся в server/api. Синтаксис [...] используется для динамического auth маршрута.'
      },
      {
        id: 3,
        question: 'Как получить доступ к сессии в компоненте?',
        options: ['useSession()', 'useAuth()', 'getSession()', 'И useAuth(), и useSession() в зависимости от модуля'],
        correctAnswer: 3,
        explanation: 'Разные Nuxt модули для Auth.js могут предоставлять либо useAuth(), либо useSession(), но концепция идентична хуку в Next.js.'
      }
    ]
  },
  'migration-image': {
    title: 'Image Optimization Quiz',
    questions: [
      {
        id: 1,
        question: 'Какой компонент в Nuxt используется для оптимизации изображений?',
        options: ['<Image />', '<NuxtImg />', '<OptimizedImage />', '<Img />'],
        correctAnswer: 1,
        explanation: 'Модуль @nuxt/image предоставляет компонент <NuxtImg />, аналогичный next/image.'
      },
      {
        id: 2,
        question: 'Нужно ли импортировать <NuxtImg /> вручную?',
        options: ['Да, всегда', 'Нет, он авто-импортируется', 'Только в серверных компонентах', 'Только в layouts'],
        correctAnswer: 1,
        explanation: 'Nuxt автоматически импортирует компоненты из модулей, поэтому <NuxtImg /> доступен везде без импорта.'
      },
      {
        id: 3,
        question: 'Поддерживает ли @nuxt/image внешние провайдеры, такие как Cloudinary?',
        options: ['Нет, только локальные', 'Да, поддерживается множество провайдеров', 'Только Vercel', 'Только Netlify'],
        correctAnswer: 1,
        explanation: 'Да, @nuxt/image поддерживает широкий спектр провайдеров, включая Cloudinary, Imgix, Vercel и другие, настраиваемые в nuxt.config.ts.'
      }
    ]
  },
  'migration-fonts': {
    title: 'Fonts Migration Quiz',
    questions: [
      {
        id: 1,
        question: 'Чем @nuxt/fonts отличается от next/font?',
        options: ['Требует ручного импорта', 'Автоматически разрешает шрифты в CSS', 'Поддерживает только Google Fonts', 'Он медленнее'],
        correctAnswer: 1,
        explanation: '@nuxt/fonts встраивается в компиляцию CSS. Вы просто используете имя шрифта в CSS, а модуль автоматически загружает и внедряет его.'
      },
      {
        id: 2,
        question: 'Где настраивается модуль?',
        options: ['package.json', 'nuxt.config.ts', 'app.vue', 'tailwind.config.ts'],
        correctAnswer: 1,
        explanation: 'Модули добавляются в массив modules в файле nuxt.config.ts.'
      }
    ]
  }
}
