<template>
  <div class="ChildAdd">
    <!-- 导航栏 -->
    <van-nav-bar
      title="晨午晚检详情"
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
        v-model="UPdateForm.studentIdName"
        name="xingMing"
        label="学生姓名"
        required
        @focus="noBomBox"
        readonly
        placeholder="请输入学生姓名"
        :rules="[{ required: true, message: '请填写学生姓名' }]"
        v-validate="'xingMing'"
      />
      <span
        v-show="errorBags.has('xingMing')"
        class="help is-danger"
        style="font-size: 0.3rem; color: red; margin-left: 31%;"
        >{{ errorBags.first("xingMing") }}</span
      >
      <van-field
        v-model="UPdateForm.zhengZhuang"
        name="zhengZhuang"
        required
        @focus="noBomBox"
        readonly
        label="症状"
        placeholder="请输入症状"
        :rules="[{ required: true, message: '请输入症状' }]"
      />
      <van-field
        v-model="UPdateForm.tiZheng"
        name="tiZheng"
        label="体征"
        required
        @focus="noBomBox"
        readonly
        placeholder="请输入体征"
        :rules="[{ required: true, message: '请输入体征' }]"
      />
      <van-field
        v-model="UPdateForm.zhenDuan"
        name="zhenDuan"
        label="诊断"
        required
        @focus="noBomBox"
        readonly
        placeholder="请输入诊断"
        :rules="[{ message: '请输入诊断' }]"
      />
      <van-field
        v-model="UPdateForm.chuLiFangShi"
        name="chuLiFangShi"
        required
        @focus="noBomBox"
        readonly
        label="处理方式"
        placeholder="请输入处理方式"
        :rules="[{ required: true, message: '请输入处理方式' }]"
      />
      <van-field
        v-model="UPdateForm.jiBingFenLei"
        name="jiBingFenLei"
        required
        readonly
        @focus="noBomBox"
        style="float: left; width: 60%"
        label="疾病分类"
        placeholder="请输入疾病分类"
        :rules="[{ required: true, message: '请输入疾病分类' }]"
      />
      <van-field
        v-model="UPdateForm.zhengZhuangFenLei"
        name="zhengZhuangFenLei"
        label="症状分类"
        required
        readonly
        @focus="noBomBox"
        placeholder="请输入症状分类"
        :rules="[{ required: true, message: '请输入症状分类' }]"
      />
      <van-field
        v-model="UPdateForm.jianChaRen"
        name="jianChaRen"
        label="检查人"
        required
        readonly
        @focus="noBomBox"
        placeholder="请输入检查人"
        :rules="[{ required: true, message: '请输入检查人' }]"
      />
      <van-field
        name="date"
        label="检查日期"
        required
        readonly
        @focus="noBomBox"
        :value-class="className"
        :value="UPdateForm.date"
        placeholder="请输入检查日期"
        :rules="[{ required: true, message: '请选择检查日期' }]"
        @click="ShowBirthday = true"
      />
      <van-field
        name="createTime"
        label="创建时间"
        required
        readonly
        @focus="noBomBox"
        :value-class="className2"
        :value="UPdateForm.createTime"
        placeholder="请输入创建时间"
        :rules="[{ required: true, message: '请填写创建时间' }]"
        @click="ShowInDate = true"
      />
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
import { CWWJEdit } from "@/api/ChenWuWanJian";

export default {
  data() {
    return {
      UPdateForm: {
        chuLiFangShi: "",
        createId: "",
        createName: "",
        createTime: "",
        date: "",
        id: "",
        jiBingFenLei: "",
        jianChaRen: "",
        studentId: "",
        studentIdName: "",
        tiZheng: "",
        zhenDuan: "",
        zhengZhuang: "",
        zhengZhuangFenLei: ""
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
    // 跳转回晨午晚检页
    onClickLeft() {
      this.$router.replace("/ChenWuWanJian");
    },
    minzuchange() {},
    // 提交添加表单
    async onSubmit() {
      const { data } = await CWWJEdit(this.UPdateForm);
      // console.log(data);
      if (data.code == 200) {
        this.$notify({ type: "success", message: "修改完成" });
        setTimeout(() => {
          this.$router.replace("/ChenWuWanJian");
        }, 1500);
      }
    },

    // 取消修改
    Cancel() {
      this.$router.replace("/ChenWuWanJian");
      this.$notify({ type: "success", message: "取消添加" });
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
      this.UPdateForm.shengRi = `${year}-${month}-${day}`;
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
      this.UPdateForm.chuLiFangShi = this.$route.params.chuLiFangShi;
      this.UPdateForm.createId = this.$route.params.createId;
      this.UPdateForm.createName = this.$route.params.createName;
      this.UPdateForm.createTime = this.$route.params.createTime;
      this.UPdateForm.date = this.$route.params.date;
      this.UPdateForm.id = this.$route.params.id;
      this.UPdateForm.jiBingFenLei = this.$route.params.jiBingFenLei;
      this.UPdateForm.jianChaRen = this.$route.params.jianChaRen;
      this.UPdateForm.studentId = this.$route.params.studentId;
      this.UPdateForm.studentIdName = this.$route.params.studentIdName;
      this.UPdateForm.tiZheng = this.$route.params.tiZheng;
      this.UPdateForm.zhenDuan = this.$route.params.zhenDuan;
      this.UPdateForm.zhengZhuang = this.$route.params.zhengZhuang;
      this.UPdateForm.zhengZhuangFenLei = this.$route.params.zhengZhuangFenLei;
      console.log(this.UPdateForm);
    },
    ClassConfirm() {}
  }
};
</script>

<style scoped></style>
