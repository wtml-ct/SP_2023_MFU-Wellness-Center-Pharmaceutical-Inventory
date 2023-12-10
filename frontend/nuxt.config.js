import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,
  target: "static",
  router: {
    mode: "hash",
    base: "/wncmfu/",
  },

  head: {
    titleTemplate: '%s - Pharmaceutical-Wellness',
    title: 'Pharmaceutical-Wellness',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],

    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Thai&display=swap",
      },
    ]
  },
  css: [],

  plugins: [],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/auth'
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  publicPath: "/wncmfu/",
  axios: {
    baseURL: "http://localhost:3000/",
    proxy: true,

  },

  // if use this.$axios.get('/wncmfu/api/...')
  proxy: {
    "/api": {
      target: "http://127.0.0.1:8088",
      changeOrigin: true,
    },
  },

  auth: {
    strategies: {
      user: {
        property: 'data'
      },
      local: {
        redirect: {
          login: "/login",
          home: "/",
        },
        endpoints: {
          login: { url: "/api/users/login", method: "post", propertyName: 'token' },
          user: { url: "/api/users/getLogin", method: "get", propertyName: 'data' },
        },
      },
    },
  },

  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    defaultAssets: {
      font: {
        family: "Noto Sans Thai",
      },
    },
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },


  build: {}
}
