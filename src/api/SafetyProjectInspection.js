/**
 * 安全项目检测请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取安全项目检测列表
 *
 */
export const SafetyProjectInspectionList = () => {
    return request({
        method: 'post',
        url: '/ChuFang/AnJianXiangMuGrid'
    })
}
