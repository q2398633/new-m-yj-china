<template>
  <div class="Child_Box">
    <!-- NavBar 导航栏 -->
    <div>
      <van-sticky>
        <van-nav-bar
          title="幼儿管理"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        >
          <template #right>
            <van-icon
              name="search"
              size="0.8rem"
              v-if="SearchShow"
              @click="onClickRight"
            />
            <div v-if="ClearCheckBox" @click="ClearCheck">取消多选</div>
          </template>
        </van-nav-bar>
      </van-sticky>
    </div>
    <!-- 重新加载数据 -->
    <!-- <div class="Revoke" @click="Revoke">
      <van-icon name="notes-o" size="0.8rem" class="Revoke_Icon" />
    </div> -->
    <!-- 幼儿列表 -->
    <div class="Child_List" style="text-align: center;">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="130"
      >
        <div v-for="(item, index) in ChildName" :key="index">
          <van-checkbox-group v-model="result" @change="CheckBoxChange">
            <van-cell
              v-longtap="e => vueTouch('长按', e)"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox
                  :name="item"
                  ref="checkboxes"
                  v-show="ListCheckbox"
                />
              </template>
              <div class="ChildHead">
                <van-image
                  round
                  width="1.5rem"
                  height="1.5rem"
                  :src="item.Head"
                />
              </div>
              <div class="ChildName" @click="Child_Countend($event)">
                <div>{{ item.xingMing }}</div>
                <div class="ChildName_Bottom">{{ item.banJi }}</div>
                <div class="ChildName_Bottom2">{{ item.xingBie }}</div>
                <div class="ChildName_Bottom2">{{ item.xueXing }}</div>
                <div class="ChildName_Bottom2">{{ item.shengRi }}</div>
              </div>
            </van-cell>
          </van-checkbox-group>
        </div>
      </van-list>
    </div>
    <!-- 筛选 -->
    <van-popup
      v-model="show"
      closeable
      position="left"
      class="Serach"
      :style="{ height: '100%' }"
    >
      <!-- 筛选表单 -->
      <div style="margin-top: 2.5rem">
        <h1
          style="font-size: .7rem; color: #1989fa; font-family: 宋体; margin-left: .5rem"
        >
          幼儿筛选
        </h1>
        <van-form>
          <van-field
            v-model="ChildListSearch.xingMing"
            label="姓名"
            clearable
            @change="NameChange"
            placeholder="姓名"
          />
          <van-field
            @focus="noBomBox"
            v-model="SexTypeValue"
            name="xingBie"
            label="性别"
            placeholder="请选择"
            @click="ShowSex = true"
          />
          <van-field
            v-model="ChildListSearch.jinJiLianXiRen"
            clearable
            name="ParentName"
            label="紧急联系人名称"
            placeholder="紧急联系人名称"
          />
          <van-field
            v-model="ChildListSearch.huJi"
            name="地区选择"
            label="地区选择"
            placeholder="地区选择"
            @click="ShowAddres = true"
          />
          <van-field
            name="birthday"
            label="生日"
            clickable
            @focus="noBomBox"
            :value-class="className"
            :value="ChildListSearch.shengRi"
            placeholder="请输入幼儿生日"
            @click="ShowBirthday = true"
          />
          <van-field
            name="ruYuanRiQi"
            label="入园日期"
            clickable
            @focus="noBomBox"
            :value-class="className2"
            :value="ChildListSearch.ruYuanRiQi"
            placeholder="请输入入园日期"
            @click="ShowInDate = true"
          />
          <van-field name="ruTuoLeiXing" label="入托类型">
            <template #input>
              <van-radio-group
                v-model="ChildListSearch.ruTuoLeiXing"
                direction="horizontal"
              >
                <van-radio name="0">全托</van-radio>
                <van-radio name="1" checked-color="#34dcc5">日托</van-radio>
                <van-radio name="2" checked-color="#e60101">混托</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              @click="onSubmit"
            >
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
    <!-- 粘性布局标签栏 -->
    <van-sticky v-if="TabbarActiveIf">
      <van-tabbar v-model="TabbarActive">
        <van-tabbar-item icon="wap-home-o" badge="3">首页</van-tabbar-item>
        <van-tabbar-item icon="smile-o">打卡</van-tabbar-item>
        <van-tabbar-item>
          <template style="width: 1rem; height: 1rem;"></template>
        </van-tabbar-item>
        <van-tabbar-item icon="friends-o">公告</van-tabbar-item>
        <van-tabbar-item icon="volume-o">我的</van-tabbar-item>
      </van-tabbar>
    </van-sticky>
    <!-- 菜单 -->
    <div
      style="color: #1989fa; position: fixed; top: 92%; left: 41%; z-index: 9999;"
      @click="MyMenu"
    >
      <van-icon name="wap-nav" size="1.5rem" v-show="MenuIcon" />
    </div>
    <!-- 日历组件 -->
    <van-calendar v-model="showCalendar" @confirm="onConfirm" type="range" />
    <van-calendar v-model="showCalendar2" @confirm="onConfirm2" />
    <!-- 筛选弹窗 -->
    <!-- 性别选择 -->
    <van-popup v-model="ShowSex" round position="bottom" class="Zindex">
      <van-picker
        show-toolbar
        :columns="SexList"
        value-key="name"
        @cancel="ShowSex = false"
        @confirm="SexConfirm"
      />
    </van-popup>
    <van-popup v-model="ShowAge" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns2"
        @cancel="ShowAge = false"
        @confirm="onConfirm4"
      />
    </van-popup>
    <van-popup v-model="ShowAddres" round position="bottom">
      <van-area
        title="省市区选择"
        ref="myArea"
        @cancel="CancelAddres"
        @confirm="onAddres"
        @change="onChangeAddres"
        :area-list="areaList"
        :columns-placeholder="['省/直辖市', '市', '区/县']"
      />
    </van-popup>
    <!-- 生日选择 -->
    <van-popup v-model="ShowBirthday" round position="bottom">
      <van-datetime-picker
        :value-class="className"
        :value="ChildListSearch.shengRi"
        type="date"
        title="生日"
        @cancel="ShowBirthday = false"
        @confirm="BirthdayConfirm"
        :formatter="formatter"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <!-- 入园日期选择 -->
    <van-popup v-model="ShowInDate" round position="bottom">
      <van-datetime-picker
        :value-class="className2"
        :value="ruYuanRiQi"
        type="date"
        title="入园日期"
        @cancel="ShowInDate = false"
        @confirm="Rdate"
        :formatter="formatter"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <!-- 长按后执行事件 -->
    <div
      class="ButtonListStyle"
      v-show="TabbarActiveIf2"
      @click="tabClick($event)"
    >
      <van-tabs color="white">
        <van-tab
          v-for="(item, index) in ButtonList"
          :key="index"
          :title="item.Name"
          line="false"
          title-active-color="#1989fa"
        >
          <template #title>
            <van-icon
              :name="item.IconName"
              size="0.6rem"
              style="display: block; width: 1rem;"
            />
            <div style=" width: 2rem;">{{ item.Name }}</div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 菜单导航 -->
    <van-popup
      v-model="ShowMyMenu"
      round
      position="bottom"
      style="height: 65%;"
      closeable
      @click-close-icon="Clost"
      close-icon="close"
      @closed="MenuShow"
    >
      <!-- 顶部说明 -->
      <span class="CommonlyUsed">常用列表</span>
      <!-- 常用 -->
      <div class="CommonlyUsed_Counted">
        <van-button
          color="rgb(103 155 208)"
          v-for="(item, index) in CommonlyUsedList"
          :key="index"
          style=" margin-left: 0.1rem"
          @click="CommonlyUsedButton"
          >{{ item }}</van-button
        >
      </div>
      <!-- 版心说明 -->
      <div
        style="width: 100%; height: 0.1rem; background: #ccc; position: absolute; top: 30%; z-index: 9999;"
      ></div>

      <div
        style="width: 100%; height: 1rem; position: absolute; top: 35%; z-index: 9999; font-size: 0.6rem;  text-align: center; font-family: 宋体;
    font-weight: 700;   background: white; padding-top: 0.5rem;
"
      >
        列表选择
      </div>

      <!-- 三级联动跳转 -->
      <div style="margin-top: 3rem;" @click="MenuLink">
        <van-picker :how-toolbar="false" :columns="columns3" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import AreaList from "../../assets/Area/AreaList";
import { CList } from "@/api/user";
import { ListMenu } from "@/api/Menu";
import { Dialog } from "vant";

export default {
  data() {
    return {
      areaList: AreaList,
      active2: 0,
      TabbarActive: 2,
      DataList: [],
      ChildName: [],
      loading: false,
      finished: false,
      ListError: false,
      isLoading: false,
      LoadPage: {
        page: 0,
        limit: 10
      },
      ChildListSearch: {
        xingMing: "",
        xingBie: "",
        jinJiLianXiRen: "",
        ruYuanRiQi: "",
        huJi: "",
        shengRi: "",
        ruTuoLeiXing: null,
        page: 1
      },
      refreshing: false,
      show: false,
      InValue: "",
      showCalendar: false,
      birthday: "",
      showCalendar2: false,
      Sex: "",
      showPicker: false,
      columns: ["男", "女", "其他"],
      Name: "",
      Age: "",
      Class: "",
      Nation: "",
      Addres: "",
      parentname: "",
      showPicker2: false,
      ShowAddres: false,
      ShowAge: false,
      columns2: ["2岁", "3岁", "4岁", "5岁", "6岁", "7岁", "8岁"],
      className: "",
      timeValue: "",
      className2: "",
      timeValue2: "",
      className3: "",
      timeValue3: "",
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      currentDate2: new Date(),
      currentDate3: new Date(),
      ListLenggth: 0,
      checkbox: false,
      checkboxGroup: [],
      see: true,
      search: "",
      result: [],
      ListCheckbox: false,
      name: "touch",
      SearchShow: true,
      ClearCheckBox: false,
      TabbarActiveIf: true,
      TabbarActiveIf2: false,
      ButtonList: [],
      showMTime: false,
      MenuIcon: true,
      icon: {
        active:
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F30%2F55%2F5810873c9c2f7_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612875685&t=2f3313f1d3f2b8f4ac54fa1f9818772b",
        inactive:
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F47%2F43%2F905743ed250b303.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612875614&t=ba23798263b5c119efa6294587cff1fe"
      },
      chosenCoupon: -1,
      ShowMyMenu: false,
      CommonlyUsedList: ["幼儿列表", "家长列表", "员工列表", "考勤列表"],
      columns3: [
        {
          text: "",
          children: [
            {
              text: "",
              children: [{ text: "" }]
            }
          ]
        }
      ],
      PickerList: [{}],
      CheckIndex: 0,
      CheckboxIndex: [],
      CheckboxID: {},
      ID: "",
      ckindex: 0,
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
      huJi: "",
      // 筛选属性
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
      ShowSex: false,
      SexTypeValue: "",
      // 生日
      ShowBirthday: false,
      // 入园日期
      ShowInDate: false
    };
  },

  created() {
    this.PickerJson();
  },
  methods: {
    async onLoad() {
      this.TabbarActiveIf = true;
      this.TabbarActiveIf2 = false;
      this.LoadPage.page++;
      this.loading = true;
      this.finished = false;
      var that = this;
      const { data } = await CList(this.LoadPage);
      var ChildList = data.data;
      var StateCode = data.code;
      if (StateCode == 401) {
        Dialog.confirm({
          title: "登录失效",
          message: "需要重新登录才能访问，确认登录吗"
        })
          .then(() => {
            // 确认执行
          this.$router.push('/login')
          })
          .catch(() => {
            // 取消执行
            // 取消，中断路由导航
          });
      }
      if (data.code == 200) {
        for (var i = 0; i < ChildList.length; i++) {
          // that.ChildName.push(ChildList[i])
          that.ChildName.push({
            xingMing: ChildList[i].xingMing,
            xingBie: ChildList[i].xingBie,
            shengRi: ChildList[i].shengRi,
            jinJiLianXiRen: ChildList[i].jinJiLianXiRen,
            id: ChildList[i].id,
            banJi: ChildList[i].banJi,
            diZhi: ChildList[i].diZhi,
            ruTuoLeiXing: ChildList[i].ruTuoLeiXing,
            minZu: ChildList[i].minZu,
            isJiaZuBingShi: ChildList[i].isJiaZuBingShi,
            dangAnHao: ChildList[i].dangAnHao,
            xueXing: ChildList[i].xueXing,
            jinJiLianXiRenDianHua: ChildList[i].jinJiLianXiRenDianHua,
            pouFuChan: ChildList[i].pouFuChan,
            isXianTianJiBing: ChildList[i].isXianTianJiBing,
            xianTianJiBing: ChildList[i].xianTianJiBing,
            status: ChildList[i].status,
            huJi: ChildList[i].huJi,
            ruYuanRiQi: ChildList[i].ruYuanRiQi,
            teShuYaoQiu: ChildList[i].teShuYaoQiu,
            xiHuanYanSe: ChildList[i].xiHuanYanSe,
            huJiLeiXing: ChildList[i].huJiLeiXing,
            shenFenZhengHao: ChildList[i].shenFenZhengHao,
            baoJianGuanLiBen: ChildList[i].baoJianGuanLiBen,
            shiFouZhuanYuan: ChildList[i].shiFouZhuanYuan,
            jiaZuBingShi: ChildList[i].jiaZuBingShi
          });
          this.loading = false;
        }
      } else {
        this.finished = true;
      }
    },

    // 复选改变
    CheckBoxChange() {},
    onClickLeft() {
      this.$router.push("/login");
    },
    onClickRight() {
      // this.ChildName = "";
      this.ChildName = [];
      this.show = true;
      this.MenuIcon = false;
    },
    onChangeAddres(picker, index, value) {
      let val = picker.getValues();
      let areaName = "";
      for (var i = 0; i < val.length; i++) {
        areaName = areaName + (i === 0 ? "" : "-") + val[i].name;
      }
      this.ChildListSearch.huJi = areaName;
    },
    // 阻止默认键盘弹出
    noBomBox(Event) {
      document.activeElement.blur();
    },
    async onSubmit() {
      // 筛选赋值
      this.see = false;
      const { data } = await CList(this.ChildListSearch);
      const CdSearchList = data.data;
      for (var m = 0; m < CdSearchList.length; m++) {
        this.ChildName.push({
          xingMing: CdSearchList[m].xingMing,
          xingBie: CdSearchList[m].xingBie,
          shengRi: CdSearchList[m].shengRi,
          jinJiLianXiRen: CdSearchList[m].jinJiLianXiRen,
          id: CdSearchList[m].id,
          banJi: CdSearchList[m].banJi,
          diZhi: CdSearchList[m].diZhi,
          ruTuoLeiXing: CdSearchList[m].ruTuoLeiXing,
          minZu: CdSearchList[m].minZu,
          isJiaZuBingShi: CdSearchList[m].isJiaZuBingShi,
          dangAnHao: CdSearchList[m].dangAnHao,
          xueXing: CdSearchList[m].xueXing,
          jinJiLianXiRenDianHua: CdSearchList[m].jinJiLianXiRenDianHua,
          pouFuChan: CdSearchList[m].pouFuChan,
          isXianTianJiBing: CdSearchList[m].isXianTianJiBing,
          xianTianJiBing: CdSearchList[m].xianTianJiBing,
          status: CdSearchList[m].status,
          huJi: CdSearchList[m].huJi,
          ruYuanRiQi: CdSearchList[m].ruYuanRiQi,
          teShuYaoQiu: CdSearchList[m].teShuYaoQiu,
          xiHuanYanSe: CdSearchList[m].xiHuanYanSe,
          huJiLeiXing: CdSearchList[m].huJiLeiXing,
          shenFenZhengHao: CdSearchList[m].shenFenZhengHao,
          baoJianGuanLiBen: CdSearchList[m].baoJianGuanLiBen,
          shiFouZhuanYuan: CdSearchList[m].shiFouZhuanYuan,
          jiaZuBingShi: CdSearchList[m].jiaZuBingShi
        });
      }
      this.finished = true;
      this.$notify({ type: "success", message: "筛选完成" });
      this.show = false;
      this.MenuIcon = true;
    },
    NameChange(val) {},
    onConfirm(date) {
      const [start, end] = date;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
      this.showCalendar = false;
    },
    onConfirm2(date) {
      this.birthday = `${date.getMonth() + 1}/${date.getDate()}`;
      this.showCalendar2 = false;
    },
    // 性别选择
    SexConfirm(value) {
      this.SexTypeValue = value.name;
      this.ChildListSearch.xingBie = value.value;
      this.ShowSex = false;
    },
    onConfirm4(value) {
      this.Age = value;
      this.ShowAge = false;
    },
    CancelAddres(value) {
      this.ShowAddres = false;
      this.$refs.myArea.reset(); // 重置城市列表
    },
    onAddres(value) {
      this.ShowAddres = false;
    },
    // 生日选择
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
      this.className = "生日";
      this.ChildListSearch.shengRi = `${year}-${month}-${day}`;
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
      this.className2 = "入园日期";
      this.ChildListSearch.ruYuanRiQi = `${year}-${month}-${day}`;
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
    vueTouch(txt) {
      this.name = txt;
      this.ListCheckbox = true;
      this.SearchShow = false;
      this.ClearCheckBox = true;
      this.TabbarActiveIf = false;
      this.TabbarActiveIf2 = true;
    },
    ClearCheck() {
      this.TabbarActiveIf = true;
      this.TabbarActiveIf2 = false;
      this.ListCheckbox = false;
      this.ClearCheckBox = false;
      this.SearchShow = true;
      this.show = false;
      this.CheckboxIndex = [];
      this.MenuIcon = true;
      this.TabbarActiveIf = true;
      this.TabbarActiveIf2 = false;
      this.ButtonList = [];
      this.PickerJson();
    },
    // 复选状态
    toggle(index) {
      this.TabbarActiveIf2 = true;
      this.MenuIcon = false;
      this.$refs.checkboxes[index].toggle();
      this.CheckIndex = index;
      this.CheckboxIndex.push(index);
      if (this.$refs.checkboxes[index].checked == false) {
        this.CheckboxID = this.$refs.checkboxes[index].name;
      }
    },
    tabClick(event) {
      this.ckindex = 0;
      const ButtonText = event.target.innerText;
      for (var ss = 0; ss < this.$refs.checkboxes.length; ss++) {
        if (this.$refs.checkboxes[ss].checked == true) {
          this.ckindex = this.ckindex + 1;
        }
      }
      if (ButtonText === "添加") {
        if (this.ckindex > 0) {
          this.$notify({ type: "primary", message: "请取消选择后添加" });
          this.ckindex = 0;
        } else {
          this.$router.replace("/ChildAdd");
        }
        this.CheckboxIndex = [];
      } else if (ButtonText === "修改") {
        if (this.ckindex <= 1) {
          this.$router.push({
            name: "ChildEdit",
            params: {
              xueXing: this.CheckboxID.xueXing,
              jiaZuBingShi: this.CheckboxID.jiaZuBingShi,
              minZu: this.CheckboxID.minZu,
              ruTuoLeiXing: this.CheckboxID.ruTuoLeiXing,
              id: this.CheckboxID.id,
              isJiaZuBingShi: this.CheckboxID.isJiaZuBingShi,
              dangAnHao: this.CheckboxID.dangAnHao,
              jinJiLianXiRenDianHua: this.CheckboxID.jinJiLianXiRenDianHua,
              pouFuChan: this.CheckboxID.pouFuChan,
              shengRi: this.CheckboxID.shengRi,
              isXianTianJiBing: this.CheckboxID.isXianTianJiBing,
              xianTianJiBing: this.CheckboxID.xianTianJiBing,
              status: this.CheckboxID.status,
              huJi: this.CheckboxID.huJi,
              ruYuanRiQi: this.CheckboxID.ruYuanRiQi,
              teShuYaoQiu: this.CheckboxID.teShuYaoQiu,
              banJi: this.CheckboxID.banJi,
              xiHuanYanSe: this.CheckboxID.xiHuanYanSe,
              xingBie: this.CheckboxID.xingBie,
              huJiLeiXing: this.CheckboxID.huJiLeiXing,
              jinJiLianXiRen: this.CheckboxID.jinJiLianXiRen,
              shenFenZhengHao: this.CheckboxID.shenFenZhengHao,
              baoJianGuanLiBen: this.CheckboxID.baoJianGuanLiBen,
              diZhi: this.CheckboxID.diZhi,
              shiFouZhuanYuan: this.CheckboxID.shiFouZhuanYuan,
              xingMing: this.CheckboxID.xingMing,
              createTime: this.CheckboxID.createTime
            }
          });
        } else if (this.CheckboxIndex.length > 1) {
          this.$notify({
            type: "primary",
            message: "仅能单选一项进行修改, 请重新选择后再试"
          });
        }
      }
    },
    MyMenu() {
      this.ShowMyMenu = true;
      this.MenuIcon = false;
    },
    // 幼儿详情
    Child_Countend(event) {
      var CheckBIndex = this.CheckIndex - 0;
      const thiscountent = this.$refs.checkboxes[CheckBIndex].name;
      this.$router.push({
        name: "ChildDetails",
        params: thiscountent
      });
    },
    MenuLink(value) {
      if (value.path[0].innerText == "幼儿信息") {
        this.$router.go(0);
      } else if (value.path[0].innerText == "考勤审核") {
        this.$router.replace("/AttendanceAudit");
      }
    },
    CommonlyUsedButton(value) {
      if (value.path[0].innerText == "幼儿列表") {
        // this.$router.replace("/ChildManagement");
      } else if (value.path[0].innerText == "家长列表") {
        this.$router.replace("/ParentAdmin");
      }
    },
    MenuShow() {
      this.MenuIcon = true;
    },
    // 菜单列表
    async PickerJson() {
      const { data } = await ListMenu();
      const MenuData = data.result;
      const MenuDataButton = MenuData[0].children[0].item.elements;
      for (var n = 0; n < MenuDataButton.length; n++) {
        this.ButtonList.push({
          Name: MenuDataButton[n].name
        });
      }
      for (var e in data.result) {
        for (var c in this.columns3) {
          this.columns3[c].text = data.result[e].item.name;
          for (var v in data.result[e].children) {
            for (var b in this.columns3[c].children) {
              this.columns3[c].children[b].text =
                data.result[e].children[v].item.name;
            }
          }
        }
      }
    },
    Clost() {
      this.MenuIcon = true;
    }
  },
  computed: {}
};
</script>

<style scoped>
.Child_Box {
  width: 100%;
  height: 100%;
  position: relative;
}
.ChildHead {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: inline-block;
  float: left;
}
.ChildName {
  display: inline-block;
  float: left;
  font-size: 0.5rem;
  font-weight: 700;
  font-family: "宋体";
  margin-top: 0.1rem;
  margin-left: 0.4rem;
}
.ChildName_Bottom {
  font-size: 0.4rem;
  font-weight: 400;
  font-family: "楷书";
  float: left;
}
.ChildName_Bottom2 {
  font-size: 0.4rem;
  font-weight: 400;
  font-family: "楷书";
  float: left;
  margin-left: 0.2rem;
}
.ChildName_Right {
  float: right;
  margin-top: 0.3rem;
}
.Serach {
  width: 80%;
  border-radius: 0 0.5rem 0.5rem 0;
}
.Revoke {
  width: 1.3rem;
  height: 1.3rem;
  background: #2db3f3;
  border-radius: 50%;
  z-index: 9999;
  margin: auto;
  position: absolute;
  left: 7rem;
  right: 0;
  bottom: 0;
  top: 11rem;
  box-shadow: 1px 2px 3px 4px #ccc;
}
.Revoke_Icon {
  color: white;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
}
.ButtonListStyle {
  width: 100%;
  height: 1.5rem;
  z-index: 9999;
  position: fixed;
  top: 94.1%;
}
.van-tabs__line {
  background: white;
}
.CommonlyUsed {
  float: left;
  font-size: 0.6rem;
  font-weight: 700;
  margin-top: 0.7rem;
  margin-left: 4rem;
  font-family: "楷体";
  display: block;
  color: #020202;
}
.CommonlyUsed_Counted {
  display: block;
  width: 100%;
  margin-top: 0.5rem;
  height: 2.5rem;
  position: absolute;
  top: 10%;
  z-index: 999;
  background: white;
}
.Zindex {
}
</style>
