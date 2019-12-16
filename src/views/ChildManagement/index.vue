<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar
      title="幼儿管理"
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
      <van-cell-group>
        <div
          style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;"
        >
          搜索幼儿
        </div>
        <van-field
          label="姓名:"
          label-width="70px"
          autosize
          name="G_RealName_Like"
          prop="G_RealName_Like"
          v-model="Search.G_RealName_Like"
          placeholder="请输入幼儿名称"
        />
        <van-field
          label="班级:"
          label-width="70px"
          autosize
          name="G_BanJi_Like"
          prop="G_BanJi_Like"
          v-model="Search.G_BanJi_Like"
          placeholder="请输入班级"
        />
        <van-field
          label="年级:"
          label-width="70px"
          autosize
          name="G_NianJi_IN"
          prop="G_NianJi_IN"
          v-model="Search.G_NianJi_IN"
        />
        <van-field
          label="档案号:"
          label-width="70px"
          autosize
          name="G_DangAnHao_Like"
          prop="G_DangAnHao_Like"
          v-model="Search.G_DangAnHao_Like"
          placeholder="请输入档案号"
        />
        <van-field
          label="民族:"
          label-width="70px"
          autosize
          name="G_MinZu_Like"
          prop="G_MinZu_Like"
          v-model="Search.G_MinZu_Like"
          placeholder="请输入民族"
        />
        <van-field
          label="户籍:"
          label-width="70px"
          autosize
          name="G_HuJi_Like"
          prop="G_HuJi_Like"
          v-model="Search.G_HuJi_Like"
          placeholder="请输入户籍"
        />
        <van-field
          label="身份证号:"
          label-width="70px"
          autosize
          name="G_ShenFenZhengHao_Like"
          prop="G_ShenFenZhengHao_Like"
          v-model="Search.G_ShenFenZhengHao_Like"
          placeholder="请输入身份证号"
        />
      </van-cell-group>
      <div class="submit">
        <van-button type="info" class="ClosePop" @click.prevent="close"
          >退出</van-button
        >
        <van-button type="primary" class="AddClass" @click.prevent="SearchChild"
          >搜索</van-button
        >
      </div>
    </van-popup>
    <!-- 幼儿列表 -->
    <div class="Parent-List">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" disabled>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="item in list" :key="item.Id">
            <van-swipe-cell>
              <div class="head">
                <img src="../../assets/YEZJZ.jpg" alt="" />
                <h1
                  style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;"
                >
                  {{ item.RealName }}
                </h1>
              </div>
              <van-cell
                :border="false"
                title="班级:"
                style="padding-left:30px; padding-right: 30px;"
              >
                {{ item.BanJi }}
              </van-cell>
              <van-cell
                :border="false"
                title="性别:"
                style="padding-left:30px; padding-right: 30px;"
              >
                {{ item.XingBie }}
              </van-cell>
              <van-cell
                :border="false"
                title="民族:"
                style="padding-left:30px; padding-right: 30px;"
              >
                {{ item.MinZu }}
              </van-cell>
              <van-cell
                :border="false"
                title="入园时间:"
                style="padding-left:30px; padding-right: 30px;"
              >
                {{ item.RuTuoRiQi | dateFmt("YYYY-MM-DD") }}
              </van-cell>
              <van-cell
                :border="false"
                title="状态:"
                style="padding-left:30px; padding-right: 30px;"
              >
                {{ item.Status }}
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
                <van-button
                  square
                  type="info"
                  text="调班"
                  @click.prevent="MobilizeC(item)"
                />
              </template>
            </van-swipe-cell>
          </van-cell>
        </van-list>
        <van-button
          type="info"
          style="margin-bottom: 50px; width: 100%"
          @click.prevent="AddList"
          >添加幼儿</van-button
        >
        <!-- 添加幼儿 -->
        <van-popup v-model="AddListshow" style="width: 80%;">
          <form action="/" method="POST" ref="AddListForm" :model="AddListForm">
            <van-cell-group>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >姓名:</span
                >
                <van-field
                  v-model="AddListForm.RealName"
                  placeholder="请输入幼儿姓名"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >档案号:</span
                >
                <van-field
                  v-model="AddListForm.DangAnHao"
                  placeholder="请输入幼儿档案号"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >生日:</span
                >
                <van-field
                  v-model="AddListForm.ShengRi"
                  placeholder="请输入生日"
                  style="display:inline-block; width: 45%;"
                  @click.prevent="NowDate"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >性别:</span
                >
                <van-field
                  v-model="AddListForm.XingBie"
                  placeholder="请输入性别"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >入托类型:</span
                >
                <van-field
                  v-model="AddListForm.RuTuoLeiXing"
                  placeholder="请输入入托类型"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >入托日期:</span
                >
                <van-field
                  v-model="AddListForm.RuTuoRiQi"
                  placeholder="请输入入托日期"
                  style="display:inline-block; width: 55%;"
                  @click.prevent="NowDate2"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >民族:</span
                >
                <van-field
                  v-model="AddListForm.MinZu"
                  placeholder="请输入民族"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >身份证号:</span
                >
                <van-field
                  v-model="AddListForm.ShenFenZhengHao"
                  placeholder="请输入身份证号"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >户籍类型:</span
                >
                <van-field
                  v-model="AddListForm.HuJiLeiXing"
                  placeholder="请输入户籍类型"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >户籍:</span
                >
                <van-field
                  v-model="AddListForm.HuJi"
                  placeholder="请输入户籍"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >血型:</span
                >
                <van-field
                  v-model="AddListForm.XueXing"
                  placeholder="请输入血型"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >是否剖腹产:</span
                >
                <van-field
                  v-model="AddListForm.PouFuChan"
                  placeholder="请输入是否剖腹产"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >是否转园:</span
                >
                <van-field
                  v-model="AddListForm.ShiFouZhuanYuan"
                  placeholder="请输入是否转园"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >保健管理本:</span
                >
                <van-field
                  v-model="AddListForm.BaoJianGuanLiBen"
                  placeholder="请输入保健管理本"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >家庭住址(省市区):</span
                >
                <van-field
                  v-model="AddListForm.DiZhi"
                  placeholder="请输入家庭住址(省市区)"
                  style="display:inline-block; width: 70%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >家庭住址(具体地址):</span
                >
                <van-field
                  v-model="AddListForm.DiZhiData"
                  placeholder="请输入家庭住址(具体地址)"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >收费方案:</span
                >
                <van-field
                  v-model="AddListForm.ShouFeiFangAnIdName"
                  placeholder="请输入收费方案"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >收费方案ID:</span
                >
                <van-field
                  v-model="AddListForm.ShouFeiFangAnId"
                  placeholder="请输入收费方案ID"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >喜欢颜色:</span
                >
                <van-field
                  v-model="AddListForm.XiHuanYanSe"
                  placeholder="请输入喜欢颜色"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >特殊要求:</span
                >
                <van-field
                  v-model="AddListForm.TeShuYaoQiu"
                  placeholder="请输入特殊要求"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';  display: block;"
                  >家族病史:</span
                >
                <van-switch
                  v-model="AddListForm.IsJiaZuBingShi"
                  style="display:inline-block; margin-left: .4rem;"
                />
                <van-field
                  v-model="AddListForm.JiaZuBingShi"
                  placeholder="请输入家族病史"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体'; display: block;"
                  >先天性疾病:</span
                >
                <van-switch
                  v-model="AddListForm.IsXianTianJiBing"
                  style="display:inline-block; margin-left: .4rem;"
                />
                <van-field
                  v-model="AddListForm.XianTianJiBing"
                  placeholder="请输入先天性疾病"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >紧急联系人:</span
                >
                <van-field
                  v-model="AddListForm.JinJiLianXiRen"
                  placeholder="请输入紧急联系人"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >紧急联系人电话:</span
                >
                <van-field
                  v-model="AddListForm.JinJiLianXiRenDianHua"
                  placeholder="请输入紧急联系人电话"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >状态:</span
                >
                <van-field
                  v-model="AddListForm.Status"
                  placeholder="请输入状态"
                  style="display:inline-block; width: 45%;"
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
        <!-- 修改幼儿列表 -->
        <van-popup v-model="ModifyListshow" style="width: 80%;">
          <form action="/" method="POST" ref="AddListForm" :model="dqList">
            <van-cell-group>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >姓名:</span
                >
                <van-field
                  v-model="dqList.RealName"
                  placeholder="请输入幼儿姓名"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >档案号:</span
                >
                <van-field
                  v-model="dqList.DangAnHao"
                  placeholder="请输入幼儿档案号"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >生日:</span
                >
                <van-field
                  v-model="dqList.ShengRi"
                  placeholder="请输入生日"
                  style="display:inline-block; width: 45%;"
                  @click.prevent="NowDate"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >性别:</span
                >
                <van-field
                  v-model="dqList.XingBie"
                  placeholder="请输入性别"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >入托类型:</span
                >
                <van-field
                  v-model="dqList.RuTuoLeiXing"
                  placeholder="请输入入托类型"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >入托日期:</span
                >
                <van-field
                  v-model="dqList.RuTuoRiQi"
                  placeholder="请输入入托日期"
                  style="display:inline-block; width: 55%;"
                  @click.prevent="NowDate2"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >民族:</span
                >
                <van-field
                  v-model="dqList.MinZu"
                  placeholder="请输入民族"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >身份证号:</span
                >
                <van-field
                  v-model="dqList.ShenFenZhengHao"
                  placeholder="请输入身份证号"
                  style="display:inline-block; width: 55%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >户籍类型:</span
                >
                <van-field
                  v-model="dqList.HuJiLeiXing"
                  placeholder="请输入户籍类型"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >户籍:</span
                >
                <van-field
                  v-model="dqList.HuJi"
                  placeholder="请输入户籍"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >血型:</span
                >
                <van-field
                  v-model="dqList.XueXing"
                  placeholder="请输入血型"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >是否剖腹产:</span
                >
                <van-field
                  v-model="dqList.PouFuChan"
                  placeholder="请输入是否剖腹产"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >是否转园:</span
                >
                <van-field
                  v-model="dqList.ShiFouZhuanYuan"
                  placeholder="请输入是否转园"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >保健管理本:</span
                >
                <van-field
                  v-model="dqList.BaoJianGuanLiBen"
                  placeholder="请输入保健管理本"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >家庭住址(省市区):</span
                >
                <van-field
                  v-model="dqList.DiZhi"
                  placeholder="请输入家庭住址(省市区)"
                  style="display:inline-block; width: 70%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >家庭住址(具体地址):</span
                >
                <van-field
                  v-model="dqList.DiZhiData"
                  placeholder="请输入家庭住址(具体地址)"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >收费方案:</span
                >
                <van-field
                  v-model="dqList.ShouFeiFangAnIdName"
                  placeholder="请输入收费方案"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >收费方案ID:</span
                >
                <van-field
                  v-model="dqList.ShouFeiFangAnId"
                  placeholder="请输入收费方案ID"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >喜欢颜色:</span
                >
                <van-field
                  v-model="dqList.XiHuanYanSe"
                  placeholder="请输入喜欢颜色"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >特殊要求:</span
                >
                <van-field
                  v-model="dqList.TeShuYaoQiu"
                  placeholder="请输入特殊要求"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';display:block;"
                  >家族病史:</span
                >
                <van-switch
                  v-model="dqList.IsJiaZuBingShi"
                  style="display:inline-block; margin-left: .4rem;"
                />
                <van-field
                  v-model="dqList.JiaZuBingShi"
                  placeholder="请输入家族病史"
                  style="display:inline-block; width: 50%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体'; display:block;"
                  >先天性疾病:</span
                >
                <van-switch
                  v-model="dqList.IsXianTianJiBing"
                  style="display:inline-block; margin-left: .4rem;"
                />
                <van-field
                  v-model="dqList.XianTianJiBing"
                  placeholder="请输入先天性疾病"
                  style="display:inline-block; width: 50%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >紧急联系人:</span
                >
                <van-field
                  v-model="dqList.JinJiLianXiRen"
                  placeholder="请输入紧急联系人"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >紧急联系人电话:</span
                >
                <van-field
                  v-model="dqList.JinJiLianXiRenDianHua"
                  placeholder="请输入紧急联系人电话"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >状态:</span
                >
                <van-field
                  v-model="dqList.Status"
                  placeholder="请输入状态"
                  style="display:inline-block; width: 45%;"
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
        <!-- 幼儿调班 -->
        <van-popup v-model="MobilizeClassShow" style="width: 80%;">
          <form action="/" method="POST" ref="MobilizeClass" :model="MCList">
            <van-cell-group>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >变更班级:</span
                >
                <van-field
                  v-model="MCList.XianBanJi"
                  placeholder="请输入要调的班级"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >年级:</span
                >
                <van-field
                  v-model="MCList.XianNianJi"
                  placeholder="请输入要调班级所在年级"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >变更时间:</span
                >
                <van-field
                  v-model="MCList.TiaoBanTime"
                  placeholder="请输入要调级的时间"
                  style="display:inline-block; width: 45%;"
                  @click.prevent="NowDate3"
                />
              </div>
              <div>
                <span
                  style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';"
                  >备注:</span
                >
                <van-field
                  v-model="MCList.BeiZhu"
                  placeholder="请输入调级备注"
                  style="display:inline-block; width: 45%;"
                />
              </div>
              <div
                style="margin-top: 40px; margin-bottom: 30px; padding-left:0px; padding-right: 0px;"
              >
                <van-button
                  type="info"
                  @click.prevent="CloseMobilizeClass"
                  class="ClosePop"
                  >取消</van-button
                >
                <van-button
                  type="primary"
                  @click.prevent="MobilizeClassList"
                  class="AddClass"
                  >调班</van-button
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
    <van-popup v-model="DateShow2" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate2"
        type="date"
        @change="changeFn2()"
        @confirm="confirmFn2()"
        @cancel="cancelFn2()"
      />
    </van-popup>
    <van-popup v-model="DateShow3" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate3"
        type="date"
        @change="changeFn3()"
        @confirm="confirmFn3()"
        @cancel="cancelFn3()"
      />
    </van-popup>
  </div>
</template>

<script>
import { getList } from '@/api/channel';
import { DelectList8 } from '@/api/Delect';
import { AddList8 } from '@/api/AddList';
import { ModifyList8 } from '@/api/ModifyList';
import { SearchChild } from '@/api/Search';
import { MobilizeClass } from '@/api/MobilizeClass';
export default {
  name: 'SignInRule',
  data() {
    return {
      AddListForm: {
        RealName: '',
        DangAnHao: '',
        ShengRi: '',
        XingBie: '',
        RuTuoLeiXing: '',
        RuTuoRiQi: '',
        MinZu: '',
        ShenFenZhengHao: '',
        HuJiLeiXing: '',
        HuJi: '',
        XueXing: '',
        PouFuChan: '',
        ShiFouZhuanYuan: '',
        BaoJianGuanLiBen: '',
        DiZhi: '',
        DiZhiData: '',
        ShouFeiFangAnIdName: '',
        ShouFeiFangAnId: '',
        XiHuanYanSe: '',
        TeShuYaoQiu: '',
        IsJiaZuBingShi: '',
        JiaZuBingShi: '',
        IsXianTianJiBing: '',
        XianTianJiBing: '',
        JinJiLianXiRen: '',
        JinJiLianXiRenDianHua: '',
        Status: '',
        Id: ''
      },
      ModifyListForm: {
        RealName: '',
        DangAnHao: '',
        ShengRi: '',
        XingBie: '',
        RuTuoLeiXing: '',
        RuTuoRiQi: '',
        MinZu: '',
        ShenFenZhengHao: '',
        HuJiLeiXing: '',
        HuJi: '',
        XueXing: '',
        PouFuChan: '',
        ShiFouZhuanYuan: '',
        BaoJianGuanLiBen: '',
        DiZhi: '',
        DiZhiData: '',
        ShouFeiFangAnIdName: '',
        ShouFeiFangAnId: '',
        XiHuanYanSe: '',
        TeShuYaoQiu: '',
        IsJiaZuBingShi: '',
        JiaZuBingShi: '',
        IsXianTianJiBing: '',
        XianTianJiBing: '',
        JinJiLianXiRen: '',
        JinJiLianXiRenDianHua: '',
        Status: '',
        Id: ''
      },
      Search: {
        G_RealName_Like: '',
        G_BanJi_Like: '',
        G_NianJi_IN: '',
        G_DangAnHao_Like: '',
        G_MinZu_Like: '',
        G_HuJi_Like: '',
        G_ShenFenZhengHao_Like: ''
      },
      MobilizeClass: {
        XianBanJi: '',
        XianNianJi: '',
        TiaoBanTime: '',
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
      MobilizeClassShow: false,
      checked: true,
      dqList: [],
      MCList: [],
      Total: 0,
      InNurseryShow: false,
      DateShow: false,
      currentDate: new Date(),
      DateShow2: false,
      currentDate2: new Date(),
      DateShow3: false,
      currentDate3: new Date()
    };
  },
  mounted() {},
  created() {
    // 页面一进入加载幼儿列表
    this.loadgetList();
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
    CloseMobilizeClass() {
      this.MobilizeClassShow = false;
      this.$toast.fail('已取消调班');
    },
    close() {
      this.show = false;
    },
    InNursery() {
      this.InNurseryShow = true;
    },
    InNurseryDay() {},
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);
    },
    async loadgetList() {
      let channels = [];
      const data = await getList();
      this.Total = data.length;
      console.log(this.Total);
      this.channels = data;
      channels = this.channels;
      return channels;
    },
    async onLoad() {
      const data = await this.loadgetList();
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
          const listId8 = this.currentList.Id;
          const data = await DelectList8(listId8);
          console.log('确认删除了' + data);
          window.location.reload();
          this.$toast.success('删除成功');
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
      const data = await AddList8(this.AddListForm);
      this.AddListshow = false;
      window.location.reload();
      this.$toast.success(data.msg);
    },
    Modify(currentList) {
      this.ModifyListshow = true;
      this.dqList = currentList;
    },
    MobilizeC(currentList) {
      this.MobilizeClassShow = true;
      this.MCList = currentList;
    },
    async ModifyList() {
      const data = await ModifyList8(this.dqList);
      this.ModifyListshow = false;
      this.$toast.success(data.msg);
      window.location.reload();
    },
    async MobilizeClassList() {
      const data = await MobilizeClass(this.MCList);
      this.MobilizeClassShow = false;
      this.$toast.success(data.msg);
      window.location.reload();
    },
    async SearchChild() {
      const data = await SearchChild(this.Search);
      const SearchResult = data;
      this.list = SearchResult;
      console.log(this.list);
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
      this.dqList.ShengRi = this.timeFormat(this.currentDate);
      this.AddListForm.ShengRi = this.timeFormat(this.currentDate);
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
    },
    NowDate2() {
      this.DateShow2 = true;
    },
    showPopFn2() {
      this.DateShow2 = true;
    },
    showPopup2() {
      this.DateShow2 = true;
    },
    changeFn2() {
      // 值变化是触发
      this.changeDate2 = this.currentDate2; // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn2() {
      // 确定按钮
      this.dqList.RuTuoRiQi = this.timeFormat(this.currentDate2);
      this.AddListForm.RuTuoRiQi = this.timeFormat(this.currentDate2);
      this.DateShow2 = false;
      this.$toast.success('已选择日期');
    },
    cancelFn2() {
      this.DateSho2 = false;
      this.$toast.fail('已取消选择日期');
    },
    timeFormat2(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + '-' + month + '-' + day;
    },

    NowDate3() {
      this.DateShow3 = true;
    },
    showPopFn3() {
      this.DateShow3 = true;
    },
    showPopup3() {
      this.DateShow3 = true;
    },
    changeFn3() {
      // 值变化是触发
      this.changeDate3 = this.currentDate3; // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn3() {
      // 确定按钮
      this.MCList.TiaoBanTime = this.timeFormat(this.currentDate3);
      this.DateShow3 = false;
      this.$toast.success('已选择日期');
    },
    cancelFn3() {
      this.DateSho3 = false;
      this.$toast.fail('已取消选择日期');
    },
    timeFormat3(time) {
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
      width: 300px;
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
