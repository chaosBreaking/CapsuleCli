<template>
  <div id="capContainer">
    <!-- 侧边导航 -->
    <v-layout column id="sideLayout">
      <v-navigation-drawer
        id="sideNav"
        :class="sideNavStyle.class"
        mini-variant
        fixed
        permanent
        app>
        <div id="sideNavList">
          <div id="sideNavTop">
            <div v-for="item of sideNavItem.top" :key=item.title id="sideNavItem" @click="sideNavRoute(item)" v-bind:class="{sideNavItem_active: activated === item.id}">
              <p class="itemLeftBorder"></p>
              <div class="itemIcon">
                <i class="iconfont" v-html="item.icon"></i>
              </div>
            </div>
          </div>
          <div id="sideNavBottom">            
            <div v-for="item of sideNavItem.bottom" :key=item.title id="sideNavItem" @click="sideNavRoute(item)" v-bind:class="{sideNavItem_active: activated === item.id}">
              <p class="itemLeftBorder"></p>
              <div class="itemIcon">
                <i class="iconfont" v-html="item.icon"></i>
              </div>
            </div>
          </div>
        </div>
      </v-navigation-drawer>
    </v-layout>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Capsule',
  data: () => ({
    activated: 'cloud',
    topComponentColor: 'secondary',
    dialog: true,
    uploadBarShow: true,
    sideNavStyle: {
      mini: true,
      class: 'grey darken-3'
    },
    sideNavItem: {
      top: [
        {
          title: '云盘',
          id: 'cloud',
          icon: '&#xe6dc;',
          url: '/cloud',
          },{
          title: '最近',
          id: 'recent',
          icon: '&#xe61f;',
          url: '/recent'
        },{
          title: '分享',
          id: 'share',
          icon: '&#xe64e;',
          url: '/share'
        },{
          title: '回收站',
          id: 'trash',
          icon: `&#xe685;`,
          url: '/trash'
        }
      ],
      bottom: [
        {
          title: '扩展',
          id: 'extention',
          icon: '&#xe651;',
          url: '/extension'
          },{
          title: '设置',
          id: 'configure',
          icon: '&#xe620;',
          url: '/configure'
        },{
          title: '传输',
          id: 'transaction',
          icon: '&#xe771;',
          url: '/transaction'
        }
      ]
    },
  }),

  mounted () {
    this.$router.push('/store/cloud')
  },

  methods: {
    sideNavRoute (item) {
      this.activated = item.id
      this.$router.push(`/store${item.url}`)
    },
  }
}
</script>
<style lang="scss">
  #capContainer {
    display: flex;
    height: 100%;
    overflow: auto;
    margin: 0;
    padding-left: 0;
    padding-right: 0;
  }
  #sideLayout {
    -webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none;
    flex: 0 1 auto;
    #sideNav {
      position: relative;
      // margin-top: 64px !important;
      height: 100%;
      width: 4em !important;
      #sideNavItem {
        height: 48px;
        position: relative;
        text-align: center;
        color: #fff;
        padding: 0;
      }
      .itemIcon {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor:pointer;
        .iconfont {
          font-size: 1.5em;
          opacity: 0.6;
        }
      }
      .itemLeftBorder {
        width: 2px;
        height: 100%;
        position: absolute;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border: 0;
        -webkit-transition: all 200ms ease-in-out;
        -moz-transition: all 200ms ease-in-out;
        -o-transition: all 200ms ease-in-out;
        -ms-transition: all 200ms ease-in-out;
        transition: all 200ms ease-in-out;
        border-left: 2px solid rgba(0,0,0,0);
      }
    }
    #sideNavItem:hover {
      background: rgba(255,255,255,.1);
      .iconfont {
        opacity: 1;
      }
      .itemLeftBorder {
        border-color: rgba(255,51,58,1);
      }
    }
    .sideNavItem_active {
      height: 48px;
      position: relative;
      text-align: center;
      color: #fff;
      padding: 0;
      background: rgba(255,255,255,.1);
      .itemIcon {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor:pointer;
        .iconfont {
          font-size: 1.5em;
          opacity: 1;
        }
      }
      .itemLeftBorder {
        width: 2px;
        height: 100%;
        position: absolute;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border: 0;
        -webkit-transition: all 200ms ease-in-out;
        -moz-transition: all 200ms ease-in-out;
        -o-transition: all 200ms ease-in-out;
        -ms-transition: all 200ms ease-in-out;
        transition: all 200ms ease-in-out;
        border-left: 2px solid rgba(255,51,58,1) !important;
      }
    }
    #sideNavList {
      padding: 0;
      display: flex;
      flex-direction: column;
      height: 100%;
      #sideNavTop {
        width: 100%;
        flex: 1 0 auto;
        align-self: flex-start;
      }
      #sideNavBottom {
        width: 100%;
        flex: 0 1 auto;
        align-self: flex-end;
      }
    }
  }
</style>
