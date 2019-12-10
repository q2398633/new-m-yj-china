/**
 * 出库管理相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 出库列表
 * 参数为当前ID
 */

export const OutgoingManagement = () => {
    return request({
        method: 'POST',
        url: '/HouQin/ChuKuGrid',
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
