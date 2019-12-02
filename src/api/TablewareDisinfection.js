/**
 * 餐具消毒相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取餐具消毒列表
 *
 */
export const TablewareDisinfection = () => {
    return request({
        method: 'post',
        url: '/SYS/GetToolbarByUrl'
    })
}
