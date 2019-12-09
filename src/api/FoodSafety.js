/**
 * 食品安全相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取食品安全检测列表
 *
 */
export const FoodSafety = () => {
    return request({
        method: 'POST',
        url: '/ChuFang/ShiPinJianCeGrid',
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
