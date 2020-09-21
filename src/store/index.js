import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverIP: 'http://localhost:8000',
    loggedIn: false,
    userInfo: {
      userId: '',
      groupId: ''
    }
  },
  mutations: {
    setLoggedIn (state) {
      state.loggedIn = true
    },
    setUserInfo (state, payload) {
      state.userInfo.userId = payload.userId
      state.userInfo.groupId = payload.groupId
    }
  },
  actions: {
  },
  modules: {
  }
})
