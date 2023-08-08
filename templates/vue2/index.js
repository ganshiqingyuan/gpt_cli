import Vue from 'vue';
import Index from './index.vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);


import './static/css/reset.css';
import dayjs from 'dayjs';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import {
    Button as button,
} from 'vant';
Vue.use(button);



import router from './route.js';
import request from './request.js';
import store from './store/store.js';


Vue.use(request);


Vue.mixin({
    methods: {
        formatDate: function (date) {
            return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
        },
    },
});

new Vue({
    data() {
        return {
            text: 123,
        };
    },
    router,
    store,
    el: '#app',
    render: c => c('Index'),
    components: {
        Index,
    },

    //template:"<h1>123123</h1>"
});
