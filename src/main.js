import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import 'amfe-flexible/index'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(Vueaxios, axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
