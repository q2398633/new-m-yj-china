<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script
  type="text/javascript"
  src="https://webapi.amap.com/maps?v=1.4.15&key=8436d94c21f2ab1bd643ab5dd9a8912d"
></script>
<script>
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style lang="less">
@import "./styles/custom-picker.css";
</style>
