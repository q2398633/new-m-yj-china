/**
 * 请求模块
 */
 import request from '@/utils/request'


 // 能耗使用列表
 export const NHSYList = params => {
   return request({
     method: 'GET',
     url: '/NengHaoShiYongs/Load',
     params
   })
 }

 // 能耗使用添加
 export const NHSYAdd = data => {
   return request({
     method: 'POST',
     url: '/NengHaoShiYongs/Add',
     data
   })
 }
 // 能耗使用修改
 export const NHSYEdit = data => {
   return request({
     method: 'POST',
     url: '/NengHaoShiYongs/Update',
     data
   })
 }
 // 能耗使用删除
 export const NHSYDelete = data => {
   return request({
     method: 'POST',
     url: '/NengHaoShiYongs/Delete',
     data
   })
 }
