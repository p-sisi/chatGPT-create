import { createRouter,createWebHashHistory } from "vue-router";

const routes = [
    {
        name: 'homepage',  
        path: '/homepage',
        component: () => import('@/views/index.vue'),
    },
    {
        name: 'ai-create',
        path: '/ai-create',
        component: () => import('@/views/Create.vue'),
    },
    {
        path: '/',
        redirect: '/homepage'    
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
