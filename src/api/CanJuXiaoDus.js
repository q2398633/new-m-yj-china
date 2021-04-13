/**
 * 请求模块
 */
 import request from '@/utils/request'


 // 餐具消毒列表
 export const CJXDList = params => {
   return request({
     method: 'GET',
     url: '/CanJuXiaoDus/Load',
     params
   })
 }

 // 餐具消毒添加
 export const CJXDAdd = data => {
   return request({
     method: 'POST',
     url: '/CanJuXiaoDus/Add',
     data
   })
 }
 // 餐具消毒修改
 export const CJXDEdit = data => {
   return request({
     method: 'POST',
     url: '/CanJuXiaoDus/Update',
     data
   })
 }
 // 餐具消毒删除
 export const CJXDDelete = data => {
   return request({
     method: 'POST',
     url: '/CanJuXiaoDus/Delete',
     data
   })
 }
