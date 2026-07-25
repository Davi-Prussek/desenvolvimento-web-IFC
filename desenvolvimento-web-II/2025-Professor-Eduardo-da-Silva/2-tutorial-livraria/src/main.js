import router from './router'

import { createPinia } from 'pinia'
const pinia = createPinia();

import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(router).use(pinia).mount('#app');
