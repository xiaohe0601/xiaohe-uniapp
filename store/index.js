import Vue from "vue";

import Vuex from "vuex";

import system from "./modules/system.js";
import theme from "./modules/theme.js";
import network from "./modules/network.js";
import user from "./modules/user.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    system,
    theme,
    network,
    user
  }
});