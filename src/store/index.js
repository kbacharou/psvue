import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    token: '',
  },
  getters: {
    getVoice: state => state.user ? state.user.Voice : '',
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    setToken: (state, token) => {
      state.token = token;
    },
  },
});

export default store;
