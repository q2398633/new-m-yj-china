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
import FoodSafety from '@/views/FoodSafety'
import AssetsInformation from '@/views/AssetsInformation'
import AssetMaintenance from '@/views/AssetMaintenance'
import TablewareDisinfection from '@/views/TablewareDisinfection'
import SupplierAdmin from '@/views/SupplierAdmin'
import VaccineAdmin from '@/views/VaccineAdmin'
import PostAdmin from '@/views/PostAdmin'
import Echarts from '@/views/Echarts'
import RegionalDisinfection from '@/views/RegionalDisinfection'
import EnergyConsumptionDetails from '@/views/EnergyConsumptionDetails'
import AttendanceList from '@/views/AttendanceList'

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
        { name: 'FoodSafety', path: '/FoodSafety', component: FoodSafety },
        { name: 'AssetsInformation', path: '/AssetsInformation', component: AssetsInformation },
        { name: 'AssetMaintenance', path: '/AssetMaintenance', component: AssetMaintenance },
        { name: 'TablewareDisinfection', path: '/TablewareDisinfection', component: TablewareDisinfection },
        { name: 'SupplierAdmin', path: '/SupplierAdmin', component: SupplierAdmin },
        { name: 'VaccineAdmin', path: '/VaccineAdmin', component: VaccineAdmin },
        { name: 'PostAdmin', path: '/PostAdmin', component: PostAdmin },
        { name: 'Echarts', path: '/Echarts', component: Echarts },
        { name: 'RegionalDisinfection', path: '/RegionalDisinfection', component: RegionalDisinfection },
        { name: 'EnergyConsumptionDetails', path: '/EnergyConsumptionDetails', component: EnergyConsumptionDetails },
        { name: 'AttendanceList', path: '/AttendanceList', component: AttendanceList }



    ]
})

export default router
