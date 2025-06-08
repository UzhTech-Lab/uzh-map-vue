import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/styles'
import './assets/vuetify.css'
import vuetify from './plugins/vuetify'
import './assets/styles.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(vuetify)
app.mount('#app')
