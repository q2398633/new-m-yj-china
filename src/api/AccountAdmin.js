/**
 * 银行账户相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 获取银行账户列表
 *
 */
export const AccountList = () => {
    return request({
        method: 'post',
        url: '/CAW/YinHangZhangHuGrid'
    })
}
