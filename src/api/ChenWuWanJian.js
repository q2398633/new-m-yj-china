/**
 * 请求模块
 */
import request from '@/utils/request'


// 晨午晚检列表
export const CWWJList = params => {
  return request({
    method: 'GET',
    url: '/ChenWuWanJians/Load',
    params
    })
}

// 晨午晚检添加
export const CWWJAdd = data => {
  return request({
    method: 'POST',
    url: '/ChenWuWanJians/Add',
    data
    })
}
// 晨午晚检修改
export const CWWJEdit = data => {
  return request({
    method: 'POST',
    url: 'ChenWuWanJians/Update',
    data
    })
}
// 晨午晚检删除
export const CWWJDelete = data => {
  return request({
    method: 'POST',
    url: 'ChenWuWanJians/Delete',
    data
    })
}
