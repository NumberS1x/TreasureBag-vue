<template>
  <div class="login-container">
    <div style="width: 400px;margin: 150px auto">
      <div style="color:#cccccc; font-size:  35px; text-align: center; margin-bottom: 20px;color: #0f9aee">欢迎来到百宝箱</div>
      <el-form ref="form" :model="form" size="normal">
        <el-form-item>
          <el-input ref="username" prefix-icon="el-icon-user-solid" v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input ref="password" prefix-icon="el-icon-lock" v-model="form.password" show-password></el-input>
          <span class="show-pwd" @click="showPwd" @keyup.native="checkCapslock">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button style="width: 40%" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Login",
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      form: {
        'userName': '',
        'password': ''
      },
      passwordType: 'password',
      capsTooltip: false,
      otherQuery: {},
      redirect: undefined,
    }
  },
  mounted() {
    if (this.form.userName === '') {
      this.$refs.username.focus()
    } else if (this.form.password === '') {
      this.$refs.password.focus()
    }
    sessionStorage.removeItem('user')
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    login(){
      request.post('/users/login',this.form).then(res => {
        if (res.data.code === '0'){
          alert("登录失败")
          console.log('登录失败，请重新登录!')
        }else{
          alert("登录成功")
          sessionStorage.setItem('user',JSON.stringify(res.data))
          sessionStorage.setItem('Admin-Token',res.data.token)
          this.$router.push('/')
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style>
.login-container {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/scenery-bg9.jpg");
  background-size: cover; /* 控制图片如何适应容器大小 */
  background-position: center center; /* 控制图片在容器中的位置 */
  overflow: hidden;
}

body{
  margin:0;
  padding:0;
}
</style>
