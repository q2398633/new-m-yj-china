/**
 * 请求模块
 */
 import request from '@/utils/request'


 // 菜品留样列表
 export const CPLYList = params => {
   return request({
     method: 'GET',
     url: '/CaiPinLiuYangs/Load',
     params
   })
 }

 // 菜品留样添加
 export const CPLYAdd = data => {
   return request({
     method: 'POST',
     url: '/CaiPinLiuYangs/Add',
     data
   })
 }
 // 菜品留样修改
 export const CPLYEdit = data => {
   return request({
     method: 'POST',
     url: '/CaiPinLiuYangs/Update',
     data
   })
 }
 // 菜品留样目删除
 export const CPLYDelete = data => {
   return request({
     method: 'POST',
     url: '/CaiPinLiuYangs/Delete',
     data
   })
 }
