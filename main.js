import Vue from "vue";

import App from "@/App.vue";

import uView from "@/uni_modules/uview-ui";

import store from "@/store";

import "@/extensions";
import "@/filters";
import "@/mixins";

import "@/utils/dayjs";

import AppContainer from "@/components/AppContainer.vue";
import AppNavbar from "@/components/AppNavbar.vue";
import AppSafearea from "@/components/AppSafearea.vue";

import zPagingConfig from "@/uni_modules/z-paging/components/z-paging/js/z-paging-config";

Vue.config.productionTip = false;

App.mpType = "app";

Vue.use(uView);

Vue.component("app-container", AppContainer);
Vue.component("app-navbar", AppNavbar);
Vue.component("app-safearea", AppSafearea);

const app = new Vue({
  store,
  ...App
});
app.$mount();

zPagingConfig.setConfig({
  "top-z-index": 1,
  "super-content-z-index": 1,
  "content-z-index": 1,
  "empty-view-z-index": 1,
  "default-page-no": 1,
  "default-page-size": 20,
  "fixed": false,
  "refresher-theme-style": "black",
  "refresher-background": "transparent",
  "refresher-vibrate": true,
  "auto-clean-list-when-reload": false,
  "show-loading-more-no-more-line": false,
  "loading-more-title-custom-style": { color: "var(--color-txt-tertiary)" },
  "auto-hide-empty-view-when-loading": false,
  "auto-hide-empty-view-when-pull": false,
  "safe-area-inset-bottom": true,
  "use-safe-area-placeholder": true
});
