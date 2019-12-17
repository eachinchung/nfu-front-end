<template>
  <van-popup
    v-model="showPicker"
    position="bottom"
    @click-overlay="$emit('close')"
    @open="setIndex"
    :close-on-click-overlay="false"
  >
    <van-picker
      show-toolbar
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onChange"
    />
  </van-popup>
</template>

<script>
  import dormitory from "@/assets/dormitory.json"
  import {Picker, Popup} from "vant";

  export default {
    components: {[Picker.name]: Picker, [Popup.name]: Popup},
    data() {
      return {
        columns: [
          {
            values: Object.keys(dormitory),
            defaultIndex: 0
          },
          {
            values: Object.keys(dormitory["西学楼1号"]),
            defaultIndex: 0
        },
        {
          values: Object.keys(dormitory["西学楼1号"]["1楼"]),
          defaultIndex: 0
        }
      ]
    };
  },
  props: ["showPicker", "dormitoryValue"],
  methods: {
    onChange(picker, values) {
      picker.setColumnValues(1, Object.keys(dormitory[values[0]]))
      picker.setColumnValues(2, Object.keys(dormitory[values[0]][values[1]]))
    },
    onConfirm(value) {
      this.$emit("getRoomId", [
        `${value[0]} ${value[1]} ${value[2]}`,
        dormitory[value[0]][value[1]][value[2]]
      ]);
      this.$emit("close")
    },
    setIndex() {
      if (this.dormitoryValue != null) {
        let my_value = this.dormitoryValue.split(" ")

        this.columns[1].values = Object.keys(dormitory[my_value[0]])
        this.columns[2].values = Object.keys(
          dormitory[my_value[0]][my_value[1]]
        );

        this.columns[0].defaultIndex = Object.keys(dormitory).findIndex(
          item => item === my_value[0]
        );
        this.columns[1].defaultIndex = Object.keys(
          dormitory[my_value[0]]
        ).findIndex(item => item === my_value[1])
        this.columns[2].defaultIndex = Object.keys(
          dormitory[my_value[0]][my_value[1]]
        ).findIndex(item => item === my_value[2])
      }
    }
  }
}
</script>

<style>
</style>

