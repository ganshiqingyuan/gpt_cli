import VueRouter from 'vue-router';

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/app/page1',
        },
        {
            path: '/houtai',
            component: () => import('./components/houtai.vue'),
            children: [
                {
                    path: '/houtai/enrollmanager',
                    component: () =>
                        import(
                            './components/element/enroll-list.vue'
                        ),
                }
            ],
        },
        {
            path: '/app',
            component: () => import('./components/app.vue'),
            children: [
                {
                    name: 'page1',
                    path: '/app/page1',
                    component: () => import('./components/vant/page1.vue')
                },
                {
                    name: 'page2',
                    path: '/app/page2',
                    component: () => import('./components/vant/page2.vue')
                }
            ]
        }
    ],
});