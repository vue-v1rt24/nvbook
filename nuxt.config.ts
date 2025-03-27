export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      meta: [{ name: 'yandex-verification', content: '9679f16570bf7142' }],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
    pageTransition: { name: 'pageopacity', mode: 'out-in' },
  },

  pages: true,

  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'active',
    },
  },

  css: ['assets/css/index.css'],

  experimental: {
    typedPages: true,
  },

  modules: [
    '@nuxt/image',
    'nuxt-viewport',
    'nuxt-mail',
    'vue-yandex-maps/nuxt',
    'yandex-metrika-module-nuxt3',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  runtimeConfig: {
    public: {
      domains: process.env.NUXT_PUBLIC_DOMAINS,
      graphqlUrl: process.env.NUXT_PUBLIC_GRAPHQL_URL,
    },
  },

  devtools: { enabled: true },

  image: {
    domains: [`${process.env.NUXT_PUBLIC_DOMAINS}`],
  },

  viewport: {
    breakpoints: {
      screen1024: 1024,
      screen1200: 1200,
      screen1280: 1280,
      screen1300: 1300,
      screen1600: 1600,

      screen768: 768,
      screen576: 576,
      screen320: 320,
    },
  },

  mail: {
    message: {
      from: 'pranaittech@yandex.ru',
      to: 'info@pranait.ru',
    },
    smtp: {
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'pranaittech',
        pass: 'iktcqrrmgrwuizie',
      },
    },
  },

  yandexMaps: {
    apikey: 'f52ff3fc-0a45-4e8f-8507-e60a0a562e75',
  },

  yandexMetrika: {
    id: '98315354',
    webvisor: true,
  },

  site: {
    url: 'https://pranait.ru',
    name: 'Разработка сайтов и медиа контента в Ставрополе',
  },

  nitro: {
    compressPublicAssets: true,
    minify: true,
  },

  compatibilityDate: '2024-08-19',
});
