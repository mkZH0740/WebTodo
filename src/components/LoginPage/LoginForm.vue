<template>
  <div id="login-panel">
    <el-form ref="form" :model="loginForm" label-width="80px">
      <el-form-item label="群号">
        <el-input v-model="loginForm.groupId" maxlength="12"></el-input>
      </el-form-item>
      <el-form-item label="QQ号">
        <el-input v-model="loginForm.userId" maxlength="12"></el-input>
      </el-form-item>
      <el-form-item label="密钥">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="!canVerify()" @click="getVerifyKey">获取密钥</el-button>
        <el-button type="primary" :disabled="!canLogin()" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Axios from 'axios'
import { Notification } from 'element-ui'

export default {
  name: "LoginForm",
  data () {
    return {
      loginForm: {
        groupId: '',
        userId: '',
        password: ''
      }
    }
  },
  methods: {
    canVerify () {
      let numberVerifier = /^[0-9]*$/
      if (this.loginForm.groupId.length > 0 && this.loginForm.userId.length > 0){
        return numberVerifier.test(this.loginForm.groupId) && numberVerifier.test(this.loginForm.userId)
      }
      return false
    },
    canLogin () {
      if (this.canVerify){
        return this.loginForm.password.length > 0
      }
      return false
    },
    getVerifyKey () {
      Axios.post(`${this.$store.state.serverIP}/getKey`, this.loginForm).then(res => {
        if (res.data.status) {
          Notification.success({
            title: '成功',
            message: '密钥已经发送'
          })
        }else {
          Notification.error({
            title: '错误',
            message: '密钥请求失败！'
          })
        }
      }).catch(() => {
        Notification.error({
          title: '错误',
          message: '网络错误，密钥请求失败！'
        })
      })
    },
    login () {
      Axios.post(`${this.$store.state.serverIP}/login`, this.loginForm).then(res => {
        if (res.data.status) {
          this.$store.commit('setLoggedIn')
          this.$store.commit('setUserInfo', { userId: this.loginForm.userId, groupId: this.loginForm.groupId})
          this.$router.replace('/task')
        }else{
          Notification.error({
            title: '错误',
            message: '登陆失败：用户或密钥错误！'
          })
        }
      }).catch(() => {
        Notification.error({
          title: '错误',
          message: '登陆失败：网络错误！'
        })
      })
    }
  }
}
</script>

<style scoped>
  #login-panel {
    margin: 25px;
  }
</style>