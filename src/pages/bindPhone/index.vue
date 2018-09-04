<template>
    <section class="bind-phone">
        <div class="tips">
            请绑定你的手机号， 手机号仅用于登录和修改密码，并严格保密。
        </div>

        <div class="input-group">
            <div class="input-cell">
                <text class="label">手机号</text>
                <input v-model="phone" class="input" type="number" placeholder="请输入手机号码">  
            </div>
            <div class="input-cell">
                <text class="label">验证码</text>
                <div class="inpu-btn">
                    <input v-model="smsCode" class="input" type="number" placeholder="请输入验证码"> 
                    <text class="btn-send" @click="sendSms">{{btnSmsText}}</text>    
                </div> 
            </div>
        </div>

        <div class="paper">
             <img v-if="!checkboxValue" @click="checkBoxChange" src="../../common/img/icon_choice_normal.png" mode="widthFix" class="checkbox-img">
             <img v-if="checkboxValue" @click="checkBoxChange" src="../../common/img/icon_choice_press.png" mode="widthFix" class="checkbox-img">
             <text>同意超盟有品用户协议</text>
        </div>
         <button class="btn-bind" open-type="getUserInfo"  @getuserinfo="onGotUserInfo">确认绑定</button> 
        <!-- <div class="btn-bind" @click="bindPhone">
            确认绑定
        </div> -->
    </section>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      phone: "",
      smsCode: "",
      smsFlag: true,
      btnSmsText: "获取验证码",
      checkboxValue: false,
      userImg: "",
      userName: ""
    };
  },
  methods: {
    async onGotUserInfo(e) {
      console.log(e);
      this.userImg = e.target.userInfo.avatarUrl;
      this.userName = e.target.userInfo.nickName;
      await this.bindPhone();
    },
    checkBoxChange() {
      this.checkboxValue = this.checkboxValue ? false : true;
    },
    async sendSms() {
      const rex = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (this.phone == "") {
        wx.showToast({
          title: "手机号不能为空",
          icon: "none"
        });
        return;
      }
      if (!rex.test(this.phone)) {
        wx.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return;
      }
      if (this.smsFlag) {
        //发请求
        this.smsFlag = false;
        try {
          await this.$http.post("/user/sendmsgcode", {
            action: "bound",
            mobile: this.phone,
            wx_unionid: wx.getStorageSync("uid")
          });
          let seconds = 60;
          this.btnSmsText = seconds + "s";

          let timer = setInterval(() => {
            seconds--;
            if (seconds <= 0) {
              this.btnSmsText = "获取验证码";
              this.smsFlag = true;
              clearInterval(timer);
            } else {
              this.btnSmsText = seconds + "s";
            }
          }, 1000);
        } catch (error) {
          this.smsFlag = true;
        }
      }
    },
    async bindPhone() {
      const rex = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (this.phone == "") {
        wx.showToast({
          title: "手机号不能为空",
          icon: "none"
        });
        return;
      }

      if (!rex.test(this.phone)) {
        wx.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return;
      }
      if (this.smsCode == "") {
        wx.showToast({
          title: "请输入验证码",
          icon: "none"
        });
        return;
      }
      if (!this.checkboxValue) {
        wx.showToast({
          title: "请勾选用户协议",
          icon: "none"
        });
        return;
      }

      let res = await this.$http.post("/user/bindmobile", {
        mobile: this.phone,
        code: this.smsCode,
        unionid: wx.getStorageSync("uid"),
        head_img: this.userImg,
        nickname: this.userName,
        action: "bound"
      });
      wx.setStorageSync("userInfo", res.user_info);
      wx.setStorageSync("tokenInfo", res.token_data);
      
      wx.navigateTo({
        url: "/pages/index/main"
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../common/scss/base.scss";
.bind-phone {
  padding: 35px;
  .tips {
    font-size: $sup-text-size;
    color: $text-sup-color;
  }
  .input-group {
    margin-top: 40px;
    .input-cell {
      margin-bottom: 10px;
      .label {
        font-size: $sup-text-size;
        color: $text-sup-color;
      }
      .input {
        font-size: $main-text-size;
        padding: 5px 0px;
        color: $text-normal-color;
        border-bottom: 1px solid $border-color;
      }
      .inpu-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid $border-color;
        .input {
          border-bottom: 0px;
        }
        .btn-send {
          font-size: $sup-text-size;
          color: $sup-color;
        }
      }
    }
  }
  .paper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    .checkbox-img {
      width: 12px;
      height: 12px;
      display: inline-block;
    }
    text {
      font-size: $sup-text-size;
      color: $text-sup-color;
      margin-left: 10px;
    }
  }
  .btn-bind {
    width: 80%;
    margin-left: 10%;
    padding: 10px 0px;
    color: #fff;
    font-size: $main-text-size;
    text-align: center;
    border-radius: 30px;
    @include main-gradients;
    margin-top: 40px;
    line-height: normal;
  }
}
</style>
