<template>
  <span>
    <span v-for="item in GListData">
      <span class="view-item" v-if="typeof item === 'number'">{{item}}</span>
      <showGListItem v-else :GListData="item"></showGListItem>
    </span>
  </span>
</template>

<script>
export default {
  name: 'showGListItem',
  props: ['GListData']
}
</script>

<style scoped>
.view-item {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 5px;
  line-height: 50px;
  background-color: #fad;
}
</style>
