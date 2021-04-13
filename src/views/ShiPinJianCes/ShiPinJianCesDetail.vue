<template>
  <div class="ChildAdd">
    <!-- 导航栏 -->
    <van-nav-bar
      title="食品安全检测详情"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- <div>{{ this.$router.params.ID }}</div> -->
    <!-- 添加表单 -->
    <van-form>
      <div name="id"></div>
      <div name="banJi"></div>
      <van-field
        v-model="UPdateForm.title"
        label="检测项目"
        clearable
        placeholder="检测项目"
      />
      <van-field
        v-model="UPdateForm.jiLiangDanWei"
        name="jiLiangDanWei"
        label="检测单位"
        placeholder="检测单位"
      />
      <van-field
        v-model="UPdateForm.jianCeRenYuan"
        name="jianCeRenYuan"
        label="检测人"
        placeholder="检测人"
      />
      <van-field
        v-model="UPdateForm.jianCeZhi"
        clearable
        name="jianCeZhi"
        label="检测值"
        placeholder="检测值"
      />
      <van-field
        v-model="UPdateForm.canKaoZhi"
        name="canKaoZhi"
        label="参考值"
        placeholder="参考值"
      />
      <van-field
        v-model="UPdateForm.jianCeJieGuo"
        name="jianCeJieGuo"
        label="检测结果"
        placeholder="检测结果"
      />
      <van-field
        v-model="UPdateForm.beiZhu"
        name="beiZhu"
        label="备注"
        placeholder="备注"
      />
      <van-field
        v-model="UPdateForm.jianCeRiQi"
        name="jianCeRiQi"
        label="日期"
        placeholder="日期"
        @focus="noBomBox"
        :value-class="className"
        :value="UPdateForm.jianCeRiQi"
        @click="ShowBirthday = true"
      />
      <div style="margin: 16px;">
        <van-button round block type="primary" @click="Cancel">返回</van-button>
      </div>
    </van-form>
    <!-- 弹-----------------------------------------------------------------------------窗 -->
    <!-- 消毒日期 -->
    <van-popup v-model="ShowBirthday" round position="bottom">
      <van-datetime-picker
        :value-class="className"
        :value="UPdateForm.jianCeRiQi"
        type="date"
        title="日期"
        @cancel="ShowBirthday = false"
        @confirm="BirthdayConfirm"
        :formatter="formatter"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
import AreaList from "../../assets/Area/AreaList";

export default {
  data() {
    return {
      UPdateForm: {
        title: "",
        jiLiangDanWei: "",
        canKaoZhi: null,
        jianCeRenYuan: "",
        jianCeRiQi: "",
        jianCeZhi: null,
        jianCeJieGuo: "",
        beiZhu: ""
      },
      ChildName: [],
      ShowBirthday: false,
      BirthDayDate: new Date(),
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2060, 10, 1),
      className2: "",
      className: "",
      timeValue: "",
      timeValue2: "",
      areaList: AreaList,
      visible: false,
      radio: "1",
      // 日期
      ShowYJXHDate: false,
      ShowXHDate: false,
      LiuYangName: "",
      YJXHName: "",
      XHName: "",
      CanBieXZ: "",
      ShowCanBie: false
    };
  },
  created() {
    this.Cparams();
  },
  methods: {
    // 跳转首页
    onClickLeft() {
      this.$router.replace("/ShiPinJianCes");
    },
    // 取消添加
    Cancel() {
      this.$router.replace("/ShiPinJianCes");
      this.$notify({ type: "success", message: "返回首页" });
    },
    // 消毒日期选择
    BirthdayConfirm(val) {
      let year = val.getFullYear();
      let month = val.getMonth() + 1;
      let day = val.getDate();
      let hour = val.getHours();
      let minute = val.getMinutes();
      if (month >= 1 && month <= 9) {
        month = `${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      if (hour >= 0 && hour <= 9) {
        hour = `0${hour}`;
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`;
      }
      this.LiuYangName = "日期";
      this.UPdateForm.jianCeRiQi = `${year}-${month}-${day}`;
      this.ShowBirthday = false;
    },
    // 阻止默认键盘弹出
    noBomBox(Event) {
      document.activeElement.blur();
    },
    // 选项格式化函数
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      } else if (type === "hour") {
        return `${value}时`;
      } else if (type === "minute") {
        return `${value}分`;
      } else if (type === "second") {
        return `${value}秒`;
      }
      return value;
    },
    // 接收跳转传参
    Cparams() {
      this.UPdateForm.title = this.$route.params.title;
      this.UPdateForm.jiLiangDanWei = this.$route.params.jiLiangDanWei;
      this.UPdateForm.canKaoZhi = this.$route.params.canKaoZhi;
      this.UPdateForm.jianCeRenYuan = this.$route.params.jianCeRenYuan;
      this.UPdateForm.jianCeRiQi = this.$route.params.jianCeRiQi;
      this.UPdateForm.jianCeZhi = this.$route.params.jianCeZhi;
      this.UPdateForm.jianCeJieGuo = this.$route.params.jianCeJieGuo;
      this.UPdateForm.beiZhu = this.$route.params.beiZhu;
      this.UPdateForm.id = this.$route.params.id;
      this.UPdateForm.createTime = this.$route.params.createTime;
      this.UPdateForm.createId = this.$route.params.createId;
      this.UPdateForm.createName = this.$route.params.createName;
    }
  }
};
</script>

<style scoped></style>
