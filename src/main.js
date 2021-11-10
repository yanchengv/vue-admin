import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(ElementPlus,{locale})
app.mount('#app')
