import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        theme: {
            defaultTheme: 'formSet',
            themes: { formSet: {
                dark: false,
                    colors: {
                    primary: '#3CB043'
                    }
                }}
        }
    })

    nuxtApp.vueApp.use(vuetify)
})
