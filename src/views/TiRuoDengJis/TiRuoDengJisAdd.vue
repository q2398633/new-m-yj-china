<template>
  <div class="ChildAdd">
    <!-- 导航栏 -->
    <van-nav-bar
      title="体弱肥胖儿童添加"
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
        v-model="UPdateForm.name"
        label="幼儿名称"
        clearable
        placeholder="幼儿名称"
      />
      <van-field
        v-model="BJXZ"
        name="banJi"
        label="班级"
        placeholder="班级"
        @focus="noBomBox"
        @click="ShowBJ = true"
      />
      <van-field
        v-model="XBXZ"
        name="xingBie"
        label="性别"
        placeholder="性别"
        @focus="noBomBox"
        @click="ShowSex = true"
      />
      <van-field
        v-model="UPdateForm.nianLing"
        clearable
        name="nianLing"
        label="年龄"
        placeholder="年龄"
      />
      <van-field
        v-model="UPdateForm.date"
        clearable
        name="date"
        label="日期"
        placeholder="日期"
        @click="ShowBirthday = true"
        @focus="noBomBox"
      />
      <van-field
        v-model="UPdateForm.jieAnRiQi"
        clearable
        name="jieAnRiQi"
        @focus="noBomBox"
        label="结案日期"
        placeholder="结案日期"
        @click="ShowInDate = true"
      />
      <van-field
        v-model="UPdateForm.fenLeiMingCheng"
        clearable
        name="fenLeiMingCheng"
        label="分类名称"
        placeholder="分类名称"
      />
      <van-field
        v-model="UPdateForm.shouCiJieGuo"
        clearable
        name="shouCiJieGuo"
        label="首次结果"
        placeholder="首次结果"
      />
      <van-field
        v-model="ZNXZ"
        clearable
        name="isZhuanAn"
        label="专案"
        @focus="noBomBox"
        placeholder="专案"
        @click="ShowZN = true"
      />
      <van-field
        v-model="UPdateForm.fuCha"
        clearable
        name="fuCha"
        label="复查"
        placeholder="复查"
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
    <!-- 性别选择 -->
    <van-popup v-model="ShowSex" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="ShowSex = false"
        @confirm="onConfirm4"
      />
    </van-popup>
    <!-- 班级选择 -->
    <van-popup v-model="ShowBJ" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns2"
        @cancel="ShowBJ = false"
        @confirm="onConfirm5"
      />
    </van-popup>
    <!-- 专案选择 -->
    <van-popup v-model="ShowZN" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns4"
        @cancel="ShowZN = false"
        @confirm="onConfirm6"
      />
    </van-popup>
    <!-- 日期 -->
    <van-popup v-model="ShowInDate" round position="bottom">
      <van-datetime-picker
        :value-class="className2"
        :value="UPdateForm.jieAnRiQi"
        type="date"
        title="结案日期"
        @cancel="ShowInDate = false"
        @confirm="Rdate"
        :formatter="formatter"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <van-popup v-model="ShowBirthday" round position="bottom">
      <van-datetime-picker
        :value-class="className"
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
import { TRFPAdd } from "@/api/TiRuoDengJis";
import { BJList } from "@/api/BanJis";

export default {
  data() {
    return {
      UPdateForm: {
        name: "",
        banJi: "",
        xingBie: null,
        nianLing: null,
        date: "",
        jieAnRiQi: "",
        fenLeiMingCheng: "",
        shouCiJieGuo: "",
        isZhuanAn: false,
        fuCha: ""
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
      ShowCanBie: false,
      XBXZ: "",
      BJXZ: "",
      ZNXZ: "",
      ShowInDate: false,
      ShowZN: false,
      columns: ["男", "女"],
      columns2: [],
      columns4: ["是", "否"],
      ShowBJ: false,
      ShowSex: false
    };
  },
  created() {
    this.BanJiList();
  },
  methods: {
    // 跳转首页
    onClickLeft() {
      this.$router.replace("/TiRuoDengJis");
    },
    minzuchange() {},
    // 提交添加表单
    async onSubmit(values) {
      values.name = this.UPdateForm.name;
      values.nianLing = this.UPdateForm.nianLing - 0;
      values.xingBie = this.UPdateForm.xingBie - 0;
      if (this.UPdateForm.isZhuanAn == true) {
        values.isZhuanAn = true;
      } else if (this.UPdateForm.isZhuanAn == false) {
        values.isZhuanAn = false;
      }
      const { data } = await TRFPAdd(values);
      if (data.code == 200) {
        this.$notify({ type: "success", message: "添加完成" });
        setTimeout(() => {
          this.$router.replace("/TiRuoDengJis");
        }, 1500);
      }
    },
    // 取消添加
    Cancel() {
      this.$router.replace("/TiRuoDengJis");
      this.$notify({ type: "success", message: "取消添加" });
    },
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
      this.className = "日期";
      this.UPdateForm.date = `${year}-${month}-${day}`;
      this.ShowBirthday = false;
    },
    Rdate(val) {
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
      this.className2 = "结案日期";
      this.UPdateForm.jieAnRiQi = `${year}-${month}-${day}`;
      this.ShowInDate = false;
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
    // 性别选择
    onConfirm4(value) {
      if (value == "男") {
        this.UPdateForm.xingBie = 0 - 0;
      } else if (value == "女") {
        this.UPdateForm.xingBie = 1 - 0;
      }
      this.XBXZ = value;
      this.ShowSex = false;
    },
    // 专案选择
    onConfirm6(value) {
      if (value == "是") {
        this.UPdateForm.isZhuanAn = true;
      } else if (value == "否") {
        this.UPdateForm.isZhuanAn = false;
      }
      this.ZNXZ = value;
      this.ShowZN = false;
    },
    // 班级选择
    onConfirm5(value) {
      this.UPdateForm.banJi = value;
      this.BJXZ = value;
      this.ShowBJ = false;
    },
    async BanJiList() {
      const { data } = await BJList();
      console.log(data);
      const BanJiData = data.data;
      for (var i in BanJiData) {
        this.columns2.push(BanJiData[i].name);
      }
    }
  }
};
</script>

<style scoped></style>
