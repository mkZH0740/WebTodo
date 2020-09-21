<template>
  <div style="height: 95vh; vertical-align: center">
    <div id="verify-panel">
      <h1>
        登录
      </h1>
      <div id="panel">
        <el-form ref="form" :model="form" label-width="50px">
          <el-form-item label="群号">
            <el-input maxlength="20" v-model="form.group_id"></el-input>
          </el-form-item>
          <el-form-item label="QQ号">
            <el-input maxlength="20" v-model="form.user_id"></el-input>
          </el-form-item>
          <el-form-item label="密钥">
            <el-input v-model="form.key"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" :disabled="!canGetKey()" @click="getKey()">获取密钥</el-button>
        <el-button type="primary" :disabled="!canLogin()" @click="login()">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: "Login",
  data () {
    return {
      form: {
        group_id: '',
        user_id: '',
        key: ''
      }
    }
  },
  methods: {
    canGetKey () {
      let isValid = this.form.group_id.length > 0 && this.form.user_id.length > 0
      if (isValid) {
        let numberReg = /^[0-9]*$/
        isValid = isValid && numberReg.test(this.form.group_id) && numberReg.test(this.form.user_id)
      }
      return isValid
    },
    canLogin () {
      return this.canGetKey() && this.form.key.length > 0
    },
    getKey () {
      Axios.get(`http://localhost:8000/fetchkey?group_id=${this.form.group_id}&user_id=${this.form.user_id}`)
    },
    login () {
      Axios.get(`http://localhost:8000/verify?user_id=${this.form.user_id}&key=${this.form.key}`).then(res => {
        if (res.data.valid) {
          this.$router.replace('/home')
        }else{
          alert("密码错误！请重试！")
        }
      })
    }
  }
}
</script>

<style scoped>
  #verify-panel {
    width: 40%;
    height: 50%;
    margin: auto;
  }

  h1 {
    text-align: center;
    margin: auto auto 5%;
  }

  #panel {
    padding: 5px;

    border-color: black;
    border-style: solid;
    border-width: 1px;
    border-radius: 4px;

    text-align: center;
  }
</style>