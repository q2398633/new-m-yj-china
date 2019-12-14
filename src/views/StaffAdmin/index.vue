<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="员工管理"
                 left-arrow
                 left-text="返回"
                 @click-left="back"
                 fixed>
      <van-icon name="search"
                slot="right"
                size="25px"
                @click.prevent="SideMenu" />
    </van-nav-bar>
    <!-- 搜索员工 -->
    <van-popup v-model="show"
               position="bottom"
               :style="{width: '100%'}"
               close-icon="close">
      <form action="/"
            method="POST"
            ref="Search"
            :model="Search">
        <van-cell-group>
          <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索员工</div>
          <van-field label="部门:"
                     label-width="110px"
                     autosize
                     v-model="Search.G_Department_Like"
                     name="G_Department_Like"
                     prop="G_Department_Like"
                     placeholder="请输入所在部门" />
          <van-field label="职务:"
                     label-width="110px"
                     autosize
                     v-model="Search.G_Position_Like"
                     name="G_Position_Like"
                     prop="G_Position_Like"
                     placeholder="请输入所属职务" />
          <van-field label="姓名:"
                     v-model="Search.G_RealName_Like"
                     prop="G_RealName_Like"
                     name="G_RealName_Like"
                     label-width="110px"
                     autosize
                     placeholder="请输入姓名" />
          <van-field label="账号:"
                     v-model="Search.G_Mobile_Like"
                     prop="GMobileLike"
                     name="GMobileLike"
                     label-width="110px"
                     autosize
                     placeholder="请输入账号" />
          <van-field label="身份证号:"
                     v-model="Search.G_Account_Like"
                     prop="G_Account_Like"
                     name="G_Account_Like"
                     label-width="110px"
                     autosize
                     placeholder="请输入身份证号" />
          <van-field label="学历:"
                     v-model="Search.G_Education_Like"
                     prop="G_Education_Like"
                     name="G_Education_Like"
                     label-width="110px"
                     autosize
                     placeholder="请输入学历" />
          <van-field label="毕业院校:"
                     v-model="Search.G_Schools_Like"
                     prop="G_Schools_Like"
                     name="G_Schools_Like"
                     label-width="110px"
                     autosize
                     placeholder="请输入学历" />
          <van-field label="专业:"
                     v-model="Search.G_Professional_Like"
                     prop="G_Professional_Like"
                     name="G_Professional_Like"
                     label-width="110px"
                     autosize
                     placeholder="请输入学历" />
        </van-cell-group>
        <div class="submit">
          <van-button type="info"
                      class="ClosePop"
                      @click.prevent="close">退出</van-button>
          <van-button type="primary"
                      class="AddClass"
                      @click.prevent="SearchClass">搜索</van-button>
        </div>
      </form>
    </van-popup>
    <!-- 员工列表 -->
    <div class="Parent-List">
      <van-pull-refresh v-model="isLoading"
                        @refresh="onRefresh"
                        disabled>
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">
          <van-cell v-for="(item) in list"
                    :key="item.Id">
            <van-swipe-cell style="border: 7px solid rgb(231, 231, 231);">
              <div class="head">
                <img src="../../assets/ZJZ.jpg"
                     alt="">
                <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;">{{ item.RealName }}</h1>
              </div>
              <van-cell :border="false"
                        title="部门"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Department }}
              </van-cell>
              <van-cell :border="false"
                        title="职务"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Position }}
              </van-cell>
              <van-cell :border="false"
                        title="账号"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Account }}
              </van-cell>
              <van-cell :border="false"
                        title="性别"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.XingBie }}
              </van-cell>
              <van-cell :border="false"
                        title="生日"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Birthday }}
              </van-cell>
              <van-cell :border="false"
                        title="身份证号"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.IdNumber }}
              </van-cell>
              <van-cell :border="false"
                        title="学历"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Education }}
              </van-cell>
              <van-cell :border="false"
                        title="毕业院校"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Schools }}
              </van-cell>
              <van-cell :border="false"
                        title="专业"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Professional }}
              </van-cell>
              <van-cell :border="false"
                        title="入职时间"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.EntryDate  | dateFmt('YYYY-MM-DD') }}
              </van-cell>
              <van-cell :border="false"
                        title="现住址"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.DiZhi }}
              </van-cell>
              <van-cell :border="false"
                        title="详细地址"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.DiZhiData }}
              </van-cell>
              <van-cell :border="false"
                        title="备注"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Remarks }}
              </van-cell>
              <van-cell :border="false"
                        title="状态"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Status }}
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
        <van-button type="info"
                    style="margin-bottom: 1.5rem; width: 100%; border-radius: 20px;"
                    @click.prevent="AddList">添加员工</van-button>
        <!-- 添加员工列表 -->
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
                           style="display:inline-block; width: 65%;"
                           @click.prevent="NowDate" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">身份证号:</span>
                <van-field v-model="AddListForm.IdNumber"
                           placeholder="请输入身份证号"
                           style="display:inline-block; width: 45%;" />
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
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">毕业院校:</span>
                <van-field v-model="AddListForm.Schools"
                           placeholder="请输入毕业院校"
                           style="display:inline-block; width: 55%;" />
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
                           style="display:inline-block; width: 55%;"
                           @click.prevent="NowDate2" />
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
                           style="display:inline-block; width: 55%;" />
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
                           style="display:inline-block; width: 55%;" />
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
                           style="display:inline-block; width: 55%;" />
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
                           style="display:inline-block; width: 55%;" />
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
                           style="display:inline-block; width: 45%;" />
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
        <!-- 修改员工信息列表 -->
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
                           style="display:inline-block; width: 65%;"
                           @click.prevent="NowDate" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">身份证号:</span>
                <van-field v-model="dqList.IdNumber"
                           placeholder="请输入身份证号"
                           style="display:inline-block; width: 55%;" />
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
                           style="display:inline-block; width: 55%;" />
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
                           style="display:inline-block; width: 55%;"
                           @click.prevent="NowDate2" />
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
                           style="display:inline-block; width: 55%;" />
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
                           style="display:inline-block; width: 55%;" />
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
                           style="display:inline-block; width: 55%;" />
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
                           style="display:inline-block; width: 45%;" />
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
  </div>
</template>

<script>
import { StaffList } from '@/api/StaffAdmin'
import { DelectList5 } from '@/api/Delect'
import { AddList13 } from '@/api/AddList'
import { ModifyList13 } from '@/api/ModifyList'
import { SearchStaff } from '@/api/Search'
export default {
  name: 'StaffAdmin',
  data () {
    return {
      active: 0,
      Search: {
        G_Department_Like: '',
        G_Position_Like: '',
        G_RealName_Like: '',
        G_Account_Like: '',
        G_IdNumber_Like: '',
        G_Education_Like: '',
        G_Schools_Like: '',
        G_Professional_Like: ''
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
      Total: 0,
      DateShow: false,
      currentDate: new Date(),
      DateShow2: false,
      currentDate2: new Date()
    }
  },
  mounted () {
  },
  created () {
    // 页面一进入加载供应商列表
    this.loadStaffListList()
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
    async loadStaffListList () {
      let channels = []
      const data = await StaffList()
      this.Total = data.length
      console.log(this.Total)
      this.channels = data
      channels = this.channels
      return channels
    },
    async onLoad () {
      const data = await this.loadStaffListList()
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
      this.$toast.success('添加成功')
      window.location.reload()
    },
    Modify (currentList) {
      this.ModifyListshow = true
      this.finished = false
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
      const data = await SearchStaff(this.Search)
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
      this.dqList.Birthday = this.timeFormat(this.currentDate)
      this.AddListForm.Birthday = this.timeFormat(this.currentDate)
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
      this.changeDate2 = this.currentDate // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn2 () { // 确定按钮
      this.dqList.EntryDate = this.timeFormat(this.currentDate2)
      this.AddListForm.EntryDate = this.timeFormat(this.currentDate2)
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
