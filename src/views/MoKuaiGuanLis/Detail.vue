<template>
  <div class="ChildAdd">
    <!-- 导航栏 -->
    <van-nav-bar
      title="班级信息详情"
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
        <van-button round block type="primary" @click="Cancel">返回</van-button>
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

export default {
  data() {
    return {
      UPdateForm: {
        name: "",
        nianJi: null,
        mark: ""
      },
      ChildName: [],
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
    // 取消添加
    Cancel() {
      this.$router.replace("/BanJis");
      this.$notify({ type: "success", message: "返回首页" });
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
