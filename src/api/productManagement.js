/**
 * 产品管理相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 产品列表
 * 参数为当前ID
 */

export const productManagement = () => {
    return request({
        method: 'POST',
        url: '/HouQin/ChanPinGrid',
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