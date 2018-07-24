const filtersPlaylistsMixin = {
  data() {
    return {
      originalPlaylistItems: [],
      playlistItems: [],
      menuItems: {},
    };
  },
  methods: {
    handleFilterRoute(next, prev) {
      const prevFilter = prev.params.filter ? prev.params.filter : 'all';
      const nextFilter = next.params.filter ? next.params.filter : 'all';

      this.menuItems[prevFilter].isActive = false;
      this.menuItems[nextFilter].isActive = false;

      this.applyFilter(nextFilter);
    },
    applyFilter(filter) {
      let filteredPlaylist = [];

      if (filter === 'all') {
        filteredPlaylist = this.originalPlaylistItems;
      } else if (filter === 'played') {
        filteredPlaylist = this.originalPlaylistItems.filter(
          (item) => item.IsPlayed
        );
      } else if (filter === 'not_played') {
        filteredPlaylist = this.originalPlaylistItems.filter(
          (item) => !item.IsPlayed
        );
      }

      this.playlistItems = filteredPlaylist;
    },
  },
};

export default filtersPlaylistsMixin;
