<template>
    <section class="coupon-describe">
        <div class="desc">
            <div class="title">温馨提示</div>
            <div class="content">
               <div v-for="(v, index) in text" :key="index">
                   {{index + 1}}.{{v}}
               </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  async mounted() {
    this.couponId = this.$root.$mp.query.couponId;
    this.subId = this.$root.$mp.query.subId;
    this.couponType = this.$root.$mp.query.couponType;
    await this.getData();
  },
  data() {
    return {
      couponId: "",
      couponType: "",
      subId: "",
      text: []
    };
  },
  methods: {
    async getData() {
      this.text = await this.$http.post("/user/couponremark", {
        coupon_id: this.couponId,
        coupon_type: this.couponType,
        sub_id: this.subId
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../../common/scss/base.scss";
page {
  background-color: $bg-color;
}
.desc {
  background-color: #fff;
  padding: 20px;
  padding-bottom: 40px;
  margin-top: 10px;
  .title {
    padding-bottom: 20px;
    font-weight: 600;
  }
  .content {
    color: $text-sup-color;
    line-height: 24px;
  }
}
</style>
