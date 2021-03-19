/**
 * 请求模块
 */
import request from '@/utils/request'


// 健康教育登记列表
export const JKDJList = params => {
  return request({
    method: 'GET',
    url: '/JianKangDengJis/Load',
    params
  })
}

// 健康教育登记添加
export const JKDJAdd = data => {
  return request({
    method: 'POST',
    url: '/JianKangDengJis/Add',
    data
  })
}
// 健康教育登记修改
export const JKDJEdit = data => {
  return request({
    method: 'POST',
    url: '/JianKangDengJis/Update',
    data
  })
}
// 健康教育登记删除
export const JKDJDelete = data => {
  return request({
    method: 'POST',
    url: '/JianKangDengJis/Delete',
    data
  })
}
