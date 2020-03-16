<script>
  import {nfucaLogin} from '@/network/oauth'
  import {handleToken} from "@/network/token";

  export default {
    created() {
      nfucaLogin(this.$route.query.sign).then(
        res => {
          if (res.data.code === "1000") {
            handleToken(res)
            this.$router.push('/')
          } else {
            this.$toast.fail(res.data.message)
            this.$router.push('/login')
          }
        }
      ).catch(() => {
        this.$toast.fail('无法连接到服务器')
        this.$router.push('/login')
      })
    }
  }
</script>

