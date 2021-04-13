/**
 * 请求模块
 */
 import request from '@/utils/request'


 // 食品安全检测列表
 export const SPJCList = params => {
   return request({
     method: 'GET',
     url: '/ShiPinJianCes/Load',
     params
   })
 }

 // 食品安全检测添加
 export const SPJCAdd = data => {
   return request({
     method: 'POST',
     url: '/ShiPinJianCes/Add',
     data
   })
 }
 // 食品安全检测修改
 export const SPJCEdit = data => {
   return request({
     method: 'POST',
     url: '/ShiPinJianCes/Update',
     data
   })
 }
 // 食品安全检测删除
 export const SPJCDelete = data => {
   return request({
     method: 'POST',
     url: '/ShiPinJianCes/Delete',
     data
   })
 }
