import Vue from "vue";

import Config from "@/utils/config.js";

Vue.mixin({
  computed: {
    AppConfig() {
      return Config;
    }
  },
  methods: {
    destroyToastTimer() {
      if (this.toastTimer != null) {
        clearTimeout(this.toastTimer);
        this.toastTimer = null;
      }
    }
  }
});