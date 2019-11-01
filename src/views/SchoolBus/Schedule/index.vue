<template>
  <div>
    <van-nav-bar class="title" title="请选择班车" left-arrow @click-left="onClickLeft"/>
  </div>
</template>

<script>
    import {beforeRouteCheck} from "@/network/refresh_token";

    function init(vm) {
        console.log(vm);
    }

    export default {
        beforeRouteEnter(to, from, next) {
            beforeRouteCheck(next, to, init)
        },
        methods: {
            onClickLeft() {
                this.$router.push("/school_bus/date");
            }
        }
    }
</script>

<style>

</style>
