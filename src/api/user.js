// 用户相关接口封装
import request from '../utils/request'

export const login = ({
    username,
    password
}) => {
    return request({
        method: 'GET',
        url: '/Login/Check',
        params: {
            username,
            password
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
