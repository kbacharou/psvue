<template>
  <div>
    <h4>{{ playlist.Name }}</h4>
    <spinner v-if="loading"></spinner>
    <tab-menu v-bind:items="menuItems" v-if="!loading"></tab-menu>
    <nav class="navbar navbar-light bg-light toolbar" v-if="!loading">
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
  import filtersPlaylistsMixin from '@/mixins/FiltersPlaylists';

  export default {
    name: 'PlaylistView',
    data: function() {
      return {
        loading: false,
        error: null,
        playlist: {
          Name: '',
        },
        playlistItems: [],
        originalPlaylistItems: [],
        capsMode: 'full',
        menuItems: {
          all: {
            to: {path: ''},
            appendix: '',
            name: 'All',
            isActive: true,
          },
          played: {
            to: {path: ''},
            appendix: 'played',
            name: 'Played',
          },
          not_played: {
            to: {path: ''},
            appendix: 'not_played',
            name: 'Not played',
          },
        },
      };
    },
    created() {
      this.fetchData();

      if (this.$route.params.filter) {
        this.menuItems['all'].isActive = false;
        this.menuItems[this.$route.params.filter].isActive = true;
        this.applyFilter(this.$route.params.filter);
      }
    },
    watch: {
      '$route': 'routeUpdate',
      capsMode() {
        console.log(this.capsMode);
        psplayer.setMode(this.capsMode);
      },
    },
    methods: {
      routeUpdate(next, prev) {
        if (prev.params.id !== next.params.id) {
          return this.fetchData();
        }

        this.handleFilterRoute(next, prev);

        psplayer.setMode(this.capsMode);
      },
      fetchData() {
        this.error = this.playlists = null;
        this.loading = true;

        API.getFullPlaylist(this.$route.params.id).then((response) => {
          this.playlist = response.data.playlist;
          this.playlistItems = response.data.items;
          this.originalPlaylistItems = response.data.items;
          this.loading = false;
          this.patchMenu();
        }).catch((error) => {
          this.error = error;
          this.loading = false;
        });
      },
      patchMenu() {
        this.menuItems.forEach((elm) => {
          elm.to.path = `/playlist/view/${this.playlist._id}/${elm.appendix}`;
        });
      },
    },
    components: {
      'tab-menu': InlineMenu,
      'spinner': Preloader,
      'list': ListGroup,
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
</style>
