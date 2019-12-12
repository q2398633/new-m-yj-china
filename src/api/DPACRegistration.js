
/**
 * 疾病防控登记表相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 急病防控登记表
 */

export const DPACRegistration = () => {
    return request({
        method: 'POST',
        url: '/RiChang/JiBingDengJiGrid',
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
