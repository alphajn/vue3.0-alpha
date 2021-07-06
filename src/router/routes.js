const routes = [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '@/views/index'),
    },
    {
        path: '/demo/table/',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/demo/table'),
    },
];

export default routes;
