<template>
  <div>
    <v-btn :color='color' @click.stop="showDialog = true" id="uploaderButton">
      <input type="file" id="fileMain"/>
      <i class="iconfont" style="font-size:20px;margin-right:0.5em">&#xe688;</i>
      <span style="font-weight:100">
        <slot></slot>
      </span>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    color: String
  },
  data: () => ({
    showDialog: false
  })
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
