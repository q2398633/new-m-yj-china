<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="环境调研"
                 left-arrow
                 left-text="返回"
                 size="36px"
                 @click-left="back"
                 fixed>
      <van-icon name="search"
                slot="right"
                size="25px"
                @click.prevent="SideMenu" />
    </van-nav-bar>
    <!-- 搜索环境调研信息 -->
    <van-popup v-model="show"
               position="bottom"
               :style="{width: '100%'}"
               close-icon="close">
      <van-cell-group>
        <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索环境调研信息</div>
        <van-field label="园所名称:"
                   label-width="70px"
                   autosize
                   name="G_Title_Like"
                   prop="G_Title_Like"
                   v-model="Search.G_Title_Like"
                   placeholder="请输入园所名称" />
        <van-field label="园长姓名:"
                   label-width="70px"
                   autosize
                   name="G_YuanZhangXingMing_Like"
                   prop="G_YuanZhangXingMing_Like"
                   v-model="Search.G_YuanZhangXingMing_Like"
                   placeholder="请输入园长姓名" />
        <van-field label="联系电话:"
                   label-width="70px"
                   autosize
                   name="G_LianXiDianHua_Like"
                   prop="G_LianXiDianHua_Like"
                   v-model="Search.G_LianXiDianHua_Like"
                   placeholder="请输入联系电话" />
      </van-cell-group>
      <div class="submit">
        <van-button type="info"
                    class="ClosePop"
                    @click.prevent="close">退出</van-button>
        <van-button type="primary"
                    class="AddClass"
                    @click.prevent="SearchEnvironmentalInvestigation">搜索</van-button>
      </div>
    </van-popup>
    <!-- 环境调研信息列表 -->
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
                <img src="../../assets/HJDY.jpg"
                     alt="">
                <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;">{{ item.Title }}</h1>
              </div>
              <van-cell :border="false"
                        title="园所地址:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.DiZhi }}
              </van-cell>
              <van-cell :border="false"
                        title="距离(千米):"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.JuLi }}
              </van-cell>
              <van-cell :border="false"
                        title="教师人数:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.JiaoShiRenShu }}
              </van-cell>
              <van-cell :border="false"
                        title="园长姓名:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.YuanZhangXingMing }}
              </van-cell>
              <van-cell :border="false"
                        title="师幼比:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.ShiYouBi}}
              </van-cell>
              <van-cell :border="false"
                        title="教师学历:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.JiaoShiXueLi }}
              </van-cell>
              <van-cell :border="false"
                        title="联系电话:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.LianXiDianHua }}
              </van-cell>
              <van-cell :border="false"
                        title="园所级类:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.YuanSuoJiBie1 }}
              </van-cell>
              <van-cell :border="false"
                        title="园所级类3:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.YuanSuoJiBie3 }}
              </van-cell>
              <van-cell :border="false"
                        title="园所性质:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.YuanSuoXingZhi }}
              </van-cell>
              <van-cell :border="false"
                        title="托费类型:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.TuoFeiLeiXing }}
              </van-cell>
              <van-cell :border="false"
                        title="托费价格:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.TuoFei }}
              </van-cell>
              <van-cell :border="false"
                        title="周边知名度:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.ZhouBianZhiMingDu }}星
              </van-cell>
              <van-cell :border="false"
                        title="人气人数质量:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.RenQiRenShuZhiLiang }}星
              </van-cell>
              <van-cell :border="false"
                        title="教育特色:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.JiaoYuTeSe }}
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
              </template>
            </van-swipe-cell>
          </van-cell>
        </van-list>
        <!-- 添加环境调研信息表 -->
        <van-popup v-model="AddListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="AddListForm"
                :model="AddListForm">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">园所名称:</span>
                <van-field v-model="AddListForm.Title"
                           placeholder="请输入园所名称"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">园所地址:</span>
                <van-field v-model="AddListForm.DiZhi"
                           placeholder="请输入园所地址"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">距离(千米):</span>
                <van-field v-model="AddListForm.JuLi"
                           placeholder="请输入距离"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">教师人数:</span>
                <van-field v-model="AddListForm.JiaoShiRenShu"
                           placeholder="请输入教师人数"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">园长姓名:</span>
                <van-field v-model="AddListForm.YuanZhangXingMing"
                           placeholder="请输入园长姓名"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">师幼比:</span>
                <van-field v-model="AddListForm.ShiYouBi"
                           placeholder="请输入师幼比"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">教师学历:</span>
                <van-field v-model="AddListForm.JiaoShiXueLi"
                           placeholder="请输入教师学历"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">联系电话:</span>
                <van-field v-model="AddListForm.LianXiDianHua"
                           placeholder="请输入联系电话"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">餐点类型:</span>
                <van-field v-model="AddListForm.CanDianLeiXing1"
                           placeholder="请输入餐点类型: 一餐/两餐/三餐"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">餐点类型2:</span>
                <van-field v-model="AddListForm.CanDianLeiXing2"
                           placeholder="请输入餐点类型: 一点/两点/三点"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">园所级类:</span>
                <van-field v-model="AddListForm.YuanSuoJiBie1"
                           placeholder="请输入园所级类: 省/市/县/乡镇/农村/未入级"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">园所级类2:</span>
                <van-field v-model="AddListForm.YuanSuoJiBie2"
                           placeholder="请输入园所级类: 一级/二级/三级"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">园所级类3:</span>
                <van-field v-model="AddListForm.YuanSuoJiBie3"
                           placeholder="请输入园所级类: 示范园/一级园/二级园/三级园"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">园所性质:</span>
                <van-field v-model="AddListForm.YuanSuoXingZhi"
                           placeholder="请输入园所级类: 公办园/普惠园/民办非盈利/民办盈利"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">托费类型:</span>
                <van-field v-model="AddListForm.TuoFeiLeiXing"
                           placeholder="请输入托费类型: 年/月/季度/学期"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">托费价格:</span>
                <van-field v-model="AddListForm.TuoFei"
                           placeholder="请输入托费价格"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">餐费类型:</span>
                <van-field v-model="AddListForm.CanFeiLeiXing"
                           placeholder="请输入餐费类型: 年/月/季度/学期"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">餐费价格:</span>
                <van-field v-model="AddListForm.CanFei"
                           placeholder="请输入餐费价格"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">生源容量:</span>
                <van-field v-model="AddListForm.ShengYuanRongLiang"
                           placeholder="请输入生源容量"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">现生源数量:</span>
                <van-field v-model="AddListForm.XianShengYuanShuLiang"
                           placeholder="请输入现生源容量"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">班额:</span>
                <van-field v-model="AddListForm.BanE"
                           placeholder="请输入班额"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">户外活动面积(平方):</span>
                <van-field v-model="AddListForm.CaoChangMianJi"
                           placeholder="请输入室外活动面积"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">周边房价(元/平方米):</span>
                <van-field v-model="AddListForm.ZhouBianFangJia"
                           placeholder="请输入周边房价"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">周边知名度:</span>
                <van-field v-model="AddListForm.ZhouBianZhiMingDu"
                           placeholder="请输入周边知名度"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">人气人数质量:</span>
                <van-field v-model="AddListForm.RenQiRenShuZhiLiang"
                           placeholder="请输入人气人数质量"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">教育特色:</span>
                <van-field v-model="AddListForm.JiaoYuTeSe"
                           placeholder="请输入教育特色"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">小区特征:</span>
                <van-field v-model="AddListForm.XiaoQuTeZheng"
                           placeholder="请输入小区特征"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">备注:</span>
                <van-field v-model="AddListForm.BeiZhu"
                           placeholder="请输入备注"
                           style="display:inline-block; width: 55%;" />
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
        <!-- 修改环境调研信息表 -->
        <van-popup v-model="ModifyListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="ModifyListForm"
                :model="dqList">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">园所名称:</span>
                <van-field v-model="dqList.Title"
                           placeholder="请输入园所名称"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">园所地址:</span>
                <van-field v-model="dqList.DiZhi"
                           placeholder="请输入园所地址"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">距离(千米):</span>
                <van-field v-model="dqList.JuLi"
                           placeholder="请输入距离"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">教师人数:</span>
                <van-field v-model="dqList.JiaoShiRenShu"
                           placeholder="请输入教师人数"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">园长姓名:</span>
                <van-field v-model="dqList.YuanZhangXingMing"
                           placeholder="请输入园长姓名"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">师幼比:</span>
                <van-field v-model="dqList.ShiYouBi"
                           placeholder="请输入师幼比"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">教师学历:</span>
                <van-field v-model="dqList.JiaoShiXueLi"
                           placeholder="请输入教师学历"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">联系电话:</span>
                <van-field v-model="dqList.LianXiDianHua"
                           placeholder="请输入联系电话"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">餐点类型:</span>
                <van-field v-model="dqList.CanDianLeiXing1"
                           placeholder="请输入餐点类型: 一餐/两餐/三餐"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">餐点类型2:</span>
                <van-field v-model="dqList.CanDianLeiXing2"
                           placeholder="请输入餐点类型: 一点/两点/三点"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">园所级类:</span>
                <van-field v-model="dqList.YuanSuoJiBie1"
                           placeholder="请输入园所级类: 省/市/县/乡镇/农村/未入级"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">园所级类2:</span>
                <van-field v-model="dqList.YuanSuoJiBie2"
                           placeholder="请输入园所级类: 一级/二级/三级"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">园所级类3:</span>
                <van-field v-model="dqList.YuanSuoJiBie3"
                           placeholder="请输入园所级类: 示范园/一级园/二级园/三级园"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">园所性质:</span>
                <van-field v-model="dqList.YuanSuoXingZhi"
                           placeholder="请输入园所级类: 公办园/普惠园/民办非盈利/民办盈利"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">托费类型:</span>
                <van-field v-model="dqList.TuoFeiLeiXing"
                           placeholder="请输入托费类型: 年/月/季度/学期"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">托费价格:</span>
                <van-field v-model="dqList.TuoFei"
                           placeholder="请输入托费价格"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">餐费类型:</span>
                <van-field v-model="dqList.CanFeiLeiXing"
                           placeholder="请输入餐费类型: 年/月/季度/学期"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">餐费价格:</span>
                <van-field v-model="dqList.CanFei"
                           placeholder="请输入餐费价格"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">生源容量:</span>
                <van-field v-model="dqList.ShengYuanRongLiang"
                           placeholder="请输入生源容量"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">现生源数量:</span>
                <van-field v-model="dqList.XianShengYuanShuLiang"
                           placeholder="请输入现生源容量"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">班额:</span>
                <van-field v-model="dqList.BanE"
                           placeholder="请输入班额"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">户外活动面积(平方):</span>
                <van-field v-model="dqList.CaoChangMianJi"
                           placeholder="请输入室外活动面积"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">周边房价(元/平方米):</span>
                <van-field v-model="dqList.ZhouBianFangJia"
                           placeholder="请输入周边房价"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">周边知名度:</span>
                <van-field v-model="dqList.ZhouBianZhiMingDu"
                           placeholder="请输入周边知名度"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">人气人数质量:</span>
                <van-field v-model="dqList.RenQiRenShuZhiLiang"
                           placeholder="请输入人气人数质量"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">教育特色:</span>
                <van-field v-model="dqList.JiaoYuTeSe"
                           placeholder="请输入教育特色"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">小区特征:</span>
                <van-field v-model="dqList.XiaoQuTeZheng"
                           placeholder="请输入小区特征"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">备注:</span>
                <van-field v-model="dqList.BeiZhu"
                           placeholder="请输入备注"
                           style="display:inline-block; width: 55%;" />
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
      </van-pull-refresh>

      <!-- 分页 -->
      <van-pagination v-model="currentPage"
                      :total-items="1"
                      :show-page-size="3"
                      force-ellipses
                      style="position:fixed; bottom: 0; width: 100%; background: white;" />

    </div>
    <van-button type="info"
                style="margin-bottom: 50px; width: 100%"
                @click.prevent="AddList">添加新产品</van-button>
  </div>
</template>

<script>
import { EnvironmentalInvestigation } from '@/api/EnvironmentalInvestigation'
import { DelectList16 } from '@/api/Delect'
import { AddList17 } from '@/api/AddList'
import { ModifyList17 } from '@/api/ModifyList'
import { SearchEnvironmentalInvestigation } from '@/api/Search'
export default {
    name: 'StaffAdmin',
    data () {
        return {
            Search: {
                G_Title_Like: '',
                G_YuanZhangXingMing_Like: '',
                G_LianXiDianHua_Like: ''
            },
            AddListForm: {
                Title: '',
                DiZhi: '',
                JuLi: '',
                JiaoShiRenShu: '',
                YuanZhangXingMing: '',
                ShiYouBi: '',
                JiaoShiXueLi: '',
                LianXiDianHua: '',
                CanDianLeiXing1: '',
                CanDianLeiXing2: '',
                YuanSuoJiBie1: '',
                YuanSuoJiBie2: '',
                YuanSuoJiBie3: '',
                YuanSuoXingZhi: '',
                TuoFeiLeiXing: '',
                TuoFei: '',
                CanFeiLeiXing: '',
                CanFei: '',
                ShengYuanRongLiang: '',
                XianShengYuanShuLiang: '',
                BanE: '',
                CaoChangMianJi: '',
                ZhouBianFangJia: '',
                ZhouBianZhiMingDu: '',
                RenQiRenShuZhiLiang: '',
                JiaoYuTeSe: '',
                XiaoQuTeZheng: '',
                BeiZhu: '',
                Id: ''
            },
            ModifyListForm: {
                Title: '',
                DiZhi: '',
                JuLi: '',
                JiaoShiRenShu: '',
                YuanZhangXingMing: '',
                ShiYouBi: '',
                JiaoShiXueLi: '',
                LianXiDianHua: '',
                CanDianLeiXing1: '',
                CanDianLeiXing2: '',
                YuanSuoJiBie1: '',
                YuanSuoJiBie2: '',
                YuanSuoJiBie3: '',
                YuanSuoXingZhi: '',
                TuoFeiLeiXing: '',
                TuoFei: '',
                CanFeiLeiXing: '',
                CanFei: '',
                ShengYuanRongLiang: '',
                XianShengYuanShuLiang: '',
                BanE: '',
                CaoChangMianJi: '',
                ZhouBianFangJia: '',
                ZhouBianZhiMingDu: '',
                RenQiRenShuZhiLiang: '',
                JiaoYuTeSe: '',
                XiaoQuTeZheng: '',
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
            checked: true,
            dqList: [],
            ModifyList2: [],
            Total: 0
        }
    },
    mounted () {
    },
    created () {
    // 页面一进入加载环境调研信息表
        this.loadEnvironmentalInvestigationList()
    },
    methods: {
        back () {
            this.$router.go(-1)
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
        async loadEnvironmentalInvestigationList () {
            let channels = []
            const data = await EnvironmentalInvestigation()
            this.Total = data.length
            console.log(this.Total)
            this.channels = data
            channels = this.channels
            return channels
        },
        async onLoad () {
            const data = await this.loadEnvironmentalInvestigationList()
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
                const listId16 = this.currentList.Id
                const data = await DelectList16(listId16)
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
            const data = await AddList17(this.AddListForm)
            console.log(data)
            this.AddListshow = false
            window.location.reload()
            this.$toast.success('添加成功')
        },
        Modify (currentList) {
            this.ModifyListshow = true
            this.finished = false
            this.dqList = currentList
        },
        async ModifyList () {
            const data = await ModifyList17(this.dqList)
            this.ModifyList2 = data
            this.ModifyListshow = false
            this.$toast.success('修改成功')
            window.location.reload()
        },
        async SearchEnvironmentalInvestigation () {
            const data = await SearchEnvironmentalInvestigation(this.Search)
            const SearchResult = data
            this.list = SearchResult
            this.show = false
            this.$toast.success('搜索完成')
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
    .van-nav-bar__text {
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
      margin-left: 45px;
    }
    h1 {
      display: inline-block;
    }
  }
}
</style>
