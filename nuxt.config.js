export default {
  head: {
    title: 'eshop',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'https://js.stripe.com/v3',
        defer: true
      }
    ]
  },

  loading: {
    color: '#fed700',
    height: '5px'
  },

  css: [
    "vue-multiselect/dist/vue-multiselect.min.css",

    "@/assets/scss/colors.scss",

    "@/assets/css/style.css",
  ],

  styleResources: {
    scss: ['./assets/scss/*.scss']
  },

  plugins: [
    '~/plugins/api/authenticate.plugins.js',
    '~/plugins/api/categories.plugins.js',
    '~/plugins/api/products.plugins.js',
    '~/plugins/api/cart.plugins.js',
    '~/plugins/api/users.plugins.js',
    '~/plugins/api/paiement.plugins.js',
    '~/plugins/api/orders.plugins.js',
    //
    '~/plugins/jwt.plugins',
    //
    '~/plugins/click-outside.plugins',
    { src: '~/plugins/vee-validate', ssr: false },
    { src: '~/plugins/vuex-persist', ssr: false },
  ],

  components: [
    '~/components/',
    '~/components/back',
    '~/components/front',
    '~/components/ui',
  ],

  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    //
    '@nuxtjs/date-fns',
    '@nuxtjs/style-resources'
  ],

  modules: [
    '@nuxtjs/apollo',
    '@nuxt/http',
  ],

  build: {
    extend(config) {
      config.node = {
        fs: 'empty',
        net: 'empty',
        child_process: 'empty',
      }
    }
  },

  serverMiddleware: [
    { path: "/api", handler: "~/api/newsletter.js" },
    { path: "/api", handler: '~/api/stripe.js' },
    { path: "/api", handler: '~/api/stripe-success.js' },
    { path: "/api", handler: '~/api/send-mail.js' }
  ],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint:
          "https://fullstack-prime.herokuapp.com/graphql",
        persisting: false,
      },
    }
  },

  fontawesome: {
    component: 'fa',
    icons: {
      solid: true,
      brands: true
    }
  },

  dateFns: {
    locale: ['fr']
  },

  env: {
    API_URL: process.env.API_URL,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    STRIPE_PK: process.env.STRIPE_PK,
    STRIPE_PUBLIC: process.env.STRIPE_PUBLIC,
    MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
    MAILCHIMP_LIST_ID: process.env.MAILCHIMP_LIST_ID,
  },

  // server: {
  //   port: 8000 // default: 3000
  // }
}
