/**
 * 供应商相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 供应商列表
 * 参数为当前ID
 */

export const SupplierAdmin = () => {
    return request({
        method: 'POST',
        url: '/HouQin/GongYingShangGrid',
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
