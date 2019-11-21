<template>
  <div></div>
</template>

<script>
  import {activation} from '../network/oauth'

  export default {
    created() {
      activation(this.$route.query.token).then(
        res => {
          this.$toast.fail(res.data.message)
          this.$router.push('/login')
        }
      ).catch(() => {
        this.$toast.fail('不可预知错误')
        this.$router.push('/login')
      })
    }
  }
</script>
