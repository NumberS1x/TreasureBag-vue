<template id="iconRow">
  <div class="icon-row" style="display: flex">
    <div class="icon" @click="goToPage1">
      <!-- 第一个图标 -->
      <h4>秒杀系统</h4>
      <img style="margin-top: 6px;width: 300px" src="../assets/seckill.jpg" alt="Icon 1">
    </div>
    <div class="icon" @click="goToPage2">
      <!-- 第二个图标 -->
      <!-- 可以在这里添加您的图标图片或使用字体图标 -->
      <h4>日志</h4>
      <img style="margin-top: 6px;width: 300px" src="../assets/logs.png" alt="Icon 2">
    </div>

<!--    <div class="icon" @click="goToPage3">-->
<!--      &lt;!&ndash; 第三个图标 &ndash;&gt;-->
<!--      &lt;!&ndash; 可以在这里添加您的图标图片或使用字体图标 &ndash;&gt;-->
<!--      <img src="icon3.png" alt="Icon 3">-->
<!--    </div>-->

<!--    <div class="icon" @click="goToPage4">-->
<!--      &lt;!&ndash; 第四个图标 &ndash;&gt;-->
<!--      &lt;!&ndash; 可以在这里添加您的图标图片或使用字体图标 &ndash;&gt;-->
<!--      <img src="icon4.png" alt="Icon 4">-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    // 定义点击图标时跳转到相应页面的方法
    goToPage1() {
      // 在这里添加跳转逻辑，比如使用 Vue Router 跳转到相应页面
      this.$router.push('/goods/list')
    },
    goToPage2() {
      // 在这里添加跳转逻辑，比如使用 Vue Router 跳转到相应页面
      this.$router.push('/logs')
    },
    goToPage3() {
      // 在这里添加跳转逻辑，比如使用 Vue Router 跳转到相应页面
      console.log('Go to Page 3');
    },
    goToPage4() {
      // 在这里添加跳转逻辑，比如使用 Vue Router 跳转到相应页面
      console.log('Go to Page 4');
    }
  }
}
</script>

<style scoped>
/* 样式可以根据您的需要进行调整 */
.icon-row {
  display: flex;
}

.icon {
  margin: 20px 20px 20px 20px;
  width: 33%; /* 三分之一宽度 */
  text-align: center; /* 图标居中 */
  cursor: pointer; /* 鼠标悬停样式 */
  background-color: #8fc0e8;
}



</style>
