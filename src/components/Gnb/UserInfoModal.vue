<template>
  <div class="user-info-modal">
    <button class="btn-logout" @click="signOut">
      Logout
    </button>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  methods: {
    signOut() {
      this.$store.dispatch('logout')
    },
  }
}
</script>

<style lang="scss" scoped>
.user-info-modal {
  position: fixed;
  top: 60px;
  right: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.08);
  padding: 16px 24px;
  .btn-logout {
    font-size: 16px;
    color: #ff7784;
  }
}
</style>
