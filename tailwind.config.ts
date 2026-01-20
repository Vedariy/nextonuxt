import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        palantir: {
          dark: {
            DEFAULT: '#10161a',
            1: '#182026',
            2: '#202b33',
            3: '#293742',
            4: '#30404d',
            5: '#394b59',
          },
          light: {
            DEFAULT: '#ffffff',
            1: '#f5f8fa',
            2: '#ebf1f5',
            3: '#e1e8ed',
            4: '#d8e1e8',
            5: '#ced9e0',
          },
          gray: {
            DEFAULT: '#afbcc6',
            1: '#bec9d0',
            2: '#d8d1d8',
            3: '#e1e8ed',
            4: '#ebf1f5',
            5: '#f5f8fa',
          },
          text: {
            dark: '#182026',
            light: '#f5f8fa',
          },
          blue: {
            DEFAULT: '#2B95D6',
            hover: '#48aff0',
            active: '#1c6e9d',
          },
          green: '#0d8050',
          purple: '#9e66ff',
          orange: '#ff6e4a',
          accent: '#FFB366'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'card': '0 0 0 1px rgba(16, 22, 26, 0.4), 0 1px 1px rgba(16, 22, 26, 0.2), 0 2px 6px rgba(16, 22, 26, 0.2)',
        'card-dark': '0 0 0 1px rgba(16, 22, 26, 0.4), 0 1px 1px rgba(16, 22, 26, 0.4), 0 2px 6px rgba(16, 22, 26, 0.4)',
        'card-light': '0 0 0 1px rgba(16, 22, 26, 0.1), 0 1px 1px rgba(16, 22, 26, 0.05), 0 2px 6px rgba(16, 22, 26, 0.05)',
      }
    },
  },
  plugins: [],
} satisfies Config
