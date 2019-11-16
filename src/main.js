import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import Vcharts from 'v-charts'

import VeeValidate, { Validator } from 'vee-validate'
//  导入veevalidate 中文包
import zhCN from 'vee-validate/dist/locale/zh_CN'
import { fmtDate } from '../src/utils/dayjs'
import 'vant/lib/index.css'
import 'amfe-flexible/index'
import CheckLogin from './utils/CheckLogin'
import animated from 'animate.css'

// 注册插件 CheckLogin.install(Vue)
Vue.use(CheckLogin)

Vue.use(animated)

Vue.filter('fmtDate', fmtDate)

Vue.use(Vant)
Vue.use(Vcharts)

// 配置插件 VeeValidate
Vue.use(VeeValidate, {
  events: ''
})
// 配置中文包
Validator.localize('zhCN', zhCN)
Vue.config.productionTip = false

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Vant,
  render: h => h(App)
}).$mount('#app')
