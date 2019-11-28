/**
 * 班级列表请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取班级列表
 *
 */
export const ClassList = () => {
    return request({
        method: 'post',
        url: '/STU/STUBanJiGrid'
    })
}
