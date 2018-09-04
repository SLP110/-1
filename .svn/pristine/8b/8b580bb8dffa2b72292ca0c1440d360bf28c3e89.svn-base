<template>
	<!--付款页面-->
  <section class="payment">
  	<div class="tips">您正在向{{shopInfo.shop_name}}付款</div>
  	<div class="payment_detail">
  		<div class="total_amount">
  			<text class="label">消费总金额</text>
  			<input class="input" type="number" placeholder="询问服务员后输入" placeholder-style="color:#FF7E00;" @input="inputPrice">
  		</div>
  		<div class="payment_detail_line" @click="panelChange(0)">
  			<text class="cell-left">支付方式</text>
        	<div class="cell-right">
  				<text>{{payType}}</text>
        		<img class="arrow" mode="widthFix" src="../../../common/img/icon_arrow.png">
  			</div>
  		</div>
  		<div class="payment_detail_line" @click="panelChange(1)">
  			<text class="cell-left">使用优惠券</text>
  			<div class="cell-right">
  				  <text v-if="!coupon.dedValue">暂无可用的优惠券</text>
            <text v-else>{{coupon.dedValue}}元代金券</text>
        		<img class="arrow" mode="widthFix" src="../../../common/img/icon_arrow.png">
  			</div>
  		</div>
  		<div class="payment_detail_line">
  			<text class="cell-left">实付金额</text>
        	<div class="cell-right">￥<text>{{payPrice}}</text></div>
  		</div>
  	</div>
  	
  	<div class="btn-payment" @click="toPay">支付</div>
  	
  	<!-- 弹窗 -->
    <div class="mask animated" @click="panelChange" :class="{'fadeOut': panelShow == 1, 'fadeIn': panelShow == 2}"></div>
    <div class="bottom-panel animated" :class="{'fadeOutDown': panelShow == 1, 'fadeInUp': panelShow == 2}">
    	<!--支付方式弹窗-->
    	<div class="bottom-panel-box payment_method_box" v-show="showBox == 0">
	    	<text class="payment_method_tit">支付方式</text>
		    <div class="close-con">
		        <img src="../../../common/img/icon_close.png" mode="widthFix" class="icon-close" @click="panelChange">
		    </div>
	    	<div class="payment-method-list">
	      		<div class="payment-method-type"  @click="selectPayMode(0)">
		      		<div class="payment-type-left">
		      			<img src="../../../common/img/icon_balance.png"/>
		      			<div class="payment-type">
		      				余额支付<text>(￥{{memcardAmount}})</text>
		      			</div>
		      		</div>
		      		<div class="payment-type-right">
		      			<img src="../../../common/img/icon_select_press.png" v-if="selectedPayMode==0"/>
		      			<img src="../../../common/img/icon_select_normal.png" v-else/>
		      		</div>
		      	</div>
	      		<div class="payment-method-type" @click="selectPayMode(1)">
		      		<div class="payment-type-left">
		      			<img src="../../../common/img/icon_wechat.png" />
		      			<div class="payment-type">
		      				微信支付
		      			</div>
		      		</div>
		      		<div class="payment-type-right">
		      			<img src="../../../common/img/icon_select_press.png" v-if="selectedPayMode==1"/>
		      			<img src="../../../common/img/icon_select_normal.png" v-else/>
		      		</div>
		      	</div>
		    </div>
	      	<div class="toPayment">
	      		<text>去支付</text>
	      	</div>
      	</div>
      	<!--优惠劵弹窗-->
    	<div class="bottom-panel-box coupon_box" v-show="showBox == 1">
	    	<text class="bottom-panel-tit">优惠劵</text>
	      <div class="close-con">
	        <img src="../../../common/img/icon_close.png" mode="widthFix" class="icon-close" @click="panelChange">
	      </div>
	      <div class="coupon-list">
	      	<div class="coupon-li" v-for="v in couponCanUse" :key="v.flag_id">
	            <div class="coupon-li-left">
	                <img :src="v.g_photo" class="coupon-img" mode="aspectFill">
	            </div>
	            <div class="coupon-li-center">
	                <div class="coupon-title">{{v.dedValue}}元代金券</div>
	                <div class="coupon-type">{{shopInfo.shop_name}}</div>
	                <div class="time">{{v.expiryDate}}</div>
	            </div>
	            <div class="coupon-li-right">
	            	<text @click="selectCoupon(v)">去使用</text>
	            </div>
	        </div>
          <div class="coupon-li" v-for="v in couponNotUse" :key="v.flag_id">
	            <div class="coupon-li-left">
	                <img :src="v.g_photo" class="coupon-img" mode="aspectFill">
	            </div>
	            <div class="coupon-li-center">
	                <div class="coupon-title">{{v.dedValue}}元代金券</div>
	                <div class="coupon-type">{{shopInfo.shop_name}}</div>
	                <div class="time">{{v.expiryDate}}</div>
	            </div>
	            <div class="coupon-li-right">
	            	<!-- <text>去使用</text> -->
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
    this.url = this.$root.$mp.query.url;
    console.log(this.url);
    await this.getData();
    this.couponChange(0); //
  },
  data() {
    return {
      showBox: 0,
      panelShow: 0,
      selectedPayMode: 0,
      shopInfo: {},
      inputValue: "",
      url: "",
      couponCanUse: [],
      couponNotUse: [],
      memcardAmount: "",
      payType: "",
      payPrice: 0,
      couponList: [],
      coupon: {}
    };
  },
  methods: {
    async getData() {
      const data = await this.$http.post("/user/getpaycoupons", {
        yp_info: this.url
      });

      this.shopInfo = data.shop_info;
      this.couponList = data.cash;

      this.couponList = this.couponList.sort((a, b) => {
        return a.dedValue > b.dedValue;
      });
      this.selectPayMode(0);
    },
    inputPrice(e) {
      this.inputValue = e.target.value;
      this.couponChange(this.inputValue);
      this.caclCost();

      if (this.payPrice <= this.memcardAmount) {
        this.selectPayMode(0);
      } else {
        this.selectPayMode(1);
      }
    },
    couponChange(cost) {
      this.couponCanUse = this.couponList.filter(item => {
        return Number(item.dedValue) <= cost;
      });
      this.couponNotUse = this.couponList.filter(item => {
        return Number(item.dedValue) > cost;
      });

      if (this.couponCanUse.length > 0) {
        this.coupon = this.couponCanUse[this.couponCanUse.length - 1];
      } else {
        this.coupon = {};
      }
    },
    selectCoupon() {
      this.couponChange(this.inputValue);
      this.caclCost();

      if (this.payPrice <= this.memcardAmount) {
        this.selectPayMode(0);
      } else {
        this.selectPayMode(1);
      }
      this.panelChange();
    },
    panelChange(showBox) {
      this.showBox = showBox;
      this.panelShow = this.panelShow == 0 ? 2 : this.panelShow == 1 ? 2 : 1;
    },
    selectPayMode(indexKey) {
      this.memcardAmount = this.shopInfo.memcard_amount;
      this.payType =
        indexKey == 0 ? `余额支付(￥${this.memcardAmount})` : "微信支付";
      this.selectedPayMode = indexKey;
    },
    toPay() {
      if (this.inputValue == "") {
        wx.showTost({
          title: "请输入支付金额",
          icon: "none"
        });
        return;
      }

      if (Number(this.inputValue) == Number(this.coupon.dedValue)) {
        //直接抵扣, 不调用支付

        return;
      }

      //调用支付
    },
    caclCost() {
      if (this.inputValue == "") {
        this.payPrice = 0;
        return;
      }

      //没有优惠券
      if (!this.coupon.dedValue) {
        this.payPrice = this.inputValue;
        return;
      }

      //有优惠券
      this.payPrice =
        (Number(this.inputValue) * 100 - Number(this.coupon.dedValue) * 100) /
        100;
    }
  }
};
</script>

<style lang="scss">
@import "../../../common/scss/base.scss";
page {
  background: $bg-color;
}
.payment {
  padding: 42px 16px 0 16px;
  .tips {
    font-size: $sup-text-size;
    color: #fff;
    width: 319px;
    margin: 0 auto;
    text-align: center;
    @include main-gradients;
    border-radius: 4px 4px 0 0;
    height: 39px;
    line-height: 39px;
  }
  .payment_detail {
    background: #fff;
    padding: 20px 16px;
    border-radius: 4px;
    .total_amount {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 25px 14px;
      border: 1px solid #fee3d3;
      background: #fff8f4;
      border-radius: 3px;
      margin-bottom: 4px;
      .label {
        font-size: $normal-text-size;
        color: $text-normal-color;
        font-weight: bold;
      }
      .input {
        font-size: $normal-text-size;
        color: $sup-color;
        text-align: right;
      }
    }
    .payment_detail_line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 25px 14px;
      border-bottom: 1px solid $border-color;
      &:last-child {
        border-bottom: 0px;
        .cell-right {
          color: $price-color;
          font-size: $normal-text-size;
          font-weight: bold;
          text {
            color: $price-color;
            font-size: 22px;
          }
        }
      }
      .cell-left {
        color: $text-sup-color;
        font-size: $main-text-size;
      }
      .cell-right {
        color: $text-normal-color;
        font-size: $main-text-size;
        .arrow {
          width: 5px;
          height: 10px;
        }
        text {
          margin-right: 10px;
        }
      }
    }
  }
  .btn-payment {
    @include main-gradients;
    height: 44px;
    width: 290px;
    margin: 65px auto 0;
    text-align: center;
    line-height: 44px;
    font-size: $normal-text-size;
    color: #fff;
    border-radius: 22px;
  }
  /* 底部弹窗 */
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.5);
    top: 100%;
    left: 0px;
    z-index: 998;
  }
  .bottom-panel {
    position: fixed;
    width: 100%;
    height: 50%;
    background: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    bottom: -100%;
    left: 0;
    z-index: 999;
    .close-con {
      display: flex;
      justify-content: flex-end;
      overflow: hidden;
      border-top-right-radius: 10px;
      .icon-close {
        width: 30px;
        height: 30px;
      }
    }
    .bottom-panel-tit {
      font-size: $normal-text-size;
      color: $text-normal-color;
      font-weight: bold;
      position: absolute;
      left: 13px;
      top: 20px;
    }
    .payment_method_tit {
      font-size: 17px;
      color: $text-normal-color;
      position: absolute;
      left: 16px;
      top: 0px;
      line-height: 55px;
    }
    .payment-method-list {
      border-top: 1px solid $border-color;
      padding: 5px 16px 50px;
      margin-top: 24px;
      .payment-method-type {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        .payment-type-left {
          display: flex;
          align-items: center;
          img {
            height: 30px;
            width: 30px;
            margin-right: 9px;
          }
          .payment-type {
            font-size: $normal-text-size;
            color: $text-normal-color;
            text {
              font-size: $normal-text-size;
              color: $text-sup-color;
            }
          }
        }
        .payment-type-right {
          display: flex;
          align-items: center;
          img {
            width: 18px;
            height: 18px;
          }
        }
      }
    }
    .toPayment {
      border-top: 1px solid $border-color;
      text {
        width: 261px;
        height: 42px;
        border-radius: 21px;
        @include main-gradients;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $normal-text-size;
        color: #fff;
        margin: 7px auto;
      }
    }
    .coupon-list {
      padding: 0px 16px;
      margin-top: 24px;
      height: 229px;
      overflow: scroll;
      .coupon-li {
        display: flex;
        align-items: center;
        border-bottom: 1px solid $border-color;
        position: relative;
        padding: 14px 0;
        &:last-child {
          border-bottom: 0px;
        }
        .coupon-li-left {
          .coupon-img {
            width: 77px;
            height: 77px;
            display: block;
            border-radius: 4px;
          }
        }
        .coupon-li-center {
          margin-left: 12px;
          margin-right: auto;
          .coupon-title {
            display: flex;
            justify-content: space-between;
            font-size: $normal-text-size;
            color: $text-normal-color;
          }
          .coupon-type {
            color: $text-normal-color;
            font-size: $sup-text-size;
            margin-top: 12px;
          }
          .time {
            color: $text-sup-color;
            font-size: $sup-text-size;
            margin-top: 12px;
          }
        }
        .coupon-li-right {
          text {
            width: 70px;
            height: 28px;
            border-radius: 14px;
            @include main-gradients;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: $sup-text-size;
            color: #fffefe;
          }
        }
      }
    }
  }

  .animated {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }

    to {
      opacity: 1;
      -webkit-transform: translate3d(0, -200%, 0);
      transform: translate3d(0, -200%, 0);
    }
  }

  @keyframes fadeOutDown {
    from {
      opacity: 1;
      -webkit-transform: translate3d(0, -200%, 0);
      transform: translate3d(0, -200%, 0);
    }

    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    1% {
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    1% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .fadeIn {
    animation-name: fadeIn;
  }
  .fadeOut {
    animation-name: fadeOut;
  }
  .fadeOutDown {
    animation-name: fadeOutDown;
  }
  .fadeInUp {
    animation-name: fadeInUp;
  }
}
</style>
