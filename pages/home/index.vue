<template>
  <app-container :percept="thePercept">
    <app-navbar title="首页" :show-left="false"></app-navbar>

    <view class="theme-demo">
      <text class="theme-demo__tips">主题切换示例</text>

      <view class="theme-demo-item">
        <text class="theme-demo-item__label">深色模式</text>
        <view class="theme-demo-item__switch">
          <u-switch :value="currentIsDarkTheme"
                    active-color="var(--color-accent)"
                    @change="toggleDarkTheme"></u-switch>
        </view>
      </view>

      <view class="theme-demo-item">
        <text class="theme-demo-item__label">跟随系统</text>
        <view class="theme-demo-item__switch">
          <u-switch :value="themeWithSystem"
                    active-color="var(--color-accent)"
                    @change="toggleThemeWithSystem"></u-switch>
        </view>
      </view>
    </view>

    <app-tabbar current="home"></app-tabbar>

    <app-safearea :cushion-height="140"></app-safearea>
  </app-container>
</template>

<script>
import lifecycleMixin from "@/mixins/lifecycle.js";

import AppTabbar from "@/components/AppTabbar.vue";

import { mapGetters } from "vuex";

export default {
  mixins: [lifecycleMixin],
  components: { AppTabbar },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      currentIsDarkTheme: "theme/currentIsDarkTheme",
      themeWithSystem: "theme/isThemeWithSystem"
    })
  },
  methods: {
    toggleDarkTheme(value) {
      if (value) {
        this.$store.commit("theme/setCurrentTheme", {
          appTheme: "dark",
          brightness: "dark"
        });
      } else {
        this.$store.commit("theme/setCurrentTheme", {
          appTheme: "light",
          brightness: "light"
        });
      }

      this.$store.commit("theme/setThemeWithSystem", { themeWithSystem: false });
    },
    toggleThemeWithSystem(value) {
      this.$store.commit("theme/setThemeWithSystem", { themeWithSystem: value });
    }
  }
};
</script>

<style lang="scss" scoped>
.theme-demo {
  padding: 0 var(--app-main__space_horizontal);
  margin: var(--app-main__space_vertical) 0;
}

.theme-demo-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20rpx;
}

.theme-demo__tips {
  font-size: 24rpx;
  color: var(--color-txt-tertiary);
}

.theme-demo-item__label {
  font-size: 30rpx;
}

.theme-demo-item__switch {
  margin-left: 20rpx;
}
</style>