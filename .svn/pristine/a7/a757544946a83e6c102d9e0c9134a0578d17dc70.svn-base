<template>
  <section class="paySuccess">
  	<div class="success_icon">
  		<img src="../../../common/img/icon_success.png" />
  	</div>
  	<div class="pay_money">
  		￥<text>{{payToMoney}}</text>
  	</div>
  	<div class="payToStore">
  		<text>{{payToStore}}</text>
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
  	
  	<div class="payoff_btn">
  		支付完成
  	</div>
  	
  	<div class="consumer_order">
  		查看消费订单
  	</div>
  </section>
</template>

<script>
export default {
  	data() {
	    return {
	    	payToMoney:"85.00",
	    	payToStore:"有品咖啡厅",
	    	orderList: [
	    		{
	    			order_name:"交易单号：",
	    			order_content:"852741963456789123",
	    		},
	    		{
	    			order_name:"订单金额：",
	    			order_content:"100.00元",
	    		},
	    		{
	    			order_name:"优惠券抵扣：",
	    			order_content:"-15.00",
	    		},
	    		{
	    			order_name:"交易时间:",
	    			order_content:"2018-7-19 16:32:31",
	    		},
	    		
	    		{
	    			order_name:"校验码：",
	    			order_content:"9256",
	    		},
	    	],
	    };
  	}
}
</script>

<style lang="scss">
@import "../../../common/scss/base.scss";
.paySuccess {
	padding: 24px;
  .success_icon {
  	margin: 20px auto 10px;
  	img{
  		height: 80px;
  		margin: 0 auto;
  		display: block;
  	}
  }
  .pay_money{
  	color: $theme-color;
  	font-size: 36px;
  	display: flex;
  	justify-content: center;
  	text{
  		color: $theme-color;
  		font-size: 36px;
  	}
  }
  .payToStore{
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
  	padding: 10px 0 80px;
  	.order_list{
  		display: flex;
      justify-content: space-between;
  		margin-top: 14px;
  		.order_left{
  			text{
  				color: $text-sup-color;
  				font-size: $sup-text-size;
  			}
  		}
  		.order_right{
  			text{
  				color: $text-normal-color;
  				font-size: $sup-text-size;
  			}
  		}
  	}
  }
  .payoff_btn{
  	width: 204px;
  	height: 42px;
  	@include main-gradients;
		display: flex;
    justify-content: center;
    align-items: center;
		font-size: $normal-text-size;
		color: #fff;
		border-radius: 21px;
		margin: 0 auto;
  }
  .consumer_order{
  	font-size: $sup-text-size;
  	color: $sup-color;
  	text-decoration: underline;
  	display: flex;
  	justify-content: center;
  	margin-top: 25px;
  }
}
</style>
