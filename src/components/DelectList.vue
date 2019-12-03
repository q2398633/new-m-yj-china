<template>
  <div class="DelList">
    <van-dialog :value="value"
                @input="$emit('input')"
                title="确认删除吗?">
      <span style="margin-left:30px;">删除当前列表数据</span>
    </van-dialog>
  </div>
</template>

<script>
export default {
    name: 'DelectList',
    data () {
        return {
            show: false
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    mounted () {

    }

}
</script>
<style lang="less" scoped>
</style>
