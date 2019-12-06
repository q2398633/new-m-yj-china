
/**
 * 区域消毒相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取区域消毒列表
 */

export const RegionalDisinfection = () => {
    return request({
        method: 'POST',
        url: '/ChuFang/QuYuXiaoDuGrid',
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
