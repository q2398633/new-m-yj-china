import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import Vcharts from 'v-charts'
import moment from 'moment/moment'
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
import { fmtDate } from '../src/utils/dayjs'
import 'vant/lib/index.css'
import 'amfe-flexible/index'
import CheckLogin from './utils/CheckLogin'
import animated from 'animate.css'
import Carousel3d from 'vue-carousel-3d'
import Calendar from 'vue-mobile-calendar'
import './assets/iconfont/iconfont.css'
import AMap from 'vue-amap'
import vueTouch from 'kim-vue-touch'

// 注册插件 CheckLogin.install(Vue)
Vue.use(CheckLogin)

Vue.use(animated)

Vue.use(Calendar)

Vue.use(vueTouch)

Vue.filter('fmtDate', fmtDate)

Vue.use(Vant)
Vue.use(Vcharts)

Vue.use(Carousel3d)

Vue.use(AMap)

Validator.localize('zhCN', zhCN)

// 配置插件 VeeValidate
Vue.use(VeeValidate)

Vue.filter('moment', function(value, formatString) {
    formatString = formatString || 'HH:mm:ss'
    return moment(value).format(formatString)
})


Validator.extend('username', {
    getMessage: field => field + '格式不正确',
    validate: value => {
        // 自定义的校验规则
        return value.length === 5
    }
})
Validator.extend('password', {
    getMessage: field => field + '格式不正确',
    validate: value => {
        // 自定义的校验规则
        return value.length === 11
    }
})

AMap.initAMapApiLoader({
        key: '3554afad07a8ac3ddedf7b201e678de9',
        plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
            'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor',
            'AMap.CircleEditor', 'AMap.Geolocation'
        ]
    })
    // 全局过滤器
Vue.filter('dateFmt', (input, formatString = 'YYYY-MM-DD') => {
    // es5函数参数设置默认值
    // const lastFormatString = formatString ||


    // moment(input) 把时间字符串转成时间对象
    // format(formatString) 把时间对象，按照指定格式，格式化成符合条件的字符串
    return moment(input).format(formatString)
})



Vue.config.productionTip = false



new Vue({
    router,
    store,
    Vant,
    render: h => h(App)
}).$mount('#app')
