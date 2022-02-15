import axios from "axios";
import qs from 'query-string'
import {message} from "antd";
import NProgress from "nprogress"
import 'nprogress/nprogress.css'

const instance = axios.create(
    {
        timeout: 4000,
    }
);

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const {method,data} = config
    NProgress.start()
    if (method.toLowerCase() === 'post') {
        if(data instanceof Object) {
            config.data = qs.stringify(data)
        }
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(
    (response)=>{
        NProgress.done()
        return response.data
    },
    (error  )=>{
        message.error(error.message,1)
        return new Promise(()=>{})
    });

export default instance