/**
 * 请求模块
 */
 import request from '@/utils/request'


 // 区域消毒列表
 export const QYXDList = params => {
   return request({
     method: 'GET',
     url: '/QuYuXiaoDus/Load',
     params
   })
 }

 // 区域消毒添加
 export const QYXDAdd = data => {
   return request({
     method: 'POST',
     url: '/QuYuXiaoDus/Add',
     data
   })
 }
 // 区域消毒修改
 export const QYXDEdit = data => {
   return request({
     method: 'POST',
     url: '/QuYuXiaoDus/Update',
     data
   })
 }
 // 区域消毒删除
 export const QYXDDelete = data => {
   return request({
     method: 'POST',
     url: '/QuYuXiaoDus/Delete',
     data
   })
 }
