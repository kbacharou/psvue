<template>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{{ playlist.Name }}</h4>
        <h6 class="card-subtitle mb-2 text-muted">Contains {{ playlist.Count }} elements</h6>
        <p class="card-text">{{ playlist.Description }}...</p>

        <router-link :to="to" class="card-link" v-if="!showDelete">Open</router-link>
        <a href="#" v-on:click.prevent="deletePromptShow" class="card-link" v-if="!showDelete">Delete</a>

        <span v-if="showDelete">Are you sure?</span>
        <a href="#" v-on:click.prevent="deletePromptHide" class="card-link" v-if="showDelete">No</a>
        <a href="#" v-on:click.prevent="deleteConfirm" class="card-link" v-if="showDelete">Yes</a>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '@/services/API';

  export default {
    name: 'PlaylistCard',
    data() {
      return {
        showDelete: false,
      };
    },
    created() {
      this.to = {
        path: '/playlist/view/' + this.playlist._id,
      };
    },
    methods: {
      deletePromptShow() {
        this.showDelete = true;
      },
      deletePromptHide() {
        this.showDelete = false;
      },
      deleteConfirm() {
        API.deletePlaylist(this.playlist._id).then((response) => {
          this.$emit('dashboard-reload');
        }).catch((err) => {
          this.showDelete = false;
          console.log(err);
        });
      },
    },
    props: {
      playlist: {
        type: Object,
        default: null,
      },
    },
  };
</script>

<style scoped>

</style>
