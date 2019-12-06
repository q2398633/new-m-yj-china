
/**
 * 能耗详情相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取能耗详情列表
 */

export const EnergyConsumptionDetails = () => {
    return request({
        method: 'POST',
        url: '/CAW/NengHaoShiYongGrid',
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
