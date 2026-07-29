/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#DC2626',
          'red-dark': '#B91C1C',
          orange: '#EA580C',
          yellow: '#FACC15',
          black: '#1A1A1A',
          'black-soft': '#2D2D2D',
          gray: '#6B7280',
          'gray-light': '#9CA3AF',
          white: '#FAFAFA',
          cream: '#F5F0EB',
          beige: '#E8E0D5',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        consolas: ['Consolas', 'monospace'],
        serif: ['Georgia', 'serif'],
        graffiti: ['Permanent Marker', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
