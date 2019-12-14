/**
 *员工奖惩记录请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 员工奖惩记录信息
 */

export const EmployeeRewardsAndPunishments = () => {
    return request({
        method: 'POST',
        url: '/CAW/UserJiangChengGrid',
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
