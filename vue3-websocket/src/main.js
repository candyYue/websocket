import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import routers from './router.js'
import store from './store'
const app = createApp(App)
app.use(ElementPlus)
app.use(routers)
app.use(store)
app.mount('#app')
