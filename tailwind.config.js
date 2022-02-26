module.exports = {
  content: ["./*.{html,js}"],
  mode:'jit',
  purge:["./*.{html,js}"],
  theme: {
    screens: {
      'sm': {'min': '100px', 'max': '767px'},
      // => @media (min-width: 100px and max-width: 767px) { ... }

      'md': {'min': '768px', 'max': '1536px'},
      // => @media (min-width: 768px and max-width: 1536px) { ... }

    },
    extend: {
     
    },
  },
  plugins: [],
}
