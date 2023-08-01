<template>
  <div>
    <div class="top">
      <h4 style="text-align: center">订单详情页</h4>
    </div>
    <div class="goods">
      <div class="containers" style="display: flex">
        <div class="goods_view">
          <img :src="require(`@/assets${seckillOrder.goodsImg}`)" width="500" />
        </div>
        <div class="goods_info">
          <h2>{{ seckillOrder.goodsName }}</h2>
          <p>
            <span class="price1" style="color: #efa21c">{{ seckillOrder.goodsPrice }}</span>
          </p>
          <div class="seckill_data">
            <div>
              <span>下单时间</span>
              <p>{{ formatDate(seckillOrder.createDate) }}</p>
            </div>
            <div>
              <span>订单状态</span>
              <p>{{ orderStatus }}</p>
            </div>
          </div>
          <div class="count">
            <span>收货人：</span>
            <span>XXX 1383838483</span>
          </div>
          <div class="count">
            <span>收货地址：</span>
            <span>北京市昌平区回龙观龙博一区</span>
          </div>
          <button class="btn btn-primary btn-block" type="submit" @click="payNow">立即支付</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      seckillOrder: {},
      orderStatus: '',
      createTime: '',
    };
  },
  mounted() {
    this.getOrderDetail();
  },
  methods: {
    getOrderDetail() {
      const orderId = this.$route.params.orderId
      request.get(`/order/detail?orderId=${orderId}`).then(res => {
        const response = res
        if (response.code === 0){
          this.seckillOrder = response.data
          this.orderStatus = this.getOrderStatus(0);
          this.createTime = this.formatDate(this.seckillOrder.createDate)
        }else{
          alert(response.msg)
          window.location.href = "/login"
        }
      })
    },
    cutDown(){
      this.createTime = this.formatDate(this.seckillOrder.createDate)
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getFullYear()}-${this.padZero(date.getMonth() + 1)}-${this.padZero(date.getDate())} ${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}:${this.padZero(date.getSeconds())}`;
    },
    getOrderStatus(status) {
      // Implement your order status logic here
      return status === 0 ? "未支付" : "待发货";
    },
    payNow() {
      // Implement the logic to initiate payment
      alert("Payment initiated!");
    },
    padZero(num) {
      return num < 10 ? "0" + num : num;
    },
  },
};
</script>

<style>

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
</style>
