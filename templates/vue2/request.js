import axios from 'axios';
import router from './route.js';
import Vue from 'vue';

const request = axios.create({
    //baseURL: '/',
    baseURL: '/',
    //timeout:10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

request.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        notice({
            title: '警告',
            message: error,
            type: 'error',
        });
    },
);

request.interceptors.response.use(
    function (response) {
        console.log(response)
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response.data);
        } else if (response.data.resultCode === '1') {
            Vue.prototype.$notify({
                title: '提示',
                message: response.data.message,
                type: 'warning',
            });
            return Promise.reject(false);
        } else {
            Vue.prototype.$notify({
                title: '警告',
                message: response.data.message,
                type: 'error',
            });
            return Promise.reject(false);
        }
    },
    function (error) {
        Vue.prototype.$notify({
            title: '警告',
            message: error,
            type: 'error',
        });
        return Promise.reject(false);
    },
);

const apis = {
    getEnrollList: function (params) {
        return request({
            url: 'api/enroll/list',
            method: 'get',
            params,
        });
    },
    changeEnroll: function (data) {
        return request({
            url: 'api/enroll/change',
            method: 'post',
            data,
        });
    },
    changeEnrollStatus: function (data) {
        return request({
            url: 'api/enroll/status',
            method: 'post',
            data,
        });
    }
};
export default {
    install: function (Vue) {
        Vue.prototype.$rq = apis;
    },
};
