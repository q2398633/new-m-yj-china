/**
 * 请求模块
 */
 import request from '@/utils/request'


 // 体弱肥胖儿童列表
 export const TRFPList = params => {
   return request({
     method: 'GET',
     url: '/TiRuoDengJis/Load',
     params
   })
 }

 // 体弱肥胖儿童添加
 export const TRFPAdd = data => {
   return request({
     method: 'POST',
     url: '/TiRuoDengJis/Add',
     data
   })
 }
 // 体弱肥胖儿童修改
 export const TRFPEdit = data => {
   return request({
     method: 'POST',
     url: '/TiRuoDengJis/Update',
     data
   })
 }
 // 体弱肥胖儿童删除
 export const TRFPDelete = data => {
   return request({
     method: 'POST',
     url: '/TiRuoDengJis/Delete',
     data
   })
 }
