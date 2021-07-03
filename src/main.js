import { createApp } from 'vue';
import { i18n } from '@/lang/i18n';
import { install as api } from '@/config/api';
import App from './App';
import router from './router';
import store from './store';

createApp(App)
    .use(i18n)
    .use(store)
    .use(router)
    .use(api)
    .mount('#app');
