<template>
  <div class="ChildAdd">
    <!-- 导航栏 -->
    <van-nav-bar
      title="班级信息修改"
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
        v-model="NJXZ"
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
import { BJEdit } from "@/api/BanJis";

export default {
  data() {
    return {
      UPdateForm: {
        name: "",
        nianJi: null,
        mark: ""
      },
      ChildName: [],
      areaList: AreaList,
      visible: false,
      ShowNJ: false,
      NJXZ: "",
      columns2: ["宝宝班", "小小班", "小班", "中班", "大班"]
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
      values.nianJi = this.UPdateForm.nianJi - 0;
      values.name = this.UPdateForm.name;
      values.id = this.UPdateForm.id;
      const { data } = await BJEdit(values);
      if (data.code == 200) {
        this.$notify({ type: "success", message: "修改完成" });
        setTimeout(() => {
          this.$router.replace("/BanJis");
        }, 1500);
      }
    },
    // 取消添加
    Cancel() {
      this.$router.replace("/BanJis");
      this.$notify({ type: "success", message: "取消修改" });
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
      this.UPdateForm.name = this.$route.params.name;
      this.NJXZ = this.$route.params.nianJi;
      this.UPdateForm.mark = this.$route.params.mark;
      this.UPdateForm.id = this.$route.params.id;
      this.UPdateForm.createTime = this.$route.params.createTime;
      this.UPdateForm.createId = this.$route.params.createId;
      this.UPdateForm.createName = this.$route.params.createName;
      if (this.$route.params.nianJi == "宝宝班") {
        this.UPdateForm.nianJi = 0 - 0;
      } else if (this.$route.params.nianJi == "小小班") {
        this.UPdateForm.nianJi = 1 - 0;
      } else if (this.$route.params.nianJi == "小班") {
        this.UPdateForm.nianJi = 2 - 0;
      } else if (this.$route.params.nianJi == "中班") {
        this.UPdateForm.nianJi = 3 - 0;
      } else if (this.$route.params.nianJi == "大班") {
        this.UPdateForm.nianJi = 4 - 0;
      }
    }
  }
};
</script>

<style scoped></style>
