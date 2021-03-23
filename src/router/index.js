import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import ChildManagement from '@/views/ChildManagement'
import DaKa from '@/views/DaKa'
import ChildAdd from '@/views/ChildLink/ChildAdd'
import ChildEdit from '@/views/ChildLink/ChildEdit'
import ChildDetails from '@/views/ChildLink/ChildDetails'
import AttendanceAudit from '@/views/AttendanceAudit'
import store from '@/store/'
import { Dialog } from 'vant'
import ChenWuWanJian from '@/views/ChenWuWanJian'
import ChenWuWanJianAdd from '@/views/ChenWuWanJian/ChenWuWanJianAdd'
import ChenWuWanJianEdit from '@/views/ChenWuWanJian/ChenWuWanJianEdit'
import ChenWuWanJianDetail from '@/views/ChenWuWanJian/ChenWuWanJianDetail'
import JiBingDengJi from '@/views/JiBingDengJi'
import JiBingDengJiAdd from '@/views/JiBingDengJi/JiBingDengJiAdd'
import JiBingDengJiEdit from '@/views/JiBingDengJi/JiBingDengJiEdit'
import JiBingDengJiDetails from '@/views/JiBingDengJi/JiBingDengJiDetails'
import JianKangDengJis from '@/views/JianKangDengJis'
import JianKangDengJisAdd from '@/views/JianKangDengJis/JianKangDengJisAdd'
import JianKangDengJisEdit from '@/views/JianKangDengJis/JianKangDengJisEdit'
import JianKangDengJisDetails from '@/views/JianKangDengJis/JianKangDengJisDetails'
import ChuanRanBingDengJis from '@/views/ChuanRanBingDengJis'
import ChuanRanBingDengJisAdd from '@/views/ChuanRanBingDengJis/ChuanRanBingDengJisAdd'
import ChuanRanBingDengJisEdit from '@/views/ChuanRanBingDengJis/ChuanRanBingDengJisEdit'
import ChuanRanBingDengJisDetail from '@/views/ChuanRanBingDengJis/ChuanRanBingDengJisDetail'
import DaXingWanJus from '@/views/DaXingWanJus'
import DaXingWanJusAdd from '@/views/DaXingWanJus/DaXingWanJusAdd'
import DaXingWanJusEdit from '@/views/DaXingWanJus/DaXingWanJusEdit'
import DaXingWanJusDetail from '@/views/DaXingWanJus/DaXingWanJusDetail'
import DaXingWanJuJianChaDengJis from '@/views/DaXingWanJuJianChaDengJis'
import DaXingWanJuJianChaDengJisAdd from '@/views/DaXingWanJuJianChaDengJis/DaXingWanJuJianChaDengJisAdd'
import DaXingWanJuJianChaDengJisEdit from '@/views/DaXingWanJuJianChaDengJis/DaXingWanJuJianChaDengJisEdit'
import DaXingWanJuJianChaDengJisDetail from '@/views/DaXingWanJuJianChaDengJis/DaXingWanJuJianChaDengJisDetail'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  try {
    return originalPush.call(this, location).catch(err => err);
  } catch (error) {
    console.error(error);
  }
};

const router = new VueRouter({
  routes: [
    { name: 'index', path: '/', redirect: '/login' },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    { name: 'childManagement', path: '/ChildManagement', component: ChildManagement, meta: { requiresAuth: true } },
    { name: 'DaKa', path: '/DaKa', component: DaKa },
    { name: 'ChildAdd', path: '/ChildAdd', component: ChildAdd, meta: { requiresAuth: true } },
    { name: 'ChildEdit', path: '/ChildEdit', component: ChildEdit, meta: { requiresAuth: true } },
    { name: 'ChildDetails', path: '/ChildDetails', component: ChildDetails, meta: { requiresAuth: true } },
    { name: 'ChenWuWanJian', path: '/ChenWuWanJian', component: ChenWuWanJian, meta: { requiresAuth: true } },
    { name: 'ChenWuWanJianAdd', path: '/ChenWuWanJianAdd', component: ChenWuWanJianAdd, meta: { requiresAuth: true } },
    { name: 'ChenWuWanJianEdit', path: '/ChenWuWanJianEdit', component: ChenWuWanJianEdit, meta: { requiresAuth: true } },
    { name: 'ChenWuWanJianDetail', path: '/ChenWuWanJianDetail', component: ChenWuWanJianDetail, meta: { requiresAuth: true } },
    { name: 'JiBingDengJi', path: '/JiBingDengJi', component: JiBingDengJi, meta: { requiresAuth: true } },
    { name: 'JiBingDengJiAdd', path: '/JiBingDengJiAdd', component: JiBingDengJiAdd, meta: { requiresAuth: true } },
    { name: 'JiBingDengJiEdit', path: '/JiBingDengJiEdit', component: JiBingDengJiEdit, meta: { requiresAuth: true } },
    { name: 'JiBingDengJiDetails', path: '/JiBingDengJiDetails', component: JiBingDengJiDetails, meta: { requiresAuth: true } },
    { name: 'AttendanceAudit', path: '/AttendanceAudit', component: AttendanceAudit },
    { name: 'JianKangDengJis', path: '/JianKangDengJis', component: JianKangDengJis, meta: { requiresAuth: true } },
    { name: 'JianKangDengJisAdd', path: '/JianKangDengJisAdd', component: JianKangDengJisAdd, meta: { requiresAuth: true } },
    { name: 'JianKangDengJisEdit', path: '/JianKangDengJisEdit', component: JianKangDengJisEdit, meta: { requiresAuth: true } },
    { name: 'JianKangDengJisDetails', path: '/JianKangDengJisDetails', component: JianKangDengJisDetails, meta: { requiresAuth: true } },
    { name: 'ChuanRanBingDengJis', path: '/ChuanRanBingDengJis', component: ChuanRanBingDengJis, meta: { requiresAuth: true } },
    { name: 'ChuanRanBingDengJisAdd', path: '/ChuanRanBingDengJisAdd', component: ChuanRanBingDengJisAdd, meta: { requiresAuth: true } },
    { name: 'ChuanRanBingDengJisEdit', path: '/ChuanRanBingDengJisEdit', component: ChuanRanBingDengJisEdit, meta: { requiresAuth: true } },
    { name: 'ChuanRanBingDengJisDetail', path: '/ChuanRanBingDengJisDetail', component: ChuanRanBingDengJisDetail, meta: { requiresAuth: true } },
    { name: 'DaXingWanJus', path: '/DaXingWanJus', component: DaXingWanJus, meta: { requiresAuth: true } },
    { name: 'DaXingWanJusAdd', path: '/DaXingWanJusAdd', component: DaXingWanJusAdd, meta: { requiresAuth: true } },
    { name: 'DaXingWanJusEdit', path: '/DaXingWanJusEdit', component: DaXingWanJusEdit, meta: { requiresAuth: true } },
    { name: 'DaXingWanJusDetail', path: '/DaXingWanJusDetail', component: DaXingWanJusDetail, meta: { requiresAuth: true } },
    { name: 'DaXingWanJuJianChaDengJis', path: '/DaXingWanJuJianChaDengJis', component: DaXingWanJuJianChaDengJis, meta: { requiresAuth: true } },
    { name: 'DaXingWanJuJianChaDengJisAdd', path: '/DaXingWanJuJianChaDengJisAdd', component: DaXingWanJuJianChaDengJisAdd, meta: { requiresAuth: true } },
    { name: 'DaXingWanJuJianChaDengJisEdit', path: '/DaXingWanJuJianChaDengJisEdit', component: DaXingWanJuJianChaDengJisEdit, meta: { requiresAuth: true } },
    { name: 'DaXingWanJuJianChaDengJisDetail', path: '/DaXingWanJuJianChaDengJisDetail', component: DaXingWanJuJianChaDengJisDetail, meta: { requiresAuth: true } }
  ]
})
// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  // 判断页面是否需要登录才能访问
  if (to.meta.requiresAuth) {
    // 如已登录，通过
    if (store.state.user) {
      return next()
    }

    // 没有登录，登录
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，确认登录吗'
    }).then(() => { // 确认执行
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }).catch(() => { // 取消执行
      // 取消，中断路由导航
      next(false)
    })
  } else {
    // 不需要登录状态的页面，直接过
    next()
  }
})
export default router
