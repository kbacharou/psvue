<template>
  <div>
    <dashboard-menu v-bind:items="menuItems"></dashboard-menu>
    <spinner v-if="loading"></spinner>
    <div class="row">
      <playlist-card class="playlist-card" v-for="item in playlists" :key="item._id" v-bind:playlist="item" v-on:dashboard-reload="fetchData"></playlist-card>
    </div>
  </div>
</template>

<script>
  import API from '@/services/API';
  import PlaylistCard from './PlaylistCard';
  import Preloader from './Preloader';
  import InlineMenu from './InlineMenu';
  import generateMainMenu from '@/mainmenu';

  export default {
    name: 'Dashboard',
    data() {
      return {
        loading: false,
        playlists: [],
        error: null,
        menuItems: generateMainMenu('home'),
      };
    },
    created() {
      this.fetchData();
    },
    watch: {
      '$route': 'fetchData',
    },
    methods: {
      fetchData() {
        this.error = this.playlists = null;
        this.loading = true;
        API.getAllPlaylists().then((response) => {
          this.playlists = response.data.playlists;
          this.loading = false;
        }).catch((error) => {
          this.error = error;
          this.loading = false;
        });
      },
    },
    components: {
      'playlist-card': PlaylistCard,
      'spinner': Preloader,
      'dashboard-menu': InlineMenu,
    },
  };
</script>

<style scoped>
  .playlist-card {
    margin-bottom: 10px;
    margin-top: 10px;
  }
</style>
