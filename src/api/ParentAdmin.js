/**
 * 家长列表相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取家长列表
 *
 */
export const ParentList = () => {
    return request({
        method: 'post',
        url: '/STU/STUParentGrid'
    })
}
