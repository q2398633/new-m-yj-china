/**
 * 菜单请求模块
 */
import request from '@/utils/request'


// 幼儿列表
export const ListMenu = data => {
  return request({
    method: 'GET',
    url: '/Check/GetModulesTree'
    })
}
