/**
 * 体弱/肥胖儿童信息登记信息相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 体弱/肥胖儿童信息登记信息
 */

export const InfirmityRegistration = () => {
    return request({
        method: 'POST',
        url: '/RiChang/TiRuoDengJiGrid',
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
