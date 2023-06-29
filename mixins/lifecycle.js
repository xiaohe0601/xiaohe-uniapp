export default {
  data() {
    return {
      /** @type {"init" | "load" | "show" | "ready" | "hide" | "unload" | null} 当前页面所处生命周期 */
      lifecycle: null,
      /** @type {boolean} 当前页面是否展示 */
      percept: false,
      /** @type {boolean} 延迟初始化是否已完成 */
      deferInited: false
    };
  },
  onInit() {
    this.lifecycle = "init";
  },
  onLoad() {
    this.lifecycle = "load";
  },
  onShow() {
    this.lifecycle = "show";
    this.percept = true;
  },
  onReady() {
    this.lifecycle = "ready";

    this.$nextTick(() => {
      this.deferInited = true;

      this.$nextTick(() => {
        if (typeof this.whenDeferInited === "function") {
          this.whenDeferInited();
        }
      });
    });
  },
  onHide() {
    this.lifecycle = "hide";
    this.percept = false;
  },
  onUnload() {
    this.lifecycle = "unload";
  }
};