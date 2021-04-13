<template>
  <div class="ChildAdd">
    <!-- 导航栏 -->
    <van-nav-bar
      title="餐具消毒修改"
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
        v-model="UPdateForm.title"
        name="title"
        label="名称"
        required
        placeholder="请输入名称"
        :rules="[{ required: true, message: '请填写名称' }]"
      />
      <van-field
        v-model="UPdateForm.jiLiangDanWei"
        name="jiLiangDanWei"
        required
        label="计量单位"
        placeholder="请输入计量单位"
        :rules="[{ required: true, message: '请输入计量单位' }]"
      />
      <van-field
        v-model="UPdateForm.danJia"
        name="danJia"
        label="单价"
        required
        placeholder="请输入单价"
        :rules="[{ required: true, message: '请输入单价' }]"
      />
      <van-field
        v-model="UPdateForm.beiZhu"
        name="beiZhu"
        label="备注"
        placeholder="备注"
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
  </div>
</template>

<script>
import AreaList from "../../assets/Area/AreaList";
import { NHKZEdit } from "@/api/NengHaoXiangMus";

export default {
  data() {
    return {
      UPdateForm: {
        title: "",
        jiLiangDanWei: "",
        danJia: null,
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
      this.$router.replace("/NengHaoXiangMus");
    },
    minzuchange() {},
    // 提交添加表单
    async onSubmit(values) {
      values.danJia = this.UPdateForm.danJia - 0;
      values.id = this.UPdateForm.id;
      const { data } = await NHKZEdit(values);
      if (data.code == 200) {
        this.$notify({ type: "success", message: "修改完成" });
        setTimeout(() => {
          this.$router.replace("/NengHaoXiangMus");
        }, 1500);
      }
    },
    // 取消修改
    Cancel() {
      this.$router.replace("/NengHaoXiangMus");
      this.$notify({ type: "success", message: "取消修改" });
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
    // 创建时间选择
    ruYuanRiQi(val) {
      let year = val.getFullYear();
      let month = val.getMonth() + 1;
      let day = val.getDate();
      let hour = val.getHours();
      let minute = val.getMinutes();
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      if (hour >= 0 && hour <= 9) {
        hour = `${hour}`;
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`;
      }
      this.className2 = "创建时间";
      this.UPdateForm.ruYuanRiQi = `${year}-${month}-${day}`;
      this.ShowInDate = false;
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
      this.UPdateForm.danJia = this.$route.params.danJia;
      this.UPdateForm.beiZhu = this.$route.params.beiZhu;
      this.UPdateForm.id = this.$route.params.id;
      this.UPdateForm.createTime = this.$route.params.createTime;
      this.UPdateForm.createId = this.$route.params.createId;
      this.UPdateForm.createName = this.$route.params.createName;
      this.UPdateForm.fuZeRen = this.$route.params.fuZeRen;
    },
    ClassConfirm() {}
  }
};
</script>

<style scoped></style>
