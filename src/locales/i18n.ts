import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import fr from '@/locales/fr.json'

const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: 'fr', // set locale
  fallbackLocale: 'fr', // set fallback locale
  messages: {
    fr,
    en
  }
})

export default i18n
