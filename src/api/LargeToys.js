/**
 * 大型玩具信息相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 大型玩具信息登记
 */

export const LargeToys = () => {
    return request({
        method: 'POST',
        url: '/RiChang/DaXingWanJuGrid',
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
