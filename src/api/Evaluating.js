/**
 * 督导评估相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取评测列表
 *
 */
export const EvaluatingList = () => {
    return request({
        method: 'post',
        url: '/Eva/EvaShiJuanGrid',
        data: {
            fields: 'title,DeFen'
        }

    })
}
