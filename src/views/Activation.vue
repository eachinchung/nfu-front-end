<template>
  <div></div>
</template>

<script>
  import {Activation} from '@/network/no_token'

  export default {
    created() {
      Activation(this.$route.query.token).then(
        res => {
          if (res.data.adopt) this.$toast.success('激活成功');
          else this.$toast.fail(res.data.message);
          this.$router.push('/login')
        },
        () => {
          this.$toast.fail('未知错误')
          this.$router.push('/login')
        }
      )
    }
  }
</script>

<style scoped>

</style>