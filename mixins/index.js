import Vue from "vue";

import Config from "@/utils/config.js";

Vue.mixin({
  computed: {
    SystemConfig() {
      return Config;
    }
  },
  methods: {
    preventDefault() {},
    destroyToastTimer() {
      if (this.toastTimer != null) {
        clearTimeout(this.toastTimer);
        this.toastTimer = null;
      }
    }
  }
});