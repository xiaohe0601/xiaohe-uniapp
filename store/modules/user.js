import Config from "@/utils/config.js";

import _ from "lodash";

const DefaultAuthorityInterceptPage = { url: null, tabbar: false };

export default {
  namespaced: true,
  state: {
    // 用户信息
    profile: null,
    // 触发登录失效拦截的页面
    authorityInterceptPage: _.cloneDeep(DefaultAuthorityInterceptPage)
  },
  getters: {
    getProfile(state) {
      return state.profile;
    },
    getAuthorityInterceptPage(state) {
      return state.authorityInterceptPage;
    }
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setAuthorityInterceptPage(state, page) {
      state.authorityInterceptPage = page;
    }
  },
  actions: {
    async clearProfile({ commit }, options) {
      const { call } = Object.assign({}, { call: true }, options);

      if (call) {
        try {
          const token = uni.getStorageSync(Config.storage.token);

          if (token) {
            // 调用退出登录接口

          }
        } catch (e) {

        }
      }

      uni.removeStorageSync(Config.storage.token);

      commit("setProfile", null);
    },
    async redirectToAuthorityPage({ commit }, options) {
      const { intercept } = Object.assign({}, { intercept: false }, options);

      if (intercept) {
        const pages = getCurrentPages();
        const current = pages[pages.length - 1];

        commit("setAuthorityInterceptPage", {
          url: current.$page.fullPath,
          tabbar: current.getTabBar() != null
        });

        uni.redirectTo({ url: Config.http.redirectAuthUrl });
      } else {
        commit("setAuthorityInterceptPage", _.cloneDeep(DefaultAuthorityInterceptPage));

        uni.reLaunch({ url: Config.http.redirectAuthUrl });
      }
    },
    async redirectToAuthorityInterceptPage({ getters, commit, dispatch }, options) {
      const { action, url: customUrl } = Object.assign({}, { action: null, url: null }, options);

      const { url, tabbar } = getters["getAuthorityInterceptPage"];

      if (url != null) {
        if (tabbar) {
          uni.switchTab({ url });
        } else {
          uni.redirectTo({ url });
        }
      } else {
        if (action != null && customUrl != null) {
          uni[action]({ url: customUrl });
        } else {
          await dispatch("redirectToHomePage");
        }
      }

      commit("setAuthorityInterceptPage", _.cloneDeep(DefaultAuthorityInterceptPage));
    },
    async redirectToHomePage(context, options) {
      const { action } = Object.assign({}, { action: null }, options);

      const { redirectToHomeUrl, redirectToHomeAction } = Config.route.navbar;

      uni[action || redirectToHomeAction]({ url: redirectToHomeUrl });
    }
  }
};