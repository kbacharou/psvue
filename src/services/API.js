import axios from '@/http';

class API {
  constructor(axios) {
    this.axios = axios;
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
    this.axios.defaults.headers.Authorization = 'Bearer ' + accessToken;
  }

  whoAmI() {
    return this.axios.get('/v1/user/whoami');
  }

  getApiBaseUrl() {
    if (this.axios.defaults.baseURL.endsWith('/')) {
      return this.axios.defaults.baseURL.slice(0, -1);
    } else {
      return this.axios.defaults.baseURL;
    }
  }

  login(username, password) {
    return this.axios.post('/v1/auth/login', {
      username: username,
      password: password,
    });
  }

  getAllPlaylists() {
    return this.axios.get('/v1/playlist/all');
  }

  getFullPlaylist(playlistId) {
    return this.axios.get(`/v1/playlist/full/${playlistId}`);
  }

  deletePlaylist(playlistId) {
    return this.axios.get(`/v1/playlist/delete/${playlistId}`);
  }

  setItemPlayed(itemId) {
    return this.axios.get(`/v1/item/set_played/${itemId}/1`);
  }

  importPlaylist(formData) {
    // Large timeout because processing could take a long time
    return this.axios.post(
      '/v1/playlist/import',
      formData,
      {'timeout': 86400000}
    );
  }

  searchItems(query) {
    return this.axios.post('/v1/item/search', {query: query});
  }

  getSettings() {
    return this.axios.get('/v1/user/settings');
  }

  setSettings(settings) {
    return this.axios.post('/v1/user/settings', settings);
  }
}

export default new API(axios);
