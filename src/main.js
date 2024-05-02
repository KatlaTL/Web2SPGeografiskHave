import './assets/styling/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { usePricesStore } from './stores/prices'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const pricesStore = usePricesStore();

app.mount('#app')
