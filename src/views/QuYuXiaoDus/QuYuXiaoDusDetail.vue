<template>
  <div class="ChildAdd">
    <!-- 导航栏 -->
    <van-nav-bar
      title="区域消毒详情"
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
        v-model="UPdateForm.caoZuoYuan"
        label="操作员"
        clearable
        placeholder="操作员"
      />
      <van-field
        v-model="UPdateForm.xiaoDuQuYu"
        name="xiaoDuQuYu"
        label="消毒区域"
        placeholder="消毒区域"
      />
      <van-field
        v-model="UPdateForm.xiaoDuFangFa"
        clearable
        name="xiaoDuFangFa"
        label="消毒方式"
        placeholder="消毒方式"
      />
      <van-field
        v-model="UPdateForm.fuZeRen"
        name="fuZeRen"
        label="负责人"
        placeholder="负责人"
      />
      <van-field
        v-model="UPdateForm.date"
        name="date"
        label="消毒时间"
        placeholder="消毒时间"
        @focus="noBomBox"
        :value-class="className"
        :value="UPdateForm.date"
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
        :value="UPdateForm.date"
        type="date"
        title="区域消毒"
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
        xiaoDuQuYu: "",
        xiaoDuFangFa: "",
        date: "",
        fuZeRen: "",
        caoZuoYuan: "",
        id: ""
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
      this.$router.replace("/QuYuXiaoDus");
    },
    // 返回首页
    Cancel() {
      this.$router.replace("/QuYuXiaoDus");
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
      this.LiuYangName = "消毒日期";
      this.UPdateForm.date = `${year}-${month}-${day}`;
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
      this.UPdateForm.xiaoDuQuYu = this.$route.params.xiaoDuQuYu;
      this.UPdateForm.xiaoDuFangFa = this.$route.params.xiaoDuFangFa;
      this.UPdateForm.danJia = this.$route.params.danJia;
      this.UPdateForm.date = this.$route.params.date;
      this.UPdateForm.fuZeRen = this.$route.params.fuZeRen;
      this.UPdateForm.caoZuoYuan = this.$route.params.caoZuoYuan;
      this.UPdateForm.id = this.$route.params.id;
      this.UPdateForm.createTime = this.$route.params.createTime;
      this.UPdateForm.createId = this.$route.params.createId;
      this.UPdateForm.createName = this.$route.params.createName;
    }
  }
};
</script>

<style scoped></style>
