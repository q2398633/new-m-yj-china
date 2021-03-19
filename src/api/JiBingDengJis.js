/**
 * 请求模块
 */
import request from '@/utils/request'


// 疾病防控登记列表
export const JBFKList = params => {
  return request({
    method: 'GET',
    url: '/JiBingDengJis/Load',
    params
  })
}

// 疾病防控登记添加
export const JBFKAdd = data => {
  return request({
    method: 'POST',
    url: '/JiBingDengJis/Add',
    data
  })
}
// 疾病防控登记修改
export const JBFKEdit = data => {
  return request({
    method: 'POST',
    url: 'JiBingDengJis/Update',
    data
  })
}
// 疾病防控登记删除
export const JBFKDelete = data => {
  return request({
    method: 'POST',
    url: 'JiBingDengJis/Delete',
    data
  })
}
