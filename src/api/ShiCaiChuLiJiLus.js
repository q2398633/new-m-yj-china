/**
 * 请求模块
 */
 import request from '@/utils/request'


 // 食材处理记录列表
 export const SCCLList = params => {
   return request({
     method: 'GET',
     url: '/ShiCaiChuLiJiLus/Load',
     params
   })
 }

 // 食材处理记录添加
 export const SCCLAdd = data => {
   return request({
     method: 'POST',
     url: '/ShiCaiChuLiJiLus/Add',
     data
   })
 }
 // 食材处理记录修改
 export const SCCLEdit = data => {
   return request({
     method: 'POST',
     url: '/ShiCaiChuLiJiLus/Update',
     data
   })
 }
 // 食材处理记录删除
 export const SCCLDelete = data => {
   return request({
     method: 'POST',
     url: '/ShiCaiChuLiJiLus/Delete',
     data
   })
 }
