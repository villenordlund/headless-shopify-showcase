module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xxs': '360px',
      // => @media (min-width: 360px) { ... }

      'xxs-max': { 'max': '359px' },
      // => @media (max-width: 359px) { ... }

      'xs': '420px',
      // => @media (min-width: 420px) { ... }

      'xs-max': { 'max': '419px' },
      // => @media (max-width: 479px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'sm-max': { 'max': '639px' },
      // => @media (max-width: 639px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'md-max': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'lg-max': { 'max': '1023px' },
      // => @media (max-width: 1023px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      'xl-max': { 'max': '1279px' },
      // => @media (max-width: 1279px) { ... }

      'xxl': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      green: '#33CC00',
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        500: '#6B7280',
        dark: '#111827',
      }
    },
    fontFamily: {
      'mono': 'source code pro',
    },
    fontWeigth: {
      light: 300,
      normal: 400,
      semiBold: 600,
    },
    fontSize: {
      'xs': '.615rem', // 9.833px
      'sm': '.691em', // 11.062px
      'md': '.778rem', // 12.444px
      'lg': '1.246rem', // 19.934px
      'xl': '1.402rem', // 22.425px
      '2xl': '1.577rem', // 25.228px
      '3xl': '1.774rem', // 28.382px
      '4xl': '1.996rem', // 31.93px
      '5xl': '2.245rem', // 35.921px
      '6xl': '2.526rem', // 40.411px
      '7xl': '2.841rem', // 45.462px
      '8xl': '3.197rem', // 51.145px
      '9xl': '3.596rem', // 57.538px
      '10xl': '4.046rem', // 64.731px
      '11xl': '4.551rem', // 72.822px
    },
    extend: {
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [

  ],
}
