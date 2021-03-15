<template>
  <div class="ChildAdd">
    <!-- 导航栏 -->
    <van-nav-bar
      title="幼儿信息详情"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- <div>{{ this.$router.params.ID }}</div> -->
    <!-- 添加表单 -->
    <van-form>
      <van-field name="Head" label="幼儿头像上传" required>
        <template #input>
          <van-uploader v-model="UPdateForm.xingBie" />
        </template>
      </van-field>
      <van-field
        v-model="UPdateForm.xingMing"
        name="xingMing"
        label="幼儿名称"
        required
        placeholder="请输入幼儿名称"
        :rules="[{ required: true, message: '请填写幼儿名称' }]"
        v-validate="'xingMing'"
      />
      <span
        v-show="errorBags.has('xingMing')"
        class="help is-danger"
        style="font-size: 0.3rem; color: red; margin-left: 31%;"
        >{{ errorBags.first("xingMing") }}</span
      >
      <van-field
        v-model="SexTypeValue"
        name="xingBie"
        label="性别"
        required
        @focus="noBomBox"
        placeholder="请选择幼儿性别"
        :rules="[{ required: true, message: '请选择性别' }]"
        @click="ShowSex = true"
      />
      <van-field
        v-model="BTypeValue"
        name="xueXing"
        required
        label="血型"
        @focus="noBomBox"
        placeholder="请选择幼儿血型"
        :rules="[{ required: true, message: '请选择血型' }]"
        @click="ShowBType = true"
      />
      <van-field
        v-model="MinZuType"
        name="minZu"
        required
        label="民族"
        @focus="noBomBox"
        @change="minzuchange"
        placeholder="请选择幼儿民族"
        :rules="[{ required: true, message: '请选择民族' }]"
        @click="ShowMinZu = true"
      />
      <van-field
        v-model="UPdateForm.shenFenZhengHao"
        name="shenFenZhengHao"
        v-validate="'shenFenZhengHao'"
        required
        label="身份证号"
        placeholder="请输入身份证号"
        :rules="[{ required: true, message: '请输入身份证号' }]"
      />
      <span
        v-show="errorBags.has('shenFenZhengHao')"
        class="help is-danger"
        style="font-size: 0.3rem; color: red; margin-left: 31%;"
        >{{ errorBags.first("shenFenZhengHao") }}</span
      >
      <van-field
        v-model="UPdateForm.xiHuanYanSe"
        name="xiHuanYanSe"
        label="喜欢的颜色"
        required
        placeholder="请输入喜欢的颜色"
        :rules="[{ required: true, message: '请输入喜欢的颜色' }]"
      />
      <van-field
        v-model="UPdateForm.teShuYaoQiu"
        name="teShuYaoQiu"
        label="特殊要求"
        placeholder="请输入特殊要求"
        :rules="[{ message: '请输入特殊要求' }]"
      />
      <van-field name="status" label="在园状态" required>
        <template #input>
          <van-radio-group
            v-model="UPdateForm.status"
            direction="horizontal"
            @change="radio"
          >
            <van-radio name="0">未入园</van-radio>
            <van-radio name="1" checked-color="#34dcc5">在园</van-radio>
            <van-radio name="2" checked-color="#e60101">毕业</van-radio>
            <van-radio name="3" checked-color="rgb(216 11 253)">离园</van-radio>
            <van-radio
              name="4"
              checked-color="rgb(234 255 120)"
              style="margin-left: 0.4rem;"
              >转园</van-radio
            >
          </van-radio-group>
        </template>
      </van-field>

      <!-- v-validate="'ParentName'"-->
      <!-- <span
        v-show="errors.has('ParentName')"
        class="help is-danger"
        style="font-size: 0.3rem; color: red;"
        >{{ errors.first("ParentName") }}</span
      > -->
      <van-field
        name="birthday"
        label="生日"
        required
        @focus="noBomBox"
        :value-class="className"
        :value="UPdateForm.shengRi"
        placeholder="请输入幼儿生日"
        :rules="[{ required: true, message: '请选择幼儿生日' }]"
        @click="ShowBirthday = true"
      />
      <van-field
        name="ruYuanRiQi"
        label="入园日期"
        required
        @focus="noBomBox"
        :value-class="className2"
        :value="UPdateForm.ruYuanRiQi"
        placeholder="请输入入园日期"
        :rules="[{ required: true, message: '请填写入园日期' }]"
        @click="ShowInDate = true"
      />
      <!-- 选择 转园||否-->
      <van-field name="shiFouZhuanYuan" label="是否转园" required>
        <template #input>
          <van-radio-group
            v-model="UPdateForm.shiFouZhuanYuan"
            direction="horizontal"
            @change="radio"
          >
            <van-radio name="0">是</van-radio>
            <van-radio name="1">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field name="pouFuChan" label="是否剖腹产" required @focus="noBomBox">
        <template #input>
          <van-radio-group
            v-model="UPdateForm.pouFuChan"
            direction="horizontal"
          >
            <van-radio name="0">是</van-radio>
            <van-radio name="1">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        name="ruTuoLeiXing"
        label="入托类型"
        required
        @focus="noBomBox"
      >
        <template #input>
          <van-radio-group
            v-model="UPdateForm.ruTuoLeiXing"
            direction="horizontal"
          >
            <van-radio name="1">全托</van-radio>
            <van-radio name="0" checked-color="#34dcc5">日托</van-radio>
            <van-radio name="2" checked-color="#e60101">混托</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="UPdateForm.jinJiLianXiRen"
        name="jinJiLianXiRen"
        required
        label="紧急联系人"
        placeholder="请输入紧急联系人"
        :rules="[{ required: true, message: '请输入紧急联系人' }]"
      />
      <van-field
        v-model="UPdateForm.jinJiLianXiRenDianHua"
        name="jinJiLianXiRenDianHua"
        v-validate="'jinJiLianXiRenDianHua'"
        required
        style="float: left; width: 60%"
        label="紧急联系人电话"
        placeholder="请输入紧急联系人电话"
        :rules="[{ required: true, message: '请输入紧急联系人电话' }]"
      />
      <span
        v-show="errorBags.has('jinJiLianXiRenDianHua')"
        class="help is-danger"
        style="font-size: 0.3rem; color: red;"
        >{{ errorBags.first("jinJiLianXiRenDianHua") }}</span
      >
      <van-field
        name="isJiaZuBingShi"
        label="是否有家族病史"
        required
        @focus="noBomBox"
      >
        <template #input>
          <van-radio-group
            v-model="UPdateForm.isJiaZuBingShi"
            direction="horizontal"
          >
            <van-radio name="0">是</van-radio>
            <van-radio name="1" checked-color="#e60101">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="UPdateForm.jiaZuBingShi"
        v-show="ShowJZBS"
        name="jiaZuBingShi"
        label="详细家族病史"
        placeholder="请输入详细家族病史"
        :rules="[{ message: '请输入详细家族病史' }]"
      />
      <van-field
        name="isXianTianJiBing"
        label="是否有先天性疾病"
        required
        @focus="noBomBox"
      >
        <template #input>
          <van-radio-group
            v-model="UPdateForm.isXianTianJiBing"
            direction="horizontal"
          >
            <van-radio name="0">是</van-radio>
            <van-radio name="1" checked-color="#e60101">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="UPdateForm.xianTianJiBing"
        name="xianTianJiBing"
        label="详细先天疾病"
        v-show="ShowXTJB"
        placeholder="请填写幼儿先天疾病"
        :rules="[{ message: '请填写先天疾病' }]"
      />
      <van-field
        v-model="HuJiLeiXingType"
        name="huJiLeiXing"
        label="户籍类型"
        required
        @focus="noBomBox"
        placeholder="请选择户籍类型"
        :rules="[{ required: true, message: '请选择户籍类型' }]"
        @click="ShowHuJiType = true"
      />
      <van-field
        v-model="UPdateForm.huJi"
        name="huJi"
        label="户籍"
        @focus="noBomBox"
        required
        placeholder="请选择户籍地址"
        :rules="[{ required: true, message: '请选择户籍地址' }]"
        @click="ShowHuJi = true"
      />
      <van-field
        v-model="UPdateForm.diZhi"
        name="diZhi"
        label="详细家庭地址"
        required
        placeholder="请输入幼儿家庭地址"
        :rules="[{ required: true, message: '请输入幼儿家庭地址' }]"
      />
      <van-field
        v-model="UPdateForm.dangAnHao"
        name="dangAnHao"
        label="档案号"
        required
        placeholder="请输入档案号"
        :rules="[{ required: true, message: '请输入档案号' }]"
      />
      <van-field
        name="baoJianGuanLiBen"
        label="是否有保健管理本"
        required
        @focus="noBomBox"
      >
        <template #input>
          <van-radio-group
            v-model="UPdateForm.baoJianGuanLiBen"
            direction="horizontal"
          >
            <van-radio name="0">是</van-radio>
            <van-radio name="1" checked-color="#e60101">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="primary" @click="Cancel">返回</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      UPdateForm: {
        jiaZuBingShi: "",
        minZu: "",
        ruTuoLeiXing: "",
        isJiaZuBingShi: "",
        dangAnHao: "",
        xueXing: "",
        jinJiLianXiRenDianHua: "",
        pouFuChan: "",
        shengRi: "",
        isXianTianJiBing: "",
        xianTianJiBing: "",
        status: "",
        xingMing: "",
        ruYuanRiQi: "",
        teShuYaoQiu: "",
        banJi: "",
        xiHuanYanSe: "",
        xingBie: "",
        huJiLeiXing: "",
        jinJiLianXiRen: "",
        shenFenZhengHao: "",
        baoJianGuanLiBen: "",
        diZhi: "",
        shiFouZhuanYuan: "",
        huJi: ""
      },
      ChildName: [],
      ShowBType: false,
      ShowGrade: false,
      ShowClass: false,
      ShowSex: false,
      ShowMinZu: false,
      ShowHuJi: false,
      ShowHuJiType: false,
      BType: [
        {
          name: "未知血型",
          value: "0"
        },
        {
          name: "A血型",
          value: "1"
        },
        {
          name: "B血型",
          value: "2"
        },
        {
          name: "AB血型",
          value: "3"
        },
        {
          name: "O血型",
          value: "4"
        },
        {
          name: "RH阳性血型",
          value: "5"
        },
        {
          name: "RH阴性血型",
          value: "6"
        },
        {
          name: "HLA血型",
          value: "7"
        },
        {
          name: "未定血型",
          value: "8"
        },
        {
          name: "其他血型",
          value: "9"
        }
      ],
      MinZuList: [
        {
          name: "汉族",
          value: "1"
        },
        {
          name: "蒙古族",
          value: "2"
        },
        {
          name: "回族",
          value: "3"
        },
        {
          name: "藏族",
          value: "4"
        },
        {
          name: "维吾尔族",
          value: "5"
        },
        {
          name: "苗族",
          value: "6"
        },
        {
          name: "彝族",
          value: "7"
        },
        {
          name: "壮族",
          value: "8"
        },
        {
          name: "布依族",
          value: "9"
        },
        {
          name: "朝鲜族",
          value: "10"
        },
        {
          name: "满族",
          value: "11"
        },
        {
          name: "侗族",
          value: "12"
        },
        {
          name: "瑶族",
          value: "13"
        },
        {
          name: "白族",
          value: "14"
        },
        {
          name: "土家族",
          value: "15"
        },
        {
          name: "哈尼族",
          value: "16"
        },
        {
          name: "哈萨克族",
          value: "17"
        },
        {
          name: "傣族",
          value: "18"
        },
        {
          name: "黎族",
          value: "19"
        },
        {
          name: "傈僳族",
          value: "20"
        },
        {
          name: "佤族",
          value: "21"
        },
        {
          name: "畲族",
          value: "22"
        },
        {
          name: "高山族",
          value: "23"
        },
        {
          name: "拉祜族",
          value: "24"
        },
        {
          name: "水族",
          value: "25"
        },
        {
          name: "东乡族",
          value: "26"
        },
        {
          name: "纳西族",
          value: "27"
        },
        {
          name: "景颇族",
          value: "28"
        },
        {
          name: "柯尔克孜族",
          value: "29"
        },
        {
          name: "土族",
          value: "30"
        },
        {
          name: "达斡尔族",
          value: "31"
        },
        {
          name: "仫佬族",
          value: "32"
        },
        {
          name: "羌族",
          value: "33"
        },
        {
          name: "布朗族",
          value: "34"
        },
        {
          name: "撒拉族",
          value: "35"
        },
        {
          name: "毛难族",
          value: "36"
        },
        {
          name: "仡佬族",
          value: "37"
        },
        {
          name: "锡伯族",
          value: "38"
        },
        {
          name: "阿昌族",
          value: "39"
        },
        {
          name: "普米族",
          value: "40"
        },
        {
          name: "塔吉克族",
          value: "41"
        },
        {
          name: "怒族",
          value: "42"
        },
        {
          name: "乌孜别克族",
          value: "43"
        },
        {
          name: "俄罗斯族",
          value: "44"
        },
        {
          name: "鄂温克族",
          value: "45"
        },
        {
          name: "崩龙族",
          value: "46"
        },
        {
          name: "保安族",
          value: "47"
        },
        {
          name: "裕固族",
          value: "48"
        },
        {
          name: "京族",
          value: "49"
        },
        {
          name: "塔塔尔族",
          value: "50"
        },
        {
          name: "独龙族",
          value: "51"
        },
        {
          name: "鄂伦春族",
          value: "52"
        },
        {
          name: "赫哲族",
          value: "53"
        },
        {
          name: "门巴族",
          value: "54"
        },
        {
          name: "珞巴族",
          value: "55"
        },
        {
          name: "基诺族",
          value: "56"
        },
        {
          name: "其他",
          value: "57"
        },
        {
          name: "外国血统中国人士",
          value: "58"
        }
      ],
      GradeList: ["大班", "中班", "小班", "托班", "学前班"],
      HuJiTypeList: [
        {
          name: "城镇户口",
          value: "0"
        },
        {
          name: "农村户口",
          value: "1"
        },
        {
          name: "外籍",
          value: "2"
        }
      ],
      SexList: [
        {
          name: "男",
          value: "1"
        },
        {
          name: "女",
          value: "0"
        }
      ],
      ShowBirthday: false,
      ShowInDate: false,
      BirthDayDate: new Date(),
      minDate: new Date(2000, 1, 1),
      maxDate: new Date(2025, 10, 1),
      className2: "",
      className: "",
      timeValue: "",
      timeValue2: "",
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
    // 跳转回幼儿列表页
    onClickLeft() {
      this.$router.replace("/ChildManagement");
    },
    // 血型弹窗
    AgeConfirm(value, index) {
      this.BTypeValue = value.name;
      this.UPdateForm.xueXing = value.value;
      this.ShowBType = false;
    },
    minzuchange() {},
    // 取消修改
    Cancel() {
      this.$router.replace("/ChildManagement");
      this.$notify({ type: "success", message: "取消添加" });
    },
    // 年级选择
    GradeConfirm(value) {
      this.Grade = value;
      this.ShowGrade = false;
    },
    // 户籍类型选择
    HuJiTypeConfirm(value) {
      this.HuJiLeiXingType = value.name;
      this.UPdateForm.huJiLeiXing = value.value;
      this.ShowHuJiType = false;
    },
    // 性别选择
    SexConfirm(value) {
      this.SexTypeValue = value.name;
      this.UPdateForm.xingBie = value.value;
      this.ShowSex = false;
    },
    MinZuConfirm(value) {
      this.MinZuType = value.name;
      this.UPdateForm.minZu = value.value;
      this.ShowMinZu = false;
    },
    // 生日选择
    BirthdayConfirm(val) {
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
      this.className = "生日";
      this.UPdateForm.shengRi = `${year}-${month}-${day}`;
      this.ShowBirthday = false;
    },
    // 阻止默认键盘弹出
    noBomBox(Event) {
      document.activeElement.blur();
    },
    // 入园日期选择
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
      this.className2 = "入园日期";
      this.UPdateForm.ruYuanRiQi = `${year}-${month}-${day}`;
      this.ShowInDate = false;
    },
    // 省市区选择关闭
    CancelAddres(value) {
      this.ShowHuJi = false;
      this.$refs.myArea.reset(); // 重置城市列表
    },
    // 省市区选择按钮点击
    onAddres(value) {
      this.ShowHuJi = false;
    },
    // 省市区选择
    onChangeAddres(picker, index, value) {
      let val = picker.getValues();
      let areaName = "";
      for (var i = 0; i < val.length; i++) {
        areaName = areaName + (i === 0 ? "" : "-") + val[i].name;
      }
      this.UPdateForm.huJi = areaName;
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
      this.UPdateForm.xueXing = this.$route.params.xueXing;
      this.UPdateForm.jiaZuBingShi = this.$route.params.jiaZuBingShi;
      for (var w = 0; w < this.MinZuList.length; w++) {
        if (this.MinZuList[w].value == this.$route.params.minZu) {
          this.MinZuType = this.MinZuList[w].name;
          this.UPdateForm.minZu = this.MinZuList[w].value;
        }
      }
      // this.UPdateForm.ruTuoLeiXing = this.$route.params.ruTuoLeiXing + "";
      this.UPdateForm.id = this.$route.params.id;
      this.UPdateForm.isJiaZuBingShi = this.$route.params.isJiaZuBingShi + "";
      this.UPdateForm.dangAnHao = this.$route.params.dangAnHao;
      for (var i = 0; i < this.BType.length; i++) {
        if (this.BType[i].value == this.$route.params.xueXing) {
          this.BTypeValue = this.BType[i].name;
        }
      }
      this.UPdateForm.jinJiLianXiRenDianHua = this.$route.params.jinJiLianXiRenDianHua;
      this.UPdateForm.pouFuChan = this.$route.params.pouFuChan + "";
      this.UPdateForm.shengRi = this.$route.params.shengRi;
      this.UPdateForm.isXianTianJiBing =
        this.$route.params.isXianTianJiBing + "";
      this.UPdateForm.xianTianJiBing = this.$route.params.xianTianJiBing;
      this.UPdateForm.status = this.$route.params.status + "";
      this.UPdateForm.huJi = this.$route.params.huJi;
      this.UPdateForm.ruYuanRiQi = this.$route.params.ruYuanRiQi;
      this.UPdateForm.teShuYaoQiu = this.$route.params.teShuYaoQiu;
      this.UPdateForm.banJi = this.$route.params.banJi;
      this.UPdateForm.xiHuanYanSe = this.$route.params.xiHuanYanSe;
      for (var q = 0; q < this.SexList.length; q++) {
        if (this.SexList[q].value == this.$route.params.xingBie) {
          this.SexTypeValue = this.SexList[q].name;
        }
      }
      for (var h = 0; h < this.HuJiTypeList.length; h++) {
        if (this.$route.params.huJiLeiXing == this.HuJiTypeList[h].value) {
          this.UPdateForm.huJiLeiXing = this.$route.params.huJiLeiXing;
          this.HuJiLeiXingType = this.HuJiTypeList[h].name
        }
      }
      this.UPdateForm.jinJiLianXiRen = this.$route.params.jinJiLianXiRen;
      this.UPdateForm.shenFenZhengHao = this.$route.params.shenFenZhengHao;
      this.UPdateForm.baoJianGuanLiBen =
        this.$route.params.baoJianGuanLiBen + "";
      this.UPdateForm.diZhi = this.$route.params.diZhi;
      this.UPdateForm.shiFouZhuanYuan = this.$route.params.shiFouZhuanYuan + "";
      this.UPdateForm.xingMing = this.$route.params.xingMing;
      if (this.UPdateForm.isXianTianJiBing == 0) {
        this.ShowJZBS = true;
      } else if (this.UPdateForm.isXianTianJiBing != 0) {
        this.ShowJZBS = false;
      }

      if (this.UPdateForm.isJiaZuBingShi == 0) {
        this.ShowJZBS = true;
      } else if (this.UPdateForm.isJiaZuBingShi != 0) {
        this.ShowJZBS = false;
      }
      this.UPdateForm.ruTuoLeiXing = this.$route.params.ruTuoLeiXing + "";
    },
    ClassConfirm() {}
  }
};
</script>

<style scoped></style>
