<template>
  <div id="barDiv">
    <div id="topBar">
      <div id="topBarLeft">
        <span id="topBarTitle">传输队列</span>
      </div>
      <div id="topBarRight">
        <i class="iconfont" v-bind:class="{ 'icon-up': mini, 'icon-down': !mini }" @click="miniBarSwitch"></i>
        <i class="iconfont icon-close1" @click="closeBar"></i>
      </div>
    </div>
    <div id="miniBar" v-if="mini">
      <div id="prefix">
        <v-progress-circular
          :rotate="-90"
          :size="15"
          :width="3"
          :value="progress"
          color="primary"
        >
        </v-progress-circular>
      </div>
      <div id="info">正在传输第 3/12 个文件</div>
    </div>
    <transition name="slide-fade">
      <div id="barDivMain" class="barDivMain" v-if="!mini">
        <div id="item" v-for="file in fileStack" :key="file.name">
          <p>{{ file.name }}</p><br>
          <p>{{ sizeOf(file.size) }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import bus from './FileBus'
export default {
  props: {
  },
  data: () => ({
    mini: false,
    progress: 0,
    fileStack: []
  }),
  mounted () {
    bus.$once('uploadStart', (files) => this.uploadHandler(files))
  },
  computed: {

  },
  methods: {
    miniBarSwitch: function () {
      this.mini = !this.mini
      setInterval(() => {
         this.progress = this.progress >= 100 ? 0 :  this.progress + 10
      }, 1000)
    },
    closeBar: function () {
      this.$emit('close')
    },
    uploadHandler: function (files) {
      this.$emit('activate')
      bus.$once('uploadStart', (files) => this.uploadHandler(files))
      this.fileStack.unshift(...files)
    },
    sizeOf: function (size) {
      return ((size / 1024) < 1024) ? (size / 1024).toFixed(2) + ' KB'
          : (size / 1048576 < 1024 ? (size / 1024 / 1024).toFixed(2) + ' MB' 
          : (size / 1024 /1024/1024 < 1024 ? (size / 1024 /1024/1024).toFixed(2) + ' GB'
          : (size / 1024 /1024/1024/1024).toFixed(2) +' TB' ))
    }
  }
}
</script>

<style lang="scss">
  #barDiv {
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 4em;
    bottom: 0;
    width: 16em;
    max-width: 16em;
    max-height: 50%;
    background: #fff;
    overflow: hidden;
  }
  #barDivMain {
    position: relative;
    display: flex;
    width: 16em;
    max-width: 16em;
    flex-direction: column;
    overflow: scroll;
    overflow-x: hidden;
    font-size: 1em;
  }
  #barDivMain::-webkit-scrollbar {
    width: 4px;
  }
  #barDivMain::-webkit-scrollbar-thumb {
    /*滑块*/
    border-radius: 10px;
    background: #868686;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  }
  #barDivMain::-webkit-scrollbar-track {
    /*轨道*/
    border-radius: 10px;
    background: #EDEDED;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0);
  }
  #topBar {
    -webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none;
    font-weight: 800;
    font-size: 1em;
    display: inline-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: rgba(0,0,0,0.1);
    #topBarTitle {
      align-self: flex-end;
      justify-self: flex-end;
      font-size: 1em;
      font-weight: 200;
    }
    #topBarLeft {
      flex: 1 1 auto;
      padding-left: 6px;
    }
    #topBarRight {
      flex: 0 1 auto;
      padding-left: 6px;
      padding-right: 6px;
      i {
        cursor:pointer;
        padding-left: 10px;
      }
    }
  }
  #item {
    flex: 1 0 auto;
    height: 4em;
    display: flex;
    flex-direction: row;
    border-top: 1px solid;
    margin: 2px;
    justify-content: center;
    align-content: center;
  }
  #miniBar {
    -webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none;
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    flex-direction: row;
    padding-left: 6px;
    padding-bottom: 6px;
    #info {
      padding-left: 1em;
    }
  }
  .slide-fade-enter-active {
    transition: all .1s ease;
  }
  .slide-fade-leave-active {
    transition: all .1s ease-out;
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(10px);
    opacity: 0;
  }
</style>
