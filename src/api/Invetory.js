/**
 * 请求库存清单数据
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取库存清单信息
 *
 */

export const Invetory = () => {
    return request({
        method: 'POST',
        url: '/HouQin/KuCunGrid',
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
