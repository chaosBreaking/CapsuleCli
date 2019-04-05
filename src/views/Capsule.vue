<template>
  <v-container id="container">
    <!-- 侧边导航 -->
    <v-navigation-drawer
      class="grey lighten-4"
      id="sideNav"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      width=200px
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
          <v-btn :color='topComponentColor'>新建文件夹</v-btn>
          <upload :color='topComponentColor'></upload>
          <v-btn :color='topComponentColor'>导入</v-btn>
          <v-spacer></v-spacer>
          <search></search>
        </v-layout>
        <v-data-table
          id="fileList"
          :headers="headers"
          :items="desserts"
          >
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.calories }}</td>
            <td class="text-xs-right">{{ props.item.fat }}</td>
            <td class="text-xs-right">{{ props.item.carbs }}</td>
            <td class="text-xs-right">{{ props.item.protein }}</td>
            <td class="justify-center layout px-0">
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteItem(props.item)"
              >
                delete
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
import upload from '@/components/upload'
import search from '@/components/search'
export default {
  name: 'capsule',
  components: {
    upload,
    search
  },
  data: () => ({
    topComponentColor: 'info',
    dialog: false,
    drawer: null,
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
        text: 'Dessert (100g serving)',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
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
      this.desserts = [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7
        }
      ]
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
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
</style>
