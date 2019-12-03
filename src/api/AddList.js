/**
 * 添加相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 添加列表
 * 传值为表单
 */

export const AddList = ({
    Title,
    Status,
    NianJi,
    Mark,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/STU/STUBanJiAdd',
        data: {
            Title,
            Status,
            NianJi,
            Mark,
            Id
        },
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
