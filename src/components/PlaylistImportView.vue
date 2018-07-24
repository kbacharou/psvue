<template>
  <div>
    <dashboard-menu v-bind:items="menuItems"></dashboard-menu>
    <spinner v-if="uploading"></spinner>
    <form class="import-form" enctype="multipart/form-data" v-if="!uploading">
      <div class="form-group">
        <label for="txtFileInput">Choose your txt file</label>
        <input type="file" class="form-control-file" id="txtFileInput">
      </div>
      <button type="button" class="btn btn-primary" v-on:click="upload">Import</button>
    </form>
  </div>
</template>

<script>
  import API from '@/services/API';
  import Preloader from './Preloader';
  import InlineMenu from './InlineMenu';
  import generateMainMenu from '@/mainmenu';

  const getFormData = function() {
    const data = new FormData();
    data.append('file', document.getElementById('txtFileInput').files[0]);

    return data;
  };

  export default {
    name: 'PlaylistImportView',
    data() {
      return {
        uploading: false,
        menuItems: generateMainMenu('import'),
      };
    },
    methods: {
      upload() {
        this.uploading = true;
        const data = getFormData();
        API.importPlaylist(data).then((response) => {
          this.$router.replace('/');
          this.uploading = false;
        }).catch((reason) => {
          console.log(reason);
          this.$router.replace('/');
        });
      },
    },
    components: {
      'spinner': Preloader,
      'dashboard-menu': InlineMenu,
    },
  };
</script>

<style scoped>
  .import-form {
    margin-top: 10px;
  }
</style>
