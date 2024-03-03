import { createApp } from 'vue'
import App from './App.vue'
import router from './utils/router'

createApp(App).use(router).mount('#app')
process.noAsar = true