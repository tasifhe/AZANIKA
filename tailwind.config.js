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
          50: '#fef9f8',
          100: '#fef3f2',
          200: '#fee5e3',
          300: '#fdcdc9',
          400: '#fbaaa4',
          500: '#f6847d',
          600: '#e95f57',
          700: '#d44239',
          800: '#b13830',
          900: '#92332d',
        },
        secondary: {
          50: '#fef8f7',
          100: '#fef1ef',
          200: '#fee2de',
          300: '#fdc9c2',
          400: '#fba79d',
          500: '#f6847d',
          600: '#ea5f57',
          700: '#d54239',
          800: '#b13830',
          900: '#92332d',
        },
        accent: {
          50: '#fdfaf8',
          100: '#fcf4f0',
          200: '#fae8e1',
          300: '#f6d6cb',
          400: '#f0baac',
          500: '#e89b8a',
          600: '#db7b68',
          700: '#c96050',
          800: '#a74f43',
          900: '#89443a',
        },
        blush: {
          50: '#fef9f9',
          100: '#fef3f2',
          200: '#fee5e3',
          300: '#FADCD9',
          400: '#F4A7A3',
          500: '#F6B6B1',
          600: '#e89088',
          700: '#d66b62',
          800: '#b85549',
          900: '#99473d',
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
          50: '#fffefb',
          100: '#fffcf7',
          200: '#fef9f0',
          300: '#fdf5e8',
          400: '#fbefd9',
          500: '#f8e8c9',
          600: '#ead5a9',
          700: '#d4bc86',
          800: '#b39b64',
          900: '#927d48',
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
