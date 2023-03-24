export default {
  data() {
    return {
      /** @type {"init" | "load" | "show" | "ready" | "hide" | "unload" | null} 当前页面所处生命周期 */
      theLifecycle: null,
      /** @type {boolean} 当前页面是否展示 */
      thePercept: false
    }
  },
  onInit() {
    this.theLifecycle = "init";
  },
  onLoad() {
    this.theLifecycle = "load";
  },
  onShow() {
    this.theLifecycle = "show";
    this.thePercept = true;
  },
  onReady() {
    this.theLifecycle = "ready";
  },
  onHide() {
    this.theLifecycle = "hide";
    this.thePercept = false;
  },
  onUnload() {
    this.theLifecycle = "unload";
  }
};