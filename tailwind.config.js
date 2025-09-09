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
          50: '#fef7f0',
          100: '#fdeee0',
          200: '#fad4b8',
          300: '#f7ba8f',
          400: '#f4a167',
          500: '#e8956d',
          600: '#d4825a',
          700: '#b86d47',
          800: '#9c5834',
          900: '#7d4428',
        },
        secondary: {
          50: '#faf9f7',
          100: '#f3f1ed',
          200: '#e8e4db',
          300: '#ddd7c9',
          400: '#c7bfa8',
          500: '#b1a687',
          600: '#9b8d66',
          700: '#7a6b4a',
          800: '#5c4f37',
          900: '#3e3324',
        },
        accent: {
          50: '#fff9f5',
          100: '#fef2eb',
          200: '#fde2cc',
          300: '#fcd2ad',
          400: '#fab28e',
          500: '#f8926f',
          600: '#e07550',
          700: '#c85831',
          800: '#a03b1c',
          900: '#781e0a',
        },
        neutral: {
          50: '#fafaf9',
          100: '#f4f4f3',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        cream: {
          50: '#fffef7',
          100: '#fefdf0',
          200: '#fcfae8',
          300: '#faf7e0',
          400: '#f5f0d0',
          500: '#f0e9c0',
          600: '#e6d7a8',
          700: '#d4c285',
          800: '#b8a562',
          900: '#95843f',
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
