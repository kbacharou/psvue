<template>
  <div>
    <dashboard-menu v-bind:items="menuItems"></dashboard-menu>
    <b-input-group class="search-input">
      <!-- Main form input -->
      <b-form-input placeholder="Search..." v-model="query" v-on:change="fetchData"></b-form-input>

      <!-- Attach Right button Group via slot -->
      <b-input-group-button slot="right">
        <b-btn variant="primary" v-on:click="fetchData">Search</b-btn>
      </b-input-group-button>

    </b-input-group>
    <h5 class="search-title" v-if="hasItems">Results for "{{ realQuery }}"</h5>
    <spinner v-if="loading"></spinner>
    <nav class="navbar navbar-light bg-light toolbar" v-if="!loading && hasItems">
      <form class="form-inline">
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" type="radio" id="capsFull" value="full" v-model="capsMode" checked>
            Full
          </label>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" type="radio" id="capsOnly" value="caps" v-model="capsMode">
            Caps lock only
          </label>
        </div>
      </form>
    </nav>
    <list v-bind:items="playlistItems" item_view="playlist-item" v-if="!loading"></list>
  </div>
</template>

<script>
  import API from '@/services/API';
  import ListGroup from './ListGroup';
  import Preloader from './Preloader';
  import InlineMenu from './InlineMenu';
  import {psplayer} from '@/psplayer';
  import generateMainMenu from '@/mainmenu';

  import bButton from 'bootstrap-vue/es/components/button/button';
  import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
  import bInputGroup from 'bootstrap-vue/es/components/input-group/input-group';
  import bInputGroupButton from 'bootstrap-vue/es/components/input-group/input-group-button';

  import filtersPlaylistsMixin from '@/mixins/FiltersPlaylists';

  export default {
    name: 'PlaylistView',
    data: function() {
      return {
        loading: false,
        error: null,
        menuItems: generateMainMenu('search'),
        playlistItems: [],
        originalPlaylistItems: [],
        capsMode: 'full',
        query: '',
        realQuery: '',
      };
    },
    computed: {
      hasItems: function() {
        return this.originalPlaylistItems.length > 0;
      },
    },
    created() {
      if (this.$route.params.filter) {
        this.menuItems['all'].isActive = false;
        this.menuItems[this.$route.params.filter].isActive = true;
        this.applyFilter(this.$route.params.filter);
      }
    },
    watch: {
      '$route': 'routeUpdate',
      capsMode() {
        psplayer.setMode(this.capsMode);
      },
    },
    methods: {
      clearState() {
        this.loading = false;
        this.playlistItems = [];
        this.originalPlaylistItems = [];
        this.realQuery = '';
      },
      routeUpdate(next, prev) {
        if (prev.name !== 'Search') {
          this.clearState();
          return;
        }

        this.handleFilterRoute(next, prev);

        psplayer.setMode(this.capsMode);
      },
      fetchData() {
        this.error = this.playlists = null;
        this.loading = true;

        if (this.query) {
          API.searchItems(this.query).then((response) => {
            this.playlistItems = response.data.items;
            this.originalPlaylistItems = response.data.items;
            this.realQuery = response.data.query;
            this.loading = false;
          }).catch((error) => {
            this.clearState();
            this.error = error;
            console.log(error);
          });
        } else {
          this.clearState();
        }
      },
      patchMenu() {
        this.menuItems.forEach((elm) => {
          elm.to.path = `/playlist/view/${this.playlist._id}/${elm.appendix}`;
        });
      },
    },
    components: {
      'tab-menu': InlineMenu,
      'dashboard-menu': InlineMenu,
      'spinner': Preloader,
      'list': ListGroup,
      'b-btn': bButton,
      'b-form-input': bFormInput,
      'b-input-group': bInputGroup,
      'b-input-group-button': bInputGroupButton,
    },
    mixins: [filtersPlaylistsMixin],
  };
</script>

<style>
  #vue-app {
    margin-top: 120px;
  }

  #pslight-bar {
    display: block;
    top: 0;
    z-index: 10;
    height: 80px;
    width: 100%;
    position: fixed;
    text-align: center;
    background: #f5f5f5;
    color: #000;
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    font-size: 24px;
  }

  .toolbar > form > .form-check {
    margin-left: 5px;
    margin-right: 5px;
  }

  .search-title {
    margin-top: 10px;
  }

  .search-input {
    margin-top: 10px;
  }
</style>
