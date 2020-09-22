import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios";
import {Notification} from "element-ui";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverIP: 'http://localhost:8000',
    loggedIn: true,
    userInfo: {
      userId: '',
      groupId: ''
    },
    tasks: [],
    currentTaskIndex: 0
  },
  mutations: {
    setLoggedIn (state) {
      state.loggedIn = true
    },
    setUserInfo (state, payload) {
      state.userInfo.userId = payload.userId
      state.userInfo.groupId = payload.groupId
    },
    addTask (state, tasks) {
      state.tasks = state.tasks.concat(tasks)
    },
    setCurrentTaskIndex (state, index) {
      state.currentTaskIndex = index
    }
  },
  actions: {
    getTasks (context) {
      Axios.get(`${context.state.serverIP}/tasks?group_id=${context.state.userInfo.groupId}`).then(res => {
        if (res.data.status) {
          context.commit('addTask', res.data.tasks)
        }
      }).catch(() => {
        Notification.error({
          title: '错误！',
          message: '网络错误，获取文件内容失败'
        })
      })
    }
  },
  modules: {
  }
})
