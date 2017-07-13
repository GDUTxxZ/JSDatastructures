<template>
  <li v-if="structure.children">
    <span class="title" @click.stop="openList">{{structure.name}}{{mark}}</span>
    <ul v-show="open">
      <list-item v-for="item in structure.children" :structure="item"></list-item>
    </ul>
  </li>
  <li class="item" v-else><router-link :to="structure.name.split('-')[0]">{{structure.name}}</router-link></li>
</template>

<script>
export default {
  name: 'listItem',
  props: ['structure'],
  data () {
    return {
      open: false
    }
  },
  computed: {
    mark () {
      if (this.open) {
        return '[ - ]'
      } else {
        return '[ + ]'
      }
    }
  },
  methods: {
    openList () {
      this.open = !this.open
    }
  }
}
</script>

<style scoped>
li {
  display: block;
  line-height: 30px;
  list-style-type: none;
  user-select: none;
}
.item {
}
.title {
  cursor: pointer;
}
</style>
