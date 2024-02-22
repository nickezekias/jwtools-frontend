import 'primeflex/primeflex.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useI18n } from 'vue-i18n'
import i18n from './locales/i18n'
import PrimeVue from 'primevue/config'

import Avatar from 'primevue/avatar'

import BadgeDirective from "primevue/badgedirective";
import Breadcrumb from 'primevue/breadcrumb';
import Button from "primevue/button"
import Card from 'primevue/card';
import FloatLabel from 'primevue/floatlabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import ProgressBar from 'primevue/progressbar';
import Ripple from 'primevue/ripple';
import Sidebar from 'primevue/sidebar';
import StyleClass from 'primevue/styleclass';
import Toolbar from 'primevue/toolbar';


const app = createApp(App, {
  setup() {
    const { t } = useI18n() // call `useI18n`, and spread `t` from  `useI18n` returning
    return { t } // return render context that included `t`
  }
})

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(PrimeVue, { ripple: true })

app.directive('badge', BadgeDirective);
app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);

app.component('PrimeAvatar', Avatar)
app.component('PrimeBreadcrumb', Breadcrumb)
app.component('PrimeButton', Button)
app.component('PrimeCard', Card)
app.component('PrimeFloatLabel', FloatLabel)
app.component('PrimeIconField', IconField)
app.component('PrimeInputIcon', InputIcon)
app.component('PrimeInputText', InputText)
app.component('PrimePassword', Password)
app.component('PrimeProgressBar', ProgressBar)
app.component('PrimeSidebar', Sidebar)
app.component('PrimeToolbar', Toolbar)

app.mount('#app')
