/**
 * 请求资产信息表数据
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取资产信息列表
 *
 */
export const AssetsInformation = () => {
    return request({
        method: 'post',
        url: '/ZiChan/ZiChanXinXiGrid'
    })
}
