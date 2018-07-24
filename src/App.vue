<template>
  <div class="container" id="vue-app">
    <h3 class="text-muted" id="app-name"><router-link :to="'/'">PSLight</router-link></h3>

    <component v-bind:is="currentView" v-on:authorized="reload"></component>

    <!-- Site footer -->
    <footer class="footer">
      <p>&copy; PSLight 2017</p>
    </footer>

  </div> <!-- /container -->
</template>

<script>
  import Login from '@/components/Login';
  import Preloader from '@/components/Preloader';
  import API from '@/services/API';

  export default {
    name: 'app',
    data() {
      return {
        currentView: 'spinner',
      };
    },
    created() {
      this.reload();
    },
    methods: {
      reload() {
        if (this.$store.state.token) {
          API.setAccessToken(this.$store.state.token);
          API.whoAmI().then((response) => {
            this.currentView = 'router-view';
            this.$store.commit('setUser', response.data);
          }).catch((e) => {
            this.currentView = 'login-view';
            // Token is invalid
            this.$store.commit('setToken', '');
            this.$store.commit('setUser', null);
          });
        } else {
          this.currentView = 'login-view';
        }
      },
    },
    components: {
      'login-view': Login,
      'spinner': Preloader,
    },
  };
</script>

<style>
  body {
    padding-top: 0;
  }

  .footer {
    padding-top: 40px;
    padding-bottom: 40px;
    margin-top: 40px;
    border-top: 1px solid #eee;
  }

  /* Main marketing message and sign up button */
  .jumbotron {
    text-align: center;
    background-color: transparent;
  }
  .jumbotron .btn {
    padding: 14px 24px;
    font-size: 21px;
  }

  .navbar {
    background-image: -webkit-gradient(linear, left top, left bottom, from(#f7f7f7),to(#eee));
    background-image: -webkit-linear-gradient(top, #f7f7f7 0%,#eee 100%);
    background-image: -o-linear-gradient(top, #f7f7f7 0%,#eee 100%);
    background-image: linear-gradient(to bottom, #f7f7f7 0%,#eee 100%);
    border: 1px solid #e5e5e5;
  }

  @media (min-width: 768px) {
    .navbar-nav {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
    }

    .navbar-nav .nav-item {
      -webkit-box-flex: 1;
      -webkit-flex: 1 0 auto;
      -ms-flex: 1 0 auto;
      flex: 1 0 auto;
    }
  }

  /* Responsive: Portrait tablets and up */
  @media screen and (min-width: 768px) {
    /* Remove the padding we set earlier */
    .masthead,
    .marketing,
    .footer {
      padding-right: 0;
      padding-left: 0;
    }
  }

  #vue-app {
    margin-top: 20px;
  }

  #pslight-bar {
    display: none;
  }

  #app-name {
    margin-bottom: 20px;
  }

  .playlist-checkbox {
    padding-left: 0;
  }
</style>
