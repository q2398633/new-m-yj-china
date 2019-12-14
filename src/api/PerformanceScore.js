/**
 *绩效评分请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 绩效评分信息
 */

export const PerformanceScore = () => {
    return request({
        method: 'POST',
        url: '/HR/UserJiXiaoKaoHeGrid',
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
