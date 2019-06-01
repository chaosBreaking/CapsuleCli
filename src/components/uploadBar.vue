<template>
  <div id="barDiv">
    <div id="item">
      <div>file name</div>
      <div>43KB</div>
      <div>folder</div>
      <div>status!</div>
    </div>
    <div id="item">
      <div>file name</div>
      <div>43KB</div>
      <div>folder</div>
      <div>status!</div>
    </div>
    <div id="item">
      <div>file name</div>
      <div>43KB</div>
      <div>folder</div>
      <div>status!</div>
    </div>
    <div id="item">
      <div>file name</div>
      <div>43KB</div>
      <div>folder</div>
      <div>status!</div>
    </div>
    <div id="item">
      <div>file name</div>
      <div>43KB</div>
      <div>folder</div>
      <div>status!</div>
    </div>
    <div id="item">
      <div>file name</div>
      <div>43KB</div>
      <div>folder</div>
      <div>status!</div>
    </div>
    <div id="item">
      <div>file name</div>
      <div>43KB</div>
      <div>folder</div>
      <div>status!</div>
    </div>
    <div id="item">
      <div>file name</div>
      <div>43KB</div>
      <div>folder</div>
      <div>status!</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {

  },
  data: () => ({

  })
}
</script>

<style>
  #barDiv {
    position: absolute;
    display: flex;
    width: 16em;
    max-width: 16em;
    left: 4em;
    max-height: 50%;
    bottom: 0;
    background: #fff;
    flex-direction: column;
    overflow: scroll;
    overflow-x: hidden;
    font-size: 1em;
  }
  #barDiv::-webkit-scrollbar {
    width: 4px;
  }
  #barDiv::-webkit-scrollbar-thumb {
    /*滑块*/
    border-radius: 10px;
    background: #868686;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  }
  #barDiv::-webkit-scrollbar-track {
    /*轨道*/
    border-radius: 10px;
    background: #EDEDED;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0);
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
</style>
