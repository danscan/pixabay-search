const { default: ModularRemScale } = require('@danscan/modular-scale');

const spatialScaleMap = new ModularRemScale({
  firstPower: -1,
  ratio: 'perfect-fifth',
  rootFontSizePx: 16,
}).getMap();

module.exports = {
  theme: {
    extend: {
      spacing: spatialScaleMap,
      fontSize: spatialScaleMap,
      maxWidth: spatialScaleMap,
    },

    colors: {
      // Tailwind Defaults
      transparent: 'transparent',
      black: '#000',
      white: '#fff',

      // Color ranges
      gray: {
        100: '#eee',
        200: '#ebebeb',
        300: '#ececec',
        400: '#ccc',
        500: '#999',
        600: '#777',
        700: '#555',
        800: '#1a1a1a',
        900: '#111',
      },

      // Single Colors
      'blue-lighter': '#99ffff',
      'blue-light': '#99ccff',
      blue: 'blue',
      green: '#00cc66',
      orange: '#ff9900',
      pink: '#ff9999',
      'pink-intense': '#ff00cc',
      purple: '#6633cc',
      'red-lighter': '#ff3366',
      'red-light': '#ff0066',
      red: '#ff0033',
      'teal-light': '#99ff99',
      teal: '#00ffcc',
      yellow: '#ffce33',
    },
  },
};
