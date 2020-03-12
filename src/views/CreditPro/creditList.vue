<template>
  <div>
    <van-nav-bar
      :border="false"
      class="title"
      left-arrow
      @click-left="$router.push('/credit-pro')" :title="title"
    />

    <div
      class="credit-list-card"
      v-for="item of Object.keys(creditData)"
      :key="item"
    >

      <div :style="{width:'80%'}">
        <span>{{creditData[item].courseName}}</span>
        <div :style="{paddingTop:'1px'}" v-if="progressRate">
          <van-tag v-if="creditData[item].accomplish" type="success" class="credit-list-tag">已获得</van-tag>
          <van-tag v-else type="warning" class="credit-list-tag">正在学习</van-tag>
          <van-tag type="primary">{{creditData[item].subdivisionType}}</van-tag>
        </div>
        <div :style="{paddingTop:'1px'}" v-if="type==='failSubject'">
          <van-tag type="danger">{{creditData[item].subdivisionType}}</van-tag>
        </div>
      </div>
      <div :style="{textAlign: 'right',width:'20%',color: '#969799'}">
        {{creditData[item].credit}}
      </div>

    </div>

  </div>
</template>

<script>
  import creditListTypeHash from "@/assets/json/creditListTypeHash"
  import {checkLogin} from "@/network/token";
  import {Tag} from "vant";

  export default {
    name: "creditList",
    components: {
      [Tag.name]: Tag
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    data() {
      return {
        title: null,
        type: null,
        progressRate: false,
        creditData: {}
      }
    },
    created() {
      const type = creditListTypeHash[this.$route.params.courseType]
      if (type == null) this.$router.push('/credit-pro')
      else {
        this.title = type.title
        this.type = type.type
        this.creditData = this.$store.state.creditPro[type.type]
        this.progressRate = type.progressRate
        if (Object.keys(this.creditData).length === 0) this.$router.push('/credit-pro')
      }
    }
  }
</script>

<style scoped>
  .credit-list-card {
    padding: 18px 20px;
    background: white;
    border-radius: 14px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
    display: flex;
    box-sizing: border-box;
    line-height: 24px;
    overflow: hidden;
    color: #323233;
  }

  .credit-list-tag {
    margin-right: 5px;
  }
</style>