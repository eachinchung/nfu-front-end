<template>
  <div :style="{background:'rgb(248, 248, 248)'}">
    <div class="item">
      <div :style="{padding:'14px 16px',fontSize:'16px',background: '#fff'}">
        {{`${schedule.station_from_name} -> ${schedule.station_to_name}`}}
      </div>
    </div>

    <div class="item">
      <div :style="{padding:'12px 16px',fontSize:'12px',color:'#6e6f71',background: '#fff'}">
        <div :style="{paddingBottom:'4px'}">
          {{`${$store.state.busDate} ${schedule.start_time}`}}
        </div>

        {{schedule.pathway}}
      </div>
    </div>

    <van-checkbox-group v-model="result">
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
    </van-checkbox-group>

    <van-row type="flex" justify="center" class="myRow">
      <van-button type="danger" class="button" size="small" :loading="loading" @click="createOrder">提交订单</van-button>
    </van-row>

  </div>
</template>

<script>
  import {createOrder} from "../../../../network/schoolBus"
  import {Button, Checkbox, CheckboxGroup, Row} from "vant";
  // import {accelerateOrder, createOrder} from "../../../../network/schoolBus"

  // 刷票
  // function brushTicket(vm, res) {
  //   vm.$dialog.confirm({
  //     title: "订单创建失败",
  //     message: res.data.message,
  //     confirmButtonText: "刷票"
  //   }).then(() => {
  //     accelerateOrder({
  //       passengerIds: vm.passengerIds,
  //       busId: vm.schedule.id,
  //       ticketDate: vm.$store.state.busDate,
  //       takeStation: vm.schedule.station_from_name,
  //       orderState: 1,
  //       orderType: 2
  //     }).then(res => {
  //       if (res.data.code === "1000") vm.$router.push({
  //         path: "/school-bus/order/accelerate",
  //         query: {
  //           orderId: res.data.orderId,
  //           from: "/school-bus/schedule"
  //         }
  //       })
  //       else vm.$notify(res.data.message)
  //     }).catch(() => vm.$notify("无法连接到服务器"))
  //   }).catch()
  // }

  export default {
    data() {
      return {result: []}
    },
    components: {
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
      [Button.name]: Button,
      [Row.name]: Row
    },
    props: ["list", "schedule"],
    computed: {
      passengerIds() {
        let passenger_ids = []
        this.result.forEach(item => passenger_ids.push(item.id))
        return passenger_ids
      }
    },
    methods: {
      toggle(index) {
        this.$refs.checkboxes[index].toggle()
      },
      createOrder() {
        if (this.result.length === 0) this.$notify("请选择乘车人")
        else {
          // 关闭选择乘车人的弹窗
          this.$emit("close")
          // 提示加载中
          this.$toast.loading({
            forbidClick: true,
            duration: 0,
          });
          // 向服务器发送创建订单的请求
          createOrder({
            passengerIds: this.passengerIds,
            scheduleId: this.schedule.id,
            date: this.$store.state.busDate,
            takeStation: this.schedule.station_from_name
          }).then(res => {
            this.$toast.clear()
            if (res.data.code === "1000") this.$router.push({
              path: "/school-bus/order/pay",
              query: {
                orderId: res.data.message.orderId,
                from: "/school-bus/schedule"
              }
            })
            // else if (res.data.busCode === "0009") brushTicket(this, res)
            // else if (res.data.busCode === "0002") brushTicket(this, res)
            else this.$toast.fail(res.data.message)
          }).catch(() => this.$toast.fail("无法连接到服务器"))
        }
      }
    }
  }
</script>

<style scoped>
  .item {
    margin-bottom: 12px;
    background: rgb(255, 255, 255);
  }

  .button {
    width: 80%;
  }

  .myRow {
    padding-top: 20px;
    padding-bottom: 15px;
  }
</style>