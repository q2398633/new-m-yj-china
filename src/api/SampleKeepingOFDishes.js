/**
 *菜品留样相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 菜品留样信息
 */

export const SampleKeepingOFDishes = () => {
    return request({
        method: 'POST',
        url: '/ChuFang/CaiPinLiuYangGrid',
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
