<template>
  <div class="seckill_content">
    <div class="top" style="text-align: center">
      <span v-if="user === null"> 您还没有登录，请登陆后再操作</span>
      <span v-if="user !== null"> 欢迎您 {{ user.realName }}</span>
      <span>没有收货地址的提示。。。</span>
    </div>
    <div class="goods">
      <div class="containers">
        <div class="goods_view">
          <img :src="require(`@/assets${goods.goodsImg}`)" width="400" />
        </div>
        <div class="goods_info">
          <h2>{{ goods.goodsName }}</h2>
          <p class="title">{{ goods.goodsTitle }}</p>
          <p>
            <span class="price1">{{ goods.seckilPrice }} 元 </span>
            <del><span class="price2">{{ goods.goodsPrice }} 元</span></del>
          </p>
          <div class="seckill_data">
            <div>
              <span>秒杀开始时间</span>
              <p>{{ formatDate(goods.startDate) }}</p>
            </div>
            <div>
              <span>秒杀结束时间</span>
              <p>{{ formatDate(goods.endDate) }}</p>
            </div>
          </div>
          <div class="seckillStatus">
            <input type="hidden" v-model="remainSeconds" />
            <span v-if="seckillStatus === 0">秒杀倒计时：<span id="countDown">{{ remainSeconds }}</span>秒</span>
            <span v-if="seckillStatus === 1">秒杀进行中</span>
            <span v-if="seckillStatus === 2">秒杀已结束</span>
          </div>
          <div class="count">
            <span style="border: 1px solid #111010; /* 添加边框样式 */">库存数量：</span>
            <span>{{ goods.stockCount }}</span>
          </div>
          <form id="miaoshaForm" @submit.prevent="seckill">
            <button class="btn btn-primary btn-block" type="submit" :disabled="seckillStatus !== 0" @click="getSeckillPath()">立即秒杀</button>
            <input type="hidden" name="goodsId" :value="goods.id" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "GoodsDetail",
  data() {
    return {
      form:{
        userId: '',
        goodsId: ''
      },
      user: {
        realName: ''
      },
      goods: {},
      remainSeconds: 0,
      seckillStatus: 0,
    };
  },
  methods: {
    getSeckillPath(){
      const userId = this.user.id;
      const goodsId = this.goods.id;
      request.get(`/seckill/path?userId=${userId}&goodsId=${goodsId}`).then(res => {
        const response = res
        console.log(response)
        console.log(response.code)
        if (response.code === 0){
          this.path = response.data
          console.log("获取到了path:" + this.path)
          this.doMiaosha(this.path);
        }else{
          console.log("获取路径失败！")
        }
      })
    },
    doMiaosha(path){
      const userId = this.user.id;
      const goodsId = this.goods.id;
      console.log(path)
      request.post(`/seckill/'${path}'/seckill?userId=${userId}&goodsId=${goodsId}`).then(res => {
        const response = res
        console.log(response)
        if (response.code === 0){
          alert("秒杀成功！获取秒杀订单！")
          this.getMiaoshaResult(goodsId)
        }else if (response.code === 401){
          alert(response.msg)
        }else if (response.code === 1){
          alert(response.msg)
          this.getMiaoshaResult(goodsId);
        }
      })
    },
    getMiaoshaResult(goodsId){
      const userId = this.user.id;
      request.get(`/seckill/result?userId=${userId}&goodsId=${goodsId}`).then(res => {
        const response = res
        if (response.code === 0){
          alert("进入订单页面！")
          alert(response.data)
          const orderId = response.data
          this.$router.push('/order/detail/'+orderId)
        }else{
          alert(response.msg)
        }
      })
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getFullYear()}-${this.padZero(date.getMonth() + 1)}-${this.padZero(date.getDate())} ${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}:${this.padZero(date.getSeconds())}`;
    },
    padZero(num) {
      return num < 10 ? "0" + num : num;
    },
    getGoodsDetail() {
      request.get("/goods/detail/"+this.$route.params.id).then((res) => {
        this.goods = res.data;
        this.cutDown();
      });
    },
    cutDown(){
      var startTime = this.formatDate(this.goods.startDate)
      var endTime = this.formatDate(this.goods.endDate)
      const nowTime = this.formatDate(new Date().getTime());
      if (nowTime < endTime){
        this.seckillStatus = 0;
      }else{
        this.seckillStatus = 2;
      }
    }
  },
  mounted() {
    const userString = sessionStorage.getItem('user') // Set the user data if needed
    this.user = JSON.parse(userString.toString())
    this.getGoodsDetail();
  },
};
</script>

<style scoped>
.seckill_content {
  width: 100%;
  min-width: 800px;
}

.containers{
  width: 1000px;
  margin: 0 auto;
  min-height: 560px;
  border: 1px solid #111010; /* 添加边框样式 */
}
.containers .goods_view{
  width: 500px;
  float: left;
}
.containers .goods_info{
  width: 450px;
  float: left;
  padding-left: 15px;
}

.price2 {
  color: #999; /* 将文字颜色设置为灰色 */
  text-decoration: line-through; /* 添加中间的划线 */
}

.price1 {
  color: #efa21c;
}
</style>
