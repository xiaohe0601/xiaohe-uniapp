<template>
  <app-container :percept="percept">
    <app-navbar title="我的" :show-left="false"></app-navbar>


    <app-tabbar current="mine"></app-tabbar>

    <app-safearea :cushion-height="140"></app-safearea>
  </app-container>
</template>

<script>
import lifecycleMixin from "@/mixins/lifecycle.js";

import AppTabbar from "@/components/AppTabbar.vue";

export default {
  mixins: [lifecycleMixin],
  components: { AppTabbar },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>

</style>