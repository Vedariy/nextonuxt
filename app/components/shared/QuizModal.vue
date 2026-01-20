<script setup lang="ts">
import type { TopicQuiz } from '~/data/quizzes'

interface TVpQuizModal {
  quiz: TopicQuiz
  modelValue: boolean // v-model для открытия/закрытия
}

const props = defineProps<TVpQuizModal>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const currentQuestionIndex = ref(0)
const selectedOption = ref<number | null>(null)
const isAnswered = ref(false)
const score = ref(0)
const showResults = ref(false)

const currentQuestion = computed(() => props.quiz.questions[currentQuestionIndex.value])
const isCorrect = computed(() => currentQuestion.value && selectedOption.value === currentQuestion.value.correctAnswer)

// Сброс состояния при открытии
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    restartQuiz()
  }
})

const selectOption = (index: number) => {
  if (isAnswered.value || !currentQuestion.value) return
  selectedOption.value = index
  isAnswered.value = true
  
  if (index === currentQuestion.value.correctAnswer) {
    score.value++
  }
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < props.quiz.questions.length - 1) {
    currentQuestionIndex.value++
    selectedOption.value = null
    isAnswered.value = false
  } else {
    showResults.value = true
  }
}

const restartQuiz = () => {
  currentQuestionIndex.value = 0
  selectedOption.value = null
  isAnswered.value = false
  score.value = 0
  showResults.value = false
}

const close = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        @click="close"
      ></div>

      <!-- Modal Content -->
      <div 
        class="relative w-full max-w-2xl bg-white dark:bg-palantir-dark-1 border border-palantir-light-3 dark:border-palantir-dark-3 rounded shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-palantir-light-3 dark:border-palantir-dark-3 bg-palantir-light-2 dark:bg-palantir-dark-2">
          <h3 class="text-lg font-semibold text-palantir-text-dark dark:text-white flex items-center gap-2">
            <span class="text-palantir-blue">🧩 {{ quiz.title }}</span> 
          </h3>
          <button 
            @click="close"
            class="text-palantir-dark-4 dark:text-palantir-gray-4 hover:text-palantir-text-dark dark:hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <!-- Progress Bar -->
        <div v-if="!showResults" class="h-1 bg-palantir-light-3 dark:bg-palantir-dark-3 w-full">
          <div 
            class="h-full bg-palantir-blue transition-all duration-300 ease-out"
            :style="{ width: `${((currentQuestionIndex + (isAnswered ? 1 : 0)) / quiz.questions.length) * 100}%` }"
          ></div>
        </div>

        <!-- Body -->
        <div class="p-6 max-h-[70vh] overflow-y-auto">
          <div v-if="!showResults && currentQuestion" class="space-y-6">
            <!-- Question -->
            <div class="text-xl font-medium text-palantir-text-dark dark:text-white">
              {{ currentQuestion.question }}
            </div>

            <!-- Options -->
            <div class="space-y-2">
              <button
                v-for="(option, index) in currentQuestion.options"
                :key="index"
                @click="selectOption(index)"
                class="w-full text-left p-4 rounded border transition-all duration-200 flex items-center gap-3 group relative"
                :class="[
                  isAnswered 
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-100'
                      : index === selectedOption
                        ? 'bg-red-500/10 border-red-500/50 text-red-700 dark:text-red-100'
                        : 'bg-palantir-light-2 dark:bg-palantir-dark-2 border-palantir-light-3 dark:border-palantir-dark-3 text-palantir-dark-4 dark:text-palantir-gray-2 opacity-50'
                    : 'bg-palantir-light-1 dark:bg-palantir-dark-2 border-palantir-light-3 dark:border-palantir-dark-3 text-palantir-text-dark dark:text-palantir-gray-1 hover:bg-palantir-light-2 dark:hover:bg-palantir-dark-3 hover:border-palantir-blue/50 hover:text-palantir-blue dark:hover:text-white'
                ]"
                :disabled="isAnswered"
              >
                <span 
                  class="w-8 h-8 flex items-center justify-center rounded-full border text-sm font-mono transition-colors shrink-0"
                  :class="[
                    isAnswered
                      ? index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-500/20 text-green-600 dark:text-green-400'
                        : index === selectedOption
                          ? 'border-red-500 bg-red-500/20 text-red-600 dark:text-red-400'
                          : 'border-palantir-light-4 dark:border-palantir-dark-4 text-palantir-gray dark:text-palantir-dark-4'
                      : 'border-palantir-gray dark:border-palantir-gray-4 text-palantir-dark-4 dark:text-palantir-gray-4 group-hover:border-palantir-blue group-hover:text-palantir-blue'
                  ]"
                >
                  {{ String.fromCharCode(65 + index) }}
                </span>
                <span class="flex-1">{{ option }}</span>
                
                <span v-if="isAnswered && index === currentQuestion.correctAnswer" class="text-green-600 dark:text-green-400 shrink-0">✓</span>
                <span v-if="isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer" class="text-red-600 dark:text-red-400 shrink-0">✕</span>
              </button>
            </div>

            <!-- Explanation & Next Button -->
            <div v-if="isAnswered" class="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div 
                class="p-4 rounded mb-4 text-sm border"
                :class="isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'"
              >
                <p class="font-bold mb-1" :class="isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                  {{ isCorrect ? 'Correct!' : 'Incorrect' }}
                </p>
                <p class="text-palantir-text-dark dark:text-palantir-gray-1">{{ currentQuestion.explanation }}</p>
              </div>
              
              <button 
                @click="nextQuestion"
                class="bp-button bp-button-primary w-full justify-center py-3 text-base"
              >
                {{ currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'View Results' }}
              </button>
            </div>
          </div>

          <!-- Results Screen -->
          <div v-else class="text-center py-8 space-y-8 animate-in zoom-in-95 duration-300">
            <div class="relative inline-block">
              <svg class="w-40 h-40 mx-auto transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e1e8ed" class="dark:stroke-[#1C2127]" stroke-width="8" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  :stroke="score === quiz.questions.length ? '#10B981' : '#3B82F6'" 
                  stroke-width="8"
                  stroke-linecap="round"
                  :stroke-dasharray="2 * Math.PI * 45"
                  :stroke-dashoffset="2 * Math.PI * 45 * (1 - score / quiz.questions.length)"
                  class="transition-all duration-1000 ease-out"
                />
              </svg>
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="text-4xl font-bold text-palantir-text-dark dark:text-white">{{ Math.round((score / quiz.questions.length) * 100) }}%</div>
              </div>
            </div>

            <div>
              <h4 class="text-2xl font-bold text-palantir-text-dark dark:text-white mb-2">
                {{ score === quiz.questions.length ? 'Perfect Score! 🎉' : score > quiz.questions.length / 2 ? 'Great Job! 👍' : 'Keep Learning! 📚' }}
              </h4>
              <p class="text-palantir-text-dark dark:text-palantir-gray-2 text-lg">
                You got <strong class="text-palantir-text-dark dark:text-white">{{ score }}</strong> out of <strong class="text-palantir-text-dark dark:text-white">{{ quiz.questions.length }}</strong> correct
              </p>
            </div>

            <div class="flex gap-4 justify-center">
              <button 
                @click="restartQuiz"
                class="bp-button bg-palantir-light-2 dark:bg-palantir-dark-2 border border-palantir-light-3 dark:border-palantir-dark-3 hover:bg-palantir-light-3 dark:hover:bg-palantir-dark-3 text-palantir-text-dark dark:text-palantir-gray-1 px-6 py-2"
              >
                Restart Quiz
              </button>
              <button 
                @click="close"
                class="bp-button text-palantir-text-dark dark:text-palantir-gray-1 hover:bg-palantir-light-2 dark:hover:bg-palantir-dark-3 px-6 py-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        <!-- Footer Info -->
        <div class="p-3 bg-palantir-light-2 dark:bg-palantir-dark-2 border-t border-palantir-light-3 dark:border-palantir-dark-3 text-center">
          <p class="text-xs text-palantir-dark-4 dark:text-palantir-gray-4 font-mono">
            Vue 3 • Nuxt 3 • TailwindCSS • Blueprint Style
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>
