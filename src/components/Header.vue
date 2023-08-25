<template>
  <div class="container">
    <div class="header">
      <div class="Mylogo">
        <img src="../assets/MyLogo.jpg" alt="Logo" />
      </div>
      <div class="WebLogo">
        <p>百宝箱的logo</p>
      </div>
      <div class="user-info">
        <el-dropdown>
        <span class="el-dropdown-link">
          用户名
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="nav" style="text-align: center;color: white;background-color: #0f9aee">
      <h1 style="padding-top: 15px">欢迎来到百宝箱</h1>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Header",

  methods: {
    logout() {
      // 实现退出登录逻辑
      // 跳转到登录页面
      this.$router.push('/login');
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
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
}

.Mylogo {
  margin-left: 100px;
  padding-left: 20px;
}

.Mylogo img {
  height: 84px;
  width: 233px;
}

.user-info {
  padding-right: 20px;
}
.nav{
  height: 75px;
}

</style>
