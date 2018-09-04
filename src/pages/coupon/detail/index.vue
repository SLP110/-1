<template>
    <section class="coupon-detail">
        <div class="coupon-info-con">
            <div class="shop-img">
              <div class="outter">
                <img :src="couponInfo.shop_logo" mode="aspectFill">
              </div>
            </div>
            <div class="shop-name">{{couponInfo.shopName}}</div>
            <div class="coupon-price">{{couponInfo.dedValue}}元代金券</div>
            <div class="btn-buy" :class="{'is-use': getStatus.code != 1 }">{{getStatus.text}}</div>
            <div class="time-con">生效时间: {{couponInfo.accesstime}}</div>
            <div class="time-con">到期时间: {{couponInfo.endtime}}</div>
            <img mode="widthFix" class="lines" src="../../../common/img/icon_dotted_line_purchase_success.png">
            <div class="title">
                <div class="left">
                    <text class="react"></text>使用规则
                </div>
            </div>
            <ul class="rule-con">
                <li class="rule-item" v-for="(v, index) in couponInfo.remark" :key="index">{{v}}</li>
            </ul>
            <img mode="widthFix" class="lines" src="../../../common/img/icon_dotted_line_purchase_success.png">
            <div class="title" @click="jump2ShopList">
                <div class="left">
                    <text class="react"></text>适用门店
                </div>
                 <div class="right">
                     最近{{distanceText}}
                     <img src="../../../common/img/icon_arrow.png" mode="widthFix" class="arrow">
                 </div>
            </div>
            <div class="title" @click="jump2Detail" v-if="isShowRule">
                <div class="left">
                    <text class="react"></text>详细说明
                </div>
                <div class="right">
                     <img src="../../../common/img/icon_arrow.png" mode="widthFix" class="arrow">
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  async mounted() {
    this.couponId = this.$root.$mp.query.couponId;
    this.subId = this.$root.$mp.query.subId;
    this.couponType = this.$root.$mp.query.type;
    await this.getData();
  },
  data() {
    return {
      couponId: "",
      subId: "",
      couponType: "",
      distanceText: "",
      couponInfo: {},
      isShowRule: true,
      isUse: true,
      img:
        "https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=02580eac2e1f95cab2f89ae4a87e145b/b7fd5266d01609243e4aa9c9df0735fae7cd34f0.jpg"
    };
  },
  computed: {
    getStatus() {
      if (this.couponInfo.enabled == 1) {
        if (this.couponInfo.is_used == 1) {
          return { text: "已使用", code: 0 };
        } else if (this.couponInfo.is_used == 0) {
          return { text: "立即使用", code: 1 };
        }
      } else {
        return { text: "已过期", code: 2 };
      }
    }
  },
  methods: {
    async getData() {
      this.couponInfo = await this.$http.post("/user/coupondetail", {
        coupon_id: this.couponId,
        coupon_type: this.couponType,
        sub_id: this.subId,
        longitude: wx.getStorageSync("longitude"),
        latitude: wx.getStorageSync("latitude")
      });
      this.isUse = this.couponInfo.is_used == 1 ? true : false;
      this.isShowRule = this.couponInfo.remark.length > 0 ? true : false;
      this.distanceText = this.getDistance(this.couponInfo.dis);
    },
    getDistance(v) {
      if (v < 10) {
        return `${v}米`;
      }
      if (v < 1000) {
        return `${v}米`;
      }
      if (v < 100000) {
        return `${v / 1000}千米`;
      }
      return `99千米+`;
    },
    jump2ShopList() {
      wx.navigateTo({
        url: `/pages/coupon/shopList/main?subId=${this.subId}`
      });
    },
    jump2Detail() {
      console.log(this.subId);
      wx.navigateTo({
        url: `/pages/coupon/describe/main?couponId=${this.couponId}&subId=${
          this.subId
        }&couponType=${this.couponType}`
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../../common/scss/base.scss";
page {
  background: linear-gradient(180deg, #6bc2ae, #7db9be);
}
.coupon-info-con {
  background: #fff;
  border-radius: 5px;
  padding: 20px;
  width: calc(100% - 70px);
  margin-left: 15px;
  margin-top: 60px;
  position: relative;
  .shop-img {
    padding: 6px;
    background: #fff;
    display: inline-block;
    border-radius: 50%;
    @include shadow;
    position: absolute;
    top: -35px;
    left: 50%;
    margin-left: -35px;
    .outter {
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      img {
        width: 60px;
        height: 60px;
        display: block;
      }
    }
  }
  .shop-name {
    text-align: center;
    margin-top: 30px;
  }
  .coupon-price {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    margin: 30px 0px;
  }
  .btn-buy {
    width: 50%;
    margin-left: 25%;
    text-align: center;
    padding: 10px 0px;
    background: $theme-color;
    color: #fff;
    border-radius: 50px;
    margin-bottom: 20px;
  }
  .is-use {
    color: #fff;
    background: #bebebe;
  }
  .time-con {
    font-size: $sup-text-size;
    color: $text-sup-color;
    text-align: center;
    margin-bottom: 5px;
  }
  .lines {
    width: 100%;
  }
  .title {
    padding: 15px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .react {
        background: #36383a;
        width: 4px;
        height: 12px;
        display: inline-block;
        margin-right: 8px;
      }
    }
    .right {
      color: $text-sup-color;
      .arrow {
        width: 6px;
        margin-left: 10px;
      }
    }
  }
  .rule-con {
    padding-left: 14px;
    .rule-item {
    }
  }
}
</style>
