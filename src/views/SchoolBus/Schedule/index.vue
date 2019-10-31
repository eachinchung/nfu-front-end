<template>
  <div id="school_bus">
    <van-nav-bar class="title" title="请选择乘车日期" left-arrow @click-left="onClickLeft" />

    <van-cell-group title="选择购买日期" class="group">
      <van-cell size="large" title="2019-10-28" value="星期一" is-link />
      <van-cell size="large" title="2019-10-28" value="星期一" is-link />
      <van-cell size="large" title="2019-10-28" value="星期一" is-link />
      <van-cell size="large" title="2019-10-28" value="星期一" is-link />
      <van-cell size="large" title="2019-10-28" value="星期一" is-link />
      <van-cell size="large" title="2019-10-28" value="星期一" is-link />
    </van-cell-group>

    <van-cell-group>
      <van-cell size="large" title="预售购票" is-link />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  created() {
    let today = new Date()
    console.log(today.toLocaleDateString())
  },
  methods: {
    onClickLeft() {
      this.$router.push("/main/school_bus");
    }
  }
};
</script>

<style>
#school_bus .title {
  margin-bottom: 25px;
}

#school_bus .group {
  margin-bottom: 30px;
}
</style>
