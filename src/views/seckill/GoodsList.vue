<template>
  <div class="seckill_content">
    <div class="title" style="text-align: center"><h2>秒杀商品列表</h2></div>
    <div class="all_seckill_goods">
      <div class="seckill_goods" v-for="goods in goodsList" :key="goods.id">
        <h4 style="text-align: center;font-size: x-large">{{ goods.goodsName }}</h4>
        <img :src="require(`@/assets${goods.goodsImg}`)" width="250" />
        <br/><br/>
        <p style="text-align: center;color: #666;font-size: 16px">{{ goods.goodsTitle }}</p>
        <div class="seckill_price">
          <p>
            <span class="price1">{{ goods.seckilPrice }} 元 </span>
            <del><span class="price2">{{ goods.goodsPrice }} 元</span></del>
          </p>
          <router-link :to="'/goods/to_detail/' + goods.id">
            <button class="btn btn-default" type="submit">进入详情页...</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import request from "@/utils/request";

export default {
  name: "GoodsList",
  data() {
    return {
      goodsList: [],
    }
  },
  methods: {
    getGoodsList(){
      request.get('/goods/list').then(res => {
        this.goodsList = res.data
      })
    }
  },
  mounted() {
    this.getGoodsList();
  }
}
</script>

<style scoped>
.seckill_content {
  width: 100%;
  min-width: 800px;
  text-align: center;
}
.seckill_goods {
  flex: 1;
  border: 1px solid #111010; /* 添加边框样式 */
  padding: 10px; /* 可选：添加一些内边距，使边框与内容之间有一定的间距 */
}

.all_seckill_goods{
  display: flex;
}


.price2 {
  color: #999; /* 将文字颜色设置为灰色 */
  text-decoration: line-through; /* 添加中间的划线 */
}

.price1 {
  color: #efa21c;
}
</style>
