<template>
  <section class="getSuccess">
  	<div class="first">
  			<text class="sendMoney_tips">{{sendMoney}}元</text>
        <img class="bg" src="../../../common/img/get/img_new_red_envelopes_detailed_rules_of_the_activities.png" mode="widthFix">
    </div>
    <div class="second">
        <img class="bg" src="../../../common/img/code/img_new_red_envelopes_bg_2.png" mode="widthFix">
        <div class="input-con">
            <div class="user-img">
                <open-data type="userAvatarUrl"></open-data>
            </div>
            <div class="user-name">
            	<open-data type="userNickName"></open-data>
            </div>
            <div class="tips">太棒啦，你领到{{sendMoney}}元新用户红包,到小程序里逛逛看有哪些想要的优惠券，快去下单用掉它吧！</div>
            <div class="coupon">
                <img  src="../../../common/img/icon_voucher_red_envelopes.png" class="coupon-img" mode="widthFix">
                <div class="text-con">
                    <div class="text-con-left">
                        <div class="title">新用户红包</div>
                        <div class="time">有效期至活动结束</div>
                    </div>
                    <div class="text-con-right">
                        <text>￥</text>{{sendMoney}}
                    </div>
                </div>
            </div>
            <div class="phone">手机号: {{userPhone}}</div>
            <div class="btn-jump-mini" @click="toIndex">去小程序逛逛</div>
            <button class="btn-share" open-type="share">邀请好友领取赚{{returnMoney}}元</button>
        </div>
    </div>
    <div class="third">
        <img class="bg" src="../../../common/img/code/img_new_red_envelopes_2.png" mode="widthFix">
        <div class="rule-content">
            <div class="rule">1.红包仅限超盟U品新用户领取</div>
            <div class="rule">2.同一手机号、同一微信号视为同一用户</div>
            <div class="rule">3.红包会在领取成功后48小时内发放入您的账号，您可在超盟U品小程序中查看</div>
            <div class="rule">4. 最终解释权，归超盟U品所有</div>
        </div>
    </div>
  </section>
</template>

<script>
import http from "../../../common/js/http";
export default {
	async mounted() {
	    this.actId = this.$root.$mp.query.act_id;
	    this.Sid = this.$root.$mp.query.sid;
	    this.Token = this.$root.$mp.query.token;
	    this.userPhone = this.$root.$mp.query.phone;
	    await this.getData();
	},
	data() {
	    return {
	    	Sid:'',
	    	Token:'',
	    	actId: '',
	    	sendMoney:'',
	    	returnMoney:'',
	    	userPhone:'',
	    	actShareImg:'',
	    	shareuId:'',
	    	shareTitle:''
	    };
	},
	methods:{
		async getData(){
			let redBagCard = await this.$http.post("/user/getsuccess", {
        act_id: this.actId,
        sid: this.Sid,
        token: this.Token,
      });
      this.sendMoney = redBagCard.send_money;
      this.returnMoney = redBagCard.return_money;
      this.actShareImg = redBagCard.act_share_img;
      this.shareuId = redBagCard.uid;
      this.shareTitle = redBagCard.act_share_words;
		},
		toIndex(){
			wx.navigateTo({
	      url: '/pages/index/main'
	    });
		}
	},
	onShareAppMessage: function(res){
    return {
      title: this.shareTitle,
      path: `pages/newPeople/getRedBag/main?act_id=${this.actId}&uid=${this.shareuId}`,
      imageUrl: this.actShareImg,
      success: async(res) => {
  			let saveAct = await this.$http.post("/user/saveactbymobile", {
	        act_id: this.actId,
	        is_applet: 1,
	        mobile: this.userPhone,
	      });
	      console.log(saveAct);
      },
      fail: (res) => {
      	wx.showToast({
          title: "转发失败",
          icon: "none"
        });
      }
    }
	}
}
</script>

<style lang="scss">
@import "../../../common/scss/base.scss";
.getSuccess{
	.first, .second, .third {
    position: relative;
    .bg{
    	width: 100%;
    	display:block;
    }
	}
	.first{
		.sendMoney_tips{
			position: absolute;
			left: 0;
			top: 30px;
			font-size: 84px;
			-webkit-text-stroke: 3px #FFB991; 
			font-weight: bold;
			text-align: center;
			width: 100%;
			color: #fff;
		}
	}
	.second {
		.input-con {
		    width: calc(100% - 40px);
		    height: 100%;
		    position: absolute;
		    background: #fff;
		    top: 0px;
		    left: 20px;
		    padding: 20px 16px;
		    box-sizing: border-box;
		    .user-img {
          margin: 0 auto;
          width: 44px;
	        height: 44px;
	        background: red;
	        border-radius: 50%;
	        overflow: hidden;
        }
        .user-name {
            text-align: center;
            font-size: $normal-text-size;
            font-weight: bold;
            margin: 8px 0;
        }
        .tips {
        		color: $text-sup-color;
            font-size: $sup-text-size;
            padding: 0 14px;
            text-align: center;
            line-height: 20px;
        }
        .coupon {
            margin-top: 16px;
            position: relative;
            .coupon-img {
		            width: 100%;
		        }
		        .text-con {
		            position: absolute;
		            box-sizing: border-box;
		            width: 100%;
		            height: 100%;
		            padding: 0px 24px;
		            top: 0px;
		            left: 0px;
		            display: flex;
		            align-items: center;
		            justify-content: space-between;
		            .text-con-left{
		            		.title {
						            font-size: $normal-text-size;
						            font-weight: 600;
						            color: $text-normal-color;
				            }
				            .time {
						            color: $text-sup-color;
						            font-size: $main-text-size;
						            margin-top: 8px;
						        }
				        }
				        .text-con-right {
				            font-size: 32px;
				            color: #F15D53;
				            text {
						            font-size: 24px;
						            color: #F15D53;
						        }
				        }
		        }
        }
        .phone {
            color: $text-normal-color;
            font-size: $main-text-size;
            text-align: center;
            padding: 8px 0px;
        }
        .btn-jump-mini {
            padding: 14px 0px;
            font-size: $main-text-size;
            border-radius: 40px;
            color: #fff;
            background: linear-gradient(0deg,rgba(244,57,49,1),rgba(252,86,80,1));
            width: 70%;
            margin-left: 15%;
            text-align: center;
        }
        .btn-share {
            box-sizing: border-box;
            padding: 14px 0px;
            font-size: $main-text-size;
            border-radius: 38px;
            border: 1px solid #F43A32;
            color: #F43A32;
            width: 70%;
            margin-left: 15%;
            text-align: center;
            margin-top: 12px;
            line-height: normal;
				    background-color:transparent;
				    &::after {
				    	display: none;
				    }
        }
		}
	}
	.third{
		.rule-content {
	    position: absolute;
	    top: 0px;
	    font-size: $sup-text-size;
	    color: #36383A;
	    padding: 48px; 
	    top: 64px;
		}
		.rule-content .rule {
		    line-height: 24px;
		    margin-top: 4px;
		}
	}
}

</style>
