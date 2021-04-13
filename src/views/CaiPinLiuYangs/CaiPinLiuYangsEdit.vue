<template>
  <div class="ChildAdd">
    <!-- 导航栏 -->
    <van-nav-bar
      title="菜品留样修改"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- <div>{{ this.$router.params.ID }}</div> -->
    <!-- 添加表单 -->
    <van-form @submit="onSubmit">
      <div name="id"></div>
      <van-field
        v-model="UPdateForm.caiYao"
        name="caiYao"
        label="菜肴"
        required
        placeholder="请输入菜肴名称"
        :rules="[{ required: true, message: '请填写菜肴名称' }]"
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
        v-model="UPdateForm.jiaGongRen"
        name="jiaGongRen"
        label="加工人"
        required
        placeholder="请输入加工人"
        :rules="[{ required: true, message: '请输入加工人' }]"
      />
      <van-field
        v-model="UPdateForm.liuYangRen"
        name="liuYangRen"
        label="留样人"
        required
        placeholder="请输入留样人"
        :rules="[{ required: true, message: '请输入留样人' }]"
      />
      <van-field
        v-model="UPdateForm.liuYangRiQi"
        name="liuYangRiQi"
        label="留样日期"
        placeholder="留样日期"
        @focus="noBomBox"
        :value-class="LiuYangName"
        :value="UPdateForm.liuYangRiQi"
        @click="ShowBirthday = true"
      />
      <van-field
        v-model="UPdateForm.liuYangWeiZhi"
        name="liuYangWeiZhi"
        label="留样位置"
        placeholder="留样位置"
      />
      <van-field
        v-model="UPdateForm.xiaoHuiRen"
        name="xiaoHuiRen"
        label="销毁人"
        placeholder="销毁人"
      />
      <van-field
        v-model="UPdateForm.beiZhu"
        name="beiZhu"
        label="备注"
        placeholder="备注"
      />
      <van-field
        v-model="UPdateForm.yuJiXiaoHuiRiQi"
        name="yuJiXiaoHuiRiQi"
        label="预计销毁日期"
        placeholder="预计销毁日期"
        @click="ShowYJXHDate = true"
      />
      <van-field
        v-model="UPdateForm.xiaoHuiRiQi"
        name="xiaoHuiRiQi"
        label="销毁日期"
        placeholder="销毁日期"
        @click="ShowXHDate = true"
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
    <!-- 餐别选择 -->
    <van-popup v-model="ShowCanBie" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns2"
        @cancel="ShowCanBie = false"
        @confirm="onConfirm4"
      />
    </van-popup>
    <!-- 留样日期选择 -->
    <van-popup v-model="ShowBirthday" round position="bottom">
      <van-datetime-picker
        :value-class="LiuYangName"
        :value="UPdateForm.liuYangRiQi"
        type="date"
        title="留样日期"
        @cancel="ShowBirthday = false"
        @confirm="BirthdayConfirm"
        :formatter="formatter"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <!-- 预计销毁日期选择 -->
    <van-popup v-model="ShowYJXHDate" round position="bottom">
      <van-datetime-picker
        :value-class="YJXHName"
        :value="UPdateForm.yuJiXiaoHuiRiQi"
        type="date"
        title="预计销毁日期"
        @cancel="ShowYJXHDate = false"
        @confirm="Rdate"
        :formatter="formatter"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <!-- 销毁日期选择 -->
    <van-popup v-model="ShowXHDate" round position="bottom">
      <van-datetime-picker
        :value-class="XHName"
        :value="UPdateForm.XiaoHuiRiQi"
        type="date"
        title="销毁日期"
        @cancel="ShowXHDate = false"
        @confirm="XHdate"
        :formatter="formatter"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
import AreaList from "../../assets/Area/AreaList";
import { CPLYEdit } from "@/api/CaiPinLiuYangs";

export default {
  data() {
    return {
      UPdateForm: {
        beiZhu: "",
        canBie: null,
        caiYao: "",
        jiaGongRen: "",
        liuYangRiQi: "",
        liuYangRen: "",
        liuYangWeiZhi: "",
        yuJiXiaoHuiRiQi: "",
        xiaoHuiRiQi: "",
        xiaoHuiRen: "",
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
      columns2: ["早餐", "早点", "午餐", "午点", "晚餐", "晚点"],
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
      this.$router.replace("/CaiPinLiuYangs");
    },
    minzuchange() {},
    // 提交添加表单
    async onSubmit(values) {
      if (values.canBie == "早餐") {
        values.canBie = 0 - 0;
      } else if (values.canBie == "早点") {
        values.canBie = 1 - 0;
      } else if (values.canBie == "午餐") {
        values.canBie = 2 - 0;
      } else if (values.canBie == "午点") {
        values.canBie = 3 - 0;
      } else if (values.canBie == "晚餐") {
        values.canBie = 4 - 0;
      } else if (values.canBie == "晚点") {
        values.canBie = 5 - 0;
      }
      values.id = this.UPdateForm.id;
      const { data } = await CPLYEdit(values);
      if (data.code == 200) {
        this.$notify({ type: "success", message: "修改完成" });
        setTimeout(() => {
          this.$router.replace("/CaiPinLiuYangs");
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
      this.$router.replace("/CaiPinLiuYangs");
      this.$notify({ type: "success", message: "取消修改" });
    },
    // 留样日期选择
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
      this.LiuYangName = "留样日期";
      this.UPdateForm.liuYangRiQi = `${year}-${month}-${day}`;
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
      this.YJXHName = "预计销毁日期";
      this.UPdateForm.yuJiXiaoHuiRiQi = `${year}-${month}-${day}`;
      this.ShowYJXHDate = false;
    },
    XHdate(val) {
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
      this.XHName = "销毁日期";
      this.UPdateForm.xiaoHuiRiQi = `${year}-${month}-${day}`;
      this.ShowXHDate = false;
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
      this.UPdateForm.beiZhu = this.$route.params.beiZhu;
      this.CanBieXZ = this.$route.params.canBie;
      this.UPdateForm.caiYao = this.$route.params.caiYao;
      this.UPdateForm.jiaGongRen = this.$route.params.jiaGongRen;
      this.UPdateForm.id = this.$route.params.id;
      this.UPdateForm.createTime = this.$route.params.createTime;
      this.UPdateForm.createId = this.$route.params.createId;
      this.UPdateForm.createName = this.$route.params.createName;
      this.UPdateForm.liuYangRiQi = this.$route.params.liuYangRiQi;
      this.UPdateForm.liuYangRen = this.$route.params.liuYangRen;
      this.UPdateForm.liuYangWeiZhi = this.$route.params.liuYangWeiZhi;
      this.UPdateForm.yuJiXiaoHuiRiQi = this.$route.params.yuJiXiaoHuiRiQi;
      this.UPdateForm.xiaoHuiRiQi = this.$route.params.xiaoHuiRiQi;
      this.UPdateForm.xiaoHuiRen = this.$route.params.xiaoHuiRen;
      if (this.$route.params.canBie == "早餐") {
        this.UPdateForm.canBie = 0 - 0;
      } else if (this.$route.params.canBie == "早点") {
        this.UPdateForm.canBie = 1 - 0;
      } else if (this.$route.params.canBie == "午餐") {
        this.UPdateForm.canBie = 2 - 0;
      } else if (this.$route.params.canBie == "午点") {
        this.UPdateForm.canBie = 3 - 0;
      } else if (this.$route.params.canBie == "晚餐") {
        this.UPdateForm.canBie = 4 - 0;
      } else if (this.$route.params.canBie == "晚点") {
        this.UPdateForm.canBie = 5 - 0;
      }
    },
    ClassConfirm() {}
  }
};
</script>

<style scoped></style>
