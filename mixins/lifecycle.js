export default {
  data() {
    return {
      /** @type {"init" | "load" | "show" | "ready" | "hide" | "unload" | null} 当前页面所处生命周期 */
      lifecycle: null,
      /** @type {boolean} 当前页面是否展示 */
      percept: false
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
  },
  onHide() {
    this.lifecycle = "hide";
    this.percept = false;
  },
  onUnload() {
    this.lifecycle = "unload";
  }
};