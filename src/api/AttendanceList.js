/**
 * 考勤列表相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取考勤列表
 *
 */

export const AttendanceList = () => {
    return request({
        method: 'POST',
        url: '/STU/STUKaoQinGrid',
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
