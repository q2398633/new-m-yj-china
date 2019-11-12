import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'index', path: '/', redirect: '/login' },
    { name: 'login', path: '/login', component: Login },
    { name: 'home', path: '/home', component: Home }
  ]
})

export default router
