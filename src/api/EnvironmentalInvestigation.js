/**
 * 环境调研相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 入库列表
 * 参数为当前ID
 */

export const EnvironmentalInvestigation = () => {
    return request({
        method: 'POST',
        url: '/ZhaoSheng/HuanJingDiaoYanGrid',
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
