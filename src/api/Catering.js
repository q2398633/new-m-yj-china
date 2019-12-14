/**
 *配餐信息相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 配餐信息
 */

export const Catering = () => {
    return request({
        method: 'POST',
        url: '/STU/KaoQinPeiCan',
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
