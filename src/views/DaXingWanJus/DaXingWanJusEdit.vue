<template>
  <div class="ChildAdd">
    <!-- 导航栏 -->
    <van-nav-bar
      title="大型玩具信息修改"
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
        name="xingMing"
        label="名称"
        required
        placeholder="请输入名称"
        :rules="[{ required: true, message: '请填写名称' }]"
      />
      <van-field
        v-model="UPdateForm.duiXiang"
        name="duiXiang"
        required
        label="对象"
        placeholder="请输入对象"
        :rules="[{ required: true, message: '请输入对象' }]"
      />
      <van-field
        v-model="UPdateForm.huoDongFangShi"
        name="huoDongFangShi"
        label="活动方式"
        required
        placeholder="请输入活动方式"
        :rules="[{ required: true, message: '请输入活动方式' }]"
      />
      <van-field
        v-model="UPdateForm.neiRong"
        name="neiRong"
        label="内容"
        required
        placeholder="请输入内容"
        :rules="[{ message: '请输入内容' }]"
      />
      <van-field
        name="date"
        label="日期"
        required
        @focus="noBomBox"
        :value-class="className"
        :value="UPdateForm.date"
        placeholder="请输入日期"
        :rules="[{ required: true, message: '请选择日期' }]"
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
    <!-- 检查日期选择 -->
    <van-popup v-model="ShowBirthday" round position="bottom">
      <van-datetime-picker
        :value-class="className"
        :value="UPdateForm.shengRi"
        type="date"
        title="检查日期"
        @cancel="ShowBirthday = false"
        @confirm="BirthdayConfirm"
        :formatter="formatter"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <!-- 创建时间选择 -->
    <van-popup v-model="ShowInDate" round position="bottom">
      <van-datetime-picker
        :value-class="className2"
        :value="ruYuanRiQi"
        type="date"
        title="创建时间"
        @cancel="ShowInDate = false"
        @confirm="ruYuanRiQi"
        :formatter="formatter"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
import AreaList from "../../assets/Area/AreaList";
import { JKDJEdit } from "@/api/JianKangDengJis";

export default {
  data() {
    return {
      UPdateForm: {
        date: "",
        title: "",
        duiXiang: "",
        huoDongFangShi: "",
        neiRong: "",
        id: "",
        createTime: "",
        createId: "",
        createName: ""
      },
      ChildName: [],
      ShowBType: false,
      ShowGrade: false,
      ShowClass: false,
      ShowSex: false,
      ShowMinZu: false,
      ShowHuJi: false,
      ShowHuJiType: false,
      ShowBirthday: false,
      ShowInDate: false,
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
      ShowJZBS: false,
      ShowXTJB: false,
      BTypeValue: "",
      SexTypeValue: "",
      HuJiLeiXingType: "",
      MinZuType: ""
    };
  },
  created() {
    this.Cparams();
  },
  methods: {
    // 跳转大型玩具页
    onClickLeft() {
      this.$router.replace("/DaXingWanJus");
    },
    minzuchange() {},
    // 提交添加表单
    async onSubmit() {
      const { data } = await JKDJEdit(this.UPdateForm);
      if (data.code == 200) {
        this.$notify({ type: "success", message: "修改完成" });
        setTimeout(() => {
          this.$router.replace("/DaXingWanJus");
        }, 1500);
      }
    },

    // 取消修改
    Cancel() {
      this.$router.replace("/DaXingWanJus");
      this.$notify({ type: "success", message: "取消修改" });
    },
    // 检查日期选择
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
      this.className = "检查日期";
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
      this.UPdateForm.date = this.$route.params.date;
      this.UPdateForm.title = this.$route.params.title;
      this.UPdateForm.duiXiang = this.$route.params.duiXiang;
      this.UPdateForm.huoDongFangShi = this.$route.params.huoDongFangShi;
      this.UPdateForm.neiRong = this.$route.params.neiRong;
      this.UPdateForm.id = this.$route.params.id;
      this.UPdateForm.createTime = this.$route.params.createTime;
      this.UPdateForm.createId = this.$route.params.createId;
      this.UPdateForm.createName = this.$route.params.createName;
    },
    ClassConfirm() {}
  }
};
</script>

<style scoped></style>
