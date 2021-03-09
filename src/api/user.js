/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
import store from '@/store/'

export const { user } = store.state
/**
 * 登录/注册
 */
// 登录信息
export const login = data => {
  return request({
    method: 'POST',
    url: '/check/login',
    data
  })
}
// 幼儿列表
export const CList = params => {
  return request({
    method: 'GET',
    url: '/Students/Load',
    params
    })
}
