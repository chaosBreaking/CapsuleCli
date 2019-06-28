<template>
  <div id="cloudContainer">
    <!-- 文件目录 -->
    <v-layout column id="folderNav">
      <Catalogue :folders = items></Catalogue>
    </v-layout>
    <!-- 主内容 -->
    <v-layout column id="mainLayout">
      <v-layout id="topCompLine">
        <Search></Search>
        <v-spacer></v-spacer>
        <div style="margin: auto;">
          <v-btn :color='topComponentColor' depressed small flat>
            <i class="iconfont" style="font-size:20px;margin-right:0.5em">&#xe823;</i>
            <span style="font-weight:100">新建文件夹</span>
          </v-btn>
        </div>
        <FileSelector :color='topComponentColor'>上传</FileSelector>
        <ImportHandler :color='topComponentColor'>导入</ImportHandler>
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
      <transition name="slide-fade">
        <UploadBar v-show="uploadBarShow" @close="uploadBarShow=false" @activate="activateUploadBar"></UploadBar>
      </transition>
    </v-layout>
  </div>
</template>

<script>
import FileSelector from '@/components/fileSelector'
import UploadBar from '@/components/uploadBar'
import Search from '@/components/Search'
import Catalogue from '@/components/Catalogue'
import ImportHandler from '@/components/ImportHandler'
import bus from './FileBus'
export default {
  name: 'Cloud',
  components: {
    FileSelector,
    UploadBar,
    Search,
    Catalogue,
    ImportHandler
  },
  data: () => ({
    dialog: true,
    uploadBarShow: false,
    topComponentColor: 'secondary',
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
          url: '',
          default: true
          },{
          title: '最近',
          id: 'recent',
          icon: '&#xe61f;',
          url: ''
        },{
          title: '分享',
          id: 'share',
          icon: '&#xe64e;',
          url: ''
        },{
          title: '回收站',
          id: 'trash',
          icon: `&#xe685;`,
          url: ''
        }
      ],
      bottom: [
        {
          title: '云盘',
          icon: '&#xe651;',
          url: ''
          },{
          title: '最近',
          icon: '&#xe620;',
          url: ''
        },{
          title: '回收站',
          icon: '&#xe771;',
          url: ''
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

  mounted () {
    // bus.$on('beforeUpload', () => {
    //   this.uploadBarShow = true
    //   bus.$emit('uploadReady')
    // })
    this.initialize()
    this.$router.push('/store/cloud')
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
    sideNavRoute (item) {
      this.$router.push(`/store/${item}`)
    },
    activateUploadBar () {
      this.uploadBarShow = true
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
  #cloudContainer {
    display: flex;
    height: 100%;
    overflow: auto;
    margin: 0;
    padding-left: 0;
    padding-right: 0;
    flex: 1 0 auto;
  }
  #folderNav {
    -webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none;
    width: 16em;
    flex: 0 1 auto;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  #mainLayout {
    background: rgba(255, 255, 255, 1);
    height: 100%;
    flex: 1 0 auto;
    padding-left: 1em;
    overflow: auto;
    #fileList {
      padding-top: 1em;
      flex: 1 0 auto;
    }
    #topCompLine {
      flex: 0 1 auto;
    }
  }
  #mainLayout::-webkit-scrollbar { width: 0 !important }
  .mainLayout { -ms-overflow-style: none; }
</style>
