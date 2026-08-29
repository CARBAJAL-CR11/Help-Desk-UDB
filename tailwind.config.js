/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      gridTemplateColumns:{
        '70/30': '70% 28%'
      },
      colors: {
        brand : {
          50: '#FFFFFF', // Blanco
          100: '#D4D9ED', // Tono grisaseo claro
          200: '#A9BFE5', // Azul palido
          300: '#ABBDFF', // Morado palido
          400: '#3063FF', // Azul claro
          500: '#1242D6', // Azul estandar
          600: '#486284', // Azul marino
          700: '#F1F2F9', // Blanco fondo
          800: '#1A202C', // Color Azul muy oscuro
          900: '#D9DEE8' // Color gris levemente claro
        },
      }
    },
  },
  variants: {
    extendL: {},
  },
  plugins: [],
}

