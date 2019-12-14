/**
 *食材处理相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 食材处理记录信息
 */

export const FoodProcessingRecord = () => {
    return request({
        method: 'POST',
        url: '/ChuFang/ShiCaiChuLiJiLuGrid',
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
