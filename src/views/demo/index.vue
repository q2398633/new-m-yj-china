<template>
  <div>
    <router-view></router-view>
    <!-- 底部-tabbar
    首页 /
    我的 /mine
     -->
    <van-tabbar active-color="#07c160"
                inactive-color="#000"
                v-model="activeIndex"
                route>
      <van-tabbar-item icon="home-o"
                       to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search"
                       to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
