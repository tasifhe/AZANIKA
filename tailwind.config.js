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
        // Main Brand Colors - Coral Pink (Primary)
        coral: {
          50: '#fff5f3',
          100: '#ffe8e3',
          200: '#ffd5cc',
          300: '#ffb8a8',
          400: '#ff8f74',
          500: '#ff6b47',  // Main coral
          600: '#f04e28',
          700: '#d93f1d',
          800: '#b3351d',
          900: '#93301f',
        },
        // Rose Gold - Luxury accent
        rosegold: {
          50: '#fef6f3',
          100: '#feeae3',
          200: '#fed8cb',
          300: '#fcbba6',
          400: '#f99171',
          500: '#f26d4c',
          600: '#de4a2b',
          700: '#ba3a22',
          800: '#993221',
          900: '#7d2d20',
        },
        // Blush Pink - Soft & Feminine
        blush: {
          50: '#fef6f9',
          100: '#fdedf3',
          200: '#fcdce9',
          300: '#fabbd4',
          400: '#f78eb8',
          500: '#ef5f98',  // Main blush
          600: '#d93d7a',
          700: '#b82c61',
          800: '#992952',
          900: '#802747',
        },
        // Lavender - Elegant & Calming
        lavender: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',  // Main lavender
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        // Mint - Fresh & Modern
        mint: {
          50: '#f0fdf9',
          100: '#ccfbef',
          200: '#99f6e0',
          300: '#5fe9d0',
          400: '#2dd4bf',
          500: '#14b8a6',  // Main mint
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Gold - Luxury & Premium
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',  // Main gold
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Warm Neutrals - Sophisticated base
        sand: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        // Cream - Soft backgrounds
        cream: {
          50: '#fffef7',
          100: '#fffceb',
          200: '#fff8d6',
          300: '#fff0b3',
          400: '#ffe380',
          500: '#ffd13d',
          600: '#f0b816',
          700: '#d19a0b',
          800: '#a67a0d',
          900: '#885f0e',
        },
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
