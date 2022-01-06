import { createRouter, createWebHistory } from 'vue-router';
import { langs } from '@/config/setup';
import routes from './routes';
import langEach from './langEach';

const routeList = [];

if (langs.length > 1) {
    // 生成多语言路由
    langs.forEach((lang) => {
        routes.forEach((item) => {
            routeList.push({
                ...item,
                path: `/${lang}/${item.path.replace(/^\/+/, '')}`,
                meta: {
                    layout: 'Default',
                    ...item.meta,
                },
            });
        });
    });
} else {
    routes.forEach((item) => {
        routeList.push({
            ...item,
            path: `/${item.path.replace(/^\/+/, '')}`,
            meta: {
                layout: 'Default',
                ...item.meta,
            },
        });
    });
}

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routeList,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash,
                // behavior: 'smooth',
            };
        }

        return savedPosition || {
            left: 0,
            top: 0,
            // behavior: 'smooth',
        };
    },
});

/**
 * 添加路由守卫
 *
 * @param {object|array} context 路由守卫
 */
const routerEach = (context) => {
    if (Array.isArray(context)) {
        context.forEach((item) => router.beforeEach(item));
    } else {
        if (Array.isArray(context.beforeEach)) {
            context.beforeEach.forEach((item) => router.beforeEach(item));
        }

        if (Array.isArray(context.afterEach)) {
            context.afterEach.forEach((item) => router.afterEach(item));
        }
    }
};

routerEach(langEach);

export default router;
