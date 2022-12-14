<template>
  <app-container :percept="thePercept">
    <!-- 小程序端不支持动态组件 -->
    <!-- <template v-for="(tab) in tabbarItems"> -->
    <!--   <template v-if="tab.component != null && activeComponents[tab.component]"> -->
    <!--     <component v-show="currentComponent === tab.component" -->
    <!--                :is="tab.component" -->
    <!--                :key="tab.name" -->
    <!--                :percept="thePercept && currentComponent === tab.component"></component> -->
    <!--   </template> -->
    <!-- </template> -->

    <the-home v-if="activeComponents['TheHome']"
              v-show="currentComponent === 'TheHome'"
              :percept="thePercept && currentComponent === 'TheHome'"></the-home>
    <the-mine v-if="activeComponents['TheMine']"
              v-show="currentComponent === 'TheMine'"
              :percept="thePercept && currentComponent === 'TheMine'"></the-mine>

    <view v-if="componentsLoading" class="components-loading">
      <u-loading-icon mode="circle"
                      size="50rpx"
                      color="var(--color-txt-tertiary)"
                      inactive-color="var(--color-txt-other)"
                      vertical
                      text="请稍候"
                      text-size="28rpx"
                      text-color="var(--color-txt-tertiary)"></u-loading-icon>
    </view>

    <app-tabbar v-model="currentComponent" :items="tabbarItems"></app-tabbar>
  </app-container>
</template>

<script>
  import AppTabbar from "@/components/AppTabbar";
  import TheHome from "./components/TheHome.vue";
  import TheMine from "./components/TheMine.vue";

  import lifecycleMixin from "@/mixins/lifecycle";

  const tabbarItems = [{
    name: "首页",
    component: "TheHome",
    icon: "/static/icons/tabbar_home.png",
    iconSelected: "/static/icons/tabbar_home_selected.png"
  }, {
    name: "我的",
    component: "TheMine",
    icon: "/static/icons/tabbar_mine.png",
    iconSelected: "/static/icons/tabbar_mine_selected.png"
  }];

  export default {
    components: { AppTabbar, TheHome, TheMine },
    mixins: [lifecycleMixin],
    data() {
      return {
        componentsLoading: true,
        tabbarItems: tabbarItems,
        currentComponent: tabbarItems[0].component,
        activeComponents: {}
      }
    },
    watch: {
      currentComponent: {
        handler(value) {
          if (value != null) {
            this.activeComponents[value] = true;
          }
        },
        immediate: true
      }
    },
    onLoad({ component }) {
      if (component != null) {
        this.currentComponent = component;
      }
    },
    async onReady() {
      await this.$nextTick();

      this.componentsLoading = false;
    }
  }
</script>

<style lang="scss" scoped>
  .components-loading {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
