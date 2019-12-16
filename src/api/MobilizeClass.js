/**
 * 调级相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 调级信息登记
 */

export const MobilizeClass = ({
    XianBanJi,
    XianNianJi,
    TiaoBanTime,
    BeiZhu,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/STU/STUTiaoBanAdd',
        data: {
            XianBanJi,
            XianNianJi,
            TiaoBanTime,
            BeiZhu,
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
