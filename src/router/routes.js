const routes = [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '@/views/index'),
    },
    {
        path: '/demo/table/',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/demo/table'),
    },
    {
        path: '/demo/kline/',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/demo/kline/index'),
    },
];

export default routes;
