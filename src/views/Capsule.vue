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
            <div v-for="item of sideNavItem.top" :key=item.title id="sideNavItem">
              <p class="itemLeftBorder"></p>
              <div class="itemIcon">
                <i class="iconfont" v-html="item.icon"></i>
              </div>
            </div>
          </div>
          <div id="sideNavBottom">            
            <div v-for="item of sideNavItem.bottom" :key=item.title id="sideNavItem" >
              <p class="itemLeftBorder"></p>
              <div class="itemIcon">
                <i class="iconfont" v-html="item.icon"></i>
              </div>
            </div>
          </div>
        </div>
      </v-navigation-drawer>
    </v-layout>
    <!-- 扩展面板 -->
    <v-layout column id="extendedNav">
      <div id="extendTitle">
        <div id="titleMain">
          <span>全部文件</span>
        </div>
        <div id="titleIcon">
          <v-icon class="iconfont">&#xe61d;</v-icon>
        </div>
        <div id="titleIcon">
          <v-icon class="iconfont">&#xe66d;</v-icon>
        </div>
      </div>
      <div id="folderList">
        <v-list id="list" dense expand subheader>
          <v-list-group
            id="listGroup"
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.icon"
            append-icon="iconfont icon-down"
            no-action
            active-class="activeListItem"
          >
            <template v-slot:activator>
              <v-list-tile id="folderItem">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="subItem in item.children"
              :key="subItem.title"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

            </v-list-tile>
          </v-list-group>
        </v-list>
      </div>
    </v-layout>
    <!-- 主内容 -->
    <v-layout column id="mainLayout">
      <v-layout id="topCompLine">
        <Search></Search>
        <v-spacer></v-spacer>
        <v-btn :color='topComponentColor'>
          <v-icon style="font-size:1em;margin-right:0.5em">fas fa-folder-plus</v-icon>
          <span  style="font-weight:100">新建文件夹</span>
        </v-btn>
        <Upload :color='topComponentColor'></Upload>
        <v-btn :color='topComponentColor'>
          <v-icon class="iconfont" style="font-size:20px;margin-right:0.5em">&#xe68c;</v-icon>
          <span style="font-weight:100">导入</span>
        </v-btn>
      </v-layout>
      <v-data-table
        id="fileList"
        :headers="headers"
        :items="files"
        >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.size }}</td>
          <td class="text-xs-left">{{ props.item.modifiedAt }}</td>
          <td class="text-xs-left">{{ props.item.hash }}</td>
          <td class="justify-center">
            <v-icon
              small
              class="mr-2"
            >
              fas fa-share-square
            </v-icon>
            <v-icon
              small
              class="mr-2"
            >
              fas fa-download
            </v-icon>
            <v-icon
              small
              class="mr-2"
            >
              fas fa-ellipsis-h
            </v-icon>
          </td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>
    </v-layout>
  </div>
</template>

<script>
import Upload from '@/components/upload'
import Search from '@/components/search'
export default {
  name: 'Capsule',
  components: {
    Upload,
    Search
  },
  data: () => ({
    topComponentColor: 'secondary',
    dialog: true,
    sideNavStyle: {
      mini: true,
      class: 'grey darken-3'
    },
    sideNavItem: {
      top: [
        {
          title: '云盘',
          icon: '&#xe6dc;'
          },{
          title: '最近',
          icon: '&#xe61f;'
        },{
          title: '分享',
          icon: '&#xe64e;'
        },{
          title: '回收站',
          icon: `&#xe685;`
        }
      ],
      bottom: [
        {
          title: '云盘',
          icon: '&#xe651;'
          },{
          title: '最近',
          icon: '&#xe620;'
        },{
          title: '回收站',
          icon: '&#xe771;'
        }
      ]
    },
    items: [
      {
        title: 'folder1',
        model: true, // 是否默认展开
        icon: 'iconfont icon-fileOpen',
        'icon-alt': 'iconfont icon-fileOpen',
        text: '全部文件',
        children: [
          { title: '图片' },
          { title: '文档' },
          { title: '视频' },
          { title: '音频' },
          { title: '种子' },
          { title: '其他' }
        ]
      },
      {
        title: 'folder2',
        icon: 'iconfont icon-fileOpen',
        'icon-alt': 'iconfont icon-fileOpen',
        text: '我的分享',
        model: false,
        children: [
          { title: '图片' },
          { title: '文档' },
          { title: '视频' },
          { title: '音频' },
          { title: '种子' },
          { title: '其他' }
        ]
      },
      {
        title: 'folder3',
        icon: 'iconfont icon-fileOpen',
        'icon-alt': 'iconfont icon-fileOpen',
        text: '我的分享',
        model: false,
        children: [
          { title: '图片' },
          { title: '文档' },
          { title: '视频' },
          { title: '音频' },
          { title: '种子' },
          { title: '其他' }
        ]
      },
      {
        title: 'folder4',
        icon: 'iconfont icon-fileOpen',
        'icon-alt': 'iconfont icon-fileOpen',
        text: '我的分享',
        model: false,
      },
    ],
    headers: [
      { text: '文件名', value: 'fileName', sortable: false },
      { text: '大小 ', value: 'size' },
      { text: '修改日期 ', value: 'modifiedAt' },
      { text: '文件类型', value: 'fileType' },
      { text: '操作', value: 'name', sortable: false }
    ],
    files: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      size: 0,
      modifiedAt: 0,
      hash: 0
    },
    defaultItem: {
      name: '',
      size: 0,
      modifiedAt: 0,
      hash: 0
    }
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.files = [
        {
          name: 'Frozen Yogurt',
          size: 159,
          modifiedAt: 6.0,
          hash: 24,
        },
        {
          name: 'Ice cream sandwich',
          size: 237,
          modifiedAt: 9.0,
          hash: 37,
        },
        {
          name: 'Eclair',
          size: 262,
          modifiedAt: 16.0,
          hash: 23,
        },
        {
          name: 'Cupcake',
          size: 305,
          modifiedAt: 3.7,
          hash: 67,
        },
        {
          name: 'Gingerbread',
          size: 356,
          modifiedAt: 16.0,
          hash: 49,
        },
        {
          name: 'Jelly bean',
          size: 375,
          modifiedAt: 0.0,
          hash: 94,
        },
        {
          name: 'Lollipop',
          size: 392,
          modifiedAt: 0.2,
          hash: 98,
        },
        {
          name: 'Honeycomb',
          size: 408,
          modifiedAt: 3.2,
          hash: 87,
        },
        {
          name: 'Donut',
          size: 452,
          modifiedAt: 25.0,
          hash: 51,
        },
        {
          name: 'KitKat',
          size: 518,
          modifiedAt: 26.0,
          hash: 65,
        }
      ]
    },

    editItem (item) {
      this.editedIndex = this.files.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.files.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.files.splice(index, 1)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.files[this.editedIndex], this.editedItem)
      } else {
        this.files.push(this.editedItem)
      }
      this.close()
    }
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
  #extendedNav {
    -webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none;
    width: 16em;
    flex: 0 1 auto;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    #folderList {
      height: 100%;
      position: relative;
      overflow: auto;
      // display: flex;
      .v-list__group__header__prepend-icon {
        display: inline-flex;
        padding-right: 3px;
        min-width: 1.5em !important;
        flex-shrink: 1;
      }
      #list {
        background: unset;
        #listGroup::before {
          background: unset !important;
        }
      }
      #listGroup:nth-child(2n+0) {
        // background: rgba(134,134,134,0.1) !important;
      }
      #folderItem {
        height: 2em;
        line-height: 1em;
        font-weight: 300;
        text-align: left;
        padding-left: 0;
      }
    }
    .v-list__group__header--active {
      background: rgba(0,0,0,0.2) !important;
    }
    #extendTitle {
      width: 100%;
      position: relative;
      height: 2.5em;
      background: rgba(0,0,0,0.1);
      display: flex;
      padding: 0 1em 0 1em;
      #titleMain{
        height: 100%;
        flex: 1 0 auto;
        font-size: 16px;
        font-family: source_sans_proregular, Arial;
        font-weight: 500;
        color: #3f3f3f;
        line-height: 2;
      }
      #titleIcon{
        height: 100%;
        align-self: flex-end;
        margin: 0 0 0 1em;
        font-weight: 300;
        font-size: 16px;
        line-height: 2;
        cursor:pointer;
      }
      #titleIcon:active{
        color:yellow;
        transform:scale(0.9);
        -ms-transform:rotate(0.9); 	/* IE 9 */
        -moz-transform:rotate(0.9); 	/* Firefox */
        -webkit-transform:rotate(0.9); /* Safari 和 Chrome */
        -o-transform:rotate(0.9); 	/* Opera */
      }
    }
    #folderList::-webkit-scrollbar {
      width: 4px;
    }
    #folderList::-webkit-scrollbar-thumb {
      /*滑块*/
      border-radius: 10px;
      background: #868686;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    #folderList::-webkit-scrollbar-track {
      /*轨道*/
      border-radius: 10px;
      background: #EDEDED;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0);
    }
  }
  #mainLayout {
    background: rgba(255, 255, 255, 1);
    height: 100%;
    flex: 1 0 auto;
    padding-left: 1em;
    #fileList {
      padding-top: 1em;
      flex: 1 0 auto;
    }
    #topCompLine {
      flex: 0 1 auto;
    }
  }
</style>
