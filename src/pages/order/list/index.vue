<template>
    <section class="order-list">
         <div class="tab-header-con">
            <div class="tab-item" :class="{'tab-item-selected': tabSelect == 0}" @click="tabChange(0)">全部</div>
            <div class="tab-item" :class="{'tab-item-selected': tabSelect == 1}" @click="tabChange(1)">我买的券</div>
            <div class="tab-item" :class="{'tab-item-selected': tabSelect == 2}" @click="tabChange(2)">我买的单</div>
        </div>
        <div class="placeholder"></div>

        <div class="tab-con" v-show="tabSelect == 0">
            <div class="no-data" v-if="orderListAll.length <= 0">
                <div class="img-con">
                    <img src="../../../common/img/icon_no_data.png" mode="widthFix">
                    <div class="mask"></div>
                </div>
                <text>暂无订单</text>
            </div>
            <!-- 第一个 -->
            <div class="order-list">
                <div class="order-item" v-for="(v, index) in orderListAll" :key="index" @click="jump2Detail(v.order_type, v.order_id)">
                    <!-- 订单列表 -->
                    <div class="order-item-header">
                        <div class="order-item-header-left">
                            <div class="outter">
                                <img :src="v.logo_img" class="shop-img" mode="aspectFill">
                            </div>
                            <tetx>{{v.shop_name}}</tetx>
                        </div>
                        <text>{{v.statusText}}</text>
                    </div>
                    <div v-if="v.order_type != 4">
                        <div class="order-item-content">
                            <img :src="v.coupon_img" mode="aspectFill" class="goods-img">
                            <div class="goods-info">
                                <div class="goods-title">{{v.coupon_name}}</div>
                                <div class="price">
                                    <text>￥{{v.coupon_price}}</text>
                                    <text>x{{v.num}}</text>
                                </div>
                            </div>
                        </div>
                        <div class="order-item-footer">
                            <div class="price-con">
                                <text>共{{v.num}}件</text>  <div class="price">合计: <text>￥{{v.total_price}}</text></div>
                            </div>
                            <div class="time-con">
                                {{v.createtime}}  <div v-if="v.order_status == 1" class="btn-use">去使用</div>
                            </div>
                        </div>
                    </div>
                    <!-- 订单-交易成功 -->
                    <div class="transaction" v-if="v.order_type == 4">
                        <div class="order-time">
                            买单: {{v.createtime}}
                        </div>
                        <div class="price">
                            实付款: <text>￥{{v.total_price}}</text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-con" v-show="tabSelect == 1">
             <div class="no-data" v-if="orderListCoupon.length <= 0">
                <div class="img-con">
                    <img src="../../../common/img/icon_no_data.png" mode="widthFix">
                    <div class="mask"></div>
                </div>
                <text>暂无订单</text>
            </div>
            <!-- 第二个 -->
              <div class="order-list">
                <div class="order-item" v-for="(v, index) in orderListCoupon" :key="index" @click="jump2Detail(v.order_type, v.order_id)">
                    <!-- 订单列表 -->
                    <div class="order-item-header">
                        <div class="order-item-header-left">
                            <div class="outter">
                                <img :src="v.logo_img" class="shop-img" mode="aspectFill">
                            </div>
                            <tetx>{{v.shop_name}}</tetx>
                        </div>
                        <text>{{v.statusText}}</text>
                    </div>
                    <div v-if="v.order_type != 4">
                        <div class="order-item-content">
                            <img :src="v.coupon_img" mode="aspectFill" class="goods-img">
                            <div class="goods-info">
                                <div class="goods-title">{{v.coupon_name}}</div>
                                <div class="price">
                                    <text>￥{{v.coupon_price}}</text>
                                    <text>x{{v.num}}</text>
                                </div>
                            </div>
                        </div>
                        <div class="order-item-footer">
                            <div class="price-con">
                                <text>共{{v.num}}件</text>  <div class="price">合计: <text>￥{{v.total_price}}</text></div>
                            </div>
                            <div class="time-con">
                                {{v.createtime}}  <div v-if="v.order_status == 1" class="btn-use">去使用</div>
                            </div>
                        </div>
                    </div>
                    <!-- 订单-交易成功 -->
                    <div class="transaction" v-if="v.order_type == 4">
                        <div class="order-time">
                            买单: {{v.createtime}}
                        </div>
                        <div class="price">
                            实付款: <text>￥{{v.total_price}}</text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-con" v-show="tabSelect == 2">
             <div class="no-data" v-if="orderListOrder.length <= 0">
                <div class="img-con">
                    <img src="../../../common/img/icon_no_data.png" mode="widthFix">
                    <div class="mask"></div>
                </div>
                <text>暂无订单</text>
            </div>
            <!-- 第三个 -->
            <div class="order-list">
                <div class="order-item" v-for="(v, index) in orderListOrder" :key="index" @click="jump2Detail(v.order_type, v.order_id)">
                    <!-- 订单列表 -->
                    <div class="order-item-header">
                        <div class="order-item-header-left">
                            <div class="outter">
                                <img :src="v.logo_img" class="shop-img" mode="aspectFill">
                            </div>
                            <tetx>{{v.shop_name}}</tetx>
                        </div>
                        <text>{{v.statusText}}</text>
                    </div>
                    <div v-if="v.order_type != 4">
                        <div class="order-item-content">
                            <img :src="v.coupon_img" mode="aspectFill" class="goods-img">
                            <div class="goods-info">
                                <div class="goods-title">{{v.coupon_name}}</div>
                                <div class="price">
                                    <text>￥{{v.coupon_price}}</text>
                                    <text>x{{v.num}}</text>
                                </div>
                            </div>
                        </div>
                        <div class="order-item-footer">
                            <div class="price-con">
                                <text>共{{v.num}}件</text>  <div class="price">合计: <text>￥{{v.total_price}}</text></div>
                            </div>
                            <div class="time-con">
                                {{v.createtime}}  <div v-if="v.order_status == 1" class="btn-use">去使用</div>
                            </div>
                        </div>
                    </div>
                    <!-- 订单-交易成功 -->
                    <div class="transaction" v-if="v.order_type == 4">
                        <div class="order-time">
                            买单: {{v.createtime}}
                        </div>
                        <div class="price">
                            实付款: <text>￥{{v.total_price}}</text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  async mounted() {
    this.lastidAll = "";
    this.lastidCoupon = "";
    this.lastidOrder = "";
    await this.getData();
  },
  data() {
    return {
      tabSelect: 0,
      lastidAll: "",
      lastidCoupon: "",
      lastidOrder: "",
      orderListAll: [],
      orderListCoupon: [],
      orderListOrder: []
    };
  },
  async onReachBottom() {
    await this.getData();
  },
  async onPullDownRefresh() {
    if (this.tabSelect == 0) {
      this.lastidAll = '';
    } else if (this.tabSelect == 1) {
      this.lastidCoupon = '';
    } else if (this.tabSelect == 2) {
      this.lastidOrder = '';
    }
    await this.getData();
    wx.stopPullDownRefresh();
  },
  methods: {
    async getData() {
      if (this.tabSelect == 0) {
        await this.getAll();
      } else if (this.tabSelect == 1) {
        await this.getCoupon();
      } else if (this.tabSelect == 2) {
        await this.getOrder();
      }
    },
    async tabChange(v) {
      this.tabSelect = v;
      await this.getData();
    },
    async getAll() {
      let data = await this.$http.post("/user/orderlist", {
        type: this.tabSelect,
        lastid: this.lastidAll
      });

      this.lastidAll = data[data.length - 1].order_id;

      data.map(item => {
        item.statusText = this.getStatusText(
          item.order_type,
          item.order_status
        );
      });

      if (this.lastidAll == "") {
        this.orderListAll = data;
      } else {
        this.orderListAll = this.orderListAll.concat(data);
      }
    },

    async getCoupon() {
      let data = await this.$http.post("/user/orderlist", {
        type: this.tabSelect,
        lastid: this.lastidCoupon
      });
      this.lastidCoupon = data[data.length - 1].order_id;

      data.map(item => {
        item.statusText = this.getStatusText(
          item.order_type,
          item.order_status
        );
      });

      if (this.lastidAll == "") {
        this.orderListCoupon = data;
      } else {
        this.orderListCoupon = this.orderListCoupon.concat(data);
      }
    },

    async getOrder() {
      let data = await this.$http.post("/user/orderlist", {
        type: this.tabSelect,
        lastid: this.lastidOrder
      });

      this.lastidOrder = data[data.length - 1].order_id;
      data.map(item => {
        item.statusText = this.getStatusText(
          item.order_type,
          item.order_status
        );
      });

      if (this.lastidAll == "") {
        this.orderListOrder = data;
      } else {
        this.orderListOrder = this.orderListOrder.concat(data);
      }
    },
    jump2Detail(type, orderId) {
      console.log(orderId);
      if (type == 4) {
        wx.navigateTo({
          url: `/pages/order/detailOther/main?orderId=${orderId}&orderType=${type}`
        });
      } else if (type == 2) {
        wx.navigateTo({
          url: `/pages/order/detail/main?orderId=${orderId}&orderType=${type}`
        });
      }
    },
    getStatusText(type, status) {
      if (type == 4 && status == 1) {
        return "交易成功";
      }
      if (type == 2 && status == 1) {
        return "购买成功";
      }
      if (status == 0) {
        return "待付款";
      }
      if (status == 2) {
        return "已退款";
      }
      if (status == 3) {
        return "已取消";
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../../common/scss/base.scss";
page {
  background-color: $bg-color;
}
.tab-header-con {
  background-color: #fff;
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 99;
  border-top: 1px solid $border-color;
}
.placeholder {
  height: 60px;
}
.tab-item {
  flex: 1;
  text-align: center;
  padding: 15px 0px;
  color: $text-sup-color;
}
.tab-item-selected {
  color: $theme-color;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    background-color: $theme-color;
    height: 2px;
    width: 25%;
    bottom: 0px;
    left: 37.5%;
  }
}
/* 订单列表 */
.order-list {
  .order-item {
    width: calc(100% - 40px);
    margin-left: 10px;
    background: #fff;
    border-radius: 8px;
    padding: 0px 10px;
    margin-bottom: 10px;
    @include shadow;
    .order-item-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0px;
      border-bottom: 1px solid $border-color;
      text {
        color: $text-sup-color;
      }
      .order-item-header-left {
        display: flex;
        align-items: center;
        .outter {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
          img {
            width: 30px;
            height: 30px;
            display: block;
          }
        }
        text {
          color: #555;
        }
      }
    }
    .order-item-content {
      display: flex;
      align-items: center;
      padding: 10px 0px;
      border-bottom: 1px solid $border-color;
      .goods-img {
        width: 80px;
        height: 80px;
        display: block;
        border-radius: 5px;
      }
      .goods-info {
        width: calc(100% - 90px);
        margin-left: 10px;
        .goods-title {
        }
        .price {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 15px;
          text {
            color: $text-sup-color;
            font-size: $sup-text-size;
          }
        }
      }
    }
    .order-item-footer {
      .price-con {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 12px 0px;
        text {
          font-size: $sup-text-size;
        }
        .price {
          margin-left: 8px;
          font-size: $sup-text-size;
          display: flex;
          align-items: center;
          text {
            color: $price-color;
            font-size: 16px;
          }
        }
      }
      .time-con {
        padding: 12px 0px;
        color: $sup-text-size;
        border-top: 1px solid $border-color;
        color: $text-sup-color;
        font-size: $sup-text-size;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .btn-use {
          @include main-gradients;
          color: #fff;
          padding: 8px 20px;
          border-radius: 40px;
        }
      }
    }
    .transaction {
      padding: 10px 0px;
      div {
        padding: 8px;
        text {
          font-weight: 600;
        }
      }
    }
  }
}
.no-data {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
  margin-bottom: 10px;
  .img-con {
    padding: 10px;
    display: inline-block;
    position: relative;
    img {
      width: 200px;
      height: 200px;
    }
    .mask {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      //background-color: rgba(88, 179, 250, 0.25);
    }
  }
  text {
    color: $text-sup-color;
    margin-top: 20px;
  }
}
</style>
