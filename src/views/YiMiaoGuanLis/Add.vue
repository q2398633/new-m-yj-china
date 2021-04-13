<template>
  <div class="ChildAdd">
    <!-- 导航栏 -->
    <van-nav-bar
      title="班级添加"
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
        label="班级"
        clearable
        placeholder="班级"
      />
      <van-field
        v-model="UPdateForm.nianJi"
        name="nianJi"
        label="年级"
        placeholder="年级"
        @focus="noBomBox"
        @click="ShowNJ = true"
      />
      <van-field
        v-model="UPdateForm.mark"
        name="mark"
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
    <!-- 年级选择 -->
    <van-popup v-model="ShowNJ" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns2"
        @cancel="ShowNJ = false"
        @confirm="onConfirm4"
      />
    </van-popup>
  </div>
</template>

<script>
import AreaList from "../../assets/Area/AreaList";
import { BJAdd } from "@/api/BanJis";

export default {
  data() {
    return {
      UPdateForm: {
        name: "",
        nianJi: "",
        mark: ""
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
      ShowYJXHDate: false,
      ShowXHDate: false,
      LiuYangName: "",
      YJXHName: "",
      XHName: "",
      CanBieXZ: "",
      ShowCanBie: false,
      NJXZ: "",
      columns2: ["宝宝班", "小小班", "小班", "中班", "大班"],
      ShowNJ: false
    };
  },
  created() {
    this.Cparams();
  },
  methods: {
    // 跳转首页
    onClickLeft() {
      this.$router.replace("/BanJis");
    },
    minzuchange() {},
    // 提交添加表单
    async onSubmit(values) {
      values.name = this.UPdateForm.name;
      values.nianJi = this.UPdateForm.nianJi - 0;
      const { data } = await BJAdd(values);
      if (data.code == 200) {
        this.$notify({ type: "success", message: "添加完成" });
        setTimeout(() => {
          this.$router.replace("/BanJis");
        }, 1500);
      }
    },
    // 取消添加
    Cancel() {
      this.$router.replace("/BanJis");
      this.$notify({ type: "success", message: "取消添加" });
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
    // 年级选择
    onConfirm4(value) {
      if (value == "宝宝班") {
        this.UPdateForm.nianJi = 0 - 0;
      } else if (value == "小小班") {
        this.UPdateForm.nianJi = 1 - 0;
      } else if (value == "小班") {
        this.UPdateForm.nianJi = 2 - 0;
      } else if (value == "中班") {
        this.UPdateForm.nianJi = 3 - 0;
      } else if (value == "大班") {
        this.UPdateForm.nianJi = 4 - 0;
      }
      this.NJXZ = value;
      this.ShowNJ = false;
    }
  }
};
</script>

<style scoped></style>
