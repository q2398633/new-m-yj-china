// 插件就是一个对象  具有install(vue , options)

export default {
    install (Vue) {
        // 给vue实例增加方法
        Vue.prototype.$checkLogin = function () {
            // 此时的this是 vue实例
            // 判断是否登陆
            if (!this.$store.state.user) {
                // 如果没有登陆，提示用户是否登陆
                this.$dialog.confirm({
                    title: '登录提示',
                    message: '是否要跳转到登录页面'
                }).then(() => {
                    // on confirm 点击确认按钮执行
                    // 点击确定按钮，跳转到登陆页面
                    this.$router.push({
                        path: '/login',
                        //   params 动态路由参数    query 查询字符串
                        query: {
                            redirect: this.$route.fullPath
                        }
                    })
                }).catch(() => {
                    // on cancel 点击取消按钮执行
                })
                return false
            }
            return true
        }
    }
}
