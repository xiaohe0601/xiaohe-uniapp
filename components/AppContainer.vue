<template>
  <view :class="[containerClasses]" :style="[containerStyles]">
    <slot></slot>
  </view>
</template>

<script>
import { mapGetters } from "vuex";

/**
 * AppContainer App页面容器
 *
 * @author        小何同学 (MyHdg0601)
 * @description   本组件用于容纳页面内的所有元素, 并向子元素提供Css变量, 实现主题切换等功能。注意：本组件应为页面的根组件。
 *
 * @property {Boolean}  percept                                       所在页面是否被展示 (传入lifecycleMixin中的thePercept)
 * @property {String}   lifecycle                                     所在页面生命周期 (传入lifecycleMixin中的theLifecycle)
 * @property {String}   backgroundColor                               背景颜色
 * @property {String}   statusFrontColor = [auto|#ffffff|#000000]     状态栏前景色
 * @property {String}   statusBackgroundColor                         状态栏背景色 ["auto", 16进制颜色值]
 *
 * @example <app-container :percept="thePercept"></app-container>
 */
export default {
  name: "AppContainer",
  props: {
    percept: {
      type: Boolean,
      default: false
    },
    lifecycle: {
      type: String,
      default: null
    },
    backgroundColor: {
      type: String,
      default: "var(--color-bg-normal)"
    },
    statusFrontColor: {
      type: String,
      default: "auto",
      validator: (value) => ["auto", "#ffffff", "#000000"].indexOf(value) >= 0
    },
    statusBackgroundColor: {
      type: String,
      default: "auto"
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentTheme",
      statusBarHeight: "system/getStatusBarHeight",
      titleBarHeight: "system/getTitleBarHeight",
      navigationBarHeight: "system/getNavigationBarHeight",
      safeAreaInsets: "system/getSafeAreaInsets"
    }),
    containerClasses() {
      const { currentTheme } = this;

      return [
        "app-container",
        `app-theme-${currentTheme.appTheme}`
      ];
    },
    containerStyles() {
      const {
        backgroundColor,
        statusBarHeight,
        titleBarHeight,
        navigationBarHeight,
        innerStatusFrontColor,
        innerStatusBackgroundColor,
        safeAreaInsets
      } = this;

      return {
        background: backgroundColor,
        "--app-navbar__status_height": `${statusBarHeight}px`,
        "--app-navbar__title_height": `${titleBarHeight}px`,
        "--app-navbar__body_height": `${navigationBarHeight}px`,
        "--app-navbar__status_color": innerStatusFrontColor,
        "--app-navbar__status_background": innerStatusBackgroundColor,
        "--app-safearea__body_top": `${safeAreaInsets.top}px`,
        "--app-safearea__body_right": `${safeAreaInsets.right}px`,
        "--app-safearea__body_bottom": `${safeAreaInsets.bottom}px`,
        "--app-safearea__body_left": `${safeAreaInsets.left}px`,
        "--app-scroller__cushion_height": `${safeAreaInsets.bottom + uni.upx2px(60)}px`
      };
    },
    innerStatusFrontColor() {
      const { currentTheme, statusFrontColor } = this;

      return statusFrontColor === "auto" ? (currentTheme.brightness === "light" ? "#000000" : "#ffffff") : statusFrontColor;
    },
    innerStatusBackgroundColor() {
      const { currentTheme, statusBackgroundColor } = this;

      return statusBackgroundColor === "auto" ? (currentTheme.brightness === "light" ? "#ffffff" : "#000000") : statusBackgroundColor;
    },
    innerStatusColor() {
      const { innerStatusFrontColor, innerStatusBackgroundColor } = this;

      return { innerStatusFrontColor, innerStatusBackgroundColor };
    }
  },
  watch: {
    currentTheme() {
      if (this.percept) {
        this.updateStatusBarColor();
      }
    },
    percept: {
      handler(value) {
        if (value) {
          this.updateStatusBarColor();
        }
      },
      immediate: true
    },
    innerStatusColor() {
      if (this.percept) {
        this.updateStatusBarColor();
      }
    }
  },
  methods: {
    updateStatusBarColor() {
      const { innerStatusFrontColor, innerStatusBackgroundColor } = this;

      uni.setNavigationBarColor({
        frontColor: innerStatusFrontColor,
        backgroundColor: innerStatusBackgroundColor
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>