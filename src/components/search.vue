<template>
  <div id="container">
    <v-text-field
      class="input"
      single-line
      hide-details
      clearable
      placeholder="搜索文件名或哈希值"
      color='#033'
      id="searchBar"
    >
    <!-- <v-icon class="iconfont" slot="prepend" style="font-size:1.5em">&#xe665;</v-icon> -->
      <i class="iconfont" slot="prepend" style="font-size:20px;margin: auto">&#xe665;</i>
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
  #input {
    margin: auto;
  }
</style>
