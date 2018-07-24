<template>
  <div class="list-group">
    <component v-bind:is="item_view" v-for="(item, index) in items" v-bind:item="item" v-bind:index="index" :key="item._id"></component>
  </div>
</template>

<script>
  import ListGroupRouterLinkItem from './ListGroupRouterLinkItem';
  import ListGroupPlaylistItem from './ListGroupPlaylistItem';

  export default {
    name: 'ListGroup',
    props: {
      item_view: {
        type: String,
        default: 'list-group-item',
      },
      items: {
        type: Array,
        default: null,
      },
    },
    components: {
      'list-group-item': ListGroupRouterLinkItem,
      'playlist-item': ListGroupPlaylistItem,
    },
  };
</script>

<style scoped>

</style>
