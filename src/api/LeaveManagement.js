/**
 *请假管理请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 请假信息
 */

export const LeaveManagement = () => {
    return request({
        method: 'POST',
        url: '/HR/QingJiaGrid',
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
