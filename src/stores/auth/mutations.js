export default {
  setLoginState(state, payload) {
    state.loginState = payload.loginState
    if (payload.userInfo == undefined) {
    } else {
        state.userInfo = payload.userInfo
    }
  }
};
