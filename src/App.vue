<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {};
  },
  methods: {},
  created () { }
};
</script>

<style lang="less">
.van-cell__value {
  font-size: 0.4rem;
}
@import "./styles/custom-picker.css";
</style>
