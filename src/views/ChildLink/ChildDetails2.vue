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
    <!-- 添加表单 -->
    <van-form @submit="onSubmit">
      <van-field name="Head" label="幼儿头像">
        <template #input>
          <van-image
            width="100"
            height="100"
            src="https://img9.doubanio.com/view/note/l/public/p58945226.webp"
          />
        </template>
      </van-field>
      <van-field
        readonly
        v-model="Name"
        name="Name"
        label="幼儿名称"
        placeholder="请输入幼儿名称"
        :rules="[{ required: false, message: '请填写幼儿名称' }]"
      />
      <van-field
        readonly
        v-model="Sex"
        name="Sex"
        label="性别"
        @focus="noBomBox"
        placeholder="请选择幼儿性别"
        :rules="[{ required: false, message: '请选择性别' }]"
        @click="ShowSex = false"
      />
      <van-field
        readonly
        v-model="Age"
        name="Age"
        label="年龄"
        @focus="noBomBox"
        placeholder="请输入幼儿年龄"
        :rules="[{ required: false, message: '请填写年龄' }]"
        @click="ShowAge = false"
      />
      <van-field
        readonly
        v-model="Grade"
        name="Grade"
        label="年级"
        @focus="noBomBox"
        placeholder="请输入幼儿年级"
        :rules="[{ required: false, message: '请填写年级' }]"
        @click="ShowGrade = false"
      />
      <van-field
        readonly
        v-model="Class"
        name="Class"
        label="班级"
        @focus="noBomBox"
        placeholder="请选择幼儿班级"
        :rules="[{ required: false, message: '请选择班级' }]"
        @click="ShowClass = false"
      />
      <van-field
        readonly
        v-model="ParentName"
        name="ParentName"
        label="监护人"
        placeholder="请输入监护人名称"
        :rules="[{ required: false, message: '请填写监护人' }]"
      />
      <van-field
        readonly
        name="birthday"
        label="生日"
        @focus="noBomBox"
        :value-class="className"
        :value="timeValue"
        placeholder="请输入幼儿生日"
        :rules="[{ required: false, message: '请选择幼儿生日' }]"
        @click="ShowBirthday = false"
      />
      <van-field
        readonly
        name="InDate"
        label="入园日期"
        @focus="noBomBox"
        :value-class="className2"
        :value="timeValue2"
        placeholder="请输入入园日期"
        :rules="[{ required: false, message: '请填写入园日期' }]"
        @click="ShowInDate = false"
      />
      <van-field name="RT_Type" label="入托类型" @focus="noBomBox" readonly>
        <template #input>
          <van-radio-group v-model="RT_Type" direction="horizontal" disabled>
            <van-radio name="1">全托</van-radio>
            <van-radio name="2">日托</van-radio>
            <van-radio name="3">混托</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        readonly
        v-model="Addres"
        name="Addres"
        label="家庭地址"
        @focus="noBomBox"
        placeholder="请输入幼儿家庭地址"
        :rules="[{ required: false, message: '请填写地址' }]"
        @click="ShowAddres = false"
      />
    </van-form>
    <!-- 弹-----------------------------------------------------------------------------窗 -->
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
      Age: "4岁",
      birthday: "",
      InDate: "",
      ParentName: "张汝京",
      Grade: "托班",
      Sex: "女",
      Class: "草莓班",
      RT_Type: "3",
      Addres: "北京市-北京市-海淀区",
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
      timeValue: "2016/09/12",
      timeValue2: "2020/09/13",
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
      this.$notify({ type: "success", message: "添加完成" });
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
