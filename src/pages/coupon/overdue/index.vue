<template>
    <section class="coupon-overdue">
        <div class="tab-header-con">
            <div class="tab-item" :class="{'tab-item-selected': tabSelect == 0}" @click="tabChange(0)">已使用</div>
            <div class="tab-item" :class="{'tab-item-selected': tabSelect == 1}" @click="tabChange(1)">已过期</div>
        </div>
        <div class="placeholder"></div>
        <div class="tab-con" v-show="tabSelect == 0">
            <div class="no-data" v-if="couponList.length <= 0">
              <div class="img-con">
                <img src="../../../common/img/icon_no_coupons.png" mode="widthFix">
                <div class="mask"></div>
              </div>
              <text>暂无已使用的优惠券</text>
            </div>
            <div class="coupon-ul">
                <div class="coupon-li" v-for="(v, index) in couponList" :key="index" @click="jump2Detail(v.couponId, v.sub_id, v.type)">
                    <div class="coupon-li-left">
                        <img :src="v.logoImg" class="coupon-img" mode="aspectFill">
                    </div>
                    <div class="coupon-li-right">
                        <div class="coupon-title">{{v.couponName}}</div>
                        <div class="coupon-type line-second">{{v.shopName}}</div>
                    </div>
                    <div class="coupon-status">已使用</div>
                    <div class="circle-left"></div>
                    <div class="circle-right"></div>
                </div>
            </div>
        </div>
        <div class="tab-con" v-show="tabSelect == 1">
            <div class="no-data" v-if="couponList.length <= 0">
              <div class="img-con">
                <img src="../../../common/img/icon_no_coupons.png" mode="widthFix">
                <div class="mask"></div>
              </div>
              <text>暂无已过期的优惠券</text>
            </div>
              <div class="coupon-ul">
                <div class="coupon-li" v-for="(v, index) in couponList" :key="index" @click="jump2Detail(v.couponId, v.sub_id, v.type)">
                    <div class="coupon-li-left">
                        <img :src="v.logoImg" class="coupon-img" mode="aspectFill">
                    </div>
                    <div class="coupon-li-right">
                        <div class="coupon-title">{{v.couponName}}</div>
                        <div class="coupon-type line-second">{{v.shopName}}</div>
                    </div>
                    <div class="coupon-status">已过期</div>
                    <div class="circle-left"></div>
                    <div class="circle-right"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  async mounted() {
    await this.getData();
  },
  data() {
    return {
      tabSelect: 0,
      couponList: []
    };
  },
  methods: {
    async getData() {
      if (this.tabSelect == 0) {
        await this.getAbled();
      } else {
        await this.getUsed();
      }
    },
    async tabChange(v) {
      this.tabSelect = v;
      await this.getData();
    },
    async getAbled() {
      const data = await this.$http.post("/user/disabledcoupon", { abled: 0 });
      this.couponList = data.couponList.more.concat(data.couponList.near);
    },
    async getUsed() {
      const data = await this.$http.post("/user/disabledcoupon", { used: 1 });
      this.couponList = data.couponList.more.concat(data.couponList.near);
    },
    jump2Detail(couponId, subId, type) {
      wx.navigateTo({
        url: `/pages/coupon/detail/main?couponId=${couponId}&subId=${subId}&type=${type}`
      });
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

.coupon-ul {
  padding: 0px 10px;
  .coupon-li {
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 10px;
    .coupon-li-left {
      padding: 0px 10px;
      .coupon-img {
        width: 80px;
        height: 80px;
        display: block;
        border-radius: 5px;
      }
    }
    .coupon-li-right {
      width: calc(100% - 150px);
      .coupon-title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        color: #919191;
        font-weight: 600;
        @include text-inline;
        .distance {
          font-size: $sup-text-size;
          color: $text-sup-color;
        }
      }
      .coupon-type {
        font-size: $sup-text-size;
        margin-top: 2px;
        color: #919191;
      }
      .time {
        color: $text-sup-color;
        font-size: $sup-text-size;
        margin-top: 2px;
      }
      .line-second {
        margin-top: 10px;
      }
    }
    .coupon-status {
      font-size: $sup-text-size;
      color: #919191;
    }
    .circle-left,
    .circle-right {
      width: 12px;
      height: 12px;
      background: $bg-color;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      margin-top: -6px;
    }
    .circle-left {
      left: -6px;
    }
    .circle-right {
      right: -6px;
    }
  }
}
.placeholder {
  height: 60px;
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
