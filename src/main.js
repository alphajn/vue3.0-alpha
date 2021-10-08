import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import { i18n } from '@/lang/i18n';
import { install as api } from '@/config/api';
import App from './App';
import router from './router';
import store from './store';
import 'element-plus/dist/index.css';

createApp(App)
    .use(i18n)
    .use(store)
    .use(router)
    .use(api)
    .use(ElementPlus)
    .mount('#app');
