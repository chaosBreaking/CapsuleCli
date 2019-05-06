<template>
  <div id="container">
    <v-text-field
      class="input"
      single-line
      hide-details
      clearable
      placeholder="搜索文件名或哈希值"
      color='#033'
    >
    <v-icon class="iconfont" slot="append" style="font-size:1.5em">&#xe665;</v-icon>
    </v-text-field>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  #container {
    width:20em;
    padding-right: 1em;
  }
  .input {
    .v-input__slot {
      min-height: 30px !important;
      display: flex;
      margin: auto;
    }
    margin: auto;
    height: 46px !important;
  }
</style>
