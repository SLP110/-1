<template>
    <section class="activity-list">
        <div class="lists">
            <div class="item" v-for="(v, index) in activityList" :key="index" @click="toActivity(index)">
                <img :src="v.act_share_img" mode="widthFix">
                <div class="footer">
                    <text class="title">{{v.act_name}}</text>
                    <text class="time">{{v.act_start_time}}~{{v.act_end_time}}</text>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  async mounted() {
    await this.getData();
  },
  data() {
    return {
      activityList: [],
      activityId:'',
      activityUrl:''
    };
  },
  methods: {
    async getData() {
      this.activityList = await this.$http.post("/user/fissionlist");
    },
    toActivity(res){
    	this.activityId = this.activityList[res].id;
    	this.activityUrl = this.activityList[res].act_url;
    	wx.navigateTo({
          url: `/${this.activityUrl}?actId=${this.activityId}`
        });
    }
  }
};
</script>

<style lang="scss">
@import "../../../common/scss/base.scss";
page {
  background: $bg-color;
}
.lists {
  .item {
    width: calc(100% - 20px);
    margin-left: 10px;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    @include shadow;
    margin-top: 10px;
    img {
      width: 100%;
    }
    .footer {
      padding: 15px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .time {
        color: $text-sup-color;
      }
    }
  }
}
</style>
