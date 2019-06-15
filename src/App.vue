<template>
  <v-app id="vapp">
    <v-layout column id="appLayout">
      <!-- 顶部导航 -->
      <div class="topNav">
        <v-toolbar
          id="toolbar"
          :clipped-left="$vuetify.breakpoint.lgAndUp"
          :color='theme.baseColor'
          :dark='theme.isDark'
          app
          fixed>
          <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
            <span class="hidden-sm-and-down" id="brand">{{ $t('brand') }}</span>
          </v-toolbar-title>
          <v-tabs :color='theme.baseColor' align-with-title>
            <v-tab class="topTab" v-for="tab in tabs" :key="tab.title" :ripple='false' :to='tab.linkTo'>
              <span>{{ tab.title }}</span>
            </v-tab>
          </v-tabs>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>far fa-bell</v-icon>
          </v-btn>
          <v-btn :color='theme.btnColor' outline round>
            创作
          </v-btn>
        </v-toolbar>
      </div>
      <!-- 主内容 -->
      <div class="mainContent">
        <router-view></router-view>
      </div>
      <!-- 右下悬浮控件 -->
      <!-- <v-btn
        fab
        bottom
        right
        color="pink"
        dark
        fixed
        @click="dialog = !dialog">
        <v-icon>fas fa-comment-alt</v-icon>
      </v-btn> -->
    </v-layout>
    <v-dialog v-model="dialog" width="80%">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          意见反馈
        </v-card-title>
        <!-- dialog -->
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="Name"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="fas fa-board"
                placeholder="Company"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                placeholder="Job title"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="fas fa-mail"
                placeholder="Email"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                type="tel"
                prepend-icon="fas fa-phone"
                placeholder="(000) 000 - 0000"
                mask="phone"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="fas fa-note"
                placeholder="Notes"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>
const theme = require('./theme.js')
export default {
  data: () => ({
    theme: theme.dark,
    dialog: false,
    tabs: [
      {
        title: '存储',
        linkTo: '/store'
      },
      {
        title: '主页',
        linkTo: '/home'
      },
      {
        title: '发现',
        linkTo: '/news'
      }
    ]
  }),
  mounted () {
    this.$router.push('/store')
  }
}
</script>
<style lang="scss">
  #vapp {
    height: 100%;
    width: 100%;
    #appLayout {
      overflow: hidden;
      height: 100%;
      width: 100%;
    }
  }
  #vapp::-webkit-scrollbar { width: 0 !important }
  .v-toolbar {
    .v-toolbar__content {
      padding-left: 0;
    }
  }
  .topNav {
    -webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none;
    top: 0;
    width:100%;
    height:64px;
    min-height: 64px;
    #toolbar {
      padding: 0 !important;
      margin: 0 !important;
    }
  }
  .topTab {
    span {
      font-size: 16px;
    }
    width: 8em;
  }
  .mainContent {
    width:100%;
    height:100%;
    position: fixed;
    padding-top:64px;
    clear: both;
  }
  #brand {
    font-weight: 1000;
  }
</style>
