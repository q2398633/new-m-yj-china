<template>
  <div>
    <van-collapse v-model="activeNames">
      <van-collapse-item title=""
                         name="1">
        1111111111111111111111</van-collapse-item>
      <van-collapse-item title=""
                         name="2">内容</van-collapse-item>

    </van-collapse>
  </div>
</template>
<script>
export default {
    data () {
        return {
            activeNames: ['1']
        }
    },
    methods: {

    }

}
</script>
<style lang="less" scoped>
</style>
