/**
 * 请求模块
 */
 import request from '@/utils/request'


 // 视力登记列表
 export const SLDJList = params => {
   return request({
     method: 'GET',
     url: '/ShiLiDengJis/Load',
     params
   })
 }

 // 视力登记添加
 export const SLDJAdd = data => {
   return request({
     method: 'POST',
     url: '/ShiLiDengJis/Add',
     data
   })
 }
 // 视力登记修改
 export const SLDJEdit = data => {
   return request({
     method: 'POST',
     url: '/ShiLiDengJis/Update',
     data
   })
 }
 // 视力登记删除
 export const SLDJDelete = data => {
   return request({
     method: 'POST',
     url: '/ShiLiDengJis/Delete',
     data
   })
 }
