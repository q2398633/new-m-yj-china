// 配置axios相关
import axios from 'axios'
import store from '../store'

const request = axios.create({
    baseURL: 'http://39.97.98.245:9005/api'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
    const { user } = store.state

    if (config.url !== '/Login/Check' && user) {
        config.headers.Authorization = user
    }

    return config
}, function (error) {
    return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
    console.log(response)
    return response.data.data || response.data
}, function (error) {
    return Promise.reject(error)
})

export default request
