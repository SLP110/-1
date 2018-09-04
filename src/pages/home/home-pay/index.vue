<template>
    <div id="myplay">
            <div class="top" style="background: url('./../../../common/img/icon_scavenging_bg.png');">
                <img src="./../../../common/img/icon_scanning.png" alt="">
            </div>
            <div class="foot">
                    <div class="cont">
                            <p>【使用说明】</p>
                            <p><span>·</span>扫描指定超萌金台服务卡二维码</p>
                            <p><span>·</span>使用您已购买的优惠券</p>
                            <p><span>·</span>点击付款完成用券操作</p>
                    </div>
            </div>

               <!-- 底部导航 -->
        <div class="bottom-nav" @click="navChange('./../home/main', $event)">
                <div class="nav-item">
                        <img class="nav-icon" mode="widthFix" src="../../../common/img/icon_home_normal.png" v-show="navSelect != 0"/>
                        <img class="nav-icon" mode="widthFix" src="../../../common/img/icon_home_press.png" v-show="navSelect == 0"/> 
                        <text class="nav-text" :class="{'nav-text--selected': navSelect == 0}">首页</text>  
                </div>

                <div class="nav-item nav-item-center" @click="navChange('./../../../person/main', $event)"></div>
                <button open-type="getUserInfo" class="nav-item" >
                        <img class="nav-icon" mode="widthFix" src="../../../common/img/icon_me_normal.png" v-show="navSelect != 2"/> 
                        <img class="nav-icon" mode="widthFix" src="../../../common/img/icon_me_press.png" v-show="navSelect == 2"/> 
                        <text class="nav-text" :class="{'nav-text--selected': navSelect == 2}">我的</text>  
                </button>
                
                <button open-type="getUserInfo" class="scan-item" >
                        <div class="btn-scan">
                        <img class="btn-scan-icon" src="../../../common/img/icon_scan.png" mode="widthFix">
                        </div>
                        <text class="btn-scan-text" :class="{'btn-scan-text--selected': navSelect == 1}">付款</text>
                </button>
        </div>
    </div>
</template>


<script>
export default {
   data(){
        return {
            
        }
    },
    methods:{
                    // 导航跳转
        async navChange(url, event) {
                console.log(url)
            wx.navigateTo({
                url: url　　// 页面 A
                })
        },
    },
    computed:{

    }
}
</script>

<style lang="scss" >
 @import "../../../common/scss/base.scss";
#myplay{
        width: 100;
        .top{
                width: 100%;
                height: 500rpx;
                img{
                        width: 180rpx;
                        height: 180rpx;
                        // margin: auto;
                        margin-left: 300rpx;
                        margin-top: 100rpx;
                }
                
        }
        .foot{
                width: 100%;
                .cont{
                        width: 80%;
                        background: #ccc;
                        margin: auto;
                        padding: 50rpx;
                        margin-top: 80rpx;
                        p{
                                height: 50rpx;
                                line-height: 50rpx; 
                                span{
                                        font-size: 30rpx;
                                        margin-right: 40rpx;
                                }  
                        }
                        // p:nth-child(1){
                        //         height: 50rpx;
                        //         line-height: 50rpx;
                        // }
                }
                
        }
}




  /* 底部导航栏 */
  .bottom-nav {
    position: fixed;
    height: 50px;
    background: #fff;
    bottom: 0px;
    left: 0px;
    width: 100%;
    display: flex;
    border-top: 1px solid $border-color;
    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 2;
      line-height: normal;
      margin: 0px;
      padding: 0px;
      background: transparent;
      border: 1px solid #fff;
      &::after {
        display: none;
      }
      .nav-icon {
        width: 20px;
        height: 20px;
      }
      .nav-text {
        color: $text-sup-color;
        font-size: $sup-text-size;
        margin-top: 4px;
      }
      .nav-text--selected {
        color: $theme-color;
      }
    }
    .nav-item-center {
      flex: 1;
    }
    .scan-item {
      position: absolute;
      top: -22.5px;
      left: 50%;
      padding: 0px;
      margin: 0px;
      margin-left: -22.5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: transparent;
      line-height: normal;
      overflow: inherit;
      &::after {
        display: none;
      }
      .btn-scan {
        width: 45px;
        height: 45px;
        padding: 5px;
        background: #fff;
        border-radius: 50%;
        position: relative;
        @include shadow-top;
        .btn-scan-icon {
          display: block;
          position: absolute;
          width: 45px;
          height: 45px;
        }
      }
      .btn-scan-text {
        color: $text-sup-color;
        font-size: $sup-text-size;
      }
      .btn-scan-text--selected {
        color: $theme-color;
      }
    }
  }
</style>


