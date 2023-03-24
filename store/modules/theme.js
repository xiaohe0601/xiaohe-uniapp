import Config from "@/utils/config.js";

/**
 * @typedef {"light" | "dark" | null} AppTheme  App主题
 */
/**
 * @typedef {"light" | "dark"} Brightness  主题亮度(一般用于控制状态栏颜色等)
 */
/**
 * @typedef {"light" | "dark"} SystemTheme  系统主题
 */

/**
 * @typedef ThemeConfig  主题配置
 *
 * @property {AppTheme} appTheme      App主题
 * @property {Brightness} brightness  主题亮度
 */

export default {
  namespaced: true,
  state: {
    /** @type {ThemeConfig} 当前主题 */
    currentTheme: Config.defaults.currentTheme,
    /** @type {SystemTheme} 系统主题 */
    systemTheme: Config.defaults.systemTheme,
    /** @type {boolean} 主题是否跟随系统 */
    themeWithSystem: Config.defaults.themeWithSystem
  },
  getters: {
    getCurrentTheme(state) {
      return state.currentTheme;
    },
    getSystemTheme(state) {
      return state.systemTheme;
    },
    isThemeWithSystem(state) {
      return state.themeWithSystem;
    },
    /**
     * 当前是否为深色主题
     *
     * @return {boolean}
     */
    currentIsDarkTheme(state) {
      return state.currentTheme.appTheme === "dark";
    },
    /**
     * scroll-view自定义下拉刷新样式
     *
     * @returns {"white" | "black"}
     */
    scrollViewRefresherStyle(state) {
      return state.currentTheme.brightness === "dark" ? "white" : "black";
    }
  },
  mutations: {
    setCurrentTheme(state, currentTheme) {
      state.currentTheme = currentTheme;

      uni.setStorageSync(Config.storage.currentTheme, currentTheme);
    },
    setSystemTheme(state, { systemTheme, initialize }) {
      state.systemTheme = systemTheme;

      if (!initialize && state.themeWithSystem) {
        this.commit("theme/setCurrentTheme", {
          appTheme: systemTheme,
          brightness: systemTheme
        });
      }
    },
    setThemeWithSystem(state, { themeWithSystem, initialize }) {
      state.themeWithSystem = themeWithSystem;

      uni.setStorageSync(Config.storage.themeWithSystem, themeWithSystem);

      if (!initialize) {
        this.commit("theme/setSystemTheme", {
          systemTheme: state.systemTheme
        });
      }
    }
  },
  actions: {}
};