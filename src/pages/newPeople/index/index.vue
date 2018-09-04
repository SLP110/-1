<template>
  <section class="newPeople">
  	<div class="first">
        <img class="bg" src="../../../common/img/img_bg_share_one.png" mode="widthFix">
        <text class="sendMoney_tips">送{{returnMoney}}元红包</text>
        <button class="btn-share" open-type="share">
            <img src="../../../common/img/icon_share_button.png" mode="widthFix">
            <text class="btn-text">邀请好友赚{{returnMoney}}元</text>
        </button>
    </div>
    <div class="second">
        <img src="../../../common/img/img_bg_accumulation_of_gifts.png"  class="bg" mode="widthFix">
        <div class="get-info-con">
           <div class="item">
               <div class="show">{{noReapPacket}}元</div>
               <div class="title">红包在路上</div>
           </div>
           <div class="item">
                <div class="show">{{reapPacket}}元</div>
                <div class="title">累计获得</div>
           </div>
           <div class="item">
                <div class="show">{{actUserTotal}}人</div>
                <div class="title">成功邀请</div>
           </div>
        </div>
    </div>
    <div class="third">
        <img src="../../../common/img/img_detailed_rules_of_the_activities.png" class="bg" mode="widthFix">
        <div class="rule-content">
            <div class="rule">1.活动时间：2018年08月01日-2018年08月31日24点</div>
            <div class="rule">2.好友领取您送出的红包，并在活动时间内完成买券，无论是否使用领取的红包，您均可获得10元红包奖励</div>
            <div class="rule">3.红包会在邀请成功后48小时内发放入您的账号，您可在超盟U品小程序中查看</div>
            <div class="rule">4.你能邀请的好友必须是超盟U品的新用户，同一手机号同一微信号视为同一用户</div>
            <div class="rule">5.如有其他疑问请咨询超盟U品客服</div>
        </div>
    </div>
  </section>
</template>

<script>
import http from "../../../common/js/http";
export default {
	async mounted() {
	    this.actId = this.$root.$mp.query.actId;
	    await this.getData();
	},
	data() {
	    return {
	    	actId:'',
	    	noReapPacket: 0,
	    	reapPacket: 0,
	    	actUserTotal: 0,
	    	actShareImg: '',
	    	returnMoney: 0,
	    	uId:0,
	    	shareTitle:''
	    };
	},
	methods:{
		async getData(){
			let data = await this.$http.post("/user/index", {
        act_id: this.actId
      });
      this.noReapPacket = data.no_reap_packet;
      this.reapPacket = data.reap_packet;
      this.actUserTotal = data.act_user_total;
      this.actShareImg = data.act_share_img;
      this.returnMoney = data.return_money;
      this.uId = data.uid;
      this.shareTitle = data.act_share_words;
		}
	},
	onShareAppMessage: function(res){
    return {
      title: this.shareTitle,
      path: `pages/newPeople/getRedBag/main?act_id=${this.actId}&uid=${this.uId}`,
      imageUrl: this.actShareImg,
      success: async(res) => {
  			let saveAct = await this.$http.post("/user/saveact", {
	        act_id: this.actId,
	        is_applet: 1,
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
.newPeople{
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
			font-size: 36px;
			font-weight: bold;
			text-align: center;
			left:0;
			top:130px;
			width:100%;
			color:#fff;
		}
		.btn-share {
	    position: absolute;
	    bottom: 38px;
	    z-index: 99;
	    left: 50%;
	    margin-left: -115px;
	    line-height: normal;
	    background-color:transparent;
	    &::after {
	    	display: none;
	    }
	    img {
	    	width:200px;
	    	display: block;
	    }
    	.btn-text {
        font-size: $main-text-size;
        color: #fff;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -8px;
        left: 0;
    	}
		}
	}
	.second {
		.get-info-con {
	    position: absolute;
	    top: 0px;
	    left: 0px;
	    padding: 0 52px; 
	    padding-top: 24px;
	    font-size: $main-text-size;
	    display: flex;
	    align-items: center;
	    width: calc(100% - 104px);
	    height: 100%;
    	.item {
	        flex: 1;
	        text-align: center;
	        .show {
			        font-size: 24px;
			        font-weight: bold;
			    }
			    .title {
			        font-size: $main-text-size;
			        color: $text-sup-color;
			        margin-top: 8px;
			    }
	    }
	  }
	}
	.third{
		.rule-content {
	    position: absolute;
	    top: 0px;
	    padding: 48px 42px; 
	    top: 48px;
	    .rule {
	    		font-size: $sup-text-size;
	    		color: $text-normal-color;
			    line-height: 24px;
        	margin-top: 4px;
			}
		}
	}
}
</style>
