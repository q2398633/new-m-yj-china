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
        method: 'post',
        url: '/YYB/YYBCaiYaoGrid'
    })
}
