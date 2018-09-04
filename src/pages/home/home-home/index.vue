<template>
    
<div id='home'>
        <img class="top-con-bg" mode="widthFix" src="../../../common/img/icon_home_bg.png" />

        <!-- 轮播图 -->
        <div class='scrollAd'>
                <swiper :indicator-dots="indicatorDots"
                :autoplay="swiper.autoplay" :interval="swiper.interval" :duration="swiper.duration">
                        <div v-for="(item,index) in imgUrls" :key="index">
                                <swiper-item>
                                <img :src="item.url" class="slide-img" width="355" height="150"/>
                                </swiper-item>
                        </div>
                </swiper>
        </div>
        <!-- 内容区 -->
        <div class='content'>
                <!-- 每一个list（每一个框框） -->
                <div class='box' v-for='(item,index) in myData' :key='index' >
                <!-- 左边图片区域  -->
                        <div class='left'>
                                <img :src='item.imgURL'/>
                                <!-- <img src='./../../common/img/home/xbk.png'/> -->
                        </div>
                        <!-- 右边内容区域 -->
                        <div class='right'>
                                <div>
                                        <div class='title'>
                                                <span>{{item.title}}</span>
                                                <span class='disc'>{{item.disc}}</span>

                                        </div>
                                
                                        <div class="name">{{item.name}}</div>
                                        <div style="color:red;margin-top:20rpx;">￥{{item.nowPrice}}</div>
                                </div>
                                <div class='bottom'>
                                <!-- <span>{{item.price}}</span> -->
                                <button class='btn' @click='showBox(index)'>购买</button>
                                </div>
                        </div>
                </div>
        
        </div>

        <!-- 弹框背景区域 -->
        <div v-if="show" class='showBox' @click='hiddenBox()'>

        </div>
        <!-- 弹框内容区 -->
        <div class="showCont" v-if="show">
                <!-- 弹框图片 -->
                     <!-- <img class="topImg" src='./../../common/img/home/xbk.png'/> -->
                     <img class="topImg" :src='imgURL'/>
                <div class="showContText">
                        <div class="left">
                              <!-- <img src='./../../common/img/home/xbk.png'/> -->
                              <img :src='imgURL'/>
                        </div>
                        <div class="right">
                        <div>
                                <span class="title">{{title}}</span>
                                <span class="jian" @click='clickReduce()'>-</span>
                                <span class="num">{{num}}</span>
                                <span class="ja" @click='add()'>+</span>
                        </div>

                        <div>
                                <span class="nowPrice">￥{{nowPrice}}</span>
                                <span class="oldPrice">￥{{price}}</span>
                                <span class="reduce">仅剩{{reduce}}张</span>
                        </div>
                        </div>

                </div>
                <div class="car">
                        <div> 
                                <img class="carLogo" src='../../../common/img/xbk.png'/>
                        </div>
                
                        <div style='font-size:24rpx;'>合计应付：</div>
                        <div class="price">￥{{totle}}</div> 
                        <div class="goToPaly">去支付</div>   
                </div>


        </div>

          <!-- 底部导航 -->
        <div class="bottom-nav">
                <div class="nav-item">
                        <img class="nav-icon" mode="widthFix" src="../../../common/img/icon_home_normal.png" v-show="navSelect != 0"/>
                        <img class="nav-icon" mode="widthFix" src="../../../common/img/icon_home_press.png" v-show="navSelect == 0"/> 
                        <text class="nav-text" :class="{'nav-text--selected': navSelect == 0}">首页</text>  
                </div>

                <div class="nav-item nav-item-center"></div>
                <button open-type="getUserInfo" class="nav-item" @getuserinfo="navChange('./../../person/main', $event)">
                        <img class="nav-icon" mode="widthFix" src="../../../common/img/icon_me_normal.png" v-show="navSelect != 2"/> 
                        <img class="nav-icon" mode="widthFix" src="../../../common/img/icon_me_press.png" v-show="navSelect == 2"/> 
                        <text class="nav-text" :class="{'nav-text--selected': navSelect == 2}">我的</text>  
                </button>
                
                <button open-type="getUserInfo" class="scan-item" @getuserinfo="navChange('./../../myplay/main', $event)">
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
        return{
            swiper:{
                indicatorDots: false,
                autoplay: false,
                interval: 300,
                duration: 300
            },


            myData:[
                {imgURL:'./../../common/img/xbk.png',title:'100元代金券',name:'星巴克',price:200,disc:'200',nowPrice:50,num:0,reduce:10},
                {imgURL:'./../../common/img/xbk.png',title:'100元代金券',name:'麦当劳',price:100,disc:'100',nowPrice:60,num:0,reduce:5},
                {imgURL:'./../../common/img/xbk.png',title:'100元代金券',name:'肯德基',price:300,disc:'250',nowPrice:70,num:0,reduce:50},
            ],
        
            imgUrls: [
                {url:'./../../common/img/scroll.png'},
                {url:'./../../common/img/scroll.png'},
                {url:'./../../common/img/scroll.png'},
            ],
            show:false,
            index:'',//用于保存用户点击的第几个数据从而可以读出对应的myData数据在弹框里面操作

            
            price:0,//弹框显示的价格
            nowPrice:0,//弹框显示的现在价格
            num:0,//弹框显示的数量
            reduce:0,//弹框显示的剩余量
            title:0,//弹框显示的标题
            totle:0,//弹框显示的总价格
            imgURL:'',//弹框显示的img路径

            latitude:'',
            longitude:''
        }
    },
    async mounted() {
        wx.getLocation({//微信获取地理位置功能（API固定格式）
                type: 'wgs84',
                success:(res) =>{//获取成功
                        this.latitude=res.latitude
                        this.longitude=res.longitude
                        this.getData()
                },
                fail:()=>{//获取失败
                        this.latitude=''
                        this.longitude=''
                        this.getData();
                }
        });


            
    },
    async onReachBottom() {
    
    },
    async onPullDownRefresh() {
        
    },
    methods:{
        async getData() {
                var url='/user/nearbrandcoupons';//请求的url
                var obj={//传给后台的参数
                        longitude:this.longitude,
                        latitude: this.latitude,
                        page: 1,
                        page_num: 5  
                }
                let res = await this.$http.post(url,obj);//发送请求并接受后台返回的数据  await表示停在这里等待后台响应后在执行下一步
                console.log(res);
               
               this.myData=[]//清空myData
                //        循环数据  item就表示了一条数据，  item.imgURL=item.logo_photo;表示在item里面添加了imgURL属性同时添加其他属性，并把item push到myData里面
                for(var item of res.coupons_info){
                        item.imgURL=item.logo_photo;//图片路径
                        item.title=item.coupon_name;//标题
                        item.name=item.brandshop_name;//店名称
                        item.price=Number(item.sale_price);//售价
                        item.disc=item.distance;//距离
                        item.nowPrice=Number(item.sale_price);//折扣后的价格
                        item.num=0;//购买量
                        item.reduce=Number(item.remaining_num);//剩余量
                        this.myData.push(item);
                }

                
        },
          // 点击购买触发showBox显示弹框
        showBox(index){
            this.price=this.myData[index].price;
      
            this.nowPrice=this.myData[index].nowPrice;
            this.num=this.myData[index].num;
            this.reduce=this.myData[index].reduce;
            this.imgURL=this.myData[index].imgURL;
            this.title=this.myData[index].name+this.myData[index].title;
            this.index=index;//保存点击的对应第几行的数据
            this.show=true;
        },
        // 点击触发hiddenBox隐藏弹框
        hiddenBox:function(){
                this.show=false;
        },
        //点击减少按钮
        clickReduce(){
                this.num--;
                if(this.num<0){
                wx.showToast({
                        title: '数量不能小于零',
                        icon: 'none',
                        duration: 1000
                })
                this.num++;
                return;
                };
                this.reduce++;
                // this.totle-=this.nowPrice;
                this.totle=Number((this.totle-this.nowPrice).toFixed(2));//总价钱改变
                this.myData[this.index].num=this.num
                this.myData[this.index].reduces=this.reduces

        },
        // 点击增加
        add(){
                this.reduce--;
                if(this.reduce<0){//判断如果剩余量小于0,给提示并中断函数
                        wx.showToast({
                                title: '数量不能大于所剩余量',
                                icon: 'none',
                                duration: 1000
                        })
                        this.reduce++;
                        return;
                };
                //如果不大于则数量+1  总价格加上一个单价的值
                this.num++;//数量++
                this.totle=Number((this.totle+this.nowPrice).toFixed(2));//总价钱改变
                this.myData[this.index].num=this.num
                this.myData[this.index].reduces=this.reduce


        },
    },
    filters:{
            strSplic(value){
                 
                    var str=value
                       console.log(str.length);
                    if(str.length>5){
                            return str.slice(0,5)
                    }else{
                            return value
                    }
            }
    },
}
</script>
<style lang="scss">
@import "../../../common/scss/base.scss";

/* pages/home/home.wxss */
/* *{
        margin:0;
        padding:0;
} */
page{
          height: 100%;
}
#home{
        height: 100%;
        .top-con-bg{
                position: absolute;
                width: 100%;
                display: block;
        }
        // overflow: hidden;
}
.scrollAd{
    width: 95%;
    height: 360rpx;
    margin: auto;
    border-radius: 20rpx;
//     margin-top: 300rpx;
      

    /* margin-top: 100rpx; */
}

.scrollAd img{
    width: 100%;
    height: 100%;
     border-radius: 20rpx;
}
.content{
        width:100%;
}
.content .box{
        width: 90%;
        height: 250rpx;
        margin:auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        font-size: 30rpx;
        position: relative;
}
.content .box .left{
        width:40%;
        height: 100%;
}

.content .box .left img{
        width:80%;
        height: 80%;
        /* line-height: 80px; */
}
 .content .box .right{
        width:60%;
        height: 100%;
}

 .content .box .right .title{
   margin-top:20rpx;
   margin-bottom: 20rpx;

 }

.content .box .right .title span:nth-child(1){
        display: inline-block;
        width: 300rpx;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size: 32rpx;
        font-weight: 600;
}
.content .box .right .name{
        width: 150rpx;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
}
  .content .box .right .title .disc{
    color: #ccc;

  }
.content .box .right  .bottom .btn{
        width:160rpx;
        height: 50rpx;
        line-height: 50rpx;
        font-size: 24rpx;
        background: orange;
        position: absolute;
        bottom:80rpx;
        right: 80rpx;
} 

#home .showBox{
        width: 100%;
        height: 100%;
        /* color: rebeccapurple; */
        position: fixed;
        top: 0;
        left: 0;
        background:black;
        opacity: .5;
        z-index: 5;
}
#home .showCont{
        width: 100%;
        /* height: 400rpx; */
        background: #fff;
        z-index: 6;
        opacity:100%;
        position: fixed;
        bottom: 0rpx;
        left: 0rpx;
}

#home .showCont  .topImg{
        width: 200rpx;
        height: 200rpx;
        position: absolute;
        top:-50rpx;
        left: 35%;
        border-radius: 200rpx;
} 
#home .showCont .showContText{
        margin-top: 160rpx;
        display: flex;
        flex-flow: row nowrap;
}
#home .showCont .showContText .left{
        width: 25%;
        height: 200rpx;
        /* text-align: center; */
        margin-left: 20rpx;

}
#home .showCont .showContText .left img{
        width: 100%;
        height: 100%;
}
#home .showCont .showContText .right{
        font-size: 30rpx;
        
}
#home .showCont .showContText .right view{
        margin-bottom: 40rpx;
}
#home .showCont .showContText .right .title{
        margin-left:20rpx;
        margin-right:20rpx; 
        
        display: inline-block;
        width: 310rpx;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
}
#home .showCont .showContText .right .jian,#home .showCont .showContText .right .ja{
        display: inline-block;
        width: 40rpx;
        height: 40rpx;
        /* background:red; */
        text-align: center;
        line-height: 40rpx;
        border-radius:40rpx;
        border: 1px solid black;
        margin-right:10rpx; 
        color: #6ac3af;
}
#home .showCont .showContText .right .num{
        margin: 0rpx 10rpx;
}
#home .showCont .showContText .right .ja{
        background: #6ac3af;
        color: #fff;

}
#home .showCont .showContText .right .nowPrice{
        /* width: 20%; */
        color: red;
        margin-left:20rpx; 
        margin-right: 20rpx;
}
#home .showCont .showContText .right .oldPrice{
        color: #ccc;
        margin-right: 140rpx; 
        text-decoration:line-through
}
#home .showCont .showContText .right .reduce{
        font-size: 24rpx;
        color: #fcb9ac;

}
#home .showCont .car{
        width: 100%;
        height: 70rpx;
        /* background: red; */
        border-top: 1px solid #ccc;
        margin-top: 150rpx;
        padding-top:50rpx; 
        display: flex;
        flex-flow: row nowrap;
        line-height: 50rpx;
        overflow: hidden;
        padding-bottom: 20rpx;
}
#home .showCont .car .carLogo{
        width: 50rpx;
        height: 50rpx;
        margin-right: 80rpx;
        margin-left: 30rpx;

}
#home .showCont .car .price{
        color: red;
        margin-right: 80rpx;
        margin-left: 10rpx;
}
#home .showCont .car .goToPaly{
        /* display: inline-block; */
        border-radius: 50px;
        background: #79bcbb;
        width: 200rpx;
        text-align: center;
        line-height: 70rpx;
        margin-top: -20rpx;
        height: 100%;
        color: #fff;
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
