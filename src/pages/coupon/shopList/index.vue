<template>
    <section class="coupon-shop-list">
        <div class="shop-list-ul">
            <div class="shop-li" v-for="(v, index) in shopList" :key="index">
                <div class="shop-li-left">
                    <img class="shop-img" :src="v.img_logo" mode="aspectFill">
                </div>
                <div class="shop-li-right">
                    <div class="shop-title">
                        <text>{{v.shop_name}}</text>
                        <text>{{v.statusText}}</text>
                    </div>
                    <div class="shop-type">
                        <text>{{v.Level_one}}</text>
                        <text class="hr">{{v.Level_two}}</text>
                    </div>
                    <div class="shop-address">{{v.address}}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  async mounted() {
    this.subId = this.$root.$mp.query.subId;
    await this.getData();
  },
  data() {
    return {
      subId: "",
      shopList: [
        {
          title: "STARTBUCKS",
          distance: "3.02km",
          type: "享美食",
          address: "南山区花样年广场2栋11楼",
          food: "火锅",
          img:
            "https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=02580eac2e1f95cab2f89ae4a87e145b/b7fd5266d01609243e4aa9c9df0735fae7cd34f0.jpg"
        },
        {
          title: "STARTBUCKS",
          distance: "3.02km",
          type: "享美食",
          address: "南山区花样年广场2栋11楼",
          food: "火锅",
          img:
            "https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=02580eac2e1f95cab2f89ae4a87e145b/b7fd5266d01609243e4aa9c9df0735fae7cd34f0.jpg"
        }
      ]
    };
  },
  methods: {
    async getData() {
      let data = await this.$http.post("/user/brandshoplist", {
        sub_id: this.subId,
        latitude: wx.getStorageSync("latitude"),
        longitude: wx.getStorageSync("longitude")
      });
      this.shopList = data.shop_sub_list;
      this.shopList.map(item=> {
          item.statusText = this.getDistance(item.distance);
      })
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
    }
  }
};
</script>

<style lang="scss">
@import "../../../common/scss/base.scss";
page {
  background: $bg-color;
}
.shop-list-ul {
  margin-top: 10px;
  .shop-li {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 10px;
    border-bottom: 1px solid $border-color;
    .shop-li-left {
      .shop-img {
        width: 60px;
        height: 60px;
        display: block;
      }
    }
    .shop-li-right {
      width: calc(100% - 70px);
      margin-left: 10px;
      .shop-title {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .shop-type {
        padding: 8px 0px;
        display: flex;
        align-items: center;
        text {
          color: $text-sup-color;
          font-size: $sup-text-size;
        }
        .hr {
          padding-left: 8px;
          margin-left: 8px;
          position: relative;
          &::after {
            content: "";
            width: 1px;
            height: 12px;
            background-color: $text-sup-color;
            position: absolute;
            top: 50%;
            margin-top: -5px;
            left: 0px;
          }
        }
      }
      .shop-address {
        font-size: $sup-text-size;
      }
    }
  }
}
</style>
