/**
 * 食谱相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取食谱列表
 *
 */

export const RecipesList = () => {
    return request({
        method: 'POST',
        url: '/YYB/YYBCaiYaoGrid',
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
