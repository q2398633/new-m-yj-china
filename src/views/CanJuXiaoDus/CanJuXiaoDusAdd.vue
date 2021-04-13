<template>
  <div class="ChildAdd">
    <!-- 导航栏 -->
    <van-nav-bar
      title="餐具消毒添加"
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
        v-model="UPdateForm.xiaoDuFangFa"
        name="xiaoDuFangFa"
        label="消毒方式"
        required
        placeholder="请输入消毒方式"
        :rules="[{ required: true, message: '请填写消毒方式' }]"
      />
      <van-field
        v-model="CanBieXZ"
        name="canBie"
        required
        label="餐别"
        placeholder="请输入餐别"
        :rules="[{ required: true, message: '请输入餐别' }]"
        @click="ShowCanBie = true"
      />
      <van-field
        v-model="UPdateForm.caoZuoYuan"
        name="caoZuoYuan"
        label="操作员"
        required
        placeholder="请输入操作员"
        :rules="[{ required: true, message: '请输入操作员' }]"
      />
      <van-field
        v-model="UPdateForm.fuZeRen"
        name="fuZeRen"
        label="负责人"
        required
        placeholder="请输入负责人"
        :rules="[{ required: true, message: '请输入负责人' }]"
      />
      <van-field
        v-model="UPdateForm.date"
        name="date"
        label="消毒日期"
        placeholder="消毒日期"
        @focus="noBomBox"
        :value-class="LiuYangName"
        :value="UPdateForm.liuYangRiQi"
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
    <!-- 餐别选择 -->
    <van-popup v-model="ShowCanBie" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns2"
        @cancel="ShowCanBie = false"
        @confirm="onConfirm4"
      />
    </van-popup>
    <!-- 消毒日期选择 -->
    <van-popup v-model="ShowBirthday" round position="bottom">
      <van-datetime-picker
        :value-class="LiuYangName"
        :value="UPdateForm.date"
        type="date"
        title="消毒日期"
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
import { CJXDAdd } from "@/api/CanJuXiaoDus";
import { CList } from "@/api/user";

export default {
  data() {
    return {
      UPdateForm: {
        date: "",
        canBie: null,
        xiaoDuFangFa: "",
        caoZuoYuan: "",
        fuZeRen: ""
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
      BTypeValue: "",
      SexTypeValue: "",
      HuJiLeiXingType: "",
      MinZuType: "",
      LoadPage: {
        page: 1,
        limit: 99
      },
      showPicker: false,
      ChildList: [],
      ChildContent: [],
      CName: "",
      CList: [],
      // 日期
      ShowYJXHDate: false,
      ShowXHDate: false,
      columns2: ["早餐", "早点", "午餐", "午点", "晚餐", "晚点"],
      LiuYangName: "",
      YJXHName: "",
      XHName: "",
      CanBieXZ: "",
      ShowCanBie: false
    };
  },
  created() {
    this.IZChild();
  },
  methods: {
    // 跳转首页
    onClickLeft() {
      this.$router.replace("/CanJuXiaoDus");
    },
    minzuchange() {},
    // 提交添加表单
    async onSubmit(values) {
      values.canBie = this.UPdateForm.canBie
      const { data } = await CJXDAdd(values);
      if (data.code == 200) {
        this.$notify({ type: "success", message: "添加完成" });
        setTimeout(() => {
          this.$router.replace("/CanJuXiaoDus");
        }, 1500);
      }
    },
    onConfirm4(value) {
      if (value == "早餐") {
        this.UPdateForm.canBie = 0 - 0;
      } else if (value == "早点") {
        this.UPdateForm.canBie = 1 - 0;
      } else if (value == "午餐") {
        this.UPdateForm.canBie = 2 - 0;
      } else if (value == "午点") {
        this.UPdateForm.canBie = 3 - 0;
      } else if (value == "晚餐") {
        this.UPdateForm.canBie = 4 - 0;
      } else if (value == "晚点") {
        this.UPdateForm.canBie = 5 - 0;
      }
      this.CanBieXZ = value;
      this.ShowCanBie = false;
    },
    // 取消修改
    Cancel() {
      this.$router.replace("/CanJuXiaoDus");
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
    // 初始化信息
    async IZChild() {
      const { data } = await CList();
      var ChildList = data.data;
      for (var i in ChildList) {
        this.ChildContent.push({
          name: ChildList[i].xingMing,
          id: ChildList[i].id
        });
      }
      for (var t in this.ChildContent) {
        this.CList.push(this.ChildContent[t].name);
      }
    },
    // 选择
    ChildConfirm(value) {
      this.CName = value;
      for (var y in this.ChildContent) {
        if (this.CName == this.ChildContent[y].name) {
          this.UPdateForm.studentId = this.ChildContent[y].id;
        }
      }
      this.showPicker = false;
    }
  }
};
</script>

<style scoped></style>
