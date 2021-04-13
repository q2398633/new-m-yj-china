/**
 * 请求模块
 */
 import request from '@/utils/request'


 // 安全检测项目列表
 export const AQJCList = params => {
   return request({
     method: 'GET',
     url: '/AnJianXiangMus/Load',
     params
   })
 }

 // 安全检测项目添加
 export const AQJCAdd = data => {
   return request({
     method: 'POST',
     url: '/AnJianXiangMus/Add',
     data
   })
 }
 // 安全检测项目修改
 export const AQJCEdit = data => {
   return request({
     method: 'POST',
     url: '/AnJianXiangMus/Update',
     data
   })
 }
 // 安全检测项目删除
 export const AQJCDelete = data => {
   return request({
     method: 'POST',
     url: '/AnJianXiangMus/Delete',
     data
   })
 }
