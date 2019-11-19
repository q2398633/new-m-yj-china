import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import Vcharts from 'v-charts'
import moment from 'moment/moment'
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
import Calendar from 'vue-mobile-calendar'
import { fmtDate } from '../src/utils/dayjs'
import 'vant/lib/index.css'
import 'amfe-flexible/index'
import CheckLogin from './utils/CheckLogin'
import animated from 'animate.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


// 注册插件 CheckLogin.install(Vue)
Vue.use(CheckLogin)

Vue.use(animated)

Vue.use(ElementUI)

Vue.filter('fmtDate', fmtDate)

Vue.use(Vant)
Vue.use(Vcharts)


// 配置插件 VeeValidate
Vue.use(VeeValidate, {
    events: ''
})

Vue.use(Calendar)

Vue.filter('moment', function (value, formatString) {
    formatString = formatString || 'HH:mm:ss'
    return moment(value).format(formatString)
})
Validator.localize('zhCN', zhCN)
Vue.config.productionTip = false



new Vue({
    router,
    store,
    Vant,
    render: h => h(App)
}).$mount('#app')
