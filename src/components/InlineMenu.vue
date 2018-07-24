<template>
  <div class="masthead">
    <b-navbar toggleable="md" type="light" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="text-md-center nav-justified w-100">
          <inline-menu-item v-for="item in items" v-bind:item="item"></inline-menu-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import InlineMenuItem from './InlineMenuItem';
  import bNavbar from 'bootstrap-vue/es/components/navbar/navbar';
  import bNavbarToggle from 'bootstrap-vue/es/components/navbar/navbar-toggle';
  import bNavbarNav from 'bootstrap-vue/es/components/navbar/navbar-nav';
  import bCollapse from 'bootstrap-vue/es/components/collapse/collapse';

  export default {
    name: 'InlineMenu',
    props: {
      items: {
        type: Object,
        default: null,
      },
    },
    components: {
      'inline-menu-item': InlineMenuItem,
      'b-navbar': bNavbar,
      'b-navbar-toggle': bNavbarToggle,
      'b-navbar-nav': bNavbarNav,
      'b-collapse': bCollapse,
    },
  };
</script>

<style scoped>

</style>
