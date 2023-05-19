<template>
  <view class="app-navbar">
    <view class="app-navbar__inner"
          :class="[{'hide': !show, 'fixed': fixed, 'border': border}]"
          :style="{background: backgroundColor}">
      <view class="app-navbar__status-bar"></view>

      <view class="app-navbar__title-bar" :style="{color: textColor}">
        <slot v-if="useCustomSlot" name="custom"></slot>

        <template v-else>
          <view class="app-navbar__title-bar__left" @tap="whenTitleBarLeftTap">
            <template v-if="showLeft">
              <slot v-if="useLeftSlot" name="left"></slot>

              <template v-else>
                <view v-if="shouldBackToHomeShow" class="app-navbar__title-bar__left__home" @tap.stop="executeBackToHome">
                  <u-icon name="home" :color="textColor" size="var(--app-navbar__home_size)"></u-icon>
                </view>

                <template v-else>
                  <view v-if="leftIcon" class="icon">
                    <u-icon :name="leftIcon" :color="iconColor" :size="iconSize"></u-icon>
                  </view>
                  <text v-if="leftText" class="text u-line-1" :style="{color: iconColor}">{{ leftText }}</text>
                </template>
              </template>
            </template>
          </view>

          <view class="app-navbar__title-bar__center" :style="{width: titleWidth}">
            <slot v-if="useCenterSlot" name="center"></slot>

            <template v-else>
              <text class="title u-line-1">{{ title }}</text>
            </template>
          </view>

          <view class="app-navbar__title-bar__right" @tap="$emit('right-tap')">
            <template v-if="showRight">
              <slot v-if="useRightSlot" name="right"></slot>

              <template v-else>
                <view v-if="rightIcon" class="icon">
                  <u-icon :name="rightIcon" :color="iconColor" :size="iconSize"></u-icon>
                </view>
                <text v-if="rightText" class="text u-line-1" :style="{color: iconColor}">{{ rightText }}</text>
              </template>
            </template>
          </view>
        </template>
      </view>
    </view>

    <view v-if="fixed && placeholder" class="app-navbar__placeholder"></view>
  </view>
</template>

<script>
/**
 * AppNavbar App导航栏
 *
 * @author        小何同学 (xiaohe0601)
 * @description   本组件用于自定义导航栏 (即navbar)。
 *
 * @property {Boolean}  show              是否展示导航栏 (仅fixed时有效)
 * @property {Boolean}  fixed             是否固定在屏幕顶部展示
 * @property {Boolean}  placeholder       固定在屏幕顶部展示时是否在文档流中填充等高view
 * @property {Boolean}  border            是否展示下边框
 * @property {Boolean}  useCustomSlot     是否使用custom插槽
 * @property {Boolean}  showLeft          是否展示左侧内容
 * @property {Boolean}  useLeftSlot       是否使用left插槽
 * @property {String}   leftIcon          左侧图标
 * @property {String}   leftText          左侧文字
 * @property {Boolean}  showRight         是否展示右侧内容
 * @property {Boolean}  useRightSlot      是否使用right插槽
 * @property {String}   rightIcon         右侧图标
 * @property {String}   rightText         右侧文字
 * @property {Boolean}  useCenterSlot     是否使用center插槽
 * @property {String}   title             标题文字
 * @property {String}   titleWidth        标题宽度
 * @property {String}   textColor         文字颜色
 * @property {String}   backgroundColor   背景颜色
 * @property {String}   iconSize          左右图标大小
 * @property {String}   iconColor         左右图标颜色
 * @property {Boolean}  autoBack          点击navbar左侧是否触发navigateBack
 *
 * @event {Function}  left-tap    点击navbar左侧
 * @event {Function}  right-tap   点击navbar右侧
 *
 * @example <app-navbar title="标题"></app-navbar>
 */
export default {
  name: "AppNavbar",
  props: {
    show: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    useCustomSlot: {
      type: Boolean,
      default: false
    },
    showLeft: {
      type: Boolean,
      default: true
    },
    useLeftSlot: {
      type: Boolean,
      default: false
    },
    leftIcon: {
      type: null,
      default: "arrow-left"
    },
    leftText: {
      type: null,
      default: "返回"
    },
    showRight: {
      type: Boolean,
      default: true
    },
    useRightSlot: {
      type: Boolean,
      default: false
    },
    rightIcon: {
      type: null,
      default: ""
    },
    rightText: {
      type: null,
      default: ""
    },
    useCenterSlot: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    titleWidth: {
      type: String,
      default: "var(--app-navbar__title_width)"
    },
    textColor: {
      type: String,
      default: "var(--app-navbar__txt_color)"
    },
    backgroundColor: {
      type: String,
      default: "var(--color-bg-primary)"
    },
    iconSize: {
      type: String,
      default: "var(--app-navbar__icon_size)"
    },
    iconColor: {
      type: String,
      default: "inherit"
    },
    autoBack: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 是否展示返回至主页按钮
      shouldBackToHomeShow: false
    };
  },
  async mounted() {
    await this.$nextTick();

    const pages = getCurrentPages();
    const current = pages[pages.length - 1];

    this.shouldBackToHomeShow = pages.length === 1 && !this.AppConfig.route.navbar.backToHomeExcludes.includes(current.route);
  },
  methods: {
    whenTitleBarLeftTap() {
      this.$emit("left-tap");

      if (this.autoBack) {
        uni.navigateBack();
      }
    },
    executeBackToHome() {
      const { backToHomePage, backToHomeAction } = this.AppConfig.route.navbar;

      uni[backToHomeAction]({
        url: backToHomePage
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-navbar {
  position: relative;
}

.app-navbar__inner {
  display: flex;
  flex-direction: column;
  z-index: var(--app-navbar__body_zindex);
  transition: var(--app-navbar__body_transition);

  &.fixed {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;

    &.hide {
      top: calc(0px - var(--app-navbar__body_height) - 10px);
    }
  }

  &.border {
    border-bottom: var(--app-navbar__body_border);
  }
}

.app-navbar__status-bar {
  height: var(--app-navbar__status_height);
}

.app-navbar__title-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: var(--app-navbar__title_height);
}

.app-navbar__title-bar__center {
  display: flex;
  flex-direction: column;

  > .title {
    font-size: var(--app-navbar__txt_size);
    text-align: center;
  }
}

.app-navbar__title-bar__left,
.app-navbar__title-bar__right {
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;

  > .icon {
    margin-right: var(--app-navbar__icon_mright);
  }

  > .text {
    font-size: var(--app-navbar__txt_size);
  }
}

.app-navbar__title-bar__left {
  padding: 0 10rpx 0 var(--app-main__space_horizontal);
}

.app-navbar__title-bar__right {
  padding: 0 var(--app-main__space_horizontal) 0 10rpx;
}

.app-navbar__title-bar__left__home {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 64rpx;
  background-color: var(--app-navbar__home_background);
  border-radius: 50%;
}

.app-navbar__placeholder {
  height: var(--app-navbar__body_height);
}
</style>