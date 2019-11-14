// 配置axios相关
import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '../store'
import router from '../router/index'
// 创建一个axios实例设置BaseUrl
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/'
})

// 获取到服务器返回的数据
instance.defaults.transformResponse = [function (data) {
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]
instance.interceptors.request.use(function (config) {
  // 判断是否有登陆状态  主要，此处是一个普通的js模块，不是组件，要导入store
  if (store.state.user) {
    // 如果有登陆状态请求的时候，自动携带token
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  // Do something with response data

  // 接口返回的数据中都有data，在此处统一返回接口返回的data
  // 如果接口返回数据中没有data，此时返回axios响应对象的data属性
  return response.data.data || response.data
}, async function (error) {
  // 判断状态码是不是401
  console.dir(error)
  if (error.response.status === 401) {
    // 如果是401 使用refresh_token 交换新的token
    const refreshToken = store.state.user.refresh_token
    try {
      const response = await axios({
        method: 'put',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      // 新的2小时可用token
      const token = response.data.data.token
      // 存储新的的token
      store.commit('setUser', {
        token: token,
        refresh_token: refreshToken
      })
      // 重新发送401的请求
      return instance(error.config)
    } catch (err) {
      // 跳转到首页
      // 如果refresh_token过期，跳转到登录页面
      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
  }

  // Do something with response error
  return Promise.reject(error)
})

export default instance
