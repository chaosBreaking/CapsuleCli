<template>
  <div>
    <v-btn :color='color' @click.stop="showDialog = true" id="uploaderButton">
      <input type="file" id="fileMain" multiple="multiple" @change="fileChange" ref="fileInput"/>
      <i class="iconfont" style="font-size:20px;margin-right:0.5em">&#xe688;</i>
      <span style="font-weight:100">
        <slot></slot>
      </span>
    </v-btn>
    <v-dialog v-model="showPathDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">选择上传路径</v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="selectPath('p')">确定</v-btn>
          <v-btn flat @click="showPathDialog = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import bus from './FileBus'
export default {
  props: {
    color: String
  },
  data: () => ({
    showDialog: false,
    showPathDialog: false,
  }),
  methods: {
    fileChange: function () {
      if (this.$refs.fileInput.files.length === 0) return 0
      this.showPathDialog = true
      // let size = ~~(this.$refs.fileInput.files[0].size / 1024);
      // let fileName = this.$refs.fileInput.files[0].name
      // let fileType = this.$refs.fileInput.files[0].type
      this.$on('pothSelected', path => {
        for (let index in this.$refs.fileInput.files) {
          Object.prototype.toString.call(this.$refs.fileInput.files[index]) === "[object File]"
           && (this.$refs.fileInput.files[index].path = path)
        }
        bus.$emit('uploadStart', this.$refs.fileInput.files)
      })
    },
    selectPath: function (path) {
      this.$emit('pothSelected', path)
      this.showPathDialog = false
    },
    addPath: function (obj, path) {
      obj.path = path
      return obj
    }
  }
}
</script>

<style>
  #uploaderButton {
    padding: 0;
  }
  #uploaderBody {
    width: 100%;
    height: 10em;
    border: 1px solid;
    position: relative;
  }
  #fileMain {
    width: 100%;
    height: 100%;
    opacity: 0;
    font-size: 0;
    cursor: pointer;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
  }
</style>
