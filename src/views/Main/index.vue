<template>
  <div>
    <router-view />
    <tabbar />
  </div>
</template>

<script>
import Tabbar from "@/components/tabbar";
export default {
  name: "Home",
  components: {
    Tabbar
  }
};
</script>
