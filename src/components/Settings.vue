<template>
  <div>
    <dashboard-menu v-bind:items="menuItems"></dashboard-menu>
    <spinner v-if="loading"></spinner>
    <div class="alert alert-success" role="alert" v-if="!loading && success">
      Settings have been saved.
    </div>
    <form v-if="!loading" v-on:submit.prevent="saveSettings" class="settings-form">
      <div class="form-group">
        <label for="selectVoice">Voice</label>
        <select class="form-control" id="selectVoice" v-model="selectedVoice" size>
          <option v-for="voice in voices" v-bind:value="voice.Id">[{{ voice.LanguageName }}] {{ voice.Name }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script>
  import API from '@/services/API';
  import Preloader from './Preloader';
  import InlineMenu from './InlineMenu';
  import generateMainMenu from '@/mainmenu';

  const voiceSorter = (a, b) => {
    const aName = '[' + a.LanguageName + '] ' + a.Name;
    const bName = '[' + b.LanguageName + '] ' + b.Name;

    if (aName < bName) {
      return -1;
    }

    if (aName > bName) {
      return 1;
    }

    return 0;
  };

  export default {
    name: 'Settings',
    data() {
      return {
        loading: false,
        settings: null,
        error: null,
        voices: null,
        selectedVoice: '',
        success: false,
        menuItems: generateMainMenu('settings'),
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
        this.error = null;
        this.loading = true;
        this.success = false;

        API.getSettings().then((response) => {
          this.settings = response.data.settings;
          this.selectedVoice = this.settings.Voice;
          this.voices = response.data.voices;
          this.voices.sort(voiceSorter);
          this.loading = false;
        }).catch((error) => {
          this.error = error;
          this.loading = false;
        });
      },
      saveSettings() {
        API.setSettings({voice: this.selectedVoice}).then((response) => {
          const user = this.$store.state.user;
          user['Voice'] = this.selectedVoice;
          this.$store.commit('setUser', user);
          this.success = true;
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
  .settings-form {
    margin-top: 10px;
  }
</style>
