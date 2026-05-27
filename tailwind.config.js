/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080c14',
        surface: '#0d1220',
        border: '#1a2236',
        text: '#e2e8f0',
        muted: '#4a5568',
        accent: '#00d4ff',
        accent2: '#7c3aed',
        accent3: '#f59e0b',
        accent4: '#10b981',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      animation: {
        'ticker': 'ticker 35s linear infinite',
        'fadeUp': 'fadeUp 0.6s forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}