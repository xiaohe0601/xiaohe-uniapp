import Vue from "vue";

Vue.mixin({
  methods: {
    preventDefault() {},
    destroyToastTimer() {
      if (this.toastTimer != null) {
        clearTimeout(this.toastTimer);
        this.toastTimer = null;
      }
    }
  }
})