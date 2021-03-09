/**
 * 修改请求模块
 */
import request from '@/utils/request'


// 幼儿修改
export const ChildUPdate = data => {
  return request({
    method: 'POST',
    url: '/Students/Update',
    data
    })
}
// 幼儿添加
export const ChildAdd = data => {
  return request({
    method: 'POST',
    url: '/Students/Add',
    data
    })
}
