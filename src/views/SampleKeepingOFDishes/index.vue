<template>
  <div>
    <div class="parentAdmin">
      <!-- 顶部导航 -->
      <van-nav-bar title="菜品留样"
                   left-text="返回"
                   left-arrow
                   @click-left.prevent="back"
                   fixed:
                   true
                   style="position: fixed; width: 100%;">
        <van-icon name="search"
                  slot="right"
                  size="25px"
                  @click.prevent="SideMenu" />
      </van-nav-bar>
      <!-- 搜索菜品留样 -->
      <van-popup v-model="show"
                 position="bottom"
                 :style="{width: '100%'}"
                 close-icon="close">
        <van-cell-group>
          <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索菜品留样</div>
          <van-field label="餐别:"
                     label-width="70px"
                     autosize
                     name="G_CanBie_Like"
                     prop="G_CanBie_Like"
                     v-model="Search.G_CanBie_Like"
                     placeholder="请输入餐别" />
          <van-field label="菜肴:"
                     label-width="70px"
                     autosize
                     name="G_CaiYaoIdName_Like"
                     prop="G_CaiYaoIdName_Like"
                     v-model="Search.G_CaiYaoIdName_Like"
                     placeholder="请输入菜肴名称" />
          <van-field label="加工人:"
                     label-width="70px"
                     autosize
                     name="G_JiaGongRen_Like"
                     prop="G_JiaGongRen_Like"
                     v-model="Search.G_JiaGongRen_Like"
                     placeholder="请输入加工人" />
          <van-field label="留样人:"
                     label-width="70px"
                     autosize
                     name="G_LiuYangRen_Like"
                     prop="G_LiuYangRen_Like"
                     v-model="Search.G_LiuYangRen_Like"
                     placeholder="请输入留样人" />
          <van-field label="销毁人:"
                     label-width="70px"
                     autosize
                     name="G_XiaoHuiRen_Like"
                     prop="G_XiaoHuiRen_Like"
                     v-model="Search.G_XiaoHuiRen_Like"
                     placeholder="请输入销毁人" />
        </van-cell-group>
        <div class="submit">
          <van-button type="info"
                      class="ClosePop"
                      @click.prevent="close">退出</van-button>
          <van-button type="primary"
                      class="AddClass"
                      @click.prevent="SearchSampleKeepingOFDishes">搜索</van-button>
        </div>
      </van-popup>
      <!-- 菜品留样表 -->
      <div class="Parent-List">
        <van-pull-refresh v-model="isLoading"
                          @refresh="onRefresh">
          <van-list v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad">
            <van-cell v-for="(item) in list"
                      :key="item.Id">
              <van-swipe-cell style="border: 7px solid rgb(231, 231, 231);">
                <div class="head">
                  <img src="../../assets/YMPG.jpg"
                       alt="">
                  <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;">{{ item.CanBie }}</h1>
                </div>
                <van-cell :border="false"
                          title="菜肴:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.CaiYaoIdName }}
                </van-cell>
                <van-cell :border="false"
                          title="加工人:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.JiaGongRen }}
                </van-cell>
                <van-cell :border="false"
                          title="留样日期:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.LiuYangRiQi | dateFmt('YYYY-MM-DD') }}
                </van-cell>
                <van-cell :border="false"
                          title="留样人:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.LiuYangRen}}
                </van-cell>
                <van-cell :border="false"
                          title="留样位置:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.LiuYangWeiZhi }}
                </van-cell>
                <van-cell :border="false"
                          title="预计销毁日期:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.YuJiXiaoHuiRiQi | dateFmt('YYYY-MM-DD')}}
                </van-cell>
                <van-cell :border="false"
                          title="销毁日期:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.XiaoHuiRiQi | dateFmt('YYYY-MM-DD')}}
                </van-cell>
                <van-cell :border="false"
                          title="销毁人:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.XiaoHuiRen }}
                </van-cell>
                <van-cell :border="false"
                          title="备注:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.BeiZhu }}
                </van-cell>
                <template slot="right">
                  <van-button square
                              type="danger"
                              text="删除"
                              @click.prevent="DelList(item)" />
                  <van-button square
                              type="primary"
                              text="修改"
                              @click.prevent="Modify(item)" />
                  <van-button square
                              type="warning"
                              text="销毁"
                              @click.prevent="Destruction(item)" />
                </template>
              </van-swipe-cell>
            </van-cell>
          </van-list>
          <!-- 添加菜品留样 -->
          <van-popup v-model="AddListshow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="AddListForm"
                  :model="AddListForm">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">餐别:</span>
                  <van-field v-model="AddListForm.CanBie"
                             placeholder="请输入餐别"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">菜肴:</span>
                  <van-field v-model="AddListForm.CaiYaoIdName"
                             placeholder="请输入菜肴名称"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">菜肴ID:</span>
                  <van-field v-model="AddListForm.CaiYaoId"
                             placeholder="请输入菜肴ID"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">留样人:</span>
                  <van-field v-model="AddListForm.LiuYangRen"
                             placeholder="请输入留样人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">加工人:</span>
                  <van-field v-model="AddListForm.JiaGongRen"
                             placeholder="请输入加工人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">留样日期:</span>
                  <van-field v-model="AddListForm.LiuYangRiQi"
                             placeholder="请输入留样日期"
                             style="display:inline-block; width: 55%;"
                             @click.prevent="NowDate" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">留样位置:</span>
                  <van-field v-model="AddListForm.LiuYangWeiZhi"
                             placeholder="请输入留样位置"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">预计销毁日期:</span>
                  <van-field v-model="AddListForm.YuJiXiaoHuiRiQi"
                             placeholder="请输入预计销毁日期"
                             style="display:inline-block; width: 55%;"
                             @click.prevent="NowDate2" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">销毁日期:</span>
                  <van-field v-model="AddListForm.XiaoHuiRiQi"
                             placeholder="请输入销毁日期"
                             style="display:inline-block; width: 45%;"
                             @click.prevent="NowDate3" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">销毁人:</span>
                  <van-field v-model="AddListForm.XiaoHuiRen"
                             placeholder="请输入销毁人"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">备注:</span>
                  <van-field v-model="AddListForm.BeiZhu"
                             placeholder="请输入备注"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div style="margin-top: 40px; margin-bottom: 30px; padding-left:0px; padding-right: 0px;">
                  <van-button type="info"
                              @click.prevent="ClosePop"
                              class="ClosePop">取消</van-button>
                  <van-button type="primary"
                              @click.prevent="AddClass"
                              class="AddClass">添加</van-button>
                </div>
              </van-cell-group>
            </form>
          </van-popup>
          <!-- 修改菜品留样 -->
          <van-popup v-model="ModifyListshow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="ModifyListForm"
                  :model="dqList">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">餐别:</span>
                  <van-field v-model="dqList.CanBie"
                             placeholder="请输入餐别"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">菜肴:</span>
                  <van-field v-model="dqList.CaiYaoIdName"
                             placeholder="请输入菜肴名称"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">菜肴ID:</span>
                  <van-field v-model="dqList.CaiYaoId"
                             placeholder="请输入菜肴ID"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">留样人:</span>
                  <van-field v-model="dqList.LiuYangRen"
                             placeholder="请输入留样人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">加工人:</span>
                  <van-field v-model="dqList.JiaGongRen"
                             placeholder="请输入加工人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">留样日期:</span>
                  <van-field v-model="dqList.LiuYangRiQi"
                             placeholder="请输入留样日期"
                             style="display:inline-block; width: 55%;"
                             @click.prevent="NowDate" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">留样位置:</span>
                  <van-field v-model="dqList.LiuYangWeiZhi"
                             placeholder="请输入留样位置"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">预计销毁日期:</span>
                  <van-field v-model="dqList.YuJiXiaoHuiRiQi"
                             placeholder="请输入预计销毁日期"
                             style="display:inline-block; width: 45%;"
                             @click.prevent="NowDate2" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">销毁日期:</span>
                  <van-field v-model="dqList.XiaoHuiRiQi"
                             placeholder="请输入销毁日期"
                             style="display:inline-block; width: 45%;"
                             @click.prevent="NowDate3" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">销毁人:</span>
                  <van-field v-model="dqList.XiaoHuiRen"
                             placeholder="请输入销毁人"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">备注:</span>
                  <van-field v-model="dqList.BeiZhu"
                             placeholder="请输入备注"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div style="margin-top: 40px; margin-bottom: 30px; padding-left:0px; padding-right: 0px;">
                  <van-button type="info"
                              @click.prevent="CloseModify"
                              class="ClosePop">取消</van-button>
                  <van-button type="primary"
                              @click.prevent="ModifyList"
                              class="AddClass">修改</van-button>
                </div>
              </van-cell-group>
            </form>
          </van-popup>
          <!-- 销毁菜品留样 -->
          <van-popup v-model="DestructionListshow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="DestructionListForm"
                  :model="DList">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">餐别:</span>
                  <van-field v-model="DList.CanBie"
                             placeholder="请输入餐别"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">菜肴:</span>
                  <van-field v-model="DList.CaiYaoIdName"
                             placeholder="请输入菜肴名称"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">菜肴ID:</span>
                  <van-field v-model="DList.CaiYaoId"
                             placeholder="请输入菜肴ID"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">留样人:</span>
                  <van-field v-model="DList.LiuYangRen"
                             placeholder="请输入留样人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">加工人:</span>
                  <van-field v-model="DList.JiaGongRen"
                             placeholder="请输入加工人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">留样日期:</span>
                  <van-field v-model="DList.LiuYangRiQi"
                             placeholder="请输入留样日期"
                             style="display:inline-block; width: 55%;"
                             @click.prevent="NowDate" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">留样位置:</span>
                  <van-field v-model="DList.LiuYangWeiZhi"
                             placeholder="请输入留样位置"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">预计销毁日期:</span>
                  <van-field v-model="DList.YuJiXiaoHuiRiQi"
                             placeholder="请输入预计销毁日期"
                             style="display:inline-block; width: 45%;"
                             @click.prevent="NowDate2" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">销毁日期:</span>
                  <van-field v-model="DList.XiaoHuiRiQi"
                             placeholder="请输入销毁日期"
                             style="display:inline-block; width: 45%;"
                             @click.prevent="NowDate3" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">销毁人:</span>
                  <van-field v-model="DList.XiaoHuiRen"
                             placeholder="请输入销毁人"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">备注:</span>
                  <van-field v-model="DList.BeiZhu"
                             placeholder="请输入备注"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div style="margin-top: 40px; margin-bottom: 30px; padding-left:0px; padding-right: 0px;">
                  <van-button type="info"
                              @click.prevent="CloseDestructionList"
                              class="ClosePop">取消</van-button>
                  <van-button type="primary"
                              @click.prevent="DestructionList"
                              class="AddClass">销毁</van-button>
                </div>
              </van-cell-group>
            </form>
          </van-popup>
        </van-pull-refresh>

        <!-- 分页 -->
        <van-pagination v-model="currentPage"
                        :total-items="1"
                        :show-page-size="3"
                        force-ellipses
                        style="position:fixed; bottom: 0; width: 100%; background: white;" />

      </div>
      <van-button type="info"
                  style="margin-bottom: 1.1rem; width: 100%; border-radius: 20px;"
                  @click.prevent="AddList">添加菜品留样</van-button>

    </div>
    <van-popup v-model="DateShow"
               position="bottom"
               :style="{ height: '40%' }">
      <van-datetime-picker v-model="currentDate"
                           type="date"
                           @change="changeFn()"
                           @confirm="confirmFn()"
                           @cancel="cancelFn()" />
    </van-popup>
    <van-popup v-model="DateShow2"
               position="bottom"
               :style="{ height: '40%' }">
      <van-datetime-picker v-model="currentDate2"
                           type="date"
                           @change="changeFn2()"
                           @confirm="confirmFn2()"
                           @cancel="cancelFn2()" />
    </van-popup>
    <van-popup v-model="DateShow3"
               position="bottom"
               :style="{ height: '40%' }">
      <van-datetime-picker v-model="currentDate3"
                           type="date"
                           @change="changeFn3()"
                           @confirm="confirmFn3()"
                           @cancel="cancelFn3()" />
    </van-popup>
  </div>
</template>
<script>
import { SampleKeepingOFDishes } from '@/api/SampleKeepingOFDishes'
import { DelectList33 } from '@/api/Delect'
import { AddList33 } from '@/api/AddList'
import { ModifyList32 } from '@/api/ModifyList'
import { SearchSampleKeepingOFDishes } from '@/api/Search'
import { Destruction } from '@/api/Destruction'
export default {
  data () {
    return {
      active: 0,
      Search: {
        G_CanBie_Like: '',
        G_CaiYaoIdName_Like: '',
        G_JiaGongRen_Like: '',
        G_LiuYangRen_Like: '',
        G_XiaoHuiRen_Like: ''
      },
      AddListForm: {
        CanBie: '',
        CaiYaoIdName: '',
        CaiYaoId: '',
        LiuYangRen: '',
        JiaGongRen: '',
        LiuYangRiQi: '',
        LiuYangWeiZhi: '',
        YuJiXiaoHuiRiQi: '',
        XiaoHuiRiQi: '',
        XiaoHuiRen: '',
        BeiZhu: '',
        Id: ''
      },
      ModifyListForm: {
        CanBie: '',
        CaiYaoIdName: '',
        CaiYaoId: '',
        LiuYangRen: '',
        JiaGongRen: '',
        LiuYangRiQi: '',
        LiuYangWeiZhi: '',
        YuJiXiaoHuiRiQi: '',
        XiaoHuiRiQi: '',
        XiaoHuiRen: '',
        BeiZhu: '',
        Id: ''
      },
      DestructionListForm: {
        CanBie: '',
        CaiYaoIdName: '',
        CaiYaoId: '',
        LiuYangRen: '',
        JiaGongRen: '',
        LiuYangRiQi: '',
        LiuYangWeiZhi: '',
        YuJiXiaoHuiRiQi: '',
        XiaoHuiRiQi: '',
        XiaoHuiRen: '',
        BeiZhu: '',
        Id: ''
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
      DestructionListshow: false,
      checked: true,
      dqList: [],
      DList: [],
      ModifyList2: [],
      DestructionList2: [],
      Total: 0,
      DateShow: false,
      currentDate: new Date(),
      DateShow2: false,
      currentDate2: new Date(),
      DateShow3: false,
      currentDate3: new Date()
    }
  },
  mounted () {

  },
  created () {
    // 页面一进入加载菜品留样表
    this.loadSampleKeepingOFDishesList()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    pushHome () {
      this.$router.push('/home')
    },
    onClickRight () {

    },
    SideMenu () {
      this.show = true
    },
    ClosePop () {
      this.AddListshow = false
      this.$toast.fail('已取消添加')
    },
    CloseModify () {
      this.ModifyListshow = false
      this.$toast.fail('已取消修改')
    },
    close () {
      this.show = false
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.finished = true
      }, 500)
    },
    // 晨午晚检
    async loadSampleKeepingOFDishesList () {
      let channels = []
      const data = await SampleKeepingOFDishes()
      this.Total = data.length
      console.log(this.Total)
      this.channels = data
      channels = this.channels
      return channels
    },
    async onLoad () {
      const data = await this.loadSampleKeepingOFDishesList()
      this.list = data
      this.isLoading = false
      this.loading = false
      this.finished = true
    },
    async DelList (currentList) {
      this.isShowDel = true
      this.currentList = currentList
      this.$dialog.confirm({
        title: '确认删除吗?',
        message: '删除当前列表数据'
      }).then(async () => {
        const listId33 = this.currentList.Id
        const data = await DelectList33(listId33)
        console.log('确认删除了' + data)
        window.location.reload()
        this.$toast.success('删除成功')
      }).catch(() => {
        console.log('取消删除了')
        this.$toast.fail('删除失败')
      })
    },
    AddList () {
      this.AddListshow = true
    },
    async AddClass () {
      const data = await AddList33(this.AddListForm)
      console.log(data)
      this.AddListshow = false
      this.$toast.success(data.msg)
      window.location.reload()
    },
    Modify (currentList) {
      this.ModifyListshow = true
      this.finished = false
      this.dqList = currentList
    },
    async ModifyList () {
      const data = await ModifyList32(this.dqList)
      this.ModifyList2 = data
      this.ModifyListshow = false
      this.$toast.success(data.msg)
      window.location.reload()
    },
    async SearchSampleKeepingOFDishes () {
      const data = await SearchSampleKeepingOFDishes(this.Search)
      const SearchResult = data
      this.list = SearchResult
      this.show = false
      this.$toast.success('搜索完成')
    },
    NowDate () {
      this.DateShow = true
    },
    showPopFn () {
      this.DateShow = true
    },
    showPopup () {
      this.DateShow = true
    },
    changeFn () { // 值变化是触发
      this.changeDate = this.currentDate // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn () { // 确定按钮
      this.dqList.LiuYangRiQi = this.timeFormat(this.currentDate)
      this.AddListForm.LiuYangRiQi = this.timeFormat(this.currentDate)
      this.DList.LiuYangRiQi = this.timeFormat(this.currentDate)
      this.DateShow = false
      this.$toast.success('已选择日期')
    },
    cancelFn () {
      this.DateShow = false
      this.$toast.fail('已取消选择日期')
    },
    timeFormat (time) { // 时间格式化 2019-09-08
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      return year + '-' + month + '-' + day
    },
    NowDate2 () {
      this.DateShow2 = true
    },
    showPopFn2 () {
      this.DateShow2 = true
    },
    showPopup2 () {
      this.DateShow2 = true
    },
    changeFn2 () { // 值变化是触发
      this.changeDate2 = this.currentDate2 // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn2 () { // 确定按钮
      this.dqList.YuJiXiaoHuiRiQi = this.timeFormat(this.currentDate2)
      this.AddListForm.YuJiXiaoHuiRiQi = this.timeFormat(this.currentDate2)
      this.DList.YuJiXiaoHuiRiQi = this.timeFormat(this.currentDate2)
      this.DateShow2 = false
      this.$toast.success('已选择日期')
    },
    cancelFn2 () {
      this.DateShow2 = false
      this.$toast.fail('已取消选择日期')
    },
    timeFormat2 (time) { // 时间格式化 2019-09-08
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      return year + '-' + month + '-' + day
    },
    NowDate3 () {
      this.DateShow3 = true
    },
    showPopFn3 () {
      this.DateShow3 = true
    },
    showPopup3 () {
      this.DateShow3 = true
    },
    changeFn3 () { // 值变化是触发
      this.changeDate3 = this.currentDate3 // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn3 () { // 确定按钮
      this.dqList.XiaoHuiRiQi = this.timeFormat(this.currentDate3)
      this.AddListForm.XiaoHuiRiQi = this.timeFormat(this.currentDate3)
      this.DList.XiaoHuiRiQi = this.timeFormat(this.currentDate3)
      this.DateShow3 = false
      this.$toast.success('已选择日期')
    },
    cancelFn3 () {
      this.DateShow3 = false
      this.$toast.fail('已取消选择日期')
    },
    timeFormat3 (time) { // 时间格式化 2019-09-08
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      return year + '-' + month + '-' + day
    },
    Destruction (currentList) {
      this.DestructionListshow = true
      this.finished = false
      this.DList = currentList
    },
    async DestructionList () {
      const data = await Destruction(this.DList)
      this.DestructionList2 = data
      this.DestructionListshow = false
      this.$toast.success(data.msg)
      window.location.reload()
    }
  }
}
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
