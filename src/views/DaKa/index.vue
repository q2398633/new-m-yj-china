<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar
      title="定位打卡"
      left-arrow
      left-text="返回"
      size="36px"
      @click-left="back"
      fixed
    >
    </van-nav-bar>

    <div class="info">
      <h4 id="status"></h4>
      <hr />
      <p id="result"></p>
      <hr />
    </div>

    <div id="box">
      <div id="time">石家庄寅卯科技</div>
      <button id="signbtn" class="layui-btn layui-btn-normal">考勤签到</button
      ><br />
      <div id="place" type="button" class="layui-btn-radius">非办公地点</div>
      <div id="distance">系统正在定位中</div>
      <div id="location">系统正在定位中</div>
    </div>
    <input type="hidden" id="isonoff" name="isonoff" value="true" />
    <input type="hidden" id="userid" name="userid" value="0" />
  </div>
</template>
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
<script src="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css"></script>
<script src="../../assets/layui/css/layui.css"></script>
<script src="../../assets/layui/layui.js"></script>
<script src="https://cdn.bootcss.com/layer/2.3/layer.js"></script>
<script
  type="text/javascript"
  src="https://webapi.amap.com/maps?v=1.4.15&key=8436d94c21f2ab1bd643ab5dd9a8912d"
></script>
<script src="https://webapi.amap.com/maps?v=1.4.15&key=8436d94c21f2ab1bd643ab5dd9a8912d&plugin=AMap.CircleEditor"></script>
<script src="https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"></script>
<script>
export default {
  name: "DaKa",
  data() {
    return {};
  },
  mounted() {},
  created() {
    // 此处为调用精确定位之后，调取ip定位，可根据实际情况改写
    this.getLocation();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getLocation() {
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: "RB", //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
        });
        geolocation.getCurrentPosition(function(status, result) {
          if (status == "complete") {
            onComplete(result);
          } else {
            onError(result);
          }
        });
      });
      //解析定位结果
      function onComplete(data) {
        document.getElementById("status").innerHTML = "定位成功";
        var str = [];
        str.push("定位结果：" + data.position);
        str.push("定位类别：" + data.location_type);
        if (data.accuracy) {
          str.push("精度：" + data.accuracy + " 米");
        } //如为IP精确定位结果则没有精度信息
        str.push("是否经过偏移：" + (data.isConverted ? "是" : "否"));
        document.getElementById("result").innerHTML = str.join("<br>");

        getposition = [data.position.lng, data.position.lat]; //获取当前位置的经纬度
        var location = data.formattedAddress; //具体街道位置信息
        console.log(getposition);

        var shanghaizone = [114.52269, 38.05818]; //设置的签到点
        //计算当前位置与考勤点距离
        var distance = AMap.GeometryUtil.distance(
          getposition,
          shanghaizone
        ).toFixed(0);

        console.log(distance);
        //document.getElementById('distance').innerHTML = distancestr;
        var setDistance = 300; //设定的打卡距离

        document.getElementById("location").innerHTML = location;

        var distancestr = "仍距" + distance + "米";
        console.log(distance);
        if (distance <= setDistance) {
          //在范围内
          document.getElementById("distance").innerHTML =
            '</i><i class="layui-icon layui-icon-face-smile" style="font-size:12px; color:#17bc84;">  你已进入考勤范围  </i>  ';
          document.getElementById("place").innerHTML = "办公地点 ";
          $("#place").addClass("isdiy");
        } else {
          //不在范围内
          document.getElementById("distance").innerHTML =
            '<i class="layui-icon layui-icon-face-cry" style="font-size: 10px; color:red;">  未进入考勤范围 </i><a style="color:#29a6ff" onClick="window.location.reload()">重新定位 </a> ';
          document.getElementById("place").innerHTML = "非办公地点 ";
          $("#place").addClass("nodiy");
        }

        $("#signbtn").click(function() {
          if (distance <= setDistance) {
            layer.msg("办公地点打卡");
          } else {
            layer.msg("外勤打卡");
          }
        });

        //绘制签到范围
        var circle = new AMap.Circle({
          center: shanghaizone,
          radius: 200, //半径
          borderWeight: 1,
          strokeOpacity: 1,
          strokeOpacity: 0.2,
          fillOpacity: 0.4
        });

        circle.setMap(map);
        // 缩放地图到合适的视野级别
        map.setFitView([circle]);
        var circleEditor = new AMap.CircleEditor(map, circle);
      }
      //解析定位错误信息
      function onError(data) {
        document.getElementById("location").innerHTML = "定位失败";
        document.getElementById("location").innerHTML =
          "失败原因排查信息:" + data.message;
      }
      setInterval(
        "document.getElementById('time').innerHTML=new Date().toLocaleString()+' 星期'+'日一二三四五六'.charAt(new Date().getDay());",
        1000
      );
    }
  }
};
</script>

<style lang="less" scoped>
.parentAdmin {
  width: 100%;
  height: 100%;

  .van-nav-bar {
    background: #0199ff;
    color: white;
    font-family: "楷体";
    .van-nav-bar__title {
      color: white;
    }
    .van-icon {
      color: white;
    }
    .van-nav-bar__text {
      color: white;
    }
  }
  .info {
    width: 26rem;
  }
  #distance {
    margin: 10px;

    font-size: 12px;
  }
  #time {
    font-size: 16px;
    color: #1e9fff;
    font-weight: bold;
    margin: 10px;
  }
  #signbtn {
    margin: 10px auto;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    box-shadow: 0px 0px 8px #25a4ff;
    font-size: 20px;
  }
  #place {
    margin: 5px auto;
    height: 20px;
    color: #ffffff;
    width: 80px;
    font-size: 12px;
    padding-top: 1px;
  }
  .isdiy {
    background-color: #5fb878;
  }
  .nodiy {
    background-color: #ff5722;
  }
  .layui-form-switch {
    width: -5%;
    height: 20%;
    background-color: #ff5722;
    margin: 5px 0;
  }
  .layui-form-onswitch {
    background-color: #009688;
  }
  .layui-form-switch em {
    color: #ffffff !important;
  }
  #box {
    position: fixed;
    bottom: 0;
    margin: 10px auto;
    width: 100%;
  }
  #history {
    text-align: left;
    margin: 10px auto;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
  }
  .layui-timeline-item {
    position: relative;
    padding-bottom: 5px;
  }
  .layui-text {
    line-height: 15px;
    font-size: 14px;
    color: #666;
  }
  #weizhi {
    margin-top: -8px;
    display: block;
    color: #009f95;
    font-size: 11px;
  }
  .signtype {
    color: orange;
    font-style: normal;
  }
  #location {
    font-size: 12px;
  }
}
</style>
