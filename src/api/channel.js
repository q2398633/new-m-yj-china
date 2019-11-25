/**
 * 幼儿列表相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取幼儿列表
 * 未登录 默认列表
 */
export const getList = () => {
    return request({
        method: 'post',
        url: '/STU/STUStudentGrid'
    })
}
