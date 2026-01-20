<script setup lang="ts">
import { cardQuizzes } from '~/data/quizzes'
import QuizModal from './QuizModal.vue'

interface TVpComparisonCard {
  title: string
  quizKey?: string
}

const props = defineProps<TVpComparisonCard>()

const showQuiz = ref(false)
const quiz = computed(() => props.quizKey ? cardQuizzes[props.quizKey] : null)
</script>

<template>
  <div class="bp-card overflow-hidden !p-0 mb-8 hover:shadow-xl hover:shadow-palantir-blue/5 transition-shadow duration-300">
    <div class="flex items-center justify-between p-5 bg-gradient-to-r from-palantir-light-2 to-palantir-light-1 dark:from-palantir-dark-2 dark:to-palantir-dark-1 border-b border-palantir-light-3 dark:border-palantir-dark-3">
      <h3 class="text-lg sm:text-xl font-bold text-palantir-text-dark dark:text-white flex items-center gap-3">
        <span class="text-palantir-blue text-2xl">#</span> 
        <span class="bg-gradient-to-r from-palantir-blue to-palantir-purple bg-clip-text text-transparent">{{ title }}</span>
      </h3>
      
      <button 
        v-if="quiz"
        @click="showQuiz = true"
        class="text-xs font-mono uppercase tracking-wide flex items-center gap-2 px-3 py-2 rounded-lg bg-palantir-gray-3/70 hover:bg-palantir-blue/80 text-palantir-dark hover:text-white transition-all border border-palantir-blue/30 hover:border-palantir-blue hover:shadow-lg hover:shadow-palantir-blue/20 hover:scale-105"
        title="Проверить знания"
      >
        <span class="hidden sm:inline">Проверить знания</span>
        <span class="text-lg leading-none ">🎓</span>
      </button>
    </div>
    
    <div class="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-palantir-light-3 dark:divide-palantir-dark-3">
      <!-- React Code -->
      <div class="p-5 sm:p-6 bg-palantir-light-1 dark:bg-palantir-dark-1 hover:bg-palantir-light-2 dark:hover:bg-palantir-dark-1/80 transition-colors">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-palantir-blue font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
            <span class="text-xl">⚛️</span> React
          </h4>
          <span class="text-xs text-palantir-gray-0 dark:text-palantir-gray-4 font-mono">JavaScript</span>
        </div>
        <div class="bg-palantir-light-3 dark:bg-palantir-dark-2 rounded-lg border border-palantir-light-4 dark:border-palantir-dark-3 p-4 overflow-x-auto group hover:border-palantir-blue/40 hover:shadow-lg hover:shadow-palantir-blue/10 transition-all">
          <code class="text-[#182026] dark:text-palantir-gray-2 font-mono text-sm leading-relaxed whitespace-pre block">
            <slot name="react" />
          </code>
        </div>
      </div>

      <!-- Vue Code -->
      <div class="p-5 sm:p-6 bg-palantir-light-1 dark:bg-palantir-dark-1 hover:bg-palantir-light-2 dark:hover:bg-palantir-dark-1/80 transition-colors">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-[#42b883] font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
            <span class="text-xl">💚</span> Vue / Nuxt
          </h4>
          <span class="text-xs text-palantir-gray-0 dark:text-palantir-gray-4 font-mono">TypeScript</span>
        </div>
        <div class="bg-palantir-light-3 dark:bg-palantir-dark-2 rounded-lg border border-palantir-light-4 dark:border-palantir-dark-3 p-4 overflow-x-auto group hover:border-[#42b883]/40 hover:shadow-lg hover:shadow-[#42b883]/10 transition-all">
          <code class="text-[#182026] dark:text-palantir-gray-2 font-mono text-sm leading-relaxed whitespace-pre block">
            <slot name="vue" />
          </code>
        </div>
      </div>
    </div>
    
    <!-- Notes -->
    <div class="p-5 sm:p-6 bg-gradient-to-b from-palantir-light-2 to-palantir-light-1 dark:from-palantir-dark-2 dark:to-palantir-dark-1 border-t border-palantir-light-3 dark:border-palantir-dark-3">
      <h4 class="text-palantir-text-dark dark:text-white font-bold text-base mb-3 flex items-center gap-2">
        <span class="text-xl">💡</span> Ключевые отличия
      </h4>
      <div class="text-palantir-text-dark dark:text-palantir-gray-2 text-sm leading-relaxed space-y-2">
        <slot name="notes" />
      </div>
    </div>
    
    <!-- Live Demo -->
    <div v-if="$slots.live" class="p-5 sm:p-6 bg-palantir-light-1 dark:bg-palantir-dark-1 border-t border-palantir-light-3 dark:border-palantir-dark-3">
      <h4 class="text-palantir-text-dark dark:text-white font-bold text-base mb-4 flex items-center gap-2">
        <span class="text-xl">⚡</span> Интерактивная демонстрация
      </h4>
      <div class="text-palantir-text-dark dark:text-palantir-gray-1 bg-palantir-light-2 dark:bg-palantir-dark-2 border border-palantir-light-4 dark:border-palantir-dark-3 rounded-lg p-5 shadow-inner">
        <slot name="live" />
      </div>
    </div>
    
    <!-- Quiz Modal -->
    <QuizModal
      v-if="quiz"
      v-model="showQuiz"
      :quiz="quiz"
    />
  </div>
</template>
