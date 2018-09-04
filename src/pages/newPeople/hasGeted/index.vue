<template>
  <section class="hasGeted">
  	<div class="first">
  			<text class="sendMoney_tips">{{sendMoney}}元</text>
        <img class="bg" src="../../../common/img/get/img_new_red_envelopes_detailed_rules_of_the_activities.png" mode="widthFix">
    </div>
    <div class="second">
        <img class="bg" src="../../../common/img/old/img_new_red_envelopes_bg_4.png" mode="widthFix">
        <div class="input-con">
            <div class="user-img">
                <open-data type="userAvatarUrl"></open-data>
            </div>
            <div class="user-name">
            	<open-data type="userNickName"></open-data>
            </div>
            <div class="tips">
            	<text>您好，老朋友</text>
            	<text>红包仅限新用户领取哦</text>
            </div>
            <div class="phone">手机号: {{phone}}</div>
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
	    this.uId = this.$root.$mp.query.uid;
	    this.phone = this.$root.$mp.query.phone;
	    await this.getData();
	},
	data() {
    return {
    	actId:'',
    	uId:'',
    	phone:'',
    	sendMoney:'',
    	returnMoney:'',
    	shareuId:'',
    	shareTitle:''
    };
	},
	methods:{
		async getData(){
			let hasgeted = await this.$http.post("/user/hasgeted", {
		    act_id: this.actId,
		    uid: this.uId,
		    mobile: this.phone
		  });
      this.sendMoney = hasgeted.send_money;
      this.returnMoney = hasgeted.return_money;
      this.actShareImg = hasgeted.act_share_img;
      this.shareuId = hasgeted.uid;
      this.shareTitle = hasgeted.act_share_words;
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
	        mobile: this.phone,
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
.hasGeted{
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
            text{
            	display: block;
            	color: $text-sup-color;
	            font-size: $main-text-size;
	            padding: 0 14px;
	            text-align: center;
	            line-height: 20px;
            }
        }
        .phone {
            color: #36383A;
            font-size: $main-text-size;
            text-align: center;
            padding: 24px 0px;
        }
        .btn-share {
            box-sizing: border-box;
            padding: 14px 0px;
            font-size: $main-text-size;
            border-radius: 38px;
            color: #fff;
            background: linear-gradient(0deg,rgba(244,57,49,1),rgba(252,86,80,1));
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
