<template>
  <div>
    <el-button>{{date}}</el-button>
  </div>
</template>
<script>
export default {
    name: 'Demo',
    data () {
        return {
            date: '',
            timer: null
        }
    },
    methods: {
        timeFormate (timeStamp) {
            let year = new Date(timeStamp).getFullYear()
            let month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
            let date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
            let hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
            let mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
            let ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
            // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
            // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
            this.date = year + '年' + month + '月' + date + '日' + ' ' + hh + ':' + mm + ':' + ss

            console.log(this.date)
        },
        // 定时器函数
        nowTimes () {
            this.timeFormate(new Date())
            this.timer = setTimeout(this.nowTimes, 30 * 1000)
        }
    },
    // 调用定时器
    created () {
        this.nowTimes()
    },
    // 销毁定时器
    beforeDestroy: function () {
        if (this.timer) {
            console.log('销毁定时器')
            clearTimeout(this.timer) // 在Vue实例销毁前，清除我们的定时器
        }
    }
}
</script>
