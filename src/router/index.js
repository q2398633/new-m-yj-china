import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import SignInRule from '@/views/SignIn'
import Calender from '@/views/Calender'
import ChildManagement from '@/views/ChildManagement'
import Demo from '@/views/demo'
import Menu from '../views/Menu/Index.vue'
import ParentAdmin from '@/views/ParentAdmin'
import StaffAdmin from '@/views/StaffAdmin'
import AccountAdmin from '@/views/AccountAdmin'
import ClassAdmin from '@/views/ClassAdmin'
import Evaluating from '@/views/EvaluatingList'
import BudgetAdmin from '@/views/BudgetAdmin'
import Recipes from '@/views/Recipes'
import SafetyProjectInspection from '@/views/SafetyProjectInspection'
import FoodSafety from '@/views/FoodSafety'
import AssetsInformation from '@/views/AssetsInformation'
import AssetMaintenance from '@/views/AssetMaintenance'
import TablewareDisinfection from '@/views/TablewareDisinfection'


Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { name: 'index', path: '/', redirect: '/login' },
        { name: 'login', path: '/login', component: Login },
        { name: 'home', path: '/home', component: Home },
        { name: 'SignInRule', path: '/SignInRule', component: SignInRule },
        { name: 'calender', path: '/Calender', component: Calender },
        { name: 'demo', path: '/demo', component: Demo },
        { name: 'childManagement', path: '/ChildManagement', component: ChildManagement },
        { name: 'Menu', path: '/Menu', component: Menu },
        { name: 'parentAdmin', path: '/parentAdmin', component: ParentAdmin },
        { name: 'StaffAdmin', path: '/StaffAdmin', component: StaffAdmin },
        { name: 'AccountAdmin', path: '/AccountAdmin', component: AccountAdmin },
        { name: 'ClassAdmin', path: '/ClassAdmin', component: ClassAdmin },
        { name: 'Evaluating', path: '/Evaluating', component: Evaluating },
        { name: 'BudgetAdmin', path: '/BudgetAdmin', component: BudgetAdmin },
        { name: 'Recipes', path: '/Recipes', component: Recipes },
        { name: 'SafetyProjectInspection', path: '/SafetyProjectInspection', component: SafetyProjectInspection },
        { name: 'FoodSafety', path: '/FoodSafety', component: FoodSafety },
        { name: 'AssetsInformation', path: '/AssetsInformation', component: AssetsInformation },
        { name: 'AssetMaintenance', path: '/AssetMaintenance', component: AssetMaintenance },
        { name: 'TablewareDisinfection', path: '/TablewareDisinfection', component: TablewareDisinfection }



    ]
})

export default router
