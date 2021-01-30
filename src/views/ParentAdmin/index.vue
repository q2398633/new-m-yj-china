<template>
  <div class="Child_Box">
    <!-- NavBar 导航栏 -->
    <div>
      <van-sticky>
        <van-nav-bar
          title="家长列表"
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
      >
        <div v-for="(item, index) in ChildName" :key="index">
          <van-checkbox-group v-model="result">
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
              <div class="ChildName" @click="Child_Countend">
                <div>{{ item.Name }}</div>
                <div class="ChildName_Bottom">{{ item.Age }} 2月</div>
                <div class="ChildName_Bottom2">{{ item.Sex }}</div>
                <div class="ChildName_Bottom2">{{ item.Grade }}</div>
                <div class="ChildName_Bottom2">{{ item.Class }}</div>
                <div></div>
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
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="Name"
            label="姓名"
            clearable
            @change="NameChange"
            placeholder="姓名"
          />
          <van-field
            readonly
            clearable
            name="Age"
            label="年龄"
            :value="Age"
            placeholder="请选择"
            @click="ShowAge = true"
          />
          <van-field
            readonly
            clickable
            name="Sex"
            label="性别"
            :value="Sex"
            placeholder="请选择"
            @click="showPicker = true"
          />
          <van-field
            v-model="parentname"
            clearable
            name="ParentName"
            label="家长名称"
            placeholder="家长名称"
          />
          <van-field
            v-model="Addres"
            name="地区选择"
            label="地区选择"
            placeholder="地区选择"
            @click="ShowAddres = true"
          />
          <van-field
            readonly
            clickable
            name="birthday"
            :value-class="className"
            :value="timeValue"
            label="生日"
            placeholder="点击选择日期"
            @click="showPicker2 = true"
          />

          <van-field
            readonly
            clickable
            name="InDate"
            :value-class="className2"
            :value="timeValue2"
            label="开始时间"
            placeholder="点击选择开始时间"
            @click="showSTime = true"
          />
          <van-field
            readonly
            clickable
            name="InDate"
            :value-class="className3"
            :value="timeValue3"
            placeholder="点击选择结束时间"
            @click="showMTime = true"
            style="margin-left: 2.6rem;"
          />
          <van-field name="RT_Type" label="入托类型">
            <template #input>
              <van-checkbox-group
                v-model="checkboxGroup"
                direction="horizontal"
              >
                <van-checkbox name="1" shape="square">全托</van-checkbox>
                <van-checkbox name="2" shape="square">日托</van-checkbox>
                <van-checkbox name="3" shape="square">混托</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
    <!-- 粘性布局标签栏 -->
    <van-sticky v-show="TabbarActiveIf">
      <van-tabbar v-model="TabbarActive">
        <van-tabbar-item icon="wap-home-o" badge="3">首页</van-tabbar-item>
        <van-tabbar-item icon="smile-o">打卡</van-tabbar-item>
        <van-tabbar-item @click="MyMenu">
          <template style="width: 1rem; height: 1rem;"> </template>
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
      <van-icon name="wap-nav" size="1.5rem" />
    </div>
    <!-- 日历组件 -->
    <van-calendar v-model="showCalendar" @confirm="onConfirm" type="range" />
    <van-calendar v-model="showCalendar2" @confirm="onConfirm2" />
    <!-- 筛选弹窗 -->
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm3"
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
    <!-- 开始时间 -->
    <van-popup v-model="showSTime" round position="bottom">
      <van-datetime-picker
        v-model="currentDate2"
        type="date"
        title="开始时间"
        @cancel="showSTime = false"
        @confirm="confirmPicker2"
        :formatter="formatter"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <!-- 结束时间 -->
    <van-popup v-model="showMTime" round position="bottom">
      <van-datetime-picker
        v-model="currentDate3"
        type="date"
        title="结束时间"
        @cancel="showMTime = false"
        @confirm="confirmPicker3"
        :formatter="formatter"
        :min-date="minDate"
        :max-date="maxDate"
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
    <van-popup v-model="showPicker2" round position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="生日"
        @cancel="showPicker2 = false"
        @confirm="confirmPicker"
        :formatter="formatter"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <div class="ButtonListStyle" v-show="TabbarActiveIf2">
      <van-tabs @click="tabClick" color="white">
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
      close-icon="close"
    >
      <!-- 顶部说明 -->
      <span class="CommonlyUsed">常用菜单</span>
      <!-- 常用 -->
      <div class="CommonlyUsed_Counted">
        <van-button
          color="rgb(84,152,220)"
          v-for="(item, index) in CommonlyUsedList"
          :key="index"
          style=" margin-left: 0.1rem"
          @click="CommonlyUsedButton"
          >{{ item }}</van-button
        >
      </div>
      <!-- 版心说明 -->
      <div
        style="width: 100%; height: 0.2rem; background: #ccc; position: absolute; top: 30%; z-index: 9999;"
      ></div>
      <div
        style="width: 100%; height: 1rem; position: absolute; top: 35%; z-index: 9999; font-size: 0.6rem;  text-align: center; font-family: 楷体;
    font-weight: 700;   background: white; padding-top: 0.5rem;
"
      >
        菜单跳转
      </div>
      <!-- 三级联动跳转 -->
      <div style="margin-top: 3rem;" @click="MenuLink">
        <van-picker :how-toolbar="false" :columns="columns3" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
import AreaList from "../../assets/Area/AreaList";
import { reactive } from "vue";

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
      refreshing: false,
      show: false,
      username: "",
      password: "",
      InValue: "",
      showCalendar: false,
      birthday: "",
      showCalendar2: false,
      Sex: "",
      showPicker: false,
      columns: ["男", "女", "其他"],
      Age: "",
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
      showSTime: false,
      showMTime: false,
      icon: {
        active:
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F30%2F55%2F5810873c9c2f7_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612875685&t=2f3313f1d3f2b8f4ac54fa1f9818772b",
        inactive:
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F47%2F43%2F905743ed250b303.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612875614&t=ba23798263b5c119efa6294587cff1fe"
      },
      chosenCoupon: -1,
      ShowMyMenu: false,
      CommonlyUsedList: ["幼儿列表", "家长列表", "员工列表", "考勤列表"],
      columns3: {}
    };
  },

  created() {
    this.PickerJson();
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      axios.get("/js/Child.json").then(response => {
        var data = response.data;
        var ChildListDate = data.ChildList;
        console.log(ChildListDate);
        for (var i = 0; i <= ChildListDate.length; i++) {
          this.ChildName.push({
            Name: ChildListDate[i].Name,
            Age: ChildListDate[i].Age,
            birthday: ChildListDate[i].birthday,
            InDate: ChildListDate[i].InDate,
            ParentName: ChildListDate[i].ParentName,
            Grade: ChildListDate[i].Grade,
            Sex: ChildListDate[i].Sex,
            Class: ChildListDate[i].Class,
            Head: ChildListDate[i].Head
          });
          this.ListLenggth += 1;
        }
        console.log(this.ListLenggth);
      });

      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (this.DataList.length === this.ListLenggth) {
        this.finished = true;
      }
    },
    Revoke() {
      this.ChildName = [];
      let _this = this;
      // this.$notify({ type: "success", message: "已清空筛选" });
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      setTimeout(function() {
        axios.get("/js/Child.json").then(response => {
          var data = response.data;
          var ChildListDate = data.ChildList;
          for (var i = 0; i <= ChildListDate.length; i++) {
            _this.ChildName.push({
              Name: ChildListDate[i].Name,
              Age: ChildListDate[i].Age,
              birthday: ChildListDate[i].birthday,
              InDate: ChildListDate[i].InDate,
              ParentName: ChildListDate[i].ParentName,
              Grade: ChildListDate[i].Grade,
              Sex: ChildListDate[i].Sex,
              Class: ChildListDate[i].Class,
              Head: ChildListDate[i].Head
            });
            _this.ListLenggth += 1;
          }
        });
      }, 2500);
    },
    onClickLeft() {},
    onClickRight() {
      // this.ChildName = "";
      this.ChildName = [];
      this.show = true;
    },
    onChangeAddres(picker, index, value) {
      let val = picker.getValues();
      console.log(val);
      let areaName = "";
      for (var i = 0; i < val.length; i++) {
        areaName = areaName + (i === 0 ? "" : "-") + val[i].name;
      }
      this.Addres = areaName;
    },
    onSubmit(values) {
      console.log("筛选条件", values);
      // 筛选赋值
      this.see = false;
      axios.get("/js/Child.json").then(response => {
        var data = response.data;
        var ChildListDate = data.ChildList;
        for (var i = 0; i <= ChildListDate.length; i++) {
          if (ChildListDate[i].Name === values.Name) {
            this.ChildName.push({
              Name: ChildListDate[i].Name,
              Age: ChildListDate[i].Age,
              birthday: ChildListDate[i].birthday,
              InDate: ChildListDate[i].InDate,
              ParentName: ChildListDate[i].ParentName,
              Grade: ChildListDate[i].Grade,
              Sex: ChildListDate[i].Sex,
              Class: ChildListDate[i].Class,
              Head: ChildListDate[i].Head
            });
          } else if (
            ChildListDate[i].Name === values.Name ||
            ChildListDate[i].Age === values.Age ||
            ChildListDate[i].birthday === values.birthday ||
            ChildListDate[i].InDate === values.InDate ||
            ChildListDate[i].ParentName === values.ParentName ||
            ChildListDate[i].Grade === values.Grade
          ) {
            this.ChildName.push({
              Name: ChildListDate[i].Name,
              Age: ChildListDate[i].Age,
              birthday: ChildListDate[i].birthday,
              InDate: ChildListDate[i].InDate,
              ParentName: ChildListDate[i].ParentName,
              Grade: ChildListDate[i].Grade,
              Sex: ChildListDate[i].Sex,
              Class: ChildListDate[i].Class,
              Head: ChildListDate[i].Head
            });
          }
        }
      });
      this.$notify({ type: "success", message: "筛选完成" });
      this.show = false;
    },
    NameChange(val) {},
    PickerJson(val) {
      axios.get("/js/Picker.json").then(response => {
        console.log(response);
      });
    },
    onConfirm(date) {
      const [start, end] = date;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
      this.showCalendar = false;
    },
    onConfirm2(date) {
      this.birthday = `${date.getMonth() + 1}/${date.getDate()}`;
      this.showCalendar2 = false;
    },
    onConfirm3(value) {
      this.Sex = value;
      this.showPicker = false;
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
    confirmPicker(val) {
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
        hour = `0${hour}`;
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`;
      }
      this.className = "timeClass";
      this.timeValue = `${year}/${month}/${day}`;
      this.showPicker2 = false;
    },
    // 开始时间
    confirmPicker2(val) {
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
        hour = `0${hour}`;
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`;
      }
      this.className2 = "timeClass";
      this.timeValue2 = `${year}/${month}/${day}`;
      this.showSTime = false;
    },
    // 结束时间
    confirmPicker3(val) {
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
        hour = `0${hour}`;
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`;
      }
      this.className3 = "timeClass";
      this.timeValue3 = `${year}/${month}/${day}`;
      this.showMTime = false;
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
    // 复选状态
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    vueTouch(txt, e) {
      this.name = txt;
      this.ListCheckbox = true;
      this.SearchShow = false;
      this.ClearCheckBox = true;
      this.TabbarActiveIf = false;
      this.TabbarActiveIf2 = true;
      // 加载按钮数据
      axios.get("/js/ButtonData.json").then(response => {
        var data = response.data;
        var ButtonListData = data.ButtonListData;
        for (var i = 0; i <= ButtonListData.length; i++) {
          this.ButtonList.push({
            Name: ButtonListData[i].Name,
            NR: ButtonListData[i].NR,
            Color: ButtonListData[i].Color,
            IconName: ButtonListData[i].IconName,
            ChildLink: ButtonListData[i].ChildLink
          });
        }
      });
    },
    ClearCheck() {
      this.ListCheckbox = false;
      this.ClearCheckBox = false;
      this.SearchShow = true;
      this.show = false;
      this.TabbarActiveIf = true;
      this.TabbarActiveIf2 = false;
      this.ButtonList = [];
    },
    tabClick(name, title) {
      axios.get("/js/ButtonData.json").then(response => {
        var data = response.data;
        var ButtonListData = data.ButtonListData;
        for (var i = 0; i <= ButtonListData.length; i++) {
          this.ButtonList.push({
            Name: ButtonListData[i].Name,
            NR: ButtonListData[i].NR,
            Color: ButtonListData[i].Color,
            IconName: ButtonListData[i].IconName,
            ChildLink: ButtonListData[i].ChildLink
          });
        }
      });
      if (title === "添加") {
        this.$router.replace("/ChildAdd");
      } else if (title === "修改") {
        this.$router.replace("/ChildEdit");
      }
    },
    MyMenu() {
      this.ShowMyMenu = true;
      console.log(1);
    },
    // 幼儿详情
    Child_Countend(value) {
      console.log(value.path[0].innerText);
      if (value.path[0].innerText == "刘德华") {
        this.$router.replace("/ChildDetails");
      } else if (value.path[0].innerText == "张学友") {
        this.$router.replace("/ChildDetails2");
      }
    },
    MenuLink(value) {
      if (value.path[0].innerText == "考勤列表") {
        this.$router.replace("/AttendanceList");
      } else if (value.path[0].innerText == "考勤审核") {
        this.$router.replace("/ChildDetails2");
      }
    }
  },
  computed: {
    items: function() {
      var _search = this.search;
      if (_search) {
        var reg = new RegExp(_search, "ig");

        return this.list.filter(function(e) {
          return Object.keys(e).some(function(key) {
            return e[key].match(reg);
          });
        });
      }
      return this.list;
    }
  }
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
  font-size: 0.5rem;
  font-weight: 700;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
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
</style>
