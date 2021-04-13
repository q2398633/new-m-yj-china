/**
 * 修改请求模块
 */
import request from '@/utils/request'


// 幼儿修改
export const ChildUPdate = data => {
  return request({
    method: 'POST',
    url: '/Student/Update',
    data
    })
}
// 幼儿添加
export const ChildAdd = data => {
  return request({
    method: 'POST',
    url: '/Student/Add',
    data
    })
}

// 幼儿调班
export const ChildTB = data => {
  return request({
    method: 'POST',
    url: '/Student/TiaoBan',
    data
    })
}
