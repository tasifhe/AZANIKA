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
        // Luxury Brand Colors - Rose Gold from Logo
        // Primary brand color extracted from AZANIKA logo
        brand: {
          50: '#fef8f5',
          100: '#fdf0ea',
          200: '#fbe0d4',
          300: '#f6c7b3',
          400: '#efa388',
          500: '#d4a574',  // Primary rose gold from logo
          600: '#c9956c',
          700: '#b47f5a',
          800: '#96684c',
          900: '#7a5640',
        },
        // Rose Gold - Primary Brand Color
        rosegold: {
          50: '#fef7f5',
          100: '#feeee7',
          200: '#fdd9c5',
          300: '#f9bf9e',
          400: '#f39b6e',
          500: '#d4a574',  // Matching logo
          600: '#c9956c',
          700: '#b47f5a',
          800: '#96684c',
          900: '#7a5640',
        },
        // Blush Pink - Feminine Accent
        blush: {
          50: '#fef6f7',
          100: '#fdedef',
          200: '#fcd9df',
          300: '#f9b7c4',
          400: '#f48da1',
          500: '#ea6280',
          600: '#d84464',
          700: '#b8324b',
          800: '#992c43',
          900: '#80283d',
        },
        // Soft Mauve - Elegant Touch
        mauve: {
          50: '#faf7f9',
          100: '#f4eef2',
          200: '#e8dce6',
          300: '#d6c1d3',
          400: '#be9bb9',
          500: '#a37b9e',
          600: '#8a5f84',
          700: '#724f6c',
          800: '#5f445a',
          900: '#4f3b4b',
        },
        // Pearl - Sophisticated Neutrals  
        pearl: {
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
        // Copper - Warm Metallic
        copper: {
          50: '#fdf6f3',
          100: '#fbe9e0',
          200: '#f7d0bf',
          300: '#efaf93',
          400: '#e58565',
          500: '#d96744',
          600: '#c54f32',
          700: '#a4402b',
          800: '#863729',
          900: '#6e2f25',
        },
        // Gold - Premium Accent
        gold: {
          50: '#fffcf0',
          100: '#fef6d6',
          200: '#fde9a8',
          300: '#fbd56f',
          400: '#f8bc3c',
          500: '#f0a020',
          600: '#d47b14',
          700: '#b05714',
          800: '#8f4518',
          900: '#753a17',
        },
        // Cream - Soft warm backgrounds
        cream: {
          50: '#fffdf9',
          100: '#fefbf3',
          200: '#fdf6e7',
          300: '#fbefd4',
          400: '#f8e4b8',
          500: '#f4d89c',
          600: '#e8c574',
          700: '#d4a854',
          800: '#b88a3d',
          900: '#9a7033',
        },
        // Alias primary to brand for compatibility
        primary: {
          50: '#fef8f5',
          100: '#fdf0ea',
          200: '#fbe0d4',
          300: '#f6c7b3',
          400: '#efa388',
          500: '#d4a574',
          600: '#c9956c',
          700: '#b47f5a',
          800: '#96684c',
          900: '#7a5640',
        },
        // Alias neutral to pearl for compatibility
        neutral: {
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
      },
      fontFamily: {
        'display': ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        'heading': ['var(--font-cormorant)', 'Cormorant Garamond', 'Garamond', 'serif'],
        'body': ['var(--font-lora)', 'Lora', 'Georgia', 'serif'],
        'sans': ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
        'script': ['var(--font-dancing)', 'Dancing Script', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-up': 'scaleUp 0.2s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        }
      },
      boxShadow: {
        'luxury': '0 10px 40px rgba(232, 130, 75, 0.15)',
        'luxury-hover': '0 15px 50px rgba(232, 130, 75, 0.25)',
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
