<template>
  <van-popup v-model="showPicker" position="bottom">
    <van-picker
      show-toolbar
      :columns="columns"
      @cancel='this.$emit("close")'
      @confirm="onConfirm"
      @change="onChange"
    />
  </van-popup>
</template>

<script>
    import dormitory from "@/assets/dormitory.json";

    export default {
        data() {
            return {
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
        props: ['showPicker'],
        methods: {
            onChange(picker, values) {
                picker.setColumnValues(1, Object.keys(dormitory[values[0]]));
                picker.setColumnValues(2, Object.keys(dormitory[values[0]][values[1]]));
            },
            onConfirm(value) {
                this.$emit("getRoomId", [
                    value[0] + " " + value[1] + " " + value[2],
                    dormitory[value[0]][value[1]][value[2]]
                ]);
                this.$emit("close")
            }
        }
    };
</script>

<style>
</style>

