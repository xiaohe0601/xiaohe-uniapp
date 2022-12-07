<template>
  <view class="app-tabbar"
        :style="{zIndex: zIndex, bottom: show ? 0 : `calc(0rpx - var(--app-tabbar__body_height) - 20rpx - ${safeAreaInsets.bottom}px)`}">
    <view class="app-tabbar__inner" :class="{'round': round, 'border': border}">
      <view v-for="(item) in items"
            :key="item.name"
            class="app-tabbar-item"
            :class="{'selected': innerValue === item.component}"
            @tap="onTabbarItemTap(item)">
        <image v-if="item.icon && item.iconSelected"
               class="app-tabbar-item__icon"
               :src="innerValue === item.component ? item.iconSelected : item.icon"></image>
        <view v-else class="app-tabbar-item__icon"></view>

        <text class="app-tabbar-item__text">{{ item.name }}</text>

        <template v-if="isTabbarItemBadgeShow(item)">
          <view class="app-tabbar-item__badge" :class="[parseTabbarItemBadgeType(item)]">
            <text class="app-tabbar-item__badge__text">{{ parseTabbarItemBadgeText(item) }}</text>
          </view>
        </template>
      </view>
    </view>

    <view class="app-tabbar__cushion" :style="{height: `${safeAreaInsets.bottom}px`}"></view>
  </view>
</template>

<script>
  /**
   * @typedef AppTabbarItem App底部导航栏item配置
   *
   * @property {string} name            名称 (展示文字)
   * @property {string} component       组件名称
   * @property {string} icon            图标 (图片绝对路径)
   * @property {string} iconSelected    选中状态图标 (图片绝对路径)
   * @property {string} badgeKey        badge取值 (需提供Vuex中的getters)
   */

  import { mapGetters } from "vuex";

  /**
   * AppTabbar App底部导航栏
   *
   * @author        小何同学 (MyHdg0601)
   * @description   本组件用于自定义底部导航栏 (即tabbar)。
   *
   * @property {String}   value     当前选中组件名称 (对应items[].component) <支持v-model>
   * @property {Array}    items     tabs配置 (AppTabbarItem[])
   * @property {Boolean}  show      是否展示tabbar
   * @property {Boolean}  round     是否展示圆角 (圆角大小: --app-tabbar__body_radius)
   * @property {Boolean}  border    是否展示上边框 (边框样式: --app-tabbar__body_border)
   * @property {Number}   zIndex    css中的z-index
   *
   * @event {Function}  input     当前选中组件名称变化 [value: 当前选中组件名称]
   *
   * @example <app-tabbar v-model="currentComponent" :items="tabbarItems"></app-tabbar>
   */
  export default {
    name: "AppTabbar",
    props: {
      value: {
        type: String,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
      show: {
        type: Boolean,
        default: true
      },
      round: {
        type: Boolean,
        default: false
      },
      border: {
        type: Boolean,
        default: true
      },
      zIndex: {
        type: Number,
        default: 50
      }
    },
    computed: {
      ...mapGetters({
        safeAreaInsets: "system/getSafeAreaInsets"
      }),
      innerValue: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit("input", value);
        }
      }
    },
    methods: {
      onTabbarItemTap(item) {
        if (item.component != null && !item.disabled) {
          this.innerValue = item.component;
        }
      },
      isTabbarItemBadgeShow({ badgeKey }) {
        if (badgeKey == null) {
          return false;
        }

        const badge = this.$store.getters[badgeKey];

        if (badge == null) {
          return false;
        }

        switch (typeof badge) {
          case "boolean":
            return badge;
          case "number":
            return badge > 0;
          case "string":
            return this.$string.isNotEmpty(badge);
        }

        return false;
      },
      parseTabbarItemBadgeType({ badgeKey }) {
        const badge = this.$store.getters[badgeKey];

        switch (typeof badge) {
          case "boolean":
            return "dot";
          case "number":
          case "string":
            return "text";
        }

        return null;
      },
      parseTabbarItemBadgeText({ badgeKey }) {
        const badge = this.$store.getters[badgeKey];

        switch (typeof badge) {
          case "boolean":
            return null;
          case "number":
          case "string":
            return badge;
        }

        return null;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-tabbar {
    position: fixed;
    right: 0;
    left: 0;
    background-color: var(--app-tabbar__body_background);
    transition: bottom 0.3s ease-out;
  }

  .app-tabbar__inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: var(--app-tabbar__body_height);

    &.round {
      border-radius: var(--app-tabbar__body_radius) var(--app-tabbar__body_radius) 0 0;
    }

    &.border {
      border-top: var(--app-tabbar__body_border);
    }
  }

  .app-tabbar-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: var(--app-tabbar__item_width);

    &.selected {
      .app-tabbar-item__text {
        color: var(--app-tabbar__txt_color--selected);
      }
    }
  }

  .app-tabbar-item__icon {
    width: var(--app-tabbar__icon_size);
    height: var(--app-tabbar__icon_size);
  }

  .app-tabbar-item__text {
    margin-top: var(--app-tabbar__txt_mtop);
    font-size: var(--app-tabbar__txt_size);
    font-weight: var(--app-tabbar__txt_weight);
    color: var(--app-tabbar__txt_color);
    text-align: center;
  }

  .app-tabbar-item__badge {
    position: absolute;

    &.dot {
      top: 0;
      right: 10rpx;
      width: var(--app-tabbar__badge_size--dot);
      height: var(--app-tabbar__badge_size--dot);
      background-color: var(--app-tabbar__badge_background);
      border-radius: 50%;
    }

    &.text {
      top: -10rpx;
      right: -14rpx;
      padding: 5rpx 10rpx 0;
      font-size: var(--app-tabbar__badge_size--text);
      color: var(--app-tabbar__badge_color);
      text-align: center;
      background-color: var(--app-tabbar__badge_background);
      border-radius: var(--app-tabbar__badge_radius--text);
    }
  }
</style>
