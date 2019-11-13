// 配置axios相关
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://39.97.98.245:9005/api'
})

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 请求前处理
    return config
  },
  function (error) {
    // 请求错误时做些事
    return Promise.reject(error)
  })

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 处理响应数据
    return response.data.data || response.data
  },
  function (error) {
    // 请求错误时做些事
    return Promise.reject(error)
  })
export default request
