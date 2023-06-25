// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    pages: true,
    css: [
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css',
    ],
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        define: {
            'process.env.DEBUG': true,
        },
    },
    runtimeConfig: {
        public: {
            auth0Domain: process.env.AUTH0_DOMAIN,
            auth0ClientId: process.env.AUTH0_CLIENT_ID,
        },
    }
})
