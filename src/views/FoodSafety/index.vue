<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar
      title="食品安全检测"
      left-arrow
      left-text="返回"
      size="36px"
      @click-left="back"
      fixed
    >
      <van-icon
        name="search"
        slot="right"
        size="25px"
        @click.prevent="SideMenu"
      />
    </van-nav-bar>
    <!-- 搜索 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ width: '100%' }"
      close-icon="close"
    >
      <form action="/" method="POST" ref="Search" :model="Search">
        <van-cell-group>
          <div
            style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;"
          >
            搜索食品安全相关
          </div>
          <van-field
            label="检测对象:"
            label-width="110px"
            autosize
            v-model="Search.G_JianCeDuiXiang_Like"
            name="GTitleLike"
            prop="GTitleLike"
            placeholder="请输入检测对象"
          />
          <van-field
            label="检测人员:"
            label-width="110px"
            autosize
            v-model="Search.G_JianCeRenYuan_Like"
            name="GLianXiRenLike"
            prop="GLianXiRenLike"
            placeholder="请输入检测人员"
          />
          <van-field
            label="检测项目:"
            v-model="Search.G_AnJianXiangMuIdName_Like"
            prop="GMobileLike"
            name="GMobileLike"
            label-width="110px"
            autosize
            placeholder="请输入检测项目"
          />
        </van-cell-group>
        <div class="submit">
          <van-button type="info" class="ClosePop" @click.prevent="close"
            >退出</van-button
          >
          <van-button
            type="primary"
            class="AddClass"
            @click.prevent="SearchFoodSafety"
            >搜索</van-button
          >
        </div>
      </form>
    </van-popup>
    <!-- 安全项目检测列表 -->
    <div class="Parent-List">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" disabled>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="item in list" :key="item.Id">
            <van-swipe-cell style="border: 7px solid rgb(231, 231, 231);">
              <div class="head">
                <img src="../../assets/SWJC.jpg" alt="" />
                <h1
                  style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;"
                >
                  {{ item.JianCeDuiXiang }}
                </h1>
              </div>
              <van-cell
                :border="false"
                title="检测人员"
                style="padding-left:30px; padding-right: 30px;"
              >
                {{ item.JianCeRenYuan }}
              </van-cell>
              <van-cell
                :border="false"
                title="检测项目"
                style="padding-left:30px; padding-right: 30px;"
              >
                {{ item.AnJianXiangMuIdName }}
              </van-cell>
              <van-cell
                :border="false"
                title="项目单位"
                style="padding-left:30px; padding-right: 30px;"
              >
                {{ item.JiLiangDanWei }}
              </van-cell>
              <van-cell
                :border="false"
                title="参考值"
                style="padding-left:30px; padding-right: 30px;"
              >
                {{ item.CanKaoZhi }}克
              </van-cell>
              <van-cell
                :border="false"
                title="检测值"
                style="padding-left:30px; padding-right: 30px;"
              >
                {{ item.JianCeZhi }}克
              </van-cell>
              <van-cell
                :border="false"
                title="检测结果"
                style="padding-left:30px; padding-right: 30px;"
              >
                {{ item.JianCeJieGuo }}
              </van-cell>
              <template slot="right">
                <van-button
                  square
                  type="danger"
                  text="删除"
                  @click.prevent="DelList(item)"
                />
                <van-button
                  square
                  type="primary"
                  text="修改"
                  @click.prevent="Modify(item)"
                />
              </template>
            </van-swipe-cell>
          </van-cell>
        </van-list>
        <van-button
          type="info"
          style="margin-bottom: 1.5rem; width: 100%; border-radius: 20px;"
          @click.prevent="AddList"
          >添加安全检测项目</van-button
        >
        <!-- 添加安全项目检测列表 -->
        <van-popup v-model="AddListshow" style="width: 80%;">
          <form action="/" method="POST" ref="AddListForm" :model="AddListForm">
            <van-cell-group>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >检测对象:</span
                >
                <van-field
                  v-model="AddListForm.JianCeDuiXiang"
                  placeholder="请输入检测对象"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >检测人员:</span
                >
                <van-field
                  v-model="AddListForm.JianCeRenYuan"
                  placeholder="请输入检测人员"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >检测日期:</span
                >
                <van-field
                  v-model="AddListForm.JianCeRiQi"
                  placeholder="请输入检测日期"
                  style="display:inline-block; width: 55%;"
                  @click.prevent="NowDate"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >检测项目:</span
                >
                <van-field
                  v-model="AddListForm.AnJianXiangMuIdName"
                  placeholder="请输入检测项目"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >检测项目ID:</span
                >
                <van-field
                  v-model="AddListForm.AnJianXiangMuId"
                  placeholder="请输入检测ID"
                  style="display:inline-block; width: 49%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >项目单位:</span
                >
                <van-field
                  v-model="AddListForm.JiLiangDanWei"
                  placeholder="请输入项目单位"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >参考值:</span
                >
                <van-field
                  v-model="AddListForm.CanKaoZhi"
                  placeholder="请输入参考值"
                  style="display:inline-block; width: 65%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >检测值:</span
                >
                <van-field
                  v-model="AddListForm.JianCeZhi"
                  placeholder="请输入检测值"
                  style="display:inline-block; width: 65%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >备注:</span
                >
                <van-field
                  v-model="AddListForm.BeiZhu"
                  placeholder="请输入备注"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div
                style="margin-top: 40px; margin-bottom: 30px; padding-left:0px; padding-right: 0px;"
              >
                <van-button
                  type="info"
                  @click.prevent="ClosePop"
                  class="ClosePop"
                  >取消</van-button
                >
                <van-button
                  type="primary"
                  @click.prevent="AddClass"
                  class="AddClass"
                  >添加</van-button
                >
              </div>
            </van-cell-group>
          </form>
        </van-popup>
        <!-- 修改安全项目检测列表 -->
        <van-popup v-model="ModifyListshow" style="width: 80%;">
          <form action="/" method="POST" ref="ModifyListForm" :model="dqList">
            <van-cell-group>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >检测对象:</span
                >
                <van-field
                  v-model="dqList.JianCeDuiXiang"
                  placeholder="请输入检测对象"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >检测人员:</span
                >
                <van-field
                  v-model="dqList.JianCeRenYuan"
                  placeholder="请输入检测人员"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >检测日期:</span
                >
                <van-field
                  v-model="dqList.JianCeRiQi"
                  placeholder="请输入检测日期"
                  style="display:inline-block; width: 55%;"
                  @click.prevent="NowDate"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >检测项目:</span
                >
                <van-field
                  v-model="dqList.AnJianXiangMuIdName"
                  placeholder="请输入检测项目"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >检测项目ID:</span
                >
                <van-field
                  v-model="dqList.AnJianXiangMuId"
                  placeholder="请输入检测ID"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >项目单位:</span
                >
                <van-field
                  v-model="dqList.JiLiangDanWei"
                  placeholder="请输入项目单位"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >参考值:</span
                >
                <van-field
                  v-model="dqList.CanKaoZhi"
                  placeholder="请输入参考值"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >检测值:</span
                >
                <van-field
                  v-model="dqList.JianCeZhi"
                  placeholder="请输入检测值"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >备注:</span
                >
                <van-field
                  v-model="dqList.BeiZhu"
                  placeholder="请输入备注"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div
                style="margin-top: 40px; margin-bottom: 30px; padding-left:0px; padding-right: 0px;"
              >
                <van-button
                  type="info"
                  @click.prevent="CloseModify"
                  class="ClosePop"
                  >取消</van-button
                >
                <van-button
                  type="primary"
                  @click.prevent="ModifyList"
                  class="AddClass"
                  >修改</van-button
                >
              </div>
            </van-cell-group>
          </form>
        </van-popup>
      </van-pull-refresh>

      <!-- 分页 -->
      <van-pagination
        v-model="currentPage"
        :total-items="1"
        :show-page-size="3"
        force-ellipses
        style="position:fixed; bottom: 0; width: 100%; background: white;"
      />
    </div>
    <van-popup v-model="DateShow" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @change="changeFn()"
        @confirm="confirmFn()"
        @cancel="cancelFn()"
      />
    </van-popup>
  </div>
</template>

<script>
import { FoodSafety } from '@/api/FoodSafety';
import { DelectList12 } from '@/api/Delect';
import { AddList12 } from '@/api/AddList';
import { ModifyList12 } from '@/api/ModifyList';
import { SearchFoodSafety } from '@/api/Search';
export default {
  name: 'StaffAdmin',
  data() {
    return {
      AddListForm: {
        JianCeDuiXiang: '',
        JianCeRenYuan: '',
        JianCeRiQi: '',
        AnJianXiangMuIdName: '',
        AnJianXiangMuId: '',
        JiLiangDanWei: '',
        CanKaoZhi: null,
        JianCeZhi: null,
        BeiZhu: '',
        Id: ''
      },
      ModifyListForm: {
        JianCeDuiXiang: '',
        JianCeRenYuan: '',
        JianCeRiQi: '',
        AnJianXiangMuIdName: '',
        AnJianXiangMuId: '',
        JiLiangDanWei: '',
        CanKaoZhi: null,
        JianCeZhi: null,
        BeiZhu: '',
        Id: ''
      },
      Search: {
        G_JianCeDuiXiang_Like: '',
        G_JianCeRenYuan_Like: '',
        G_AnJianXiangMuIdName_Like: ''
      },
      show: false,
      isLoading: false,
      loading: false,
      finished: false,
      list: [],
      currentPage: null,
      isShowDel: false,
      currentList: null,
      AddListshow: false,
      ModifyListshow: false,
      checked: true,
      dqList: [],
      Total: 0,
      DateShow: false,
      currentDate: new Date()
    };
  },
  mounted() {},
  created() {
    // 页面一进入加载安全项目检测列表
    this.loadFoodSafetyList();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    SideMenu() {
      this.show = true;
    },
    ClosePop() {
      this.AddListshow = false;
      this.$toast.fail('已取消添加');
    },
    CloseModify() {
      this.ModifyListshow = false;
      this.$toast.fail('已取消修改');
    },
    close() {
      this.show = false;
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);
    },
    async loadFoodSafetyList() {
      let channels = [];
      const data = await FoodSafety();
      this.Total = data.length;
      console.log(this.Total);
      this.channels = data;
      channels = this.channels;
      return channels;
    },
    async onLoad() {
      const data = await this.loadFoodSafetyList();
      this.list = data;
      this.isLoading = false;
      this.loading = false;
      this.finished = true;
    },
    async DelList(currentList) {
      this.isShowDel = true;
      this.currentList = currentList;
      this.$dialog
        .confirm({
          title: '确认删除吗?',
          message: '删除当前列表数据'
        })
        .then(async () => {
          const listId12 = this.currentList.Id;
          const data = await DelectList12(listId12);
          console.log('确认删除了' + data);
          window.location.reload();
          this.$toast.success(data.msg);
        })
        .catch(() => {
          console.log('取消删除了');
          this.$toast.fail('删除失败');
        });
    },
    AddList() {
      this.AddListshow = true;
    },
    async AddClass() {
      const data = await AddList12(this.AddListForm);
      console.log(data);
      this.AddListshow = false;
      this.$toast.success(data.msg);
      window.location.reload();
    },
    Modify(currentList) {
      this.ModifyListshow = true;
      this.dqList = currentList;
    },
    async ModifyList() {
      this.disabled = true;
      const data = await ModifyList12(this.dqList);
      console.log(data);
      this.ModifyListshow = false;
      this.$toast.success(data.msg);
      window.location.reload();
    },
    async SearchFoodSafety() {
      const data = await SearchFoodSafety(this.Search);
      const SearchResult = data;
      this.list = SearchResult;
      this.show = false;
      this.$toast.success('搜索完成');
    },
    NowDate() {
      this.DateShow = true;
    },
    showPopFn() {
      this.DateShow = true;
    },
    showPopup() {
      this.DateShow = true;
    },
    changeFn() {
      // 值变化是触发
      this.changeDate = this.currentDate; // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn() {
      // 确定按钮
      this.dqList.JianCeRiQi = this.timeFormat(this.currentDate);
      this.AddListForm.JianCeRiQi = this.timeFormat(this.currentDate);
      this.DateShow = false;
      this.$toast.success('已选择日期');
    },
    cancelFn() {
      this.DateShow = false;
      this.$toast.fail('已取消选择日期');
    },
    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + '-' + month + '-' + day;
    }
  }
};
</script>

<style lang="less" scoped>
.parentAdmin {
  width: 100%;
  height: 100%;

  .van-nav-bar {
    background: #0199ff;
    color: white;
    font-family: "楷体";
    .van-nav-bar__title {
      color: white;
    }
    .van-icon {
      color: white;
    }
  }
  .submit {
    background: white;
    margin-top: 40px;
    margin-bottom: 30px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .van-list {
    margin-top: 130px;
  }
  .van-popup {
    width: 100%;
    margin-top: 30px;
    .van-cell-group {
      width: 100%;

      .van-field {
        width: 100%;
        margin-left: 20px;
      }
    }
  }
  .van-cell {
    width: 100%;
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
    padding-left: 250px;
    span {
      display: inline-block;
      width: 100%;
      height: 55px;
      line-height: 55px;
      font-size: 30px;
      font-family: "楷体";
      font-weight: 700;
    }
  }
  .van-cell {
    padding: 0;
  }
  .van-swipe-cell__right {
    .van-button {
      margin-top: 50%;
    }
  }
  .ClosePop {
    float: left;
    width: 50%;
  }
  .AddClass {
    float: right;
    width: 50%;
  }
  .head {
    img {
      width: 200px;
      margin-left: 50px;
      margin-top: 50px;
      box-shadow: 5px 5px 5px 5px #ccc;
    }
    h1 {
      display: inline-block;
    }
  }
}
</style>
