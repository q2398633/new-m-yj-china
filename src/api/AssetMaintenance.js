/**
 * 请求资产维护数据
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取资产维护信息
 *
 */
export const AssetMaintenance = () => {
    return request({
        method: 'post',
        url: '/CAW/ZiChanWeiXiuGrid'
    })
}
