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
        // Primary Brand Colors - Rose Gold & Copper (from logo)
        rosegold: {
          50: '#fef8f5',
          100: '#feeee7',
          200: '#fddac7',
          300: '#f9c0a0',
          400: '#f09c6e',
          500: '#e8956d',  // Main rose gold from logo
          600: '#db7b68',
          700: '#c96050',
          800: '#a64f42',
          900: '#884239',
        },
        // Copper - Deep metallic accent
        copper: {
          50: '#fdf6f3',
          100: '#fbe9e1',
          200: '#f6d1c2',
          300: '#efb399',
          400: '#e68b68',
          500: '#d97045',
          600: '#c85a36',
          700: '#a7472d',
          800: '#883c2a',
          900: '#6f3526',
        },
        // Warm Cream - Elegant backgrounds
        cream: {
          50: '#fefdfb',
          100: '#fef9f5',
          200: '#fdf3eb',
          300: '#fae8d9',
          400: '#f5d7bc',
          500: '#ecc69f',
          600: '#dda978',
          700: '#c68a59',
          800: '#a4704a',
          900: '#875d3f',
        },
        // Blush - Soft feminine accent
        blush: {
          50: '#fef7f7',
          100: '#fdedef',
          200: '#fbd9dc',
          300: '#f8b8be',
          400: '#f38d99',
          500: '#ea6776',
          600: '#d84659',
          700: '#b8354a',
          800: '#992f43',
          900: '#812b3e',
        },
        // Warm Gray - Sophisticated neutrals
        warmgray: {
          50: '#fafaf9',
          100: '#f5f4f2',
          200: '#eae7e3',
          300: '#d9d4cf',
          400: '#bfb8b0',
          500: '#a39a8f',
          600: '#877d72',
          700: '#6e655d',
          800: '#5a524c',
          900: '#4a433f',
        },
        // Gold - Luxury accents
        gold: {
          50: '#fffcf5',
          100: '#fef7e6',
          200: '#fcedc4',
          300: '#f9dd97',
          400: '#f5c45a',
          500: '#f0ad2e',
          600: '#e19216',
          700: '#bb7512',
          800: '#965c16',
          900: '#7a4d18',
        },
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'heading': ['Cormorant Garamond', 'Garamond', 'serif'],
        'body': ['Lora', 'Georgia', 'serif'],
        'sans': ['Montserrat', 'system-ui', 'sans-serif'],
        'script': ['Dancing Script', 'cursive'],
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
