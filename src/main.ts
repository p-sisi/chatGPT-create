import { createApp } from 'vue'
import '@/assets/style/global.css';
import App from './Index.vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router/index.ts';

const app = createApp(App)

app.use(ElementPlus)
app.use(router);
app.mount('#app')

