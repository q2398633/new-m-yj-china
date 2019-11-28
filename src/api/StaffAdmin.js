/**
 * 员工列表相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取员工列表
 *
 */
export const StaffList = () => {
    return request({
        method: 'post',
        url: '/HR/UsersGrid'
    })
}
