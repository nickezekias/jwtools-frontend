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
import Chips from 'primevue/chips';
import ColorPicker from 'primevue/colorpicker';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import Editor from 'primevue/editor';
import FileUpload from 'primevue/fileupload';
import FloatLabel from 'primevue/floatlabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import ProgressBar from 'primevue/progressbar';
import Ripple from 'primevue/ripple';
import Sidebar from 'primevue/sidebar';
import StyleClass from 'primevue/styleclass';
// import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice'
import Toolbar from 'primevue/toolbar';
import TreeSelect from 'primevue/treeselect';


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
app.use(ToastService)

app.directive('badge', BadgeDirective);
app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);

app.component('PrimeAvatar', Avatar)
app.component('PrimeBreadcrumb', Breadcrumb)
app.component('PrimeButton', Button)
app.component('PrimeCard', Card)
app.component('PrimeChips', Chips)
app.component('PrimeColorPicker', ColorPicker)
app.component('PrimeColumn', Column)
app.component('PrimeDataTable', DataTable)
app.component('PrimeDialog', Dialog)
app.component('PrimeDropdown', Dropdown)
app.component('PrimeEditor', Editor)
app.component('PrimeFileUpload', FileUpload)
app.component('PrimeFloatLabel', FloatLabel)
app.component('PrimeIconField', IconField)
app.component('PrimeInputIcon', InputIcon)
app.component('PrimeInputNumber', InputNumber)
app.component('PrimeInputText', InputText)
app.component('PrimePassword', Password)
app.component('PrimeProgressBar', ProgressBar)
app.component('PrimeSidebar', Sidebar)
// app.component('PrimeTextarea', Textarea)
app.component('PrimeToast', Toast)
app.component('PrimeToolbar', Toolbar)
app.component('PrimeTreeSelect', TreeSelect)

app.mount('#app')
