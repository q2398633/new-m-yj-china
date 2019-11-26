<<<<<<< HEAD
<script charset="utf-8"
            src="https://map.qq.com/api/js?v=2.exp&key=PVLBZ-W55WW-JCWRK-RWI4Z-S76RO-4QFB6"></script>
        <script
            src="https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js"></script>
<template>
  <div id="container"
       style="width:100%;height:1100px;"></div>
</template>

<script>
export default {
  name: 'news',
  data () {
    return {
      longitude: 0, // 经度
      latitude: 0, // 纬度
      city: ''
    }
  },
  methods: {
    // 定位获得当前位置信息
    getMyLocation () {
      var geolocation = new qq.maps.Geolocation('PVLBZ-W55WW-JCWRK-RWI4Z-S76RO-4QFB6', 'myapp')
      geolocation.getLocation(this.showPosition, this.showErr, this.options)
      // geolocation.getLocation(this.showPosition, this.showErr);//或者用getLocation精确度比较高
    },
    showPosition (position) {
      console.log(position)
      this.latitude = position.lat
      this.longitude = position.lng
      this.city = position.city
      this.setMap()
    },
    showErr () {
      console.log('定位失败,请刷新重试')
      this.getMyLocation()// 定位失败再请求定位
    },
    // 位置信息在地图上展示
    setMap () {
      // 设置地图中心点
      var myLatlng = new qq.maps.LatLng(this.latitude, this.longitude)
      // 定义工厂模式函数
      var myOptions = {
        zoom: 13, // 设置地图缩放级别
        center: myLatlng, // 设置中心点样式
        mapTypeId: qq.maps.MapTypeId.ROADMAP // 设置地图样式详情参见MapType
      }
      // //获取dom元素添加地图信息
      var map = new qq.maps.Map(document.getElementById('container'), myOptions)
      // 第三部分
      // 给定位的位置添加图片标注
      var marker = new qq.maps.Marker({
        position: myLatlng,
        map: map
      })
      // 给定位的位置添加文本标注
      var marker = new qq.maps.Label({
        position: myLatlng,
        map: map,
        content: '我的位置'
      })
    }
  },
  mounted () {
    this.getMyLocation()
  }
}
</script>
=======
>>>>>>> f0be4f2e69989439d2dbc047c7516435fd35084d
