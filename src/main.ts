import { createApp } from 'vue'
import { router } from './router/router'
import App from './App.vue'
import myHeader from '@/components/my-header.vue'
import { createPinia } from 'pinia'
const app = createApp(App)

app.component('my-header', myHeader)

app.use(createPinia())

app.use(router)

app.mount('#app')
