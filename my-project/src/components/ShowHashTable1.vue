<template>
  <div>
    <div v-for="item in HashData">{{item}}</div>
  </div>
</template>

<script>
export default {
  name: 'ShowHashTable1',
  props: ['HashData']
}
</script>

<style scoped>
</style>
