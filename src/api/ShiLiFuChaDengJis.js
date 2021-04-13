/**
 * 请求模块
 */
 import request from '@/utils/request'


 // 视力复查列表
 export const SLFCList = params => {
   return request({
     method: 'GET',
     url: '/ShiLiFuChaDengJis/Load',
     params
   })
 }

 // 视力复查添加
 export const SLFCAdd = data => {
   return request({
     method: 'POST',
     url: '/ShiLiFuChaDengJis/Add',
     data
   })
 }
 // 视力复查修改
 export const SLFCEdit = data => {
   return request({
     method: 'POST',
     url: '/ShiLiFuChaDengJis/Update',
     data
   })
 }
 // 视力复查删除
 export const SLFCDelete = data => {
   return request({
     method: 'POST',
     url: '/ShiLiFuChaDengJis/Delete',
     data
   })
 }
