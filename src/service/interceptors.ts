import axios from "axios";
import { message, Button } from 'antd';
import store from "../store/index"
// axios拦截器

axios.interceptors.request.use(
    config => {
        
        if (store.user.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers!.Authorization = `Bearer ${store.user.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.user.init();
                    message.error("请先登录");
                    window.location.href ="/login";
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });

export default axios