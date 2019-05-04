<template>
  <v-container id="container">
    <!-- 侧边导航 -->
    <v-navigation-drawer
      class="grey lighten-4"
      mini-variant
      id="sideNav"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app>
      <v-list dense class="list">
        <template v-for="item in items">
          <v-list-group
            id="listGroup"
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title id='subList'>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <!-- 主内容 -->
    <v-layout column>
      <v-layout id="topCompLine">
        <v-btn :color='topComponentColor'>
          <v-icon style="font-size:16px;margin-right:0.5em">fas fa-folder-plus</v-icon>
          <span>新建文件夹</span>
        </v-btn>
        <Upload :color='topComponentColor'></Upload>
        <v-btn :color='topComponentColor'>
          <i class="iconfont" style="font-size:20px;margin-right:0.5em">&#xe68c;</i>
          导入
        </v-btn>
        <v-spacer></v-spacer>
        <Search></Search>
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
              @click="share(props.item)"
            >
              fas fa-share-square
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="deleteItem(props.item)"
            >
              fas fa-download
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="null"
            >
              fas fa-ellipsis-h
            </v-icon>
          </td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
import Upload from '@/components/upload'
import Search from '@/components/search'
export default {
  name: 'capsule',
  components: {
    Upload,
    Search
  },
  data: () => ({
    topComponentColor: 'info',
    dialog: false,
    drawer: null,
    sideNav: {
      mini: true
    },
    items: [
      {
        model: true, // 是否默认展开
        icon: 'fas fa-folder-open',
        'icon-alt': 'fas fa-folder',
        text: '全部文件',
        children: [
          { text: '图片' },
          { text: '文档' },
          { text: '视频' },
          { text: '音频' },
          { text: '种子' },
          { text: '其他' }
        ]
      },
      {
        icon: 'fas fa-share-alt',
        'icon-alt': 'fas fa-share-alt',
        text: '我的分享',
        model: false,
        children: [
          { text: '图片' },
          { text: '文档' },
          { text: '视频' },
          { text: '音频' },
          { text: '种子' },
          { text: '其他' }
        ]
      },
      { icon: 'fas fa-question-circle', text: '帮助' }
    ],
    headers: [
      {
        text: '文件名',
        sortable: false,
        value: 'fileName'
      },
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
  #container {
    height: 100%;
    margin: 0;
    padding-left: 0;
    padding-right: 0;
  }
  #sideNav {
    margin-top: 68px !important;
    width: 4em !important;
  }
  .list {
    padding: 0;
  }
  .fileList {
    height: 100%;
  }
  #subList {
    text-align: center;
  }
  #topCompLine {
    padding-bottom: 2em;
    padding-left: 1em;
  }
  #listGroup:after {
      background: rgba(0,0,0,0);
  }
  #listGroup:before {
      background: rgba(0,0,0,0);
  }
</style>
