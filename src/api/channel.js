/**
 * 首页相关请求函数
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 用户关注的频道的列表
 * 未登录 默认列表
 */
export const getChannelsDefaultOrUser = () => {
    return request({
        method: 'GET',
        url: 'user/channels'
    })
}
