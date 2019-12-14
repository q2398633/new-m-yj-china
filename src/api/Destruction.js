/**
 *菜品留样销毁请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 菜品留样销毁信息
 */

export const Destruction = ({
    CanBie,
    CaiYaoIdName,
    CaiYaoId,
    LiuYangRen,
    JiaGongRen,
    LiuYangRiQi,
    LiuYangWeiZhi,
    YuJiXiaoHuiRiQi,
    XiaoHuiRiQi,
    XiaoHuiRen,
    BeiZhu,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/ChuFang/CaiPinLiuYangXiaoHui',
        data: {
            CanBie,
            CaiYaoIdName,
            CaiYaoId,
            LiuYangRen,
            JiaGongRen,
            LiuYangRiQi,
            LiuYangWeiZhi,
            YuJiXiaoHuiRiQi,
            XiaoHuiRiQi,
            XiaoHuiRen,
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
