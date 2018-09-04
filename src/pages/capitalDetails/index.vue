<template>
  <section class="capitalDetails">
	<div class="no-data" v-if="capitalDetails_list.length <= 0" >
		<div class="img-con">
		<img src="../../common/img/icon_no_data.png" mode="widthFix">
		<div class="mask"></div>
		</div>
		<text>暂无消费明细</text>
	</div>
  	<div class="capitalDetails_ul" v-if="capitalDetails_list.length >= 0">
  		<div class="capitalDetails_li" v-for="(v,index) in capitalDetails_list" :key="index">
  			<div class="capitalDetails_li_left">
  				<div class="capitalDetails_name">{{v.remark}}</div>
  				<div class="capitalDetails_time">{{v.pay_time}}</div>
  			</div>
  			<div class="capitalDetails_li_right">
  				<div class="capitalDetails_moneyUp" v-if="v.change_type == 1">+{{v.change_amount}}</div>
  				<div class="capitalDetails_moneyDown" v-else>-{{v.change_amount}}</div>
  			</div>
  		</div>
  	</div>
  </section>
</template>

<script>
import http from "../../common/js/http";
export default {
  async mounted() {
    await this.getRecord();
  },
  data() {
    return {
      capitalDetails_list: []
    };
  },
  methods: {
    async getRecord() {
      this.capitalDetails_list = [];
      let Record = await this.$http.post("/user/amhistory");
      if (Record.length > 0) {
        for (let i = 0; i < Record.length; i++) {
          let xsd = Record[i].change_amount.toString().split(".");
          if (xsd.length == 1) {
            Record[i].change_amount =
              Record[i].change_amount.toString() + ".00";
          }
          if (xsd.length > 1) {
            if (xsd[1].length < 2) {
              Record[i].change_amount =
                Record[i].change_amount.toString() + "0";
            }
          }
        }
        this.capitalDetails_list = this.capitalDetails_list.concat(Record);
      } else {
        wx.showToast({
          title: "暂无收支记录",
          icon: "none"
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../common/scss/base.scss";
page {
  background: $bg-color;
}
.capitalDetails {
  margin-top: 12px;
  .capitalDetails_ul {
    padding: 0 13px;
    background: #fff;
    .capitalDetails_li {
      padding: 17px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid $border-color;
      &:last-child {
        border-bottom: 0px;
      }
      .capitalDetails_li_left {
        .capitalDetails_name {
          font-size: $main-text-size;
          color: $text-normal-color;
        }
        .capitalDetails_time {
          margin-top: 6px;
          font-size: $sup-text-size;
          color: $text-sup-color;
        }
      }
      .capitalDetails_li_right {
        .capitalDetails_moneyDown {
          font-size: 17px;
          color: $text-normal-color;
        }
        .capitalDetails_moneyUp {
          font-size: 17px;
          color: #e9382e;
        }
      }
    }
  }
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
