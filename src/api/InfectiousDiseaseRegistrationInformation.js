/**
 * 传染病信息登记相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 传染病信息登记
 */

export const InfectiousDiseaseRegistrationInformation = () => {
    return request({
        method: 'POST',
        url: '/RiChang/ChuanRanBingDengJiGrid',
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
