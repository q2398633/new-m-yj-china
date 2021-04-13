/**
 * 请求模块
 */
 import request from '@/utils/request'


 // 能耗控制项目列表
 export const NHKZList = params => {
   return request({
     method: 'GET',
     url: '/NengHaoXiangMus/Load',
     params
   })
 }

 // 能耗控制项目添加
 export const NHKZAdd = data => {
   return request({
     method: 'POST',
     url: '/NengHaoXiangMus/Add',
     data
   })
 }
 // 能耗控制项目修改
 export const NHKZEdit = data => {
   return request({
     method: 'POST',
     url: '/NengHaoXiangMus/Update',
     data
   })
 }
 // 能耗控制项目删除
 export const NHKZDelete = data => {
   return request({
     method: 'POST',
     url: '/NengHaoXiangMus/Delete',
     data
   })
 }
