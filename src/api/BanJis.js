/**
 * 请求模块
 */
 import request from '@/utils/request'


 // 班级列表
 export const BJList = params => {
   return request({
     method: 'GET',
     url: '/BanJi/Load',
     params
   })
 }

 // 班级添加
 export const BJAdd = data => {
   return request({
     method: 'POST',
     url: '/BanJi/Add',
     data
   })
 }
 // 班级修改
 export const BJEdit = data => {
   return request({
     method: 'POST',
     url: '/BanJi/Update',
     data
   })
 }
 // 班级删除
 export const BJDelete = data => {
   return request({
     method: 'POST',
     url: '/BanJi/Delete',
     data
   })
 }
