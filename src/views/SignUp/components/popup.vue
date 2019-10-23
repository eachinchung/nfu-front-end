<template>
  <div>
    <van-field
      readonly
      clickable
      left-icon="location-o"
      label="宿舍"
      :value="value"
      placeholder="选择宿舍"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
import dormitory from "@/assets/dormitory.json";
export default {
  data() {
    return {
      value: "",
      showPicker: false,
      columns: [
        {
          values: Object.keys(dormitory)
        },
        {
          values: Object.keys(dormitory["西学楼1号"])
        },
        {
          values: Object.keys(dormitory["西学楼1号"]["1楼"])
        }
      ]
    };
  },
  methods: {
    onChange(picker, values) {
      picker.setColumnValues(1, Object.keys(dormitory[values[0]]));
      picker.setColumnValues(2, Object.keys(dormitory[values[0]][values[1]]));
    },
    onConfirm(value) {
      this.value = value[0] + " " + value[1] + " " + value[2];
      this.showPicker = false;
      this.$emit("getRoomId", dormitory[value[0]][value[1]][value[2]]);
    }
  }
};
</script>

<style>
</style>

