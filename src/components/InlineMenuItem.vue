<template>
  <b-nav-item v-on:click="navigate" v-bind:class="{ active: item.isActive }">
    {{ item.name }}
  </b-nav-item>
</template>

<script>
  import bNavItem from 'bootstrap-vue/es/components/nav/nav-item';

  export default {
    name: 'InlineMenuItem',
    props: {
      item: {
        type: Object,
        default: null,
      },
    },
    methods: {
      'navigate': function() {
        this.$router.push(this.item.to);
      },
    },
    components: {
      'b-nav-item': bNavItem,
    },
  };
</script>

<style scoped>

</style>
