import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import SignInRule from '@/views/SignIn'
import Calender from '@/views/Calender'
import ChildManagement from '@/views/ChildManagement'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { name: 'index', path: '/', redirect: '/home' },
        { name: 'login', path: '/login', component: Login },
        { name: 'home', path: '/home', component: Home },
        { name: 'SignInRule', path: '/SignInRule', component: SignInRule },
        { name: 'calender', path: '/Calender', component: Calender },
        { name: 'childManagement', path: '/ChildManagement', component: ChildManagement }
    ]
})

export default router
