// 用户相关接口封装
import request from '../utils/request'

export const login = ({
    mobile,
    code
}) => {
    return request.post('authorizations', {
        mobile,
        code
    })
}
