export default {
    checkLogin() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          store.commit({
            type: 'setLoginState',
            userInfo: user,
            loginState: true,
          })
        } else {
          store.commit({
            type: 'setLoginState',
            loginState: false,
          })
        }
      })
    },
    login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/plus.login')
      firebase.auth().signInWithRedirect(provider).then((result) => {
        store.dispatch('checkLogin')
      }).catch(err => console.log(err))
    },
    logout() {
      firebase.auth().signOut().then(() => {
        this.user = null;
        this.$store.state.login = false;
      }).catch(err => console.log(err))
    }
};
