const routes = [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '@/views/index'),
    },
    {
        path: '/demo',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/demo'),
    },
];

export default routes;
