<template>
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
            v-for="folder in folders"
            :key="folder.title"
            v-model="folder.active"
            :prepend-icon="folder.icon"
            append-icon="iconfont icon-down"
            no-action
            active-class="activeListItem"
          >
            <template v-slot:activator>
              <v-list-tile id="folderItem">
                <v-list-tile-content>
                  <v-list-tile-title>{{ folder.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="subFolder in folder.children"
              :key="subFolder.title"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ subFolder.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </div>
    </v-layout>
</template>

<script>
export default {
  name: 'Catalogue',
  props: {
    folders: Array
  },
  data: () => ({
  })
}
</script>

<style lang="scss">
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
        -ms-transform:rotate(0.9);  /* IE 9 */
        -moz-transform:rotate(0.9); /* Firefox */
        -webkit-transform:rotate(0.9); /* Safari 和 Chrome */
        -o-transform:rotate(0.9); /* Opera */
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
    .slide-fade-enter-active {
      transition: height 2s ease;
    }
    .slide-fade-leave-active {
      transition: all 2s cubic-bezier(1.0, 1, 0, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateY(10px);
      opacity: 0;
    }
  }
</style>
