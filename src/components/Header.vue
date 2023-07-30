<template>
  <div class="header">
    <div class="welcome">欢迎来到</div>
    <div class="logo">百宝袋</div>
    <div class="user-info">
      <el-dropdown>
        <span class="el-dropdown-link">
          用户
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="$router.push('/login')">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button @click='getMessage'>跳转呀</el-button>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Header",

  methods:{
    getMessage(){
      request.get('/users/getMessage').then( res =>{
        this.$router.push('/qwe')
      })
    }
  }
};
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.header {
  height: 145px;
  line-height: 140px; /* 垂直居中 */
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between; /* 标题和用户信息分散对齐 */
  background-image: url('../assets/header.jpg');
}

.welcome {
  font-size: 20px;
  padding-left: 30px; /* 左侧空白 */
}

.logo {
  font-size: 30px;
  font-weight: bold;
}

.user-info {
  padding-right: 30px; /* 右侧空白 */
}

</style>
