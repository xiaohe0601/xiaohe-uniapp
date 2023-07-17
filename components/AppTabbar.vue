<template>
  <view class="app-tabbar">
    <view class="app-tabbar__inner" :class="{'hide': !show, 'round': round, 'border': border}">
      <view v-for="(item) in AppConfig.route.tabbar.list"
            :key="item.key"
            class="app-tabbar-item"
            :class="{'selected': current === item.key}"
            @tap="whenTabbarItemTap(item)">
        <view v-if="item.iconfont || (item.icon && item.iconSelected)" class="app-tabbar-item__icon">
          <text v-if="item.iconfont" class="app-tabbar-item__icon__iconfont iconfont" :class="[item.iconfont]"></text>
          <image v-else class="app-tabbar-item__icon__image" :src="current === item.key ? item.iconSelected : item.icon"></image>
        </view>

        <text class="app-tabbar-item__text">{{ item.text }}</text>

        <template v-if="isTabbarItemBadgeShow(badgeGetters[item.badgeKey])">
          <view class="app-tabbar-item__badge" :class="[parseTabbarItemBadgeType(badgeGetters[item.badgeKey])]">
            <text class="app-tabbar-item__badge__text">
              {{ parseTabbarItemBadgeText(badgeGetters[item.badgeKey]) }}
            </text>
          </view>
        </template>
      </view>
    </view>

    <view class="app-tabbar__cushion"></view>
  </view>
</template>

<script>
/**
 * @typedef AppTabbarItem App底部导航栏item配置
 *
 * @property {number|string}    key             唯一标识
 * @property {string}           text            名称 (展示文字)
 * @property {string}           path            页面路径
 * @property {string}           icon            图标 (图片绝对路径)
 * @property {string}           iconSelected    选中状态图标 (图片绝对路径)
 * @property {string}           iconfont        字体图标 (优先级高于icon)
 * @property {string}           badgeKey        badge取值 (需提供Vuex中的getters)
 */

/**
 * AppTabbar App底部导航栏
 *
 * @author        小何同学 (xiaohe0601)
 * @description   本组件用于自定义底部导航栏 (即tabbar)。
 *
 * @property {Number|String}    current   当前选中的tabbar-item唯一标识 (即key)
 * @property {Boolean}          show      是否展示tabbar
 * @property {Boolean}          round     是否展示圆角 (圆角大小: --app-tabbar__body_radius)
 * @property {Boolean}          border    是否展示上边框 (边框样式: --app-tabbar__body_border)
 *
 * @example
 * <app-tabbar current="home"></app-tabbar>
 */
export default {
  name: "AppTabbar",
  props: {
    current: {
      type: [Number, String],
      default: -1
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
    }
  },
  computed: {
    badgeGetters() {
      return this.AppConfig.route.tabbar.list
        .filter(({ badgeKey }) => badgeKey != null)
        .reduce((previous, { badgeKey }) => {
          previous[badgeKey] = this.$store.getters[badgeKey];

          return previous;
        }, {});
    }
  },
  methods: {
    whenTabbarItemTap(item) {
      if (item.path != null) {
        uni.switchTab({
          url: item.path
        });
      }
    },
    isTabbarItemBadgeShow(badge) {
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
    parseTabbarItemBadgeType(badge) {
      switch (typeof badge) {
        case "boolean":
          return "dot";
        case "number":
        case "string":
          return "text";
      }

      return null;
    },
    parseTabbarItemBadgeText(badge) {
      switch (typeof badge) {
        case "boolean":
          return "";
        case "number":
        case "string":
          return badge;
      }

      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
.app-tabbar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--app-tabbar__body_background);
  z-index: var(--app-tabbar__body_zindex);
  transition: var(--app-tabbar__body_transition);

  &.hide {
    bottom: calc(0px - var(--app-tabbar__body_height) - var(--app-safearea__body_bottom));
  }
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
  color: var(--app-tabbar__txt_color);

  &.selected {
    color: var(--app-tabbar__txt_color--selected);
  }
}

.app-tabbar-item__icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: var(--app-tabbar__icon_size);
  height: var(--app-tabbar__icon_size);
}

.app-tabbar-item__icon__iconfont {
  font-size: var(--app-tabbar__icon_fontsize);
}

.app-tabbar-item__icon__image {
  width: 100%;
  height: 100%;
}

.app-tabbar-item__text {
  margin-top: var(--app-tabbar__txt_mtop);
  font-size: var(--app-tabbar__txt_size);
  font-weight: var(--app-tabbar__txt_weight);
  text-align: center;
}

.app-tabbar-item__badge {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &.dot {
    top: var(--app-tabbar__badge_top--dot);
    right: var(--app-tabbar__badge_right--dot);
    width: var(--app-tabbar__badge_size--dot);
    height: var(--app-tabbar__badge_size--dot);
    background-color: var(--app-tabbar__badge_background);
    border-radius: var(--app-tabbar__badge_radius--dot);
  }

  &.text {
    top: var(--app-tabbar__badge_top--text);
    right: var(--app-tabbar__badge_right--text);
    padding: var(--app-tabbar__badge_padding--text);
    font-size: var(--app-tabbar__badge_size--text);
    color: var(--app-tabbar__badge_color);
    background-color: var(--app-tabbar__badge_background);
    border-radius: var(--app-tabbar__badge_radius--text);
  }
}

.app-tabbar__cushion {
  height: var(--app-safearea__body_bottom);
  transition: height 0.1s ease-out;
}
</style>