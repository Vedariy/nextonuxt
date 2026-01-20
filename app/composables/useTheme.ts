export const useTheme = () => {
  // Use useState for SSR-safe shared state
  const theme = useState<'light' | 'dark'>('theme', () => 'dark')
  
  const isDark = computed(() => theme.value === 'dark')
  const isLight = computed(() => theme.value === 'light')
  
  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme.value)
      updateDocumentClass()
    }
  }
  
  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme)
      updateDocumentClass()
    }
  }
  
  const updateDocumentClass = () => {
    if (typeof document !== 'undefined') {
      if (theme.value === 'dark') {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
    }
  }
  
  const initTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (savedTheme) {
        theme.value = savedTheme
      }
      updateDocumentClass()
    }
  }
  
  return {
    theme,
    isDark,
    isLight,
    toggleTheme,
    setTheme,
    initTheme
  }
}
