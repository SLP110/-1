<template>
    <section class="coupon-list">
        <div class="no-data" v-if="couponList.length <= 0 && moreList.length <= 0">
          <div class="img-con">
            <img src="../../../common/img/icon_no_coupons.png" mode="widthFix">
            <div class="mask"></div>
          </div>
          <text>附近暂无可用优惠券</text>
        </div>
        <div class="title" v-if="couponList.length > 0">
            附近可用
        </div>
        <div class="coupon-ul" v-if="couponList.length > 0">
            <div class="coupon-li" v-for="(v, index) in couponList" :key="index" @click="jump2Detail(v.couponId, v.sub_id, v.type)">
                <div class="coupon-li-left">
                    <img :src="v.logoImg" class="coupon-img" mode="aspectFill">
                </div>
                <div class="coupon-li-right">
                    <div class="coupon-title"><text>{{v.couponName}}</text> <text class="distance">{{v.dis}}</text></div>
                    <div class="coupon-type">{{v.shopName}}</div>
                    <div class="time" v-show="v.endtime != ''">{{ v.endtime }}</div>
                </div>
                <div class="circle-left"></div>
                <div class="circle-right"></div>
            </div>
        </div>
        <div class="title" v-if="couponList.length > 0">
            更多
        </div>
        <div class="coupon-ul" v-if="moreList.length > 0">
            <div class="coupon-li" v-for="(v, index) in moreList" :key="index" @click="jump2Detail(v.couponId, v.sub_id, v.type)">
                <div class="coupon-li-left">
                    <img :src="v.logoImg" class="coupon-img" mode="aspectFill">
                </div>
                <div class="coupon-li-right">
                    <div class="coupon-title">{{v.couponName}}</div>
                    <div class="coupon-type line-second">{{v.shopName}}</div>
                </div>
                <div class="circle-left"></div>
                <div class="circle-right"></div>
            </div>
        </div>
        <div class="placeholder"></div>
        <div class="btn-time-out" @click="jump2Overdue"> 
          失效的优惠券
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
      moreList: [],
      couponList: []
    };
  },
  methods: {
    async getData() {
      let data = await this.$http.post("/user/couponlist", {
        longitude: wx.getStorageSync("longitude") || "114.053840",
        latitude: wx.getStorageSync("latitude") || "22.535670"
      });
      this.couponList = data.couponList.near;
      this.moreList = data.couponList.more;
      this.couponList.map(item => {
        item.dis = this.getDistance(item.dis);
        item.endtime = this.getTime(item.endtime);
      });
    },
    jump2Detail(couponId, subId, type) {
      wx.navigateTo({
        url: `/pages/coupon/detail/main?couponId=${couponId}&subId=${subId}&type=${type}`
      });
    },
    jump2Overdue() {
      wx.navigateTo({
        url: `/pages/coupon/overdue/main`
      });
    },
    getDistance(v) {
      if (v < 10) {
        return `<${v}m`;
      }
      if (v < 1000) {
        return `${v}m`;
      }
      if (v < 100000) {
        return `${v / 1000}km`;
      }
      return `99km+`;
    },
    getTime(v) {
      let time = new Date().getTime() / 1000;
      if (time == v) {
        return "今日即将过期";
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../../common/scss/base.scss";
page {
  background: $bg-color;
}
.title {
  font-weight: 600;
  padding: 10px;
}
.coupon-ul {
  padding: 0px 10px;
  margin-top: 10px;
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
      width: calc(100% - 100px);
      .coupon-title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-weight: 600;
        .distance {
          font-size: $sup-text-size;
          color: $text-sup-color;
        }
      }
      .coupon-type {
        font-size: $sup-text-size;
        margin-top: 2px;
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
.btn-time-out {
  color: $theme-color;
  text-align: center;
  padding: 15px 0px;
  background-color: #fff;
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
}
.placeholder {
  height: 50px;
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
