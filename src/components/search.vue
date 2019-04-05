<template>
  <div id="container">
    <v-text-field
      class="input"
      single-line
      hide-details
      clearable
      outline
      append-icon="fas fa-search"
      label="搜索文件名或哈希值"
      color='#033'
      height=45
    >
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
