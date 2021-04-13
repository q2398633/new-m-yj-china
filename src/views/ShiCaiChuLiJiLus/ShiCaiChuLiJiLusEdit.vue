<template>
  <div class="ChildAdd">
    <!-- 导航栏 -->
    <van-nav-bar
      title="食材处理记录修改"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- <div>{{ this.$router.params.ID }}</div> -->
    <!-- 添加表单 -->
    <van-form @submit="onSubmit">
      <div name="id"></div>
      <div name="banJi"></div>
      <van-field
        v-model="UPdateForm.foodName"
        label="食材名称"
        clearable
        placeholder="食材名称"
      />
      <van-field
        v-model="UPdateForm.lingYongRen"
        name="lingYongRen"
        label="领用人"
        placeholder="领用人"
      />
      <van-field
        v-model="UPdateForm.jiaGongRen"
        clearable
        name="jiaGongRen"
        label="加工人"
        placeholder="加工人"
      />
      <van-field
        v-model="UPdateForm.chuLiFangFa"
        name="chuLiFangFa"
        label="处理方式"
        placeholder="处理方式"
      />
      <van-field
        v-model="UPdateForm.chuLiShuLiang"
        name="chuLiShuLiang"
        label="处理数量"
        placeholder="处理数量"
      />
      <van-field
        v-model="UPdateForm.keYongShuLiang"
        name="keYongShuLiang"
        label="可用数量"
        placeholder="可用数量"
      />
      <van-field
        name="jiaGongDate"
        label="加工日期"
        placeholder="加工日期"
        @focus="noBomBox"
        :value-class="className"
        :value="UPdateForm.jiaGongDate"
        @click="ShowBirthday = true"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
      <div style="margin: 16px;">
        <van-button round block type="primary" @click="Cancel">取消</van-button>
      </div>
    </van-form>
    <!-- 弹-----------------------------------------------------------------------------窗 -->
    <!-- 消毒日期 -->
    <van-popup v-model="ShowBirthday" round position="bottom">
      <van-datetime-picker
        :value-class="className"
        :value="UPdateForm.jiaGongDate"
        type="date"
        title="加工日期"
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
import { SCCLEdit } from "@/api/ShiCaiChuLiJiLus";

export default {
  data() {
    return {
      UPdateForm: {
        foodName: "",
        lingYongRen: "",
        jiaGongRen: "",
        jiaGongDate: "",
        chuLiFangFa: "",
        chuLiShuLiang: null,
        keYongShuLiang: null,
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
      this.$router.replace("/ShiCaiChuLiJiLus");
    },
    minzuchange() {},
    // 提交添加表单
    async onSubmit(values) {
      values.chuLiShuLiang = this.UPdateForm.chuLiShuLiang - 0;
      values.keYongShuLiang = this.UPdateForm.keYongShuLiang - 0;
      values.foodName = this.UPdateForm.foodName;
      values.id = this.UPdateForm.id;
      const { data } = await SCCLEdit(values);
      if (data.code == 200) {
        this.$notify({ type: "success", message: "修改完成" });
        setTimeout(() => {
          this.$router.replace("/ShiCaiChuLiJiLus");
        }, 1500);
      }
    },
    // 取消添加
    Cancel() {
      this.$router.replace("/ShiCaiChuLiJiLus");
      this.$notify({ type: "success", message: "取消添加" });
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
      this.LiuYangName = "加工日期";
      this.UPdateForm.jiaGongDate = `${year}-${month}-${day}`;
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
      this.UPdateForm.foodName = this.$route.params.foodName;
      this.UPdateForm.lingYongRen = this.$route.params.lingYongRen;
      this.UPdateForm.jiaGongRen = this.$route.params.jiaGongRen;
      this.UPdateForm.jiaGongDate = this.$route.params.jiaGongDate;
      this.UPdateForm.chuLiFangFa = this.$route.params.chuLiFangFa;
      this.UPdateForm.chuLiShuLiang = this.$route.params.chuLiShuLiang;
      this.UPdateForm.keYongShuLiang = this.$route.params.keYongShuLiang;
      this.UPdateForm.id = this.$route.params.id;
      this.UPdateForm.createTime = this.$route.params.createTime;
      this.UPdateForm.createId = this.$route.params.createId;
      this.UPdateForm.createName = this.$route.params.createName;
    }
  }
};
</script>

<style scoped></style>
