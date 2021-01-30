<template>
  <div class="ChildAdd">
    <!-- 导航栏 -->
    <van-nav-bar
      title="幼儿信息修改"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 添加表单 -->
    <van-form @submit="onSubmit">
      <van-field name="Head" label="幼儿头像上传" required>
        <template #input>
          <van-uploader v-model="Head" />
        </template>
      </van-field>
      <van-field
        v-model="Name"
        name="Name"
        label="幼儿名称"
        required
        placeholder="请输入幼儿名称"
        :rules="[{ required: true, message: '请填写幼儿名称' }]"
      />
      <van-field
        v-model="Sex"
        name="Sex"
        label="性别"
        required
        @focus="noBomBox"
        placeholder="请选择幼儿性别"
        :rules="[{ required: true, message: '请选择性别' }]"
        @click="ShowSex = true"
      />
      <van-field
        v-model="Age"
        name="Age"
        required
        label="年龄"
        @focus="noBomBox"
        placeholder="请输入幼儿年龄"
        :rules="[{ required: true, message: '请填写年龄' }]"
        @click="ShowAge = true"
      />
      <van-field
        v-model="Grade"
        name="Grade"
        label="年级"
        required
        @focus="noBomBox"
        placeholder="请输入幼儿年级"
        :rules="[{ required: true, message: '请填写年级' }]"
        @click="ShowGrade = true"
      />
      <van-field
        v-model="Class"
        name="Class"
        label="班级"
        required
        @focus="noBomBox"
        placeholder="请选择幼儿班级"
        :rules="[{ required: true, message: '请选择班级' }]"
        @click="ShowClass = true"
      />
      <van-field
        v-model="ParentName"
        name="ParentName"
        label="监护人"
        required
        placeholder="请输入监护人名称"
        :rules="[{ required: true, message: '请填写监护人' }]"
      />
      <van-field
        name="birthday"
        label="生日"
        required
        @focus="noBomBox"
        :value-class="className"
        :value="timeValue"
        placeholder="请输入幼儿生日"
        :rules="[{ required: true, message: '请选择幼儿生日' }]"
        @click="ShowBirthday = true"
      />
      <van-field
        name="InDate"
        label="入园日期"
        required
        @focus="noBomBox"
        :value-class="className2"
        :value="timeValue2"
        placeholder="请输入入园日期"
        :rules="[{ required: true, message: '请填写入园日期' }]"
        @click="ShowInDate = true"
      />
      <van-field name="RT_Type" label="入托类型" required @focus="noBomBox">
        <template #input>
          <van-radio-group v-model="RT_Type" direction="horizontal">
            <van-radio name="1">全托</van-radio>
            <van-radio name="2">日托</van-radio>
            <van-radio name="3">混托</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="Addres"
        name="Addres"
        label="家庭地址"
        @focus="noBomBox"
        required
        placeholder="请输入幼儿家庭地址"
        :rules="[{ required: true, message: '请填写地址' }]"
        @click="ShowAddres = true"
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
    <!-- 年龄选择 -->
    <van-popup v-model="ShowAge" round position="bottom">
      <van-picker
        show-toolbar
        :columns="AgeList"
        @cancel="ShowAge = false"
        @confirm="AgeConfirm"
      />
    </van-popup>
    <!-- 生日选择 -->
    <van-popup v-model="ShowBirthday" round position="bottom">
      <van-datetime-picker
        :value-class="className"
        :value="timeValue"
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
        v-model="InDate"
        type="date"
        title="入园日期"
        @cancel="ShowInDate = false"
        @confirm="InDateConfirm"
        :formatter="formatter"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <!-- 年级选择 -->
    <van-popup v-model="ShowGrade" round position="bottom">
      <van-picker
        show-toolbar
        :columns="GradeList"
        @cancel="ShowGrade = false"
        @confirm="GradeConfirm"
      />
    </van-popup>
    <!-- 班级选择 -->
    <van-popup v-model="ShowClass" round position="bottom">
      <van-picker
        show-toolbar
        :columns="ClassList"
        @cancel="ShowClass = false"
        @confirm="ClassConfirm"
      />
    </van-popup>
    <!-- 性别选择 -->
    <van-popup v-model="ShowSex" round position="bottom">
      <van-picker
        show-toolbar
        :columns="SexList"
        @cancel="ShowSex = false"
        @confirm="SexConfirm"
      />
    </van-popup>
    <!-- 省市区选择 -->
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
    <!-- 动画 -->
  </div>
</template>

<script>
import AreaList from "../../assets/Area/AreaList";

export default {
  data() {
    return {
      Name: "刘德华",
      Head: [
        { url: "https://img9.doubanio.com/view/note/l/public/p58945225.webp" }
      ],
      Age: "3岁",
      birthday: "",
      InDate: "",
      ParentName: "刘建国",
      Grade: "大班",
      Sex: "男",
      Class: "果果班",
      RT_Type: "1",
      Addres: "北京市-北京市-东城区",
      ShowAge: false,
      ShowGrade: false,
      ShowClass: false,
      ShowSex: false,
      ShowAddres: false,
      AgeList: ["2岁", "3岁", "4岁", "5岁", "6岁", "7岁", "8岁"],
      GradeList: ["大班", "中班", "小班", "托班", "学前班"],
      ClassList: ["宝宝班", "草莓班", "榴莲班", "豆豆班", "天骄班"],
      SexList: ["男", "女"],
      ShowBirthday: false,
      ShowInDate: false,
      BirthDayDate: new Date(),
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2025, 10, 1),
      className2: "",
      className: "",
      timeValue: "2017/01/20",
      timeValue2: "2020/03/11",
      areaList: AreaList,
      visible: false
    };
  },
  methods: {
    // 跳转回幼儿列表页
    onClickLeft() {
      this.$router.replace("/ChildManagement");
    },
    // 提交添加表单
    onSubmit(values) {
      console.log("submit", values);
      this.$notify({ type: "success", message: "修改完成" });
      this.$router.replace("/ChildManagement");
    },
    // 取消修改
    Cancel() {
      this.$router.replace("/ChildManagement");
      this.$notify({ type: "success", message: "取消修改" });
    },
    // 年龄弹窗
    AgeConfirm(value) {
      this.Age = value;
      this.ShowAge = false;
    },
    // 年级选择
    GradeConfirm(value) {
      this.Grade = value;
      this.ShowGrade = false;
    },
    // 班级选择
    ClassConfirm(value) {
      this.Class = value;
      this.ShowClass = false;
    },
    // 性别选择
    SexConfirm(value) {
      this.Sex = value;
      this.ShowSex = false;
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
        hour = `0${hour}`;
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`;
      }
      this.className = "timeClass";
      this.timeValue = `${year}/${month}/${day}`;
      this.ShowBirthday = false;
    },
    // 阻止默认键盘弹出
    noBomBox(Event) {
      document.activeElement.blur();
    },
    // 入园日期选择
    InDateConfirm(val) {
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
      this.ShowInDate = false;
    },
    // 省市区选择关闭
    CancelAddres(value) {
      this.ShowAddres = false;
      this.$refs.myArea.reset(); // 重置城市列表
    },
    // 省市区选择按钮点击
    onAddres(value) {
      this.ShowAddres = false;
    },
    // 省市区选择
    onChangeAddres(picker, index, value) {
      let val = picker.getValues();
      let areaName = "";
      for (var i = 0; i < val.length; i++) {
        areaName = areaName + (i === 0 ? "" : "-") + val[i].name;
      }
      this.Addres = areaName;
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
    }
  }
};
</script>

<style scoped></style>
