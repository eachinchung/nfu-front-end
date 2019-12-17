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
        this.$toast.fail('无法连接到服务器')
        this.$router.push('/login')
      })
    }
  }
</script>
