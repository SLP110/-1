<template>
  <section class="buySuccess">
  	<div class="buy_content">
  		<div class="success_icon">
	  		<img src="../../common/img/icon_success.png" />
	  	</div>
	  	<div class="buy_money">
	  		￥<text>{{buyMoney}}</text>
	  	</div>
	  	<div class="buy_state">
	  		<text>{{buyState}}</text>
	  	</div>
	  	<div class="order_details">
	  		<div class="order_list" v-for="(v,index) in orderList" :key="index">
	  			<div class="order_left">
		  			<text>{{v.order_name}}</text>
		  		</div>
		  		<div class="order_right">
		  			<text>{{v.order_content}}</text>
		  		</div>
	  		</div>
	  	</div>
	  	<div class="buyOff_btn">完成</div>
	  	<div class="buy_order">查看订单</div>
  	</div>
  	
  	<div class="coupon-list">
  		<div class="coupon-topLine"></div>
  		<div class="coupon-li" v-for="(v, index) in couponList" :key="index">
		    <div class="coupon-li-left">
		        <img :src="v.img" class="coupon-img" mode="widthFix">
		    </div>
		    <div class="coupon-li-center">
		        <div class="coupon-title">{{v.title}}</div>
		        <div class="coupon-type">{{v.type}}</div>
		    </div>
		    <div class="coupon-li-right">
		    	<text>去使用</text>
		    </div>
	    </div>
	  </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
    	buyMoney:"85.00",
    	buyState:"支付成功",
    	orderList: [
    		{
    			order_name:"支付方式：",
    			order_content:"微信支付",
    		},
    		{
    			order_name:"支付金额：",
    			order_content:"100.00元",
    		},
    	],
      couponList: [
        {
          title: "100元代金券",
          distance: "100",
          type: "全有品APP可用",
          time: "今日即将过期",
          img: "https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=02580eac2e1f95cab2f89ae4a87e145b/b7fd5266d01609243e4aa9c9df0735fae7cd34f0.jpg"
        }
      ],
        
    };
	},
	methods: {
		async getData() {
			
		}
	}
};
</script>

<style lang="scss">
@import "../../common/scss/base.scss";
.buySuccess{
	.buy_content{
		padding: 24px;
		.success_icon {
	  	margin: 20px auto 10px;
	  	img{
	  		height: 80px;
	  		margin: 0 auto;
	  		display: block;
	  	}
	  }
	  .buy_money{
	  	color: $theme-color;
	  	font-size: 36px;
	  	display: flex;
	  	justify-content: center;
	  	text{
	  		color: $theme-color;
	  		font-size: 36px;
	  	}
	  }
	  .buy_state{
	  	display: flex;
	  	justify-content: center;
	  	margin: 10px 0 25px;
	  	text{
	  		color: $text-normal-color;
	  		font-size: $sup-text-size;
	  	}
	  }
	  .order_details{
	  	border-top: 4px dashed #ddd;
	  	padding-top: 10px;
	  	.order_list{
	  		display: flex;
	      justify-content: space-between;
	  		margin-top: 14px;
	  		.order_left{
	  			display: flex;
	  			justify-content: center;
	  			text{
	  				color: $text-sup-color;
	  				font-size: $sup-text-size;
	  			}
	  		}
	  		.order_right{
	  			display: flex;
	  			justify-content: center;
	  			text{
	  				color: $text-normal-color;
	  				font-size: $sup-text-size;
	  			}
	  		}
	  	}
	  }
	  .buyOff_btn{
	  	width: 204px;
	  	height: 42px;
	  	@include main-gradients;
			display: flex;
	    justify-content: center;
	    align-items: center;
			font-size: $normal-text-size;
			color: #fff;
			border-radius: 21px;
			margin: 70px auto 0;
	  }
	  .buy_order{
	  	font-size: $sup-text-size;
	  	color: $sup-color;
	  	text-decoration: underline;
	  	display: flex;
	  	justify-content: center;
	  	margin-top: 25px;
	  }
	}
  .coupon-list {
  	border-top: 10px solid $border-color;
  	padding: 22px 24px;
	  .coupon-li {
	    display: flex;
	    align-items: center;
	    position: relative;
	    &:last-child{
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
	        margin-top: 20px;
	      }
	    }
	    .coupon-li-right {
	    	text{
	    		width: 70px;
		    	height: 28px;
		    	border-radius: 14px;
		    	@include main-gradients;
	    		display: flex;
	        justify-content: center;
	        align-items: center;
	    		font-size: $sup-text-size;
	    		color: #FFFEFE;
	    	}
	    }
	  }
	}
}

</style>
