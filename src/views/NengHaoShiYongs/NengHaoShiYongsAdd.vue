<template>
  <div class="ChildAdd">
    <!-- 导航栏 -->
    <van-nav-bar
      title="能耗使用添加"
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
        v-model="UPdateForm.数量"
        name="数量"
        label="数量"
        required
        placeholder="请输入数量"
        :rules="[{ required: true, message: '请输入数量' }]"
      />
      <van-field
        v-model="UPdateForm.jinE"
        name="jinE"
        label="金额"
        placeholder="金额"
      />
      <van-field
        v-model="UPdateForm.yinHangZhangHuId"
        name="yinHangZhangHuId"
        label="银行账户"
        placeholder="银行账户"
      />
      <van-field
        v-model="UPdateForm.yinHangZhangHuIdName"
        name="yinHangZhangHuIdName"
        label="银行名称"
        placeholder="银行名称"
      />
      <van-field
        v-model="UPdateForm.date"
        name="date"
        label="日期"
        placeholder="日期"
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
    <!-- 日期选择 -->
    <van-popup v-model="ShowBirthday" round position="bottom">
      <van-datetime-picker
        :value-class="LiuYangName"
        :value="UPdateForm.date"
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
import { NHSYAdd } from "@/api/NengHaoShiYongs";
import { CList } from "@/api/user";

export default {
  data() {
    return {
      UPdateForm: {
        date: "",
        title: "",
        jiLiangDanWei: "",
        danJia: null,
        数量: null,
        jinE: null,
        yinHangZhangHuId: "",
        yinHangZhangHuIdName: ""
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
      this.$router.replace("/NengHaoShiYongs");
    },
    minzuchange() {},
    // 提交添加表单
    async onSubmit(values) {
      values.danJia = this.UPdateForm.danJia - 0;
      values.jinE = this.UPdateForm.jinE - 0;
      values.数量 = this.UPdateForm.数量 - 0;
      const { data } = await NHSYAdd(values);
      if (data.code == 200) {
        this.$notify({ type: "success", message: "添加完成" });
        setTimeout(() => {
          this.$router.replace("/NengHaoShiYongs");
        }, 1500);
      }
    },
    // 取消修改
    Cancel() {
      this.$router.replace("/NengHaoShiYongs");
      this.$notify({ type: "success", message: "取消添加" });
    },
    // 日期选择
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
    }
  }
};
</script>

<style scoped></style>
