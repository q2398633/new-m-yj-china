/**
 *员工培训请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 员工培训信息
 */

export const StaffTraining = () => {
    return request({
        method: 'POST',
        url: '/CAW/UserPeiXunGrid',
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
