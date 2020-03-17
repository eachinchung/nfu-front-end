<script>
  import {nfucaLogin} from '@/network/oauth'
  import {handleToken} from "@/network/token";

  export default {
    created() {
      nfucaLogin(this.$route.query.sign).then(
        res => {
          if (res.data.code === "1000") {
            handleToken(res)
            this.$router.replace('/')
          } else {
            this.$toast.fail(res.data.message)
            this.$router.replace('/login')
          }
        }
      ).catch(() => {
        this.$toast.fail('无法连接到服务器')
        this.$router.replace('/login')
      })
    }
  }
</script>

