
/**
 * 交接班登记表相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取交接班登记表
 */

export const ShiftHandoverRegistration = () => {
    return request({
        method: 'POST',
        url: '/RiChang/JiaoJieBanGrid',
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
