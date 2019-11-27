<template>
  <div id="container">

  </div>
</template>

<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=3554afad07a8ac3ddedf7b201e678de9"></script>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    getLocation () {
      let _this = this;
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 5000,
        })
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete);
        AMap.event.addListener(geolocation, 'error', onError);
        // data是具体的定位信息
        function onComplete (data) {
          console.log('具体的定位信息', data)
          alert(data.message)
        }
        function onError (data) {
          alert(data.message)
          // 失败 启用 ip定位
          AMap.plugin('AMap.CitySearch', function () {
            var citySearch = new AMap.CitySearch();
            citySearch.getLocalCity(function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                // 查询成功，result即为当前所在城市信息
                console.log('通过ip获取当前城市：', result)
              }
            })
          })
        }
      })
    },
  },
  created () {
    // 此处为调用精确定位之后，调取ip定位，可根据实际情况改写
    this.getLocation();
  }
}
</script>

<style lang="less" scoped>
</style>
