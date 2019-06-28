<template>
  <div class="ihContainer">
    <v-btn flat depressed small :color='color' @click="importResource">
      <i class="iconfont" style="font-size:20px;margin-right:0.5em">&#xe68c;</i>
      <span style="font-weight:100">导入</span>
    </v-btn>
  </div>
</template>
<script>
export default {
  props: {
    color: String
  },
  data: () => ({}),
  methods: {
    importResource: function () {
      console.log('he;;p')
    }
  }
}
</script>
<style lang="scss">
  .ihContainer {
    margin: auto;
  }
</style>

