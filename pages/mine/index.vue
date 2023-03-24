<template>
  <app-container :percept="thePercept">
    <app-navbar title="我的" :show-left="false"></app-navbar>


    <app-tabbar :current="1"></app-tabbar>

    <app-safearea :cushion-height="140"></app-safearea>
  </app-container>
</template>

<script>
import AppTabbar from "@/components/AppTabbar.vue";

import lifecycleMixin from "@/mixins/lifecycle.js";

export default {
  components: { AppTabbar },
  mixins: [lifecycleMixin],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>

</style>