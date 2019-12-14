/**
 *工资列表请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 工资列表信息
 */

export const WageList = () => {
    return request({
        method: 'POST',
        url: '/HR/HRGongZiFangAnGrid',
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
