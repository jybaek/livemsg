<template>
  <div class="wrapper-gnb">
      <div class="title-msg">{{ msg }}</div>
      <div class="login-box" v-if="!this.$store.state.login">
          <button @click="signIn()">login</button>
      </div>
      <div class="login-box"  v-if="this.$store.state.login">
          <div>
              {{ user.displayName }}
          </div>
          <div class="user-photo">
              <img :src="user.photoURL">
          </div>
          <button @click="signOut()">logout</button>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import { store } from '../stores/index'
export default {
    data() {
        return {
            msg: 'LIVE Q&A',
            user: '',
        }
    },
    beforeCreate: function() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
          this.$store.state.login = true;
        }
      })
    },
    methods: {
      signIn() {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider).then((result) => {
          this.user = result.user;
          this.$store.state.login = true;
        }).catch(err => console.log(err))
      },
      signOut() {
        firebase.auth().signOut().then(() => {
          this.user = null;
          this.$store.state.login = false;
        }).catch(err => console.log(err))
      },
    }
}
</script>

<style lang="scss" scoped>
  @import 'gnb.scss';
</style>
