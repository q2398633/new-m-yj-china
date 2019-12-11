
/**
 * 日常工作表相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取日常工作表
 */

export const MNECheck = () => {
    return request({
        method: 'POST',
        url: '/RiChang/ChenWuWanJianGrid',
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
