import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';

import Chart from 'primevue/chart';


createApp(App).use(PrimeVue).component("Chart", Chart).mount('#app')
