<template>
  <div>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <tabbar/>
  </div>
</template>

<script>
  import Tabbar from "../../components/tabbar"

  export default {
    name: "Home",
    components: {
      Tabbar
    }
  };
</script>
