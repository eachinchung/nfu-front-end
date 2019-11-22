<template>
  <div>
    <van-panel
      :title="schedule.station_from_name+' -> '+schedule.station_to_name"
      :desc="schedule.pathway"
    >
      <van-checkbox-group v-model="result">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in list"
            clickable
            :key="item.id"
            :title="item.name"
            @click="toggle(index)"
          >
            <van-checkbox
              :name="item"
              ref="checkboxes"
              slot="right-icon"
            />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <div slot="footer" :style="{textAlign:'right'}">
        <van-button size="small" type="danger" :style="{marginTop:'5px'}" @click="createOrder">提交订单</van-button>
      </div>
    </van-panel>
  </div>
</template>

<!--<script>-->
<!--  import {createOrder} from "@/network/school_bus";-->

<!--  // 刷票-->
<!--  // function brush_ticket(vm, res) {-->
<!--  //   vm.$dialog.confirm({-->
<!--  //     title: '订单创建失败',-->
<!--  //     message: res.data.message,-->
<!--  //     confirmButtonText: '刷票'-->
<!--  //   }).then(() => {-->
<!--  //   }).catch(() => {-->
<!--  //   });-->
<!--  // }-->

<!--  export default {-->
<!--    data() {-->
<!--      return {-->
<!--        result: []-->
<!--      }-->
<!--    },-->
<!--    props: ['list', 'schedule'],-->
<!--    computed: {-->
<!--      passengerIds() {-->
<!--        let passenger_ids = []-->
<!--        this.result.forEach(item => passenger_ids.push(item.id))-->
<!--        return passenger_ids-->
<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--      toggle(index) {-->
<!--        this.$refs.checkboxes[index].toggle();-->
<!--      },-->
<!--      createOrder() {-->
<!--        if (this.result.length === 0) this.$notify('请选择乘车人');-->
<!--        else {-->
<!--          // 关闭选择乘车人的弹窗-->
<!--          this.$emit('close')-->
<!--          // 提示加载中-->
<!--          this.$toast.loading({-->
<!--            forbidClick: true,-->
<!--            duration: 0,-->
<!--          });-->
<!--          // 向服务器发送创建订单的请求-->
<!--          createOrder(this.$store.state.access_token, {-->
<!--            passenger_ids: this.passengerIds,-->
<!--            schedule_id: this.schedule.id,-->
<!--            date: this.$store.state.bus_date,-->
<!--            take_station: this.schedule.station_from_name-->
<!--          }).then(-->
<!--            res => {-->
<!--              this.$toast.clear();-->
<!--              if (res.data.adopt) {-->
<!--                // 成功创建订单-->
<!--                this.$store.commit("SetTicketData", {-->
<!--                  data: res.data,-->
<!--                  passenger: this.result,-->
<!--                  schedule: this.schedule-->
<!--                })-->
<!--                this.$router.push("/school-bus/order/create-order")-->
<!--              }-->
<!--              // else if (res.data.busCode === '0009') brush_ticket(this, res)-->
<!--              // else if (res.data.busCode === '0002') brush_ticket(this, res)-->
<!--              else this.$toast.fail(res.data.message)-->
<!--            }-->
<!--          )-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<style scoped>
</style>