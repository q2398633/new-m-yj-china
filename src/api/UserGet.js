// 用户信息获取请求
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 当前用户信息
 * 参数为当前ID
 */

export const UserGet = () => {
    return request({
        method: 'GET',
        url: '/SYS/UserGet',
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
