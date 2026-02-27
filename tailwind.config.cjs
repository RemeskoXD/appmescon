/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0d0e17',
          850: '#0f111c',
          800: '#151729'
        },
        accent: {
          500: '#5885fa',
          400: '#799dfb',
          300: '#acc2fc'
        },
        cyan: {
          50: '#eef3fe',
          100: '#dee7fe',
          200: '#cddafe',
          300: '#acc2fc',
          400: '#8aaafc',
          500: '#5885fa',
          600: '#4f78e1',
          700: '#3e5daf',
          800: '#304c97',
          900: '#243a75'
        }
      },
      borderRadius: {
        mega: '16px'
      },
      boxShadow: {
        mega: '0 20px 48px -12px rgba(0,0,0,0.55)',
        panel: '0 8px 28px -8px rgba(0,0,0,0.55)'
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.4,.08,.2,1)'
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin-reverse 15s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        'marquee-slow': 'marquee 80s linear infinite',
        'bounce': 'bounce 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'spin-reverse': {
          from: {
            transform: 'rotate(360deg)'
          },
          to: {
            transform: 'rotate(0deg)'
          }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      }
    }
  },
  plugins: []
};
