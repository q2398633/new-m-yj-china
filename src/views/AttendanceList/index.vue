<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="考勤列表"
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
    <!-- 搜索员工考勤 -->
    <van-popup v-model="show"
               position="bottom"
               :style="{width: '100%', background: '#524c4c' }"
               close-icon="close">
      <form action="/"
            method="POST"
            ref="Search"
            :model="Search">
        <van-cell-group>
          <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索员工考勤</div>
          <van-field label="部门:"
                     label-width="110px"
                     autosize
                     v-model="Search.G_StudentIdName_Like"
                     name="G_StudentIdName_Like"
                     prop="G_StudentIdName_Like"
                     placeholder="请输入考勤人员姓名" />
          <van-field label="职务:"
                     label-width="110px"
                     autosize
                     v-model="Search.G_Date_Like"
                     name="G_Date_Like"
                     prop="G_Date_Like"
                     placeholder="请输入考勤日期" />
        </van-cell-group>
        <div class="submit">
          <van-button type="info"
                      @click.prevent="close">退出</van-button>
          <van-button type="primary"
                      @click.prevent="SearchClass">搜索</van-button>
        </div>
      </form>
    </van-popup>
    <!-- 考勤列表 -->
    <div class="Parent-List">
      <van-pull-refresh v-model="isLoading"
                        @refresh="onRefresh">
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">
          <van-cell v-for="(item) in list"
                    :key="item.Id">
            <van-swipe-cell>
              <div class="head">
                <img src="../../assets/ZJZ.jpg"
                     alt="">
                <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;">{{ item.StudentIdName }}</h1>
              </div>
              <van-cell :border="false"
                        title="日期"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Date }}
              </van-cell>
              <van-cell :border="false"
                        title="费用"
                        style="padding-left:30px; padding-right: 30px;">
                费用{{item.YingShouFei }} 出勤 {{ item.ShiJiChuQin }} / {{ item.YingChuQin }} 天
              </van-cell>
              <!-- <van-cell :border="false"
                        title="考勤第1天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin1.DaKa }}
                {{ item.KaoQin1.PeiCanTitle }}
                {{ item.KaoQin1.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第2天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin2.DaKa }}
                {{ item.KaoQin2.PeiCanTitle }}
                {{ item.KaoQin2.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第3天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin3.DaKa }}
                {{ item.KaoQin3.PeiCanTitle }}
                {{ item.KaoQin3.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第4天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin4.DaKa }}
                {{ item.KaoQin4.PeiCanTitle }}
                {{ item.KaoQin4.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第5天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin5.DaKa }}
                {{ item.KaoQin5.PeiCanTitle }}
                {{ item.KaoQin5.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第6天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin6.DaKa }}
                {{ item.KaoQin6.PeiCanTitle }}
                {{ item.KaoQin6.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第7天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin7.DaKa }}
                {{ item.KaoQin7.PeiCanTitle }}
                {{ item.KaoQin7.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第8天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin8.DaKa }}
                {{ item.KaoQin8.PeiCanTitle }}
                {{ item.KaoQin8.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第9天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin9.DaKa }}
                {{ item.KaoQin9.PeiCanTitle }}
                {{ item.KaoQin9.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第10天"
                        style="0padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin10.DaKa }}
                {{ item.KaoQin10.PeiCanTitle }}
                {{ item.KaoQin10.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第11天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin11.DaKa }}
                {{ item.KaoQin11.PeiCanTitle }}
                {{ item.KaoQin11.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第12天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin12.DaKa }}
                {{ item.KaoQin12.PeiCanTitle }}
                {{ item.KaoQin12.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第13天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin13.DaKa }}
                {{ item.KaoQin13.PeiCanTitle }}
                {{ item.KaoQin13.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第14天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin14.DaKa }}
                {{ item.KaoQin14.PeiCanTitle }}
                {{ item.KaoQin14.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第15天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin15.DaKa }}
                {{ item.KaoQin15.PeiCanTitle }}
                {{ item.KaoQin15.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第16天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin16.DaKa }}
                {{ item.KaoQin16.PeiCanTitle }}
                {{ item.KaoQin16.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第17天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin17.DaKa }}
                {{ item.KaoQin17.PeiCanTitle }}
                {{ item.KaoQin17.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第18天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin18.DaKa }}
                {{ item.KaoQin18.PeiCanTitle }}
                {{ item.KaoQin18.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第19天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin19.DaKa }}
                {{ item.KaoQin19.PeiCanTitle }}
                {{ item.KaoQin19.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第20天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin20.DaKa }}
                {{ item.KaoQin20.PeiCanTitle }}
                {{ item.KaoQin20.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第21天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin21.DaKa }}
                {{ item.KaoQin21.PeiCanTitle }}
                {{ item.KaoQin21.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第22天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin22.DaKa }}
                {{ item.KaoQin22.PeiCanTitle }}
                {{ item.KaoQin22.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第23天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin23.DaKa }}
                {{ item.KaoQin23.PeiCanTitle }}
                {{ item.KaoQin23.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第24天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin24.DaKa }}
                {{ item.KaoQin24.PeiCanTitle }}
                {{ item.KaoQin24.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第25天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin25.DaKa }}
                {{ item.KaoQin25.PeiCanTitle }}
                {{ item.KaoQin25.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第26天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin26.DaKa }}
                {{ item.KaoQin26.PeiCanTitle }}
                {{ item.KaoQin26.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第27天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin27.DaKa }}
                {{ item.KaoQin27.PeiCanTitle }}
                {{ item.KaoQin27.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第28天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin28.DaKa }}
                {{ item.KaoQin28.PeiCanTitle }}
                {{ item.KaoQin28.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第29天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin29.DaKa }}
                {{ item.KaoQin29.PeiCanTitle }}
                {{ item.KaoQin29.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第30天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin30.DaKa }}
                {{ item.KaoQin30.PeiCanTitle }}
                {{ item.KaoQin30.PeiCanId }}
              </van-cell>
              <van-cell :border="false"
                        title="考勤第31天"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.KaoQin31.DaKa }}
                {{ item.KaoQin31.PeiCanTitle }}
                {{ item.KaoQin31.PeiCanId }}
              </van-cell> -->
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
        <van-button type="info"
                    style="margin-bottom: 50px; width: 100%"
                    @click.prevent="AddList">添加员工</van-button>
        <!-- 添加考勤列表 -->
        <van-popup v-model="AddListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="AddListForm"
                :model="AddListForm">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">账号:</span>
                <van-field v-model="AddListForm.Account"
                           placeholder="请输入账号"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">姓名:</span>
                <van-field v-model="AddListForm.RealName"
                           placeholder="请输入姓名"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">性别:</span>
                <van-field v-model="AddListForm.XingBie"
                           placeholder="请输入性别"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">民族:</span>
                <van-field v-model="AddListForm.MinZu"
                           placeholder="请输入民族"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">生日:</span>
                <van-field v-model="AddListForm.Birthday"
                           placeholder="请输入生日"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">身份证号:</span>
                <van-field v-model="AddListForm.IdNumber"
                           placeholder="请输入身份证号"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">部门(ID):</span>
                <van-field v-model="AddListForm.DepartmentId"
                           placeholder="请输入所在部门(ID形式)"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">职务(ID):</span>
                <van-field v-model="AddListForm.PositionId"
                           placeholder="请输入职务(ID形式)"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">学历:</span>
                <van-field v-model="AddListForm.Education"
                           placeholder="请输入学历"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">毕业院校:</span>
                <van-field v-model="AddListForm.Schools"
                           placeholder="请输入毕业院校"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">专业:</span>
                <van-field v-model="AddListForm.Professional"
                           placeholder="请输入专业"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">入职时间:</span>
                <van-field v-model="AddListForm.EntryDate"
                           placeholder="请输入入职时间"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">现住址:</span>
                <van-field v-model="AddListForm.DiZhi"
                           placeholder="请输入现地址"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">详细地址:</span>
                <van-field v-model="AddListForm.DiZhiData"
                           placeholder="请输入详细地址"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">考勤组:</span>
                <van-field v-model="AddListForm.BanCiGroupId"
                           placeholder="请输入考勤组"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">绩效:</span>
                <van-field v-model="AddListForm.UserJiXiaoId"
                           placeholder="请输入绩效"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">班级:</span>
                <van-field v-model="AddListForm.BanJiId"
                           placeholder="请输入班级"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">工资方案:</span>
                <van-field v-model="AddListForm.UserGongZiFangAnId"
                           placeholder="请输入工资方案"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">角色:</span>
                <van-field v-model="AddListForm.RoleId"
                           placeholder="请输入员工权限"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">家族病史:</span>
                <van-field v-model="AddListForm.IsJiaZuBingShi"
                           placeholder="有无家族病史"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">先天性疾病:</span>
                <van-field v-model="AddListForm.IsXianTianJiBing"
                           placeholder="有无先天性疾病"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">保险:</span>
                <van-field v-model="AddListForm.IsBaoXian"
                           placeholder="有无保险"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">劳动合同:</span>
                <van-field v-model="AddListForm.IsLaoDongHeTong"
                           placeholder="有无劳动合同"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">紧急联系人:</span>
                <van-field v-model="AddListForm.JinJiLianXiRen"
                           placeholder="请输入紧急联系人"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">紧急联系人电话:</span>
                <van-field v-model="AddListForm.JinJiLianXiRenDianHua"
                           placeholder="请输入紧急联系人电话"
                           style="display:inline-block; width: 50%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">特长:</span>
                <van-field v-model="AddListForm.TeChang"
                           placeholder="请输入特长"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">备注:</span>
                <van-field v-model="AddListForm.Remarks"
                           placeholder="请输入备注"
                           style="display:inline-block; width: 65%;" />
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
        <!-- 配餐列表 -->
        <van-popup v-model="ModifyListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="ModifyListForm"
                :model="dqList">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">账号:</span>
                <van-field v-model="dqList.Account"
                           placeholder="请输入账号"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">姓名:</span>
                <van-field v-model="dqList.RealName"
                           placeholder="请输入姓名"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">性别:</span>
                <van-field v-model="dqList.XingBie"
                           placeholder="请输入性别"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">民族:</span>
                <van-field v-model="dqList.MinZu"
                           placeholder="请输入民族"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">生日:</span>
                <van-field v-model="dqList.Birthday"
                           placeholder="请输入生日"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">身份证号:</span>
                <van-field v-model="dqList.IdNumber"
                           placeholder="请输入身份证号"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">部门(ID):</span>
                <van-field v-model="dqList.DepartmentId"
                           placeholder="请输入所在部门(ID形式)"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">职务(ID):</span>
                <van-field v-model="dqList.PositionId"
                           placeholder="请输入职务(ID形式)"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">学历:</span>
                <van-field v-model="dqList.Education"
                           placeholder="请输入学历"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">毕业院校:</span>
                <van-field v-model="dqList.Schools"
                           placeholder="请输入毕业院校"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">专业:</span>
                <van-field v-model="dqList.Professional"
                           placeholder="请输入专业"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">入职时间:</span>
                <van-field v-model="dqList.EntryDate"
                           placeholder="请输入入职时间"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">现住址:</span>
                <van-field v-model="dqList.DiZhi"
                           placeholder="请输入现地址"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">详细地址:</span>
                <van-field v-model="dqList.DiZhiData"
                           placeholder="请输入详细地址"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">考勤组:</span>
                <van-field v-model="dqList.BanCiGroupId"
                           placeholder="请输入考勤组"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">绩效:</span>
                <van-field v-model="dqList.UserJiXiaoId"
                           placeholder="请输入绩效"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">班级:</span>
                <van-field v-model="dqList.BanJiId"
                           placeholder="请输入班级"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">工资方案:</span>
                <van-field v-model="dqList.UserGongZiFangAnId"
                           placeholder="请输入工资方案"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">角色:</span>
                <van-field v-model="dqList.RoleId"
                           placeholder="请输入员工权限"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">家族病史:</span>
                <van-field v-model="dqList.IsJiaZuBingShi"
                           placeholder="有无家族病史"
                           style="display:inline-block; width: 15%;" />
                -
                <van-field v-model="dqList.JiaZuBingShi"
                           style="display:inline-block; width: 20%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">先天性疾病:</span>
                <van-field v-model="dqList.IsXianTianJiBing"
                           placeholder="有无先天性疾病"
                           style="display:inline-block; width: 15%;" />
                -
                <van-field v-model="dqList.XianTianJiBing"
                           placeholder="有无先天性疾病"
                           style="display:inline-block; width: 20%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">保险:</span>
                <van-field v-model="dqList.IsBaoXian"
                           placeholder="有无保险"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">劳动合同:</span>
                <van-field v-model="dqList.IsLaoDongHeTong"
                           placeholder="有无劳动合同"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">紧急联系人:</span>
                <van-field v-model="dqList.JinJiLianXiRen"
                           placeholder="请输入紧急联系人"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">紧急联系人电话:</span>
                <van-field v-model="dqList.JinJiLianXiRenDianHua"
                           placeholder="请输入紧急联系人电话"
                           style="display:inline-block; width: 50%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">特长:</span>
                <van-field v-model="dqList.TeChang"
                           placeholder="请输入特长"
                           style="display:inline-block; width: 65%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">备注:</span>
                <van-field v-model="dqList.Remarks"
                           placeholder="请输入备注"
                           style="display:inline-block; width: 65%;" />
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

  </div>
</template>

<script>
import { AttendanceList } from '@/api/AttendanceList'
import { DelectList5 } from '@/api/Delect'
import { AddList13 } from '@/api/AddList'
import { ModifyList13 } from '@/api/ModifyList'
import { SearchAttendance } from '@/api/Search'
export default {
    name: 'StaffAdmin',
    data () {
        return {
            Search: {
                G_StudentIdName_Like: '',
                G_Date_Like: ''
            },
            AddListForm: {
                Account: '',
                RealName: '',
                XingBie: '',
                MinZu: '',
                Birthday: '',
                IdNumber: '',
                DepartmentId: '',
                PositionId: '',
                Education: '',
                Schools: '',
                Professional: '',
                EntryDate: '',
                DiZhi: '',
                DiZhiData: '',
                BanCiGroupId: '',
                UserJiXiaoId: '',
                BanJiId: '',
                UserGongZiFangAnId: '',
                RoleId: '',
                IsJiaZuBingShi: '',
                JiaZuBingShi: '',
                IsXianTianJiBing: '',
                XianTianJiBing: '',
                IsBaoXian: '',
                IsLaoDongHeTong: '',
                JinJiLianXiRen: '',
                JinJiLianXiRenDianHua: '',
                TeChang: '',
                Remarks: '',
                Id: ''
            },
            ModifyListForm: {
                Account: '',
                RealName: '',
                XingBie: '',
                MinZu: '',
                Birthday: '',
                IdNumber: '',
                DepartmentId: '',
                PositionId: '',
                Education: '',
                Schools: '',
                Professional: '',
                EntryDate: '',
                DiZhi: '',
                DiZhiData: '',
                BanCiGroupId: '',
                UserJiXiaoId: '',
                BanJiId: '',
                UserGongZiFangAnId: '',
                RoleId: '',
                IsJiaZuBingShi: '',
                JiaZuBingShi: '',
                IsXianTianJiBing: '',
                XianTianJiBing: '',
                IsBaoXian: '',
                IsLaoDongHeTong: '',
                JinJiLianXiRen: '',
                JinJiLianXiRenDianHua: '',
                TeChang: '',
                Remarks: '',
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
            Total: 0
        }
    },
    mounted () {
    },
    created () {
    // 页面一进入加载考勤列表
        this.loadAttendanceListList()
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
            }, 500)
        },
        async loadAttendanceListList () {
            let channels = []
            const data = await AttendanceList()
            this.Total = data.length
            console.log(this.Total)
            this.channels = data
            channels = this.channels
            return channels
        },
        async onLoad () {
            const data = await this.loadAttendanceListList()
            this.list = data
        },
        async DelList (currentList) {
            this.isShowDel = true
            this.currentList = currentList
            this.$dialog.confirm({
                title: '确认删除吗?',
                message: '删除当前列表数据'
            }).then(async () => {
                const listId5 = this.currentList.Id
                const data = await DelectList5(listId5)
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
            const data = await AddList13(this.AddListForm)
            console.log(data)
            this.AddListshow = false
            window.location.reload()
            this.$toast.success('添加成功')
        },
        Modify (currentList) {
            this.ModifyListshow = true
            this.dqList = currentList
        },
        async ModifyList () {
            const data = await ModifyList13(this.dqList)
            console.log(data)
            this.ModifyListshow = false
            this.$toast.success('修改成功')
            window.location.reload()
        },
        async SearchClass () {
            const data = await SearchAttendance(this.Search)
            const SearchResult = data
            this.list = SearchResult
            console.log(this.list)
            // this.Search.data = data
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
    width: 100%;
    height: 140px;
    background: white;
    button {
      margin-left: 180px;
    }
  }

  .van-list {
    margin-top: 130px;
  }
  .van-popup {
    width: 100%;
    .van-cell-group {
      width: 100%;

      .van-field {
        width: 100%;
        padding: 0 0 0 30px;
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
