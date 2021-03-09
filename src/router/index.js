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
import Inventory from '@/views/Inventory'
import productManagement from '@/views/productManagement'
import OutgoingManagement from '@/views/OutgoingManagement'
import WarehousingManagement from '@/views/WarehousingManagement'
import EnvironmentalInvestigation from '@/views/EnvironmentalInvestigation'
import PlanningScheme from '@/views/PlanningScheme'
import IncomingCalls from '@/views/IncomingCalls'
import DailyWorksheet from '@/views/DailyWorksheet'
import MNECheck from '@/views/MNECheck'
import ShiftHandoverRegistration from '@/views/ShiftHandoverRegistration'
import HealthEducationRegistration from '@/views/HealthEducationRegistration'
import DPACRegistration from '@/views/DPACRegistration'
import MinutesOFMealManagementMeeting from '@/views/MinutesOFMealManagementMeeting'
import InfectiousDiseaseRegistrationInformation from '@/views/InfectiousDiseaseRegistrationInformation'
import InfirmityRegistration from '@/views/InfirmityRegistration'
import ChildInjuriesAndAccidents from '@/views/ChildInjuriesAndAccidents'
import LargeToys from '@/views/LargeToys'
import VisionCorrectionRegistration from '@/views/VisionCorrectionRegistration'
import RegistrationOFDentalCaries from '@/views/RegistrationOFDentalCaries'
import FoodProcessingRecord from '@/views/FoodProcessingRecord'
import SampleKeepingOFDishes from '@/views/SampleKeepingOFDishes'
import WageList from '@/views/WageList'
import PerformanceScore from '@/views/PerformanceScore'
import EmployeeRewardsAndPunishments from '@/views/EmployeeRewardsAndPunishments'
import StaffTraining from '@/views/StaffTraining'
import LeaveManagement from '@/views/LeaveManagement'
import ModifyPD from '@/views/ModifyPD'
import DaKa from '@/views/DaKa'
import ChildAdd from '@/views/ChildLink/ChildAdd'
import ChildEdit from '@/views/ChildLink/ChildEdit'
import ChildDetails from '@/views/ChildLink/ChildDetails'
import AttendanceAudit from '@/views/AttendanceAudit'

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
        { name: 'AttendanceList', path: '/AttendanceList', component: AttendanceList },
        { name: 'Inventory', path: '/Inventory', component: Inventory },
        { name: 'productManagement', path: '/productManagement', component: productManagement },
        { name: 'OutgoingManagement', path: '/OutgoingManagement', component: OutgoingManagement },
        { name: 'WarehousingManagement', path: '/WarehousingManagement', component: WarehousingManagement },
        { name: 'EnvironmentalInvestigation', path: '/EnvironmentalInvestigation', component: EnvironmentalInvestigation },
        { name: 'PlanningScheme', path: '/PlanningScheme', component: PlanningScheme },
        { name: 'IncomingCalls', path: '/IncomingCalls', component: IncomingCalls },
        { name: 'DailyWorksheet', path: '/DailyWorksheet', component: DailyWorksheet },
        { name: 'MNECheck', path: '/MNECheck', component: MNECheck },
        { name: 'ShiftHandoverRegistration', path: '/ShiftHandoverRegistration', component: ShiftHandoverRegistration },
        { name: 'HealthEducationRegistration', path: '/HealthEducationRegistration', component: HealthEducationRegistration },
        { name: 'DPACRegistration', path: '/DPACRegistration', component: DPACRegistration },
        { name: 'MinutesOFMealManagementMeeting', path: '/MinutesOFMealManagementMeeting', component: MinutesOFMealManagementMeeting },
        { name: 'InfectiousDiseaseRegistrationInformation', path: '/InfectiousDiseaseRegistrationInformation', component: InfectiousDiseaseRegistrationInformation },
        { name: 'InfirmityRegistration', path: '/InfirmityRegistration', component: InfirmityRegistration },
        { name: 'ChildInjuriesAndAccidents', path: '/ChildInjuriesAndAccidents', component: ChildInjuriesAndAccidents },
        { name: 'LargeToys', path: '/LargeToys', component: LargeToys },
        { name: 'VisionCorrectionRegistration', path: '/VisionCorrectionRegistration', component: VisionCorrectionRegistration },
        { name: 'RegistrationOFDentalCaries', path: '/RegistrationOFDentalCaries', component: RegistrationOFDentalCaries },
        { name: 'FoodProcessingRecord', path: '/FoodProcessingRecord', component: FoodProcessingRecord },
        { name: 'SampleKeepingOFDishes', path: '/SampleKeepingOFDishes', component: SampleKeepingOFDishes },
        { name: 'WageList', path: '/WageList', component: WageList },
        { name: 'WageList', path: '/PerformanceScore', component: PerformanceScore },
        { name: 'EmployeeRewardsAndPunishments', path: '/EmployeeRewardsAndPunishments', component: EmployeeRewardsAndPunishments },
        { name: 'StaffTraining', path: '/StaffTraining', component: StaffTraining },
        { name: 'LeaveManagement', path: '/LeaveManagement', component: LeaveManagement },
        { name: 'ModifyPD', path: '/ModifyPD', component: ModifyPD },
        { name: 'DaKa', path: '/DaKa', component: DaKa },
        { name: 'ChildAdd', path: '/ChildAdd', component: ChildAdd },
        { name: 'ChildEdit', path: '/ChildEdit', component: ChildEdit },
        { name: 'ChildDetails', path: '/ChildDetails', component: ChildDetails },
        { name: 'AttendanceAudit', path: '/AttendanceAudit', component: AttendanceAudit }
    ]
})
// 注册一个全局的前置导航守卫
// router.beforeEach((to, from, next) => {
  // 如果不去主动的触发 resolve（next 下一步） 会一直等待
  // console.log('ok')
  // 如果是登录页面 放行
  // if (to.path === '/login') return next()
  // // 判断登录状态
  // const user = window.sessionStorage.getItem('yjZhongGuo')
  // if (user) {
  //   next()
  // } else {
  //   next('/login')
  // }
//   const user = window.sessionStorage.getItem('yjZhongGuo')
//   if (to.path !== '/login' && !user) return next('/login')
//   next()
// })
export default router
