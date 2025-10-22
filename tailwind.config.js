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
          50: '#fdf8f6',
          100: '#f9ede7',
          200: '#f2d9cc',
          300: '#e9bfa8',
          400: '#de9b7d',
          500: '#d4825a',
          600: '#c26841',
          700: '#a35438',
          800: '#844533',
          900: '#6b3a2d',
        },
        secondary: {
          50: '#f8f7f5',
          100: '#efede8',
          200: '#ddd9d0',
          300: '#c8c0b3',
          400: '#afa593',
          500: '#968975',
          600: '#7e715f',
          700: '#665b4e',
          800: '#544a40',
          900: '#463e36',
        },
        accent: {
          50: '#fefbf3',
          100: '#fdf5e0',
          200: '#fae8bd',
          300: '#f6d88e',
          400: '#f0c05d',
          500: '#e8a83a',
          600: '#d88b26',
          700: '#b46d20',
          800: '#92561f',
          900: '#77471e',
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
