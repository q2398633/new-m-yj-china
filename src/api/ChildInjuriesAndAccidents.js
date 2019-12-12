/**
 * 儿童伤害和意外事故信息登记信息相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 儿童伤害和意外事故信息登记信息
 */

export const ChildInjuriesAndAccidents = () => {
    return request({
        method: 'POST',
        url: '/RiChang/ShangHaiDengJiGrid',
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
