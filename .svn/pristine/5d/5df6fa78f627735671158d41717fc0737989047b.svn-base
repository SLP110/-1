<template>
    <section class="scan">
        <div class="top-con">
            <img class="top-con-bg" src="../../common/img/icon_scavenging_bg.png" mode="widthFix">
            <div class="scan-con">
                <img class="scan-img" src="../../common/img/icon_scanning.png" mode="widthFix" @click="clickScan">
                <text>扫描商家台卡二维码</text>
            </div>
        </div>
        <div class="detail">
            <div class="title">【使用说明】</div>
            <div class="detail-text"><div class="dolt"></div>   扫描指定的超盟金服台卡二维码</div>        
            <div class="detail-text"><div class="dolt"></div>使用您已购买的代金券</div>        
            <div class="detail-text"><div class="dolt"></div>确保账户余额充足，点击付款完成用券操作</div>        
        </div>
    </section>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        async clickScan() {
            let data = await this.$wx.scanCode();
        }
    }
}
</script>

<style lang="scss">
@import '../../common/scss/base.scss';
.top-con {
    position: relative;
    .top-con-bg {
        width: 100%;
    }
    .scan-con {
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        img {
            width: 120px;
            height: 120px;
            margin-top: -40px;
        }
        text {
            color: #fff;
            margin-top: 20px;
        }
    }
}
.detail {
    background: #f5f5f5f5;
    width: calc(100% - 80px);
    margin-left: 20px;
    border-radius: 8px;
    margin-top: 20px;
    padding: 20px;
    .detail-text {
        color: $text-sup-color;
        font-size: $sup-text-size;
        padding: 8px 0px;
        display: flex;
        align-items: center;
        margin-left: 6px;
        .dolt {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #555555;
            margin-right: 10px;
        }
    }
}
</style>
