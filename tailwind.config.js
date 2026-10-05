/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f172a', // Deep Navy
          accent: '#2563eb',  // Electric Blue
          soft: '#eff6ff',    // Soft Blue
          glow: 'rgba(37, 99, 235, 0.5)'
        },
        brand: {
          teal: '#2F858E',    // From screenshots (Circle hero bg)
          peach: '#EBCFB7',   // From screenshots (buttons, backgrounds)
          coral: '#E7B5A3',   // From screenshots (accents, blobs)
          sand: '#F7EFE5',    // From screenshots (off-white bg)
          dark: '#222B33',    // From screenshots (charcoal text)
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
