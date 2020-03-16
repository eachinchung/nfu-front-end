<template>
  <div>
    <van-nav-bar
      class="title"
      :border="false"
      title="意见反馈"
      left-arrow
      @click-left="$router.push('/main/profile')"
    />

    <div class="card">
      <van-field
        class="cardItem"
        v-model="title"
        label="标题"
        placeholder="请输入标题"
        type="text"
        :error="titleErr"
      />
      <van-field
        class="cardItem"
        v-model="feedback"
        rows="2"
        autosize
        label="详细内容"
        type="textarea"
        maxlength="200"
        placeholder="请输入意见反馈"
        show-word-limit
        :error="feedbackErr"
      />
    </div>

    <van-row type="flex" justify="center" class="feedback-row">
      <van-button type="primary" class="feedback-button" :loading="loading" @click="clickFeedback">提交反馈</van-button>
    </van-row>

  </div>
</template>

<script>
  import {Button, Field, Row} from "vant";
  import {checkLogin} from "@/network/token";
  import {feedback} from "@/network/profile";

  export default {
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    data() {
      return {
        title: '',
        feedback: '',
        titleErr: false,
        feedbackErr: false,
        loading: false
      }
    },
    components: {
      [Row.name]: Row,
      [Button.name]: Button,
      [Field.name]: Field
    },
    methods: {
      clickFeedback() {
        this.loading = true
        let err = false

        if (this.title === '') {
          this.titleErr = true
          err = true
        } else {
          this.titleErr = false
          err = false
        }

        if (this.feedback === '') {
          this.feedbackErr = true
          err = true
        } else {
          this.feedbackErr = false
          err = false
        }

        if (err) {
          this.loading = false
          return 0
        }

        feedback({
          title: this.title,
          feedback: this.feedback
        }).then(res => {
          if (res.data.code === "1000") this.$toast.success('意见反馈提交成功，请留意邮箱回信')
          else this.$toast.fail(res.data.message)
          this.loading = false
        }).catch(() => {
          this.$toast.fail("无法连接到服务器")
          this.loading = false
        })

      }
    }
  }
</script>

<style scoped>
  @import "~@/assets/css/card.css";

  .feedback-row {
    margin-top: 55px;
    margin-bottom: 25px;
  }

  .feedback-button {
    width: 80%;
    border-radius: 8px;
  }
</style>