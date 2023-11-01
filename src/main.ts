import { createApp } from 'vue'
import '@/assets/style/global.css';
import App from './Index.vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')

