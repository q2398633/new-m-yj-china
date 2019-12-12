
/**
 * 健康教育登记表相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取健康教育登记表
 */

export const HealthEducationRegistration = () => {
    return request({
        method: 'POST',
        url: '/RiChang/JianKangDengJiGrid',
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
