import Vue from "vue";

import Vuex from "vuex";

import system from "./modules/system";
import theme from "./modules/theme";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    system,
    theme,
    user
  }
});