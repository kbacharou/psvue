<template>
  <form class="form-signin">
    <h2 class="form-signin-heading">Please, sign in.</h2>
    <label for="inputUsername" class="sr-only">Username</label>
    <input type="text" v-model="username" id="inputUsername" name="username" class="form-control" placeholder="Username" required autofocus>
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" v-model="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required>
    <button v-on:click="signIn" v-on:keyup.enter="signIn" class="btn btn-lg btn-primary btn-block" type="button">Sign in</button>
  </form>
</template>

<script>
  import API from '@/services/API';

  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      signIn: function() {
        API.login(this.username, this.password).then((response) => {
          if (response.data.token) {
            this.$store.commit('setToken', response.data.token);
            this.$emit('authorized');
          }
        }).catch((error) => {
          this.$store.commit('setToken', '');
          console.log(error);
        });

        return false;
      },
    },
  };
</script>

<style scoped>
  body {
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #eee;
  }

  .form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
  .form-signin .form-signin-heading,
  .form-signin .checkbox {
    margin-bottom: 10px;
  }
  .form-signin .checkbox {
    font-weight: normal;
  }
  .form-signin .form-control {
    position: relative;
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
