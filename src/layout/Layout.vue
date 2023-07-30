<template>
  <div>
    <!--头部-->
    <Header/>
    <!--    主体-->
    <div style="display: flex">
      <div style="width: 10%;background-color: #0f9aee"></div>
      <!--      内容区域-->
      <router-view style="flex:1;"/>
      <div style="width: 10%;background-color: #0f9aee"></div>
    </div>
  </div>
</template>

<script>

import Header from "@/components/Header";

export default {
  name: "Layout",
  components: {
    Header,
  }
}


</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  height: 100%; /* 设置 body 高度为 100% */
}
html {
  height: 100%; /* 设置 html 高度为 100% */
}
</style>
