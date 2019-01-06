<template>
  <div class="wrapper-gnb">
      <div class="title-msg">{{ msg }}</div>
      <transition name="gnb-animation"  mode="out-in" appear>
        <div class="login-box" v-if="!loginState">
            <button class="btn-login" @click="signIn()">Login</button>
        </div>
        
        <div class="login-box"  v-if="loginState" @click="UserInfoModalToggle">
            <div class="user-name">
                {{ user.displayName }} 
            </div>
            <div class="user-photo">
                <img :src="user.photoURL">
            </div>
            <transition name="gnb-animation"  mode="out-in" appear>
                <UserInfoModal v-if="UserInfoModalState"/>
            </transition>
        </div>
      </transition>
  </div>
</template>

<script>
import firebase from 'firebase';
import UserInfoModal from './UserInfoModal'

export default {
    data() {
        return {
            msg: 'LIVE Q&A',
            UserInfoModalState: false,
        }
    },
    computed: {
        user() {
            return this.$store.state.userInfo
        },
        loginState() {
            return this.$store.auth.state
        }
    },
    beforeCreate() {
        this.$store.authStore.dispatch('checkLogin')
    },
    methods: {
        UserInfoModalToggle() {
            this.UserInfoModalState = !this.UserInfoModalState
        },
        signIn() {
            this.$store.authStore.dispatch('login')
        },
    },
    components: {
        UserInfoModal: UserInfoModal
    },
}
</script>

<style lang="scss" scoped>
.wrapper-gnb {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.08);
    padding: 0px 24px;
    .title-msg {
        font-family: 'Roboto';
        font-size: 18px;
        font-weight: 100;
    }

    .login-box {
        position: absolute;
        right: 24px;
        display: flex;
        align-items: center;
        .btn-login {
            font-size: 14px;
            color: #3284E6;
        }
        .user-name {
            margin-right: 10px;
            font-size: 12px;
            color: #aaa;
        }
        .user-photo {
            width: 36px;
            height: 36px;
            border-radius: 36px;
            overflow:hidden;
            img {
                width: 100%;
            }
        }
    }
}




</style>
