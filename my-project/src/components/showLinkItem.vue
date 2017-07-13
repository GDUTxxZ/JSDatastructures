<template>
  <span>
    <span class="view-item">{{LinkData.value}}</span>
    <LinkItem v-if="LinkData.next" :LinkData="LinkData.next"></LinkItem>
  </span>
</template>

<script>
export default {
  name: 'LinkItem',
  props: ['LinkData']
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
