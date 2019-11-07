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
        <van-button size="small" type="danger" :style="{marginTop:'5px'}">提交订单</van-button>
      </div>
    </van-panel>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        result:[]
      }
    },
    props: ['list','schedule'],
    methods: {
      toggle(index) {
        this.$refs.checkboxes[index].toggle();
      }
    }
  }
</script>

<style scoped>

</style>