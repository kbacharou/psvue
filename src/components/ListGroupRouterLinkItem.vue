<template>
  <router-link :to="item.to" class="list-group-item list-group-item-action" v-bind:class="{ active: item.isActive }">
    {{ item.Name }}
  </router-link>
</template>

<script>
  export default {
    name: 'ListGroupRouterLinkItem',
    props: {
      item: {
        type: Object,
        default: null,
      },
    },
  };
</script>

<style scoped>

</style>
