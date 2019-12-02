/**
 * 删除相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 删除列表
 * 参数为当前ID
 */
export const DelectList = (Id) => {
    return request({
        method: 'post',
        url: '/STU/STUBanJiDel',
        data: {
            Id: Id
        }
    })
}
