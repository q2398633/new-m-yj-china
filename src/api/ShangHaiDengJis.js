/**
 * 请求模块
 */
 import request from '@/utils/request'


 // 儿童伤害与意外事故登记Get列表
 export const SHDJGetList = params => {
   return request({
     method: 'GET',
     url: '/ShangHaiDengJis/Get',
     params
   })
 }

// 儿童伤害与意外事故登记Load列表
export const SHDJList = params => {
  return request({
    method: 'GET',
    url: '/ShangHaiDengJis/Load',
    params
  })
}

 // 儿童伤害与意外事故登记添加
 export const SHDJAdd = data => {
   return request({
     method: 'POST',
     url: '/ShangHaiDengJis/Add',
     data
   })
 }
 // 儿童伤害与意外事故登记修改
 export const SHDJEdit = data => {
   return request({
     method: 'POST',
     url: '/ShangHaiDengJis/Update',
     data
   })
 }
 // 儿童伤害与意外事故登记删除
 export const SHDJDelete = data => {
   return request({
     method: 'POST',
     url: '/ShangHaiDengJis/Delete',
     data
   })
 }
