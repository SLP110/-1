<template>
  <section class="recharge">
  	<div class="recharge_tit">充值金额</div>
  	<div class="recharge_list">
  		<div class="recharge_money" :class="{'selectRecharge': selectRecharge == index}" v-for="(v,index) in rechargeMoneyList" :key="index" @click="selectRechargeMoney(index)">
  			<text>充{{v.rechargeMoney}}元</text>
  			<img v-show="index == 0" class="recharge_hot" src="../../../common/img/icon_hot.png"/>
  		</div>
  	</div>
  	
  	<!--充值底部按钮-->
  	<div class="recharge_bottom">
  		<div class="recharge_confirm ">
	  		<div class="recharge_bottom_left">
	  			共计&nbsp;&nbsp;￥<text>{{selectMoney}}</text>
	  		</div>
	  		<div class="recharge_bottom_right" @click="toRecharge">立即充值</div>
	  	</div>
  		<div class="recharge_agreement">点击立即充值，既表示您已同意<text>《充值协议》</text></div>
  	</div>
  </section>
</template>

<script>
import http from "../../../common/js/http";
export default {
  data() {
    return {
      selectRecharge: 0,
      selectMoney: 100,
      rechargeMoneyList: [
        {
          rechargeMoney: 100
        },
        {
          rechargeMoney: 30
        },
        {
          rechargeMoney: 50
        },
        {
          rechargeMoney: 200
        },
        {
          rechargeMoney: 0.1
        },
      ]
    };
  },
  methods: {
    selectRechargeMoney(moneyIndex) {
      this.selectRecharge = moneyIndex;
      this.selectMoney = this.rechargeMoneyList[moneyIndex].rechargeMoney;
    },
    async toRecharge() {
      let RechargeOrder = await this.$http.post("/user/submitmemcardorder", {
        amount: this.selectMoney,
        order_type: 4,
      });
      if (RechargeOrder.id != null) {
        let payOrder = await this.$http.post("/pay/payorder", {
	        order_id: RechargeOrder.id,
					paytitle: "余额充值",
					price: RechargeOrder.price,
					channel: "wx"
	      });
	      wx.requestPayment({
				  'timeStamp': '',
				  'nonceStr': '',
				  'package': '',
				  'signType': 'MD5',
				  'paySign': '',
				  'success':function(res){
				   	wx.navigateTo({
			        url: "/pages/recharge/rechargeSuccess/main"
			      });
				  },
				  'fail':function(res){
				  }
				});
      } else {
        wx.showToast({
          title: "订单生成失败，请重新提交订单",
          icon: "none"
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../../common/scss/base.scss";
.recharge {
  .recharge_tit {
    font-size: 19px;
    color: $text-normal-color;
    font-weight: bold;
    padding: 20px 16px 30px;
  }
  .recharge_list {
    display: inline-flex;
    flex-wrap: wrap;
    align-content: space-between;
    .recharge_money {
      margin: 0 0 16px 16px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #6bc2ae;
      border-radius: 10px;
      height: 69px;
      width: 163px;
      text {
        font-size: 17px;
        color: $text-normal-color;
      }
      .recharge_hot {
        width: 27px;
        height: 27px;
        position: absolute;
        right: 0;
        top: 0;
        border-top-right-radius: 10px;
      }
    }
    .selectRecharge {
      @include main-gradients;
      @include shadow;
      border: 0px;
      text {
        color: #fff;
      }
    }
  }
  .recharge_bottom {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    border-top: 1px solid $border-color;
    .recharge_confirm {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16px;
      .recharge_bottom_left {
        display: flex;
        align-items: center;
        font-size: $main-text-size;
        color: $text-normal-color;
        font-weight: bold;
        margin-left: 18px;
        text {
          font-size: 20px;
        }
      }
      .recharge_bottom_right {
        display: flex;
        align-items: center;
        width: 185px;
        height: 44px;
        @include main-gradients;
        border-radius: 22px;
        justify-content: center;
        font-size: $normal-text-size;
        color: #fff;
        @include shadow;
        margin-right: 16px;
      }
    }
    .recharge_agreement {
      margin: 16px 0px 12px;
      display: flex;
      justify-content: center;
      color: $text-sup-color;
      font-size: $sup-text-size;
      text {
        font-size: $sup-text-size;
        color: #ff9500;
      }
    }
  }
}
</style>
