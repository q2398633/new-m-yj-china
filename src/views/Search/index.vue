<template>
  <div class="SearchIndex">
    <div class="filterbar">
      <div class="filterbar-title">
        <ul class="title-ul">
          <li :class="{'title-li':true, 'current': item.isShow}"
              v-for="(item, index) in barMenus"
              :key="index">
            <span @click="handerClickMenu(item)">
              {{item.name}}
              <van-icon :name="item.isShow ? 'arrow-up' :'arrow-down'" />
            </span>
            <div class="filterbar-content"
                 v-on:click.stop
                 v-if="item.isShow">
              <ul class="content-ul">
                <li v-for="(child, number) in item.data"
                    :key="number"
                    :class="{'current': child.selected}"
                    @click="handerClickContent(item, child)">
                  {{child.name}}
                  <van-icon v-if="child.selected"
                            name="success" />
                </li>
              </ul>
              <div class="button-div"
                   v-if="item.multiple">
                <van-button plain
                            type="default"
                            @click="handerClear(item)">清空</van-button>
                <van-button type="info"
                            @click="search">确定</van-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="bg-filterbar"
           v-if="isBgFilterbarShow"
           @click="handerClickMenu"></div>
    </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            barMenus: [
                {
                    name: '菜系',
                    value: 1,
                    isShow: false,
                    multiple: true,
                    data: [
                        { name: '川菜', value: 1, selected: false },
                        { name: '粤菜', value: 2, selected: false },
                        { name: '湘菜', value: 3, selected: false },
                        { name: '苏菜', value: 4, selected: false },
                        { name: '闽菜', value: 5, selected: false },
                        { name: '徽菜', value: 6, selected: false },
                        { name: '浙菜', value: 7, selected: false },
                        { name: '鲁菜', value: 8, selected: false }
                    ]
                },
                {
                    name: '口味',
                    value: 2,
                    isShow: false,
                    multiple: true,
                    data: [
                        { name: '清淡', value: 1, selected: false },
                        { name: '麻辣', value: 2, selected: false },
                        { name: '养生', value: 3, selected: false }
                    ]
                },
                {
                    name: '适合人群',
                    value: 3,
                    isShow: false,
                    multiple: true,
                    data: [
                        { name: '老人', value: 1, selected: false },
                        { name: '婴儿', value: 2, selected: false },
                        { name: '小孩', value: 2, selected: false },
                        { name: '病人', value: 2, selected: false }
                    ]
                },
                {
                    name: '排序',
                    value: 4,
                    isShow: false,
                    multiple: false,
                    data: [
                        { name: '做过最多', value: 1, selected: false },
                        { name: '点赞最多', value: 2, selected: false }
                    ]
                }
            ]
        }
    },

    computed: {
        isBgFilterbarShow: {
            get () {
                let isBgShow = false
                this.barMenus.forEach(function (currentValue, index, arr) {
                    if (currentValue.isShow) {
                        isBgShow = true
                    }
                })
                return isBgShow
            }
        }
    },

    methods: {
        search () {
            this.handerClose()
        },

        handerClose () {
            this.barMenus.forEach(function (currentValue, index, arr) {
                currentValue.isShow = false
            })
        },

        handerClickMenu (item) {
            if (!item) {
                return
            }

            this.barMenus.forEach(function (currentValue, index, arr) {
                if (currentValue.value === item.value) {
                    currentValue.isShow = !currentValue.isShow
                } else {
                    currentValue.isShow = false
                }
            })
        },

        handerClickContent (item, child) {
            if (!item.multiple) {
                this.handerClear(item)
                this.handerClose(item)
            }

            child.selected = !child.selected
        },

        handerClear (item) {
            item.data.forEach(function (currentValue, index, arr) {
                currentValue.selected = false
            })
        }
    }
}
</script>
<style lang="less" scoped>
.SearchIndex {
  .filterbar {
    position: fixed;
    z-index: 2;
    left: 0;
    top: 3.1em;
    width: 100%;
    background-color: #fff;
    height: 2em;

    .bg-filterbar {
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.2;
      z-index: 1;
      left: 0;
      top: 4.2em;
    }
    .filterbar-title {
      width: 100%;
      .title-ul {
        height: 1.4em;
        margin-bottom: 0.5em;
        border-bottom: 1px solid #eee;
      }
      ul .title-li {
        width: 24%;
        float: left;
        text-align: center;
        font-size: 0.9em;

        .filterbar-content {
          position: absolute;
          left: 0;
          width: 100%;
          padding: 0.5em;
          background-color: #fff;
          z-index: 2;
          top: 1.24em;
        }
        .content-ul li {
          text-align: left;
          color: #111;
          font-weight: 400;
          padding-left: 1.5em;
          padding-top: 0.7em;
        }
        .content-ul .current {
          color: #1989fa;
        }
      }
      ul .current {
        color: #1989fa;
        font-weight: 600;
      }
      ul:after {
        content: "";
        display: block;
        clear: both;
      }
      .content-ul .van-icon {
        float: right;
        margin-right: 2.5em;
      }
      ul .van-icon {
        vertical-align: middle;
      }
    }
    .button-div {
      margin-top: 1.5em;
      text-align: center;

      button {
        width: 48%;
        float: left;
      }
      .van-button {
        height: 3em;
        line-height: 3em;
        font-size: 1em;
        font-weight: 400;
      }
    }
  }
}
</style>
