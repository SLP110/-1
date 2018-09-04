<template>
    <section class="home-my">
       <div class="content">
            <div style="font-size:35rpx;width:100%;height:100px;margin-top:50px;margin:auto;">请绑定你的手机号,手机号仅用于登录和修改密码,并严格保密.</div>
            <div class="my-phone">手机号</div>
            <!-- <textarea cols="11" class="my-phone1" ></textarea> -->
            <input type="text" class="my-phone1">
            <div class="my-phone" >验证码</div>
             <!-- <input cols="11" value="获取验证码" style="margin-left:100px;"> -->
            <input type="text" class="my-phone1" value="请输入验证码">
            <!-- <input type="checkbox"> -->
            <div style="margin-left:45px;color:#ccc;"> 同意超盟有品用户协议</div>

            <button class="btn" >确认绑定</button>
            
       </div>
    </section>
</template>


<script>
export default {
   data(){
        return {
            
        }
    },
    methods:{
        
    },
    computed:{

    }
}
</script>

<style lang="scss" >
    .home-my .content{
        
        width:85%;
        height: 500px;
        // background: red;
        margin:auto;
        .my-phone{
            font-size:35rpx;
            margin-top: 10px;
        }
        .my-phone1{
            width:100%;
            // height: 40px;
            border-bottom: 1px solid seagreen;
            line-height: 40px;
            color:grey;
            font-size: 14px;
            margin-bottom: 50px;
        }
        .btn{
            width:80%;
            height: 50px;
            border-radius: 28px;
            background: seagreen;
            margin-top:20px;

        }
    }

</style>


