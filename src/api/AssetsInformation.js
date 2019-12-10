/**
 * 请求资产维护数据
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取资产维护信息
 *
 */

export const AssetsInformation = () => {
    return request({
        method: 'POST',
        url: '/ZiChan/ZiChanXinXiGrid',
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
