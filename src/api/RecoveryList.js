
/**
 * 治愈相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 治愈列表
 * 传值为表单
 */

export const RecoveryList1 = ({
    StudentIdName,
    StudentId,
    BanJiIdName,
    XingBie,
    Date,
    FaBingMingCheng,
    QuYuDate,
    JiLuRen,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/RiChang/ChuanRanBingDengJiQuanYu',
        data: {
            StudentIdName,
            StudentId,
            BanJiIdName,
            XingBie,
            Date,
            FaBingMingCheng,
            QuYuDate,
            JiLuRen,
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
