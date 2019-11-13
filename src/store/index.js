import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '../utils/auth'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    // 初始化的时候就从本地获取数据, 防止刷新丢失
    user: auth.getUser()
  },
  mutations: {
    // 登录成功后,调用mutations 更新容器中的user的状态
    setUser (state, data) {
      // 修改state
      state.user = data

      // 再把数据储存到本地
      auth.setUser(state.user)
    }
  },
  actions: {

  }
})
export default store
