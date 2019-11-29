/**
 * 公告相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取公告列表
 *
 */
export const NoticeList = () => {
    return request({
        method: 'post',
        url: '/SYS/GongGaoGrid'

    })
}
