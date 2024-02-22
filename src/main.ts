import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useI18n } from 'vue-i18n'
import i18n from './locale/i18n'

const app = createApp(App, {
  setup() {
    const { t } = useI18n() // call `useI18n`, and spread `t` from  `useI18n` returning
    return { t } // return render context that included `t`
  }
})

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
