<template>
  <div class="ChildAdd">
    <!-- 导航栏 -->
    <van-nav-bar
      title="安全检测项目添加"
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
        v-model="UPdateForm.title"
        name="title"
        label="名称"
        required
        placeholder="请输入名称"
        :rules="[{ required: true, message: '请填写名称' }]"
      />
      <van-field
        v-model="UPdateForm.beiZhu"
        name="beiZhu"
        required
        label="备注"
        placeholder="请输入备注"
        :rules="[{ required: true, message: '请输入备注' }]"
      />
      <van-field
        v-model="UPdateForm.canKaoZhi"
        name="canKaoZhi"
        label="参考值"
        required
        placeholder="请输入参考值"
        :rules="[{ required: true, message: '请输入参考值' }]"
      />
      <van-field
        v-model="UPdateForm.jiLiangDanWei"
        name="jiLiangDanWei"
        label="计量单位"
        required
        placeholder="请输入计量单位"
        :rules="[{ required: true, message: '请输入计量单位' }]"
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
    <van-popup v-model="ShowBirthday" round position="bottom">
      <van-datetime-picker
        :value-class="className"
        :value="UPdateForm.date"
        type="date"
        title="日期"
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
    <!-- 幼儿信息 -->
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="CList"
        @cancel="showPicker = false"
        @confirm="ChildConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import AreaList from '../../assets/Area/AreaList'
import { AQJCAdd } from '@/api/AnJianXiangMus'
import { CList } from '@/api/user'

export default {
  data() {
    return {
      UPdateForm: {
        beiZhu: '',
        title: '',
        canKaoZhi: null,
        jiLiangDanWei: ''
      },
      ChildName: [],

      ShowBirthday: false,
      ShowInDate: false,
      BirthDayDate: new Date(),
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2060, 10, 1),
      className2: '',
      className: '',
      timeValue: '',
      timeValue2: '',
      areaList: AreaList,
      visible: false,
      radio: '1',
      ShowJZBS: false,
      ShowXTJB: false,
      BTypeValue: '',
      SexTypeValue: '',
      HuJiLeiXingType: '',
      MinZuType: '',
      LoadPage: {
        page: 1,
        limit: 99
      },
      showPicker: false,
      ChildList: [],
      ChildContent: [],
      CName: '',
      CList: []
    }
  },
  created() {
    this.IZChild()
  },
  methods: {
    // 跳转首页
    onClickLeft() {
      this.$router.replace('/AnJianXiangMus')
    },
    minzuchange() {},
    // 提交添加表单
    async onSubmit(values) {
      values.canKaoZhi = this.UPdateForm.canKaoZhi - 0;
      const { data } = await AQJCAdd(values)
      if (data.code == 200) {
        this.$notify({ type: 'success', message: '添加完成' })
        setTimeout(() => {
          this.$router.replace('/AnJianXiangMus')
        }, 1500)
      }
    },

    // 取消修改
    Cancel() {
      this.$router.replace('/AnJianXiangMus')
      this.$notify({ type: 'success', message: '取消添加' })
    },
    // 检查日期选择
    BirthdayConfirm(val) {
      let year = val.getFullYear()
      let month = val.getMonth() + 1
      let day = val.getDate()
      let hour = val.getHours()
      let minute = val.getMinutes()
      if (month >= 1 && month <= 9) {
        month = `${month}`
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`
      }
      if (hour >= 0 && hour <= 9) {
        hour = `0${hour}`
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`
      }
      this.className = '检查日期'
      this.UPdateForm.date = `${year}-${month}-${day}`
      this.ShowBirthday = false
    },
    // 阻止默认键盘弹出
    noBomBox(Event) {
      document.activeElement.blur()
    },
    // 创建时间选择
    ruYuanRiQi(val) {
      let year = val.getFullYear()
      let month = val.getMonth() + 1
      let day = val.getDate()
      let hour = val.getHours()
      let minute = val.getMinutes()
      if (month >= 1 && month <= 9) {
        month = `0${month}`
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`
      }
      if (hour >= 0 && hour <= 9) {
        hour = `${hour}`
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`
      }
      this.className2 = '创建时间'
      this.UPdateForm.createTime = `${year}-${month}-${day}`
      this.ShowInDate = false
    },
    // 选项格式化函数
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      } else if (type === 'hour') {
        return `${value}时`
      } else if (type === 'minute') {
        return `${value}分`
      } else if (type === 'second') {
        return `${value}秒`
      }
      return value
    },
    // 初始化信息
    async IZChild() {
      const { data } = await CList()
      var ChildList = data.data
      for (var i in ChildList) {
        this.ChildContent.push({
          name: ChildList[i].xingMing,
          id: ChildList[i].id
        })
      }
      for (var t in this.ChildContent) {
        this.CList.push(this.ChildContent[t].name)
      }
    },
    // 选择
    ChildConfirm(value) {
      this.CName = value
      for (var y in this.ChildContent) {
        if (this.CName == this.ChildContent[y].name) {
          this.UPdateForm.studentId = this.ChildContent[y].id
        }
      }
      this.showPicker = false
    }
  }
}
</script>

<style scoped></style>
