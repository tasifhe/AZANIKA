/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef5ff',
          100: '#fde9ff',
          200: '#fcd4fe',
          300: '#f9b0fc',
          400: '#f47df8',
          500: '#e750ee',
          600: '#cc2ed4',
          700: '#a822ab',
          800: '#8a1e89',
          900: '#721d70',
        },
        secondary: {
          50: '#fff5f7',
          100: '#ffe9ee',
          200: '#ffd6e0',
          300: '#ffb3c6',
          400: '#ff8ba8',
          500: '#fb5c87',
          600: '#e63965',
          700: '#c9244b',
          800: '#a7203f',
          900: '#8b1f39',
        },
        accent: {
          50: '#fffbf5',
          100: '#fff5e5',
          200: '#ffe8c6',
          300: '#ffd69d',
          400: '#ffba6b',
          500: '#ff9a3d',
          600: '#f07818',
          700: '#c85e0f',
          800: '#9f4a14',
          900: '#813e14',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        cream: {
          50: '#fffef9',
          100: '#fffcf2',
          200: '#fff9e5',
          300: '#fff4d1',
          400: '#ffecb3',
          500: '#ffe395',
          600: '#f5d478',
          700: '#e0ba5c',
          800: '#c49c42',
          900: '#a37e2c',
        }
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
