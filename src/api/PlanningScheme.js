/**
 * 策划方案相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取策划方案列表
 *
 */

export const PlanningScheme = () => {
    return request({
        method: 'POST',
        url: '/ZhaoSheng/HuoDongGrid',
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
