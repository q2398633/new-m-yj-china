
/**
 * 膳食管理会议记录相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 膳食管理会议记录
 */

export const MinutesOFMealManagementMeeting = () => {
    return request({
        method: 'POST',
        url: '/RiChang/ShanShiHuiYiGrid',
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
