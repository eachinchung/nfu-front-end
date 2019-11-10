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
              :name="item.id"
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

<script>
  import {createOrder} from "@/network/school_bus";

  // 刷票
  function brush_ticket(vm, res) {
    vm.$dialog.confirm({
      title: '订单创建失败',
      message: res.data.message,
      confirmButtonText: '刷票'
    }).then(() => {
      const toast = vm.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '刷票 0 次',
        mask: true
      });
      let post_id = 0;
      const timer = setInterval(() => {
        post_id++;
        toast.message = `刷票 ${post_id} 次`;
        createOrder(vm.$store.state.access_token, {
          passenger_ids: vm.result,
          schedule_id: vm.schedule.id,
          date: vm.$store.state.bus_date,
          take_station: vm.schedule.station_from_name
        }).then(
          res => {
            if (res.data.adopt) {
              clearInterval(timer);
              vm.$toast.clear();
            }
          }
        )
      }, 1000);
    }).catch(() => {
    });
  }

  export default {
    data() {
      return {
        result: []
      }
    },
    props: ['list', 'schedule'],
    methods: {
      toggle(index) {
        this.$refs.checkboxes[index].toggle();
      },
      createOrder() {
        if (this.result.length === 0) this.$notify('请选择乘车人');
        else {
          this.$emit('close')
          this.$toast.loading({
            forbidClick: true,
            duration: 0,
          });
          createOrder(this.$store.state.access_token, {
            passenger_ids: this.result,
            schedule_id: this.schedule.id,
            date: this.$store.state.bus_date,
            take_station: this.schedule.station_from_name
          }).then(
            res => {
              this.$toast.clear();
              if (res.data.adopt) console.log(res.data.message);
              else if (res.data.code === '0009') brush_ticket(this, res)
              else if (res.data.code === '0002') brush_ticket(this, res)
              else this.$toast.fail(res.data.message);
            }
          )
        }
      }
    }
  }
</script>

<style scoped>

</style>