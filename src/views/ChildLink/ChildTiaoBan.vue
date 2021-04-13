<template>
  <div class="ChildAdd">
    <!-- 导航栏 -->
    <van-nav-bar
      title="幼儿调班"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- <div>{{ this.$router.params.ID }}</div> -->
    <!-- 添加表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="YRXZ"
        label="幼儿选择"
        clearable
        placeholder="幼儿选择"
        @focus="noBomBox"
        @click="ShowYR = true"
      />
      <van-field
        v-model="BJXZ"
        label="班级选择"
        placeholder="班级选择"
        @focus="noBomBox"
        @click="ShowBJ = true"
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
    <!-- 班级选择 -->
    <van-popup v-model="ShowBJ" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns2"
        @cancel="ShowBJ = false"
        @confirm="onConfirm4"
      />
    </van-popup>
    <!-- 幼儿选择弹窗 -->
    <van-popup v-model="ShowYR" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="ShowYR = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import AreaList from "../../assets/Area/AreaList";
import { BJList } from "@/api/BanJis";
import { CList } from "@/api/user";
import { ChildTB } from "@/api/UPdate";

export default {
  data() {
    return {
      UPdateForm: {
        ids: [],
        banJiId: ""
      },
      ChildName: [],
      areaList: AreaList,
      visible: false,
      ShowBJ: false,
      ShowYR: false,
      BJXZ: "",
      YRXZ: "",
      columns2: [],
      columns: [],
      BanJiList: "",
      childrenList: ""
    };
  },
  created() {
    this.CHhldList();
    this.BJList();
  },
  methods: {
    // 跳转首页
    onClickLeft() {
      this.$router.replace("/ChildManagement");
    },
    minzuchange() {},
    // 提交调班
    async onSubmit(values) {
      values.banJiId = this.UPdateForm.banJiId;
      values.ids = this.UPdateForm.ids;
      const { data } = await ChildTB(this.UPdateForm);
      if (data.code == 200) {
        this.$notify({ type: "success", message: "调班完成" });
        setTimeout(() => {
          this.$router.replace("/ChildManagement");
        }, 1500);
      }
    },
    // 取消调班
    Cancel() {
      this.$router.replace("/ChildManagement");
      this.$notify({ type: "success", message: "取消调班" });
    },
    // 班级选择
    async onConfirm4(value) {
      const { data } = await BJList();
      const BanJiList = data.data;
      for (var i in BanJiList) {
        if (value == BanJiList[i].name) {
          this.UPdateForm.banJiId = BanJiList[i].id;
        }
      }
      this.BJXZ = value;
      this.ShowBJ = false;
    },
    // 幼儿选择
    async onConfirm(value) {
      const { data } = await CList();
      const childrenList = data.data;
      for (var i in childrenList) {
        if (value == childrenList[i].xingMing) {
          this.UPdateForm.ids.push(childrenList[i].id);
        }
      }
      this.YRXZ = value;
      this.ShowYR = false;
    },
    // 阻止默认键盘弹出
    noBomBox(Event) {
      document.activeElement.blur();
    },
    // 获取班级
    async BJList() {
      const { data } = await BJList();
      const BanJiList = data.data;
      for (var i in BanJiList) {
        this.columns2.push(BanJiList[i].name);
      }
    },
    // 获取幼儿
    async CHhldList() {
      const { data } = await CList();
      const childrenList = data.data;
      for (var i in childrenList) {
        this.columns.push(childrenList[i].xingMing);
      }
    }
  }
};
</script>

<style scoped></style>
