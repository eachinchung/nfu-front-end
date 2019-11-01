<template>
  <div>
    <van-nav-bar class="title" title="请选择班车" left-arrow @click-left="onClickLeft"/>
  </div>
</template>

<script>
    import {beforeRouteCheck} from "@/network/refresh_token";
    import {schedule} from "@/network/school_bus";

    function init(vm) {
        if (vm.$store.state.bus_date == null || vm.$store.state.route_id == null) {
            vm.$router.push("/main/school_bus");
            return null;
        }

        schedule(vm.$store.state.access_token, vm.$store.state.route_id, vm.$store.state.bus_date).then(
            res=>{
                console.log(res);
            }
        )

    }

    export default {
        data() {
            return {
                scheduleList: []
            }
        },
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
