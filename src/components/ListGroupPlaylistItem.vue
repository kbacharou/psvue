<template>
  <a href="javascript:void(0);" v-on:click.stop="play" class="list-group-item list-group-item-action" v-bind:class="{ active: item.isActive }">
    <label class="custom-control custom-checkbox playlist-checkbox" v-on:click="play">
      <input type="checkbox" class="custom-control-input">
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description">&nbsp;</span>
    </label>
    <span class="badge" v-bind:class="{ 'badge-primary': !item.isActive, 'badge-secondary': item.isActive }">{{ index + 1 }}</span>
    {{ item.Value }}
  </a>
</template>

<script>
  import {psplayer} from '@/psplayer';

  export default {
    name: 'ListGroupPlaylistItem',
    props: {
      item: {
        type: Object,
        default: null,
      },
      index: {
        type: Number,
        default: 0,
      },
    },
    methods: {
      play() {
        psplayer.play(this.item);
      },
    },
  };
</script>

<style scoped>

</style>
